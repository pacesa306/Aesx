---
name: Imported Vite base paths
description: Asset routing considerations when importing an existing Vite app into a nested Replit artifact path
---

When an existing Vite app is imported into an artifact served below `/`, public assets, manifest links, favicons, fonts, audio, and media URLs must resolve through Vite's `BASE_URL` rather than assuming root-relative paths.

**Why:** Replit artifact routing preserves the configured preview path; root-relative public URLs otherwise request files from the wrong artifact and silently break imagery or media.

**How to apply:** Keep the artifact's configured `previewPath`, use `import.meta.env.BASE_URL` for public asset helpers, and verify both the intro state and the post-intro page in the routed preview.