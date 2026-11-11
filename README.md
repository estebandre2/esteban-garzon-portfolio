# Portfolio

Source of [estebangarzon.com](https://www.estebangarzon.com), the portfolio of Esteban Garzon: civil engineer (hydrology and hydropower) turned CTO for data, automation, and AI systems. Research: [estebangarzon.com/research](https://www.estebangarzon.com/research).

Portfolio in Next.js, ready for Vercel.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Main files to edit

- Main homepage content: `components/portfolio-shell.tsx`
- Limited code access page: `components/code-lab.tsx`
- Shared content/data: `lib/portfolio-data.ts`
- Styles and animations: `components/portfolio-shell.module.css`
- Metadata: `app/layout.tsx`

## Vercel deployment

1. Push this folder to GitHub.
2. Import the repository in Vercel.
3. Framework preset: `Next.js`.
4. Build command: `npm run build`.
5. Output setting: automatic.

No environment variables are required.
