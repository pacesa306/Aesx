/**
 * Route prefetcher — call on link hover to preload the page's JS chunk
 * before the user clicks, so navigation feels instant.
 *
 * Each import() matches the lazy() call in App.tsx so Vite deduplicates
 * the request and serves from cache on the actual navigation.
 */

const prefetched = new Set<string>();

const routeLoaders: Record<string, () => Promise<unknown>> = {
  '/sucursales':   () => import('@/pages/SucursalesPage'),
  '/precios':      () => import('@/pages/PreciosPage'),
  '/inscripcion':  () => import('@/pages/InscripcionPage'),
  '/suplementos':  () => import('@/pages/ZonaFitnessPage'),
  '/redes':        () => import('@/pages/RedesPage'),
  '/buzon':        () => import('@/pages/BuzonPage'),
};

/** Fire-and-forget: preload a route's chunk on first hover. */
export function prefetch(href: string): void {
  // Strip query/hash and handle /sucursales/:id
  const base = href.split('?')[0].split('#')[0];
  const key = Object.keys(routeLoaders).find(
    (k) => base === k || base.startsWith(k + '/'),
  );
  if (!key || prefetched.has(key)) return;
  prefetched.add(key);
  routeLoaders[key]().catch(() => { /* ignore — will retry on click */ });
}
