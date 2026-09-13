import type { Plugin, Connect } from 'vite';
import type { IncomingMessage, ServerResponse } from 'node:http';

// Maps API URL paths to their handler module, for `npm run dev` only.
// Vite's dev server doesn't run Vercel serverless functions on its own, so this
// middleware loads and executes the same handler files directly in-process.
// New /api routes must be added here.
const STATIC_ROUTES: Record<string, string> = {
  '/api/auth/register': 'api/auth/register.ts',
  '/api/auth/login': 'api/auth/login.ts',
  '/api/auth/logout': 'api/auth/logout.ts',
  '/api/auth/me': 'api/auth/me.ts',
  '/api/profile': 'api/profile.ts',
  '/api/countries': 'api/countries.ts',
  '/api/content': 'api/content.ts',
  '/api/partners': 'api/partners.ts',
  '/api/admin/registrations': 'api/admin/registrations.ts',
  '/api/admin/stats': 'api/admin/stats.ts',
  '/api/admin/countries': 'api/admin/countries.ts',
  '/api/admin/content': 'api/admin/content.ts',
  '/api/admin/partners': 'api/admin/partners.ts',
  '/api/admin/qualification-groups': 'api/admin/qualification-groups.ts',
  '/api/admin/finalists': 'api/admin/finalists.ts',
  '/api/site-status': 'api/site-status.ts',
  '/api/admin/site-settings': 'api/admin/site-settings.ts',
};

const DYNAMIC_ROUTES: { pattern: RegExp; file: string; param: string }[] = [
  { pattern: /^\/api\/admin\/registrations\/([^/]+)\/group$/, file: 'api/admin/registrations/[id]/group.ts', param: 'id' },
  { pattern: /^\/api\/admin\/registrations\/([^/]+)$/, file: 'api/admin/registrations/[id].ts', param: 'id' },
  { pattern: /^\/api\/admin\/countries\/([^/]+)$/, file: 'api/admin/countries/[id].ts', param: 'id' },
  { pattern: /^\/api\/admin\/content\/([^/]+)$/, file: 'api/admin/content/[id].ts', param: 'id' },
  { pattern: /^\/api\/admin\/partners\/([^/]+)$/, file: 'api/admin/partners/[id].ts', param: 'id' },
  { pattern: /^\/api\/admin\/qualifications\/([^/]+)$/, file: 'api/admin/qualifications/[countryId].ts', param: 'countryId' },
  { pattern: /^\/api\/admin\/qualification-groups\/([^/]+)$/, file: 'api/admin/qualification-groups/[id].ts', param: 'id' },
  { pattern: /^\/api\/admin\/group-matches\/([^/]+)$/, file: 'api/admin/group-matches/[id].ts', param: 'id' },
  { pattern: /^\/api\/admin\/brackets\/([^/]+)$/, file: 'api/admin/brackets/[countryId].ts', param: 'countryId' },
  { pattern: /^\/api\/admin\/bracket-matches\/([^/]+)$/, file: 'api/admin/bracket-matches/[id].ts', param: 'id' },
];

function readJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
      if (!data) return resolve({});
      try { resolve(JSON.parse(data)); } catch { resolve({}); }
    });
  });
}

export function apiDevMiddleware(): Plugin {
  return {
    name: 'karrex-api-dev-middleware',
    apply: 'serve',
    configureServer(server) {
      const middleware: Connect.NextHandleFunction = async (req, res, next) => {
        const url = new URL(req.url || '/', 'http://localhost');
        const pathname = url.pathname;
        if (!pathname.startsWith('/api/')) return next();

        let file = STATIC_ROUTES[pathname];
        let params: Record<string, string> = {};

        if (!file) {
          for (const route of DYNAMIC_ROUTES) {
            const match = pathname.match(route.pattern);
            if (match) {
              file = route.file;
              params = { [route.param]: match[1] };
              break;
            }
          }
        }

        if (!file) return next();

        try {
          const mod = await server.ssrLoadModule(`/${file}`);
          const handler = mod.default as (req: IncomingMessage, res: ServerResponse) => Promise<void> | void;

          const body = req.method !== 'GET' && req.method !== 'HEAD' ? await readJsonBody(req) : {};
          const query = { ...Object.fromEntries(url.searchParams), ...params };

          (req as IncomingMessage & { body: unknown; query: unknown }).body = body;
          (req as IncomingMessage & { body: unknown; query: unknown }).query = query;

          const typedRes = res as ServerResponse & { status: (code: number) => typeof res; json: (body: unknown) => void };
          typedRes.status = (code: number) => { res.statusCode = code; return res; };
          typedRes.json = (payload: unknown) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(payload));
          };

          await handler(req, res as ServerResponse);
        } catch (err) {
          console.error(`[api-dev-middleware] ${pathname} failed:`, err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Dev server error', detail: String(err) }));
        }
      };

      server.middlewares.use(middleware);
    },
  };
}
