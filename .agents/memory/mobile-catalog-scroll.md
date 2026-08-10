---
name: Mobile catalog scrolling
description: The mobile storefront must allow full-page browsing while product detail stays contained in the viewport.
---

The catalog and its secondary sections should retain normal vertical scrolling on mobile. When a product is opened, the detail overlay is the exception: it should occupy the available viewport, avoid inner scrolling, compact the product media and controls, and keep quantity plus purchase actions visible.

**Why:** The user needs to browse the complete storefront, but expects the product selection flow to be immediately usable without a second scroll context.

**How to apply:** Scope viewport-locking rules to the product detail overlay only; never apply `overflow: hidden` to the catalog/page shell on mobile. The preferred detail composition is a centered rounded card with a compact media header, two-column controls, full purchase actions, and visible benefit items.