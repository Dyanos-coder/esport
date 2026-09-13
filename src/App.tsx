import { useEffect, useState } from 'react';
import { I18nProvider } from '@/i18n';
import { RouterProvider, useRouter } from '@/router';
import { AuthProvider, useAuth } from '@/auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ConceptPage from '@/pages/ConceptPage';
import CountriesPage from '@/pages/CountriesPage';
import RegisterPage from '@/pages/RegisterPage';
import ProjectPage from '@/pages/ProjectPage';
import LoginPage from '@/pages/LoginPage';
import AccountPage from '@/pages/AccountPage';
import AdminPage from '@/pages/AdminPage';
import ContentPage from '@/pages/ContentPage';
import PartnersPage from '@/pages/PartnersPage';
import MaintenancePage from '@/pages/MaintenancePage';
import { RulesPage, PlayersPage, ResultsPage, FinalePage } from '@/pages/InfoPages';

function AppContent() {
  const { route } = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [maintenance, setMaintenance] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/site-status')
      .then((res) => res.json())
      .then((data) => setMaintenance(Boolean(data.maintenanceMode)))
      .catch(() => setMaintenance(false));
  }, []);

  const pages = {
    home: <HomePage />, concept: <ConceptPage />, countries: <CountriesPage />, register: <RegisterPage />, rules: <RulesPage />, players: <PlayersPage />, results: <ResultsPage />, finale: <FinalePage />, content: <ContentPage />, partners: <PartnersPage />, project: <ProjectPage />,
    login: <LoginPage />, account: <AccountPage />, admin: <AdminPage />,
  };

  if (maintenance === null || authLoading) {
    return <div className="min-h-screen bg-navy-950" />;
  }

  const isAdmin = user?.role === 'admin';
  if (maintenance && route !== 'login' && !isAdmin) {
    return <MaintenancePage />;
  }

  const hideChrome = route === 'project';
  return <>{!hideChrome && <Navbar />}<main>{pages[route]}</main>{!hideChrome && <Footer />}</>;
}

function App() {
  return (
    <I18nProvider>
      <RouterProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </RouterProvider>
    </I18nProvider>
  );
}

export default App;
