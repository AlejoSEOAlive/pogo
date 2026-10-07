# Pogo — Rebuild (staging)

Réplica de pogo.com en Next.js + Tailwind, desplegada en Vercel.

- **Siempre noindex**: `X-Robots-Tag` en `next.config.ts` + meta robots en `src/app/layout.tsx`.
- Juegos: pogo.com bloquea iframes fuera de `*.pogo.com` (CSP `frame-ancestors`), así que en Vercel se muestra un placeholder "Play on Pogo".

## Desarrollo

```bash
npm install
npm run dev
```
