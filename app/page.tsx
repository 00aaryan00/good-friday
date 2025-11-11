import HeroNew from './components/sections/heronew';
import Showcase from './components/sections/showcase';
import PackProducts from './components/sections/packproducts';
import GreenChiliSection from './components/sections/greenchili';
import CoconutSection from './components/sections/coconut';
import TraySection from './components/sections/trays';
import TrayShowcase from './components/sections/trayshowcase';
import AllProducts from './components/sections/all';

export default function Home() {
  return (
    <main 
      className="min-h-screen overflow-x-hidden w-full"
      style={{
        background: `linear-gradient(
          to bottom,
          #6B4423 0%,          /* Muted brown for hero */
rgb(243, 213, 43) 20%,         /* Softer gold for showcase */
rgb(232, 215, 85) 40%,         /* Muted yellow for pack products */
          #B8C65A 60%,         /* Soft yellow-green transition */
rgb(128, 186, 77) 80%,         /* Muted green for green chili */
          #CC5500 100%        /* Softer orange for coconut */
        )`
      }}
    >
      <HeroNew />
      <Showcase />
      <PackProducts />
      <GreenChiliSection />
      <CoconutSection />
      <TraySection />
      <TrayShowcase />
      <AllProducts />
      {/* Add more sections as needed */}
    </main>
  );
} 