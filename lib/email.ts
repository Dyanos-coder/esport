import { Resend } from 'resend';

let resend: Resend | null = null;

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resend) resend = new Resend(apiKey);
  return resend;
}

const FROM = process.env.EMAIL_FROM || 'KarreX <onboarding@resend.dev>';

async function sendEmail(to: string, subject: string, html: string) {
  const client = getResend();
  if (!client) {
    console.warn(`[email] RESEND_API_KEY not set — skipping email to ${to}: "${subject}"`);
    return;
  }
  try {
    await client.emails.send({ from: FROM, to, subject, html });
  } catch (err) {
    // Never let an email failure break the request that triggered it.
    console.error(`[email] Failed to send "${subject}" to ${to}`, err);
  }
}

const wrapper = (title: string, body: string) => `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#0B1220;color:#ffffff;border-radius:16px;">
    <p style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#BFFF00;font-weight:700;margin:0 0 16px;">KarreX</p>
    <h1 style="font-size:22px;margin:0 0 16px;">${title}</h1>
    <div style="font-size:14px;line-height:1.6;color:#cbd5e1;">${body}</div>
  </div>
`;

export function sendSignupConfirmationEmail(to: string, pseudo: string) {
  return sendEmail(
    to,
    'Ta candidature KarreX a bien été reçue',
    wrapper(
      `Bienvenue, ${pseudo} !`,
      `Ta candidature pour représenter ton pays au tournoi panafricain KarreX a bien été enregistrée.
       <br/><br/>Elle est actuellement <strong style="color:#facc15;">en attente</strong> de validation par l'organisation.
       Tu recevras un email dès qu'elle sera examinée.
       <br/><br/>Tu peux suivre son statut à tout moment depuis ton compte sur le site.`,
    ),
  );
}

const statusCopy: Record<string, { subject: string; title: string; body: string }> = {
  accepted: {
    subject: 'Ta candidature KarreX a été acceptée 🎉',
    title: 'Félicitations !',
    body: 'Ta candidature a été <strong style="color:#4ADE80;">acceptée</strong>. Tu représentes officiellement ton pays dans la compétition. Rendez-vous sur ton compte pour la suite.',
  },
  rejected: {
    subject: 'Mise à jour de ta candidature KarreX',
    title: 'Concernant ta candidature',
    body: 'Après examen, ta candidature n\'a malheureusement pas été retenue pour cette édition. Merci pour ton intérêt et à bientôt pour une prochaine occasion.',
  },
};

export function sendStatusChangeEmail(to: string, pseudo: string, status: 'accepted' | 'rejected') {
  const copy = statusCopy[status];
  return sendEmail(to, copy.subject, wrapper(copy.title, `Bonjour ${pseudo},<br/><br/>${copy.body}`));
}
