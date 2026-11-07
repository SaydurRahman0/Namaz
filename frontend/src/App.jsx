import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { LocationProvider } from './context/LocationContext';
import Layout from './components/layout/Layout';
import AppRouter from './routes/AppRouter';
import ScrollToTop from './components/common/ScrollToTop';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <LocationProvider>
            <ScrollToTop />
            <Layout>
              <AppRouter />
            </Layout>
          </LocationProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
