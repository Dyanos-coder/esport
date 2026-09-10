import { I18nProvider } from '@/i18n';
import { RouterProvider, useRouter } from '@/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ConceptPage from '@/pages/ConceptPage';
import CountriesPage from '@/pages/CountriesPage';
import RegisterPage from '@/pages/RegisterPage';
import ProjectPage from '@/pages/ProjectPage';
import { RulesPage, PlayersPage, ResultsPage, FinalePage, ContentPage, PartnersPage } from '@/pages/InfoPages';

function AppContent() {
  const { route } = useRouter();
  const pages = {
    home: <HomePage />, concept: <ConceptPage />, countries: <CountriesPage />, register: <RegisterPage />, rules: <RulesPage />, players: <PlayersPage />, results: <ResultsPage />, finale: <FinalePage />, content: <ContentPage />, partners: <PartnersPage />, project: <ProjectPage />,
  };
  const hideChrome = route === 'project';
  return <>{!hideChrome && <Navbar />}<main>{pages[route]}</main>{!hideChrome && <Footer />}</>;
}

function App() {
  return <I18nProvider><RouterProvider><AppContent /></RouterProvider></I18nProvider>;
}

export default App;
