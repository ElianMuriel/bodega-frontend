import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Hero from '../components/Hero';
import LogoCollection from '../components/LogoCollection';
import ProductCategories from '../components/Highlights';
import Pricing from '../components/Pricing';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Hero />
      <div>
        <Divider />
        <Features />
        <Divider />
        <ProductCategories />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <LogoCollection />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
