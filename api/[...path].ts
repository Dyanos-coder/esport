import type { VercelRequest, VercelResponse } from '@vercel/node';

// Vercel's Hobby plan caps a deployment at 12 serverless functions. This project
// has ~30 API endpoints, so instead of one file per endpoint under /api (one
// function each), every handler lives under /server and this single catch-all
// route (the only file under /api) dispatches to the right one by URL path.
// New endpoints: add the handler under /server, import it below, and add one
// entry to ROUTES. Do not add new files directly under /api.

import authRegister from '../server/auth/register.js';
import authLogin from '../server/auth/login.js';
import authLogout from '../server/auth/logout.js';
import authMe from '../server/auth/me.js';
import profile from '../server/profile.js';
import countries from '../server/countries.js';
import content from '../server/content.js';
import partners from '../server/partners.js';
import siteStatus from '../server/site-status.js';
import adminRegistrations from '../server/admin/registrations.js';
import adminRegistrationById from '../server/admin/registrations/[id].js';
import adminRegistrationGroup from '../server/admin/registrations/[id]/group.js';
import adminStats from '../server/admin/stats.js';
import adminCountries from '../server/admin/countries.js';
import adminCountryById from '../server/admin/countries/[id].js';
import adminContent from '../server/admin/content.js';
import adminContentById from '../server/admin/content/[id].js';
import adminPartners from '../server/admin/partners.js';
import adminPartnerById from '../server/admin/partners/[id].js';
import adminQualificationGroups from '../server/admin/qualification-groups.js';
import adminQualificationGroupById from '../server/admin/qualification-groups/[id].js';
import adminQualificationsByCountry from '../server/admin/qualifications/[countryId].js';
import adminGroupMatchById from '../server/admin/group-matches/[id].js';
import adminBracketsByCountry from '../server/admin/brackets/[countryId].js';
import adminBracketMatchById from '../server/admin/bracket-matches/[id].js';
import adminFinalists from '../server/admin/finalists.js';
import adminSiteSettings from '../server/admin/site-settings.js';

type Handler = (req: VercelRequest, res: VercelResponse) => unknown;

const ROUTES: { pattern: RegExp; handler: Handler; params?: string[] }[] = [
  { pattern: /^\/api\/auth\/register$/, handler: authRegister },
  { pattern: /^\/api\/auth\/login$/, handler: authLogin },
  { pattern: /^\/api\/auth\/logout$/, handler: authLogout },
  { pattern: /^\/api\/auth\/me$/, handler: authMe },
  { pattern: /^\/api\/profile$/, handler: profile },
  { pattern: /^\/api\/countries$/, handler: countries },
  { pattern: /^\/api\/content$/, handler: content },
  { pattern: /^\/api\/partners$/, handler: partners },
  { pattern: /^\/api\/site-status$/, handler: siteStatus },
  { pattern: /^\/api\/admin\/registrations\/([^/]+)\/group$/, handler: adminRegistrationGroup, params: ['id'] },
  { pattern: /^\/api\/admin\/registrations\/([^/]+)$/, handler: adminRegistrationById, params: ['id'] },
  { pattern: /^\/api\/admin\/registrations$/, handler: adminRegistrations },
  { pattern: /^\/api\/admin\/stats$/, handler: adminStats },
  { pattern: /^\/api\/admin\/countries\/([^/]+)$/, handler: adminCountryById, params: ['id'] },
  { pattern: /^\/api\/admin\/countries$/, handler: adminCountries },
  { pattern: /^\/api\/admin\/content\/([^/]+)$/, handler: adminContentById, params: ['id'] },
  { pattern: /^\/api\/admin\/content$/, handler: adminContent },
  { pattern: /^\/api\/admin\/partners\/([^/]+)$/, handler: adminPartnerById, params: ['id'] },
  { pattern: /^\/api\/admin\/partners$/, handler: adminPartners },
  { pattern: /^\/api\/admin\/qualification-groups\/([^/]+)$/, handler: adminQualificationGroupById, params: ['id'] },
  { pattern: /^\/api\/admin\/qualification-groups$/, handler: adminQualificationGroups },
  { pattern: /^\/api\/admin\/qualifications\/([^/]+)$/, handler: adminQualificationsByCountry, params: ['countryId'] },
  { pattern: /^\/api\/admin\/group-matches\/([^/]+)$/, handler: adminGroupMatchById, params: ['id'] },
  { pattern: /^\/api\/admin\/brackets\/([^/]+)$/, handler: adminBracketsByCountry, params: ['countryId'] },
  { pattern: /^\/api\/admin\/bracket-matches\/([^/]+)$/, handler: adminBracketMatchById, params: ['id'] },
  { pattern: /^\/api\/admin\/finalists$/, handler: adminFinalists },
  { pattern: /^\/api\/admin\/site-settings$/, handler: adminSiteSettings },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = new URL(req.url || '/', 'http://localhost');
  const pathname = url.pathname;

  for (const route of ROUTES) {
    const match = pathname.match(route.pattern);
    if (!match) continue;
    route.params?.forEach((name, i) => {
      (req.query as Record<string, string>)[name] = match[i + 1];
    });
    try {
      await route.handler(req, res);
    } catch (err) {
      console.error(`[api] ${pathname} crashed:`, err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Server error', detail: err instanceof Error ? err.message : String(err) });
      }
    }
    return;
  }

  res.status(404).json({ error: 'Not found' });
}
