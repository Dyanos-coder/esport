import { useState, type FormEvent } from 'react';
import { CheckCircle2, Info, Send, ShieldCheck } from 'lucide-react';
import { useI18n } from '@/i18n';
import { PageHero } from '@/components/ui';
import { countries, heroImage2 } from '@/data';

interface FormValues {
  country: string;
  pseudo: string;
  fullName: string;
  email: string;
  phone: string;
  level: string;
  message: string;
}

const initialValues: FormValues = {
  country: '', pseudo: '', fullName: '', email: '', phone: '', level: '', message: '',
};

export default function RegisterPage() {
  const { t } = useI18n();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const update = (field: keyof FormValues, value: string) => setValues((current) => ({ ...current, [field]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
      setValues(initialValues);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHero badge={t('register.hero.badge')} title={t('register.hero.title')} desc={t('register.hero.desc')} image={heroImage2} />
      <section className="section-pad">
        <div className="container-x grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 glass-card p-6 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center"><Send className="w-5 h-5 text-lime-500" /></div>
              <h2 className="heading-display text-3xl text-white">{t('register.form.title')}</h2>
            </div>
            {status === 'success' ? (
              <div className="py-16 text-center">
                <CheckCircle2 className="w-16 h-16 text-success-400 mx-auto mb-5" />
                <h3 className="heading-display text-3xl text-white mb-3">{t('register.form.success')}</h3>
                <button onClick={() => setStatus('idle')} className="btn-ghost mt-5">Nouvelle candidature</button>
              </div>
            ) : (
              <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label><span className="label-field">{t('register.form.country')}</span><select required value={values.country} onChange={(e) => update('country', e.target.value)} className="input-field"><option value="">{t('register.form.country.placeholder')}</option>{countries.map((country) => <option key={country.code} value={country.name}>{country.flag} {country.name}</option>)}</select></label>
                <label><span className="label-field">{t('register.form.pseudo')}</span><input required value={values.pseudo} onChange={(e) => update('pseudo', e.target.value)} placeholder={t('register.form.pseudo.placeholder')} className="input-field" /></label>
                <label><span className="label-field">{t('register.form.name')}</span><input required value={values.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder={t('register.form.name.placeholder')} className="input-field" /></label>
                <label><span className="label-field">{t('register.form.email')}</span><input required type="email" value={values.email} onChange={(e) => update('email', e.target.value)} placeholder={t('register.form.email.placeholder')} className="input-field" /></label>
                <label><span className="label-field">{t('register.form.phone')}</span><input required value={values.phone} onChange={(e) => update('phone', e.target.value)} placeholder={t('register.form.phone.placeholder')} className="input-field" /></label>
                <label><span className="label-field">{t('register.form.level')}</span><select required value={values.level} onChange={(e) => update('level', e.target.value)} className="input-field"><option value="">{t('register.form.level.placeholder')}</option><option value="amateur">{t('register.form.level.amateur')}</option><option value="semipro">{t('register.form.level.semipro')}</option><option value="pro">{t('register.form.level.pro')}</option></select></label>
                <label className="md:col-span-2"><span className="label-field">{t('register.form.message')}</span><textarea value={values.message} onChange={(e) => update('message', e.target.value)} placeholder={t('register.form.message.placeholder')} rows={4} className="input-field resize-none" /></label>
                {status === 'error' && <div className="md:col-span-2 rounded-xl bg-error-500/10 border border-error-500/30 p-4 text-sm text-error-400">{t('register.form.error')}</div>}
                <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2"><div className="flex items-center gap-2 text-xs text-gray-500"><ShieldCheck className="w-4 h-4 text-success-400" /> Tes données restent confidentielles.</div><button disabled={status === 'loading'} type="submit" className="btn-primary w-full sm:w-auto">{status === 'loading' ? t('register.form.submitting') : t('register.form.submit')}<Send className="w-4 h-4" /></button></div>
              </form>
            )}
          </div>
          <aside className="glass-card p-6 md:p-8 sticky top-24"><div className="flex items-center gap-3 mb-6"><Info className="w-5 h-5 text-purple-400" /><h3 className="heading-display text-2xl text-white">{t('register.info.title')}</h3></div><ul className="space-y-4">{[1, 2, 3, 4, 5].map((n) => <li key={n} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed"><CheckCircle2 className="w-4 h-4 text-lime-500 flex-shrink-0 mt-0.5" />{t(`register.info.${n}`)}</li>)}</ul></aside>
        </div>
      </section>
    </div>
  );
}
