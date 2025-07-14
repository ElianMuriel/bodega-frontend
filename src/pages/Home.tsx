import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../theme/AppTheme';
import AppAppBar from '../components/layout/AppAppBar';
import Hero from '../components/sections/Hero';
import LogoCollection from '../components/form/LogoCollection';
import ProductCategories from '../components/form/Highlights';
import Pricing from '../components/sections/Pricing';
import Features from '../components/form/Features';
import FAQ from '../components/sections/FAQ';
import Footer from '../components/layout/Footer';

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
