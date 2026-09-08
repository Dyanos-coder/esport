/*
# Create player registrations table

1. New Tables
- `player_registrations`
- `id` (uuid, primary key): unique application identifier.
- `country` (text): country the player wants to represent.
- `pseudo` (text): public gaming name.
- `full_name` (text): applicant's full name.
- `email` (text): applicant contact email.
- `phone` (text): optional phone or WhatsApp contact.
- `level` (text): self-declared gaming level.
- `message` (text): optional applicant note.
- `created_at` (timestamptz): submission time.

2. Security
- Row level security is enabled.
- Anonymous and authenticated visitors can create applications.
- No visitor can read, update, or delete applications through the browser.

3. Important Notes
- This is a single-tenant public application intake flow without user accounts.
- Application records are intentionally write-only from the public site.
*/

CREATE TABLE IF NOT EXISTS public.player_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL,
  pseudo text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  level text NOT NULL,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.player_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can submit player registrations" ON public.player_registrations;
CREATE POLICY "Public can submit player registrations"
ON public.player_registrations FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Public cannot read player registrations" ON public.player_registrations;
CREATE POLICY "Public cannot read player registrations"
ON public.player_registrations FOR SELECT
TO anon, authenticated
USING (false);

DROP POLICY IF EXISTS "Public cannot update player registrations" ON public.player_registrations;
CREATE POLICY "Public cannot update player registrations"
ON public.player_registrations FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "Public cannot delete player registrations" ON public.player_registrations;
CREATE POLICY "Public cannot delete player registrations"
ON public.player_registrations FOR DELETE
TO anon, authenticated
USING (false);
