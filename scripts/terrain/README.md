# Terrain grid

`public/terrain/tahuin.json` is generated from a contour-line shapefile (PolyLine + DBF `Elevacion` field, WGS84 / UTM 17S) with:

```bash
python3 scripts/terrain/shp_to_grid.py curvas.shp curvas.dbf public/terrain/tahuin.json 330 0.5 1 0.05 0.92 1.4
```

Arguments: output columns, crop as fractions of the extent (`x0 x1 y0 y1`, y from north), and Gaussian smoothing in cells. Requires `numpy` and `scipy`. The source shapefile is not part of this repository.
