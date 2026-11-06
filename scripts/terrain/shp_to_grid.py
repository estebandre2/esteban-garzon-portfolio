"""Rasterize a contour-line shapefile (PolyLine + DBF elevation) into a compact height grid JSON."""
import json, struct, sys
import numpy as np
from scipy.interpolate import griddata
from scipy.ndimage import gaussian_filter

shp_path, dbf_path, out_path = sys.argv[1], sys.argv[2], sys.argv[3]
COLS = int(sys.argv[4]) if len(sys.argv) > 4 else 220
# Optional crop as fractions of the survey extent: x0 x1 y0 y1 (y from north), and smoothing sigma in cells.
CROP = [float(v) for v in sys.argv[5:9]] if len(sys.argv) > 8 else [0, 1, 0, 1]
SIGMA = float(sys.argv[9]) if len(sys.argv) > 9 else 0

def read_dbf(path, field):
    d = open(path, "rb").read()
    n = struct.unpack("<I", d[4:8])[0]
    hl, rl = struct.unpack("<HH", d[8:12])
    fields, i, off = [], 32, 1
    while d[i] != 0x0D:
        name = d[i:i + 11].split(b"\x00")[0].decode()
        ln = d[i + 16]
        fields.append((name, off, ln)); off += ln; i += 32
    name, foff, ln = next(f for f in fields if f[0] == field)
    return [float(d[hl + r * rl + foff: hl + r * rl + foff + ln].strip() or "nan") for r in range(n)]

def read_shp(path):
    d = open(path, "rb").read()
    pos, shapes = 100, []
    while pos < len(d):
        _, length = struct.unpack(">ii", d[pos:pos + 8]); pos += 8
        rec = d[pos:pos + length * 2]; pos += length * 2
        if struct.unpack("<i", rec[:4])[0] == 0:
            shapes.append(np.empty((0, 2))); continue
        nparts, npts = struct.unpack("<ii", rec[36:44])
        pts = np.frombuffer(rec[44 + 4 * nparts: 44 + 4 * nparts + 16 * npts], dtype="<f8").reshape(-1, 2)
        shapes.append(pts)
    return shapes

elev = read_dbf(dbf_path, "Elevacion")
shapes = read_shp(shp_path)
assert len(elev) == len(shapes), (len(elev), len(shapes))
xy = np.concatenate([s for s in shapes if len(s)])
z = np.concatenate([np.full(len(s), e) for s, e in zip(shapes, elev) if len(s)])
ok = np.isfinite(z)
xy, z = xy[ok], z[ok]
if len(z) > 400_000:
    idx = np.random.default_rng(0).choice(len(z), 400_000, replace=False); xy, z = xy[idx], z[idx]

x0, y0 = xy.min(0); x1, y1 = xy.max(0)
w, h = x1 - x0, y1 - y0
rows = max(40, round(COLS * h / w))
gx, gy = np.meshgrid(np.linspace(x0, x1, COLS), np.linspace(y1, y0, rows))  # row 0 = north
grid = griddata(xy, z, (gx, gy), method="linear")
near = griddata(xy, z, (gx, gy), method="nearest")
grid = np.where(np.isnan(grid), near, grid)
if SIGMA:
    grid = gaussian_filter(grid, SIGMA)
c0, c1 = round(CROP[0] * (COLS - 1)), round(CROP[1] * (COLS - 1)) + 1
r0, r1 = round(CROP[2] * (rows - 1)), round(CROP[3] * (rows - 1)) + 1
grid = grid[r0:r1, c0:c1]
w, h = w * (CROP[1] - CROP[0]), h * (CROP[3] - CROP[2])
rows, COLS = grid.shape

zmin, zmax = float(grid.min()), float(grid.max())
span = zmax - zmin
step = min((s for s in (5, 10, 20, 25, 50, 100) if span / s <= 34), default=100)
out = {
    "source": "Contour survey, Tahuin dam site (WGS84 / UTM 17S)",
    "cols": COLS, "rows": rows, "widthM": round(w), "heightM": round(h),
    "min": round(zmin, 1), "max": round(zmax, 1), "step": step,
    "heights": [int(round(v * 2)) for v in grid.ravel()],  # half-metres
}
json.dump(out, open(out_path, "w"), separators=(",", ":"))
print(f"contours={len(shapes)} pts={len(z)} grid={COLS}x{rows} extent={w:.0f}x{h:.0f} m z={zmin:.1f}..{zmax:.1f} step={step}")
