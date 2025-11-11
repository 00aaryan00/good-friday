'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Define tray data
const TRAYS_DATA = [
  {
    id: 1,
    name: "Banana Roast",
    image: "/assets/trays/Banana Roast Front-Photoroom.png",
    description: "Crispy banana slices roasted to perfection",
    tagline: "CRISPY & DELICIOUS",
    details: "Hand-picked ripe bananas, perfectly sliced and roasted",
    price: "₹199",
    direction: "left",
    theme: {
      accent: '#FFD700',  // Golden yellow for banana
      gradient: 'from-yellow-400 to-amber-500',
      textAccent: 'text-amber-300',
      sectionBg: 'from-amber-700 via-amber-600 to-yellow-700'
    }
  },
  {
    id: 2,
    name: "Traditional Laddu",
    image: "/assets/trays/Laddu Front-Photoroom.png",
    description: "Sweet and delightful traditional laddu",
    tagline: "SWEET PERFECTION",
    details: "Authentic recipe passed down through generations",
    price: "₹249",
    direction: "right",
    theme: {
      accent: '#FFA500',  // Orange for laddu
      gradient: 'from-orange-400 to-yellow-500',
      textAccent: 'text-orange-300',
      sectionBg: 'from-yellow-700 via-orange-800 to-green-800'
    }
  },
  {
    id: 3,
    name: "Potato Curry",
    image: "/assets/trays/Potato Curry Front-Photoroom.png",
    description: "Spicy and flavorful potato curry",
    tagline: "SPICE DELIGHT",
    details: "Fresh potatoes cooked in aromatic spices",
    price: "₹179",
    direction: "left",
    theme: {
      accent: '#FF6B6B',  // Warm red for curry
      gradient: 'from-red-400 to-orange-500',
      textAccent: 'text-red-300',
      sectionBg: 'from-green-800 via-emerald-800 to-blue-900'
    }
  },
  {
    id: 4,
    name: "Mango Pachadi",
    image: "/assets/trays/Mango Pachadi Front-Photoroom.png",
    description: "Sweet and tangy mango pachadi",
    tagline: "TROPICAL FUSION",
    details: "Made with fresh seasonal mangoes and special spices",
    price: "₹219",
    direction: "right",
    theme: {
      accent: '#FFB347',  // Mango yellow-orange
      gradient: 'from-yellow-500 to-orange-400',
      textAccent: 'text-yellow-300',
      sectionBg: 'from-blue-900 via-blue-800 to-blue-700'
    }
  }
];

export default function TrayShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial setup
    trayRefs.current.forEach((tray, index) => {
      if (!tray) return;
      
      const direction = TRAYS_DATA[index].direction;
      gsap.set(tray, {
        x: direction === 'left' ? '-150%' : '150%',
        opacity: 0
      });
    });

    infoRefs.current.forEach((info, index) => {
      if (!info) return;
      
      const direction = TRAYS_DATA[index].direction;
      gsap.set(info, {
        x: direction === 'left' ? '-100%' : '100%',
        opacity: 0
      });
    });

    // Create animations for each tray
    trayRefs.current.forEach((tray, index) => {
      if (!tray || !infoRefs.current[index]) return;

      const direction = TRAYS_DATA[index].direction;
      // Trays animate from offscreen to center (which is now 0% due to centered positioning)
      const finalX = direction === 'left' ? '20%' : '-20%';
      const textPosition = direction === 'left' ? '5%' : '5%';
      
      ScrollTrigger.create({
        trigger: tray,
        start: "top center+=100",
        end: "bottom center-=100",
        onEnter: () => {
          // Animate tray to offset position (not center)
          gsap.to(tray, {
            x: finalX,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out"
          });

          // Animate info with delay - stays on starting side
          gsap.fromTo(infoRefs.current[index], 
            {
              x: direction === 'left' ? '-100%' : '200%',
              opacity: 0
            },
            {
              x: textPosition,
              opacity: 1,
              duration: 1,
              delay: 0.3,
              ease: "power2.out"
            }
          );
        },
        onLeaveBack: () => {
          // Reset animations when scrolling back up
          gsap.to(tray, {
            x: direction === 'left' ? '-150%' : '150%',
            opacity: 0,
            duration: 0.8
          });

          gsap.to(infoRefs.current[index], {
            x: direction === 'left' ? '-100%' : '200%',
            opacity: 0,
            duration: 0.8
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: 'linear-gradient(165deg, #FFD700 0%, #FFA500 25%, #4CAF50 50%, #2196F3 75%, #3F51B5 100%)'
      }}
    >
      <div className="container mx-auto px-4 relative overflow-hidden">
        {/* Enhanced Header Section - Responsive */}
        <div className="text-center mb-16 md:mb-24 lg:mb-32 relative pt-12 md:pt-16 lg:pt-20 px-4">
          {/* Decorative top line - Responsive */}
          <div className="flex justify-center items-center gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="h-1 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-yellow-400 via-orange-500 to-transparent"></div>
            <div className="text-yellow-400 text-xl md:text-2xl">✦</div>
            <div className="h-1 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-yellow-400 via-orange-500 to-transparent"></div>
          </div>

          {/* Subtitle - Responsive */}
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-yellow-300 font-semibold mb-3 md:mb-4"
             style={{ 
               fontFamily: 'Impact, sans-serif',
               letterSpacing: '0.2em',
               textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
             }}
          >
            DISCOVER THE TASTE
          </p>

          {/* Main Title - Responsive */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-3 md:mb-4 relative"
              style={{ 
                fontFamily: 'Impact, sans-serif',
                textShadow: '4px 4px 8px rgba(0,0,0,0.4), 0 0 30px rgba(255,215,0,0.3)'
              }}
          >
            Our Delicious Selection
          </h2>

          {/* Decorative bottom line - Responsive */}
          <div className="flex justify-center items-center gap-2 md:gap-4 mt-4 md:mt-6">
            <div className="h-1 w-24 sm:w-32 md:w-48 bg-gradient-to-r from-transparent via-orange-500 to-yellow-400"></div>
            <div className="text-yellow-400 text-xl md:text-2xl transform rotate-180">✦</div>
            <div className="h-1 w-24 sm:w-32 md:w-48 bg-gradient-to-l from-transparent via-orange-500 to-yellow-400"></div>
          </div>

          {/* Background decorative elements - Hide on mobile */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-full h-full -z-10 opacity-10 hidden md:block">
            <div className="absolute top-0 left-0 w-full h-full"
                 style={{
                   backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,215,0,0.5) 1px, transparent 0)',
                   backgroundSize: '20px 20px'
                 }}
            ></div>
          </div>

          {/* Description - Responsive */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mt-4 md:mt-6 lg:mt-8 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto"
             style={{
               fontFamily: 'Arial, sans-serif',
               textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
               letterSpacing: '0.05em'
             }}
          >
            Experience our handcrafted delicacies, made with love and tradition.
            Each dish tells a story of flavor and perfection.
          </p>
        </div>

        {/* Tray sections with individual backgrounds - Responsive */}
        {TRAYS_DATA.map((tray, index) => (
          <div 
            key={tray.id}
            className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] mb-20 md:mb-32 lg:mb-40 last:mb-0 overflow-hidden"
          >
            {/* Tray Image - Responsive */}
            <div
              ref={el => {
                if (el) trayRefs.current[index] = el;
              }}
              className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            >
              <Image
                src={tray.image}
                alt={tray.name}
                fill
                className="object-contain drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.8))'
                }}
                priority
              />
            </div>

            {/* Tray Info - Responsive */}
            <div
              ref={el => {
                if (el) infoRefs.current[index] = el;
              }}
              className={`absolute top-1/2 transform -translate-y-1/2 w-[85%] sm:w-[70%] md:w-[45%] lg:w-[500px] px-3 sm:px-4 md:px-0 ${
                tray.direction === 'left' ? 'text-left' : 'text-right'
              }`}
              style={{
                right: tray.direction === 'right' ? '5%' : 'auto',
                left: tray.direction === 'left' ? '5%' : 'auto'
              }}
            >
              {/* Decorative line - Responsive */}
              <div className={`h-0.5 sm:h-1 bg-gradient-to-r ${tray.theme.gradient} mb-2 sm:mb-3 md:mb-4 lg:mb-6 w-12 sm:w-16 md:w-24 lg:w-32 ${
                tray.direction === 'right' ? 'ml-auto' : ''
              }`} />

              {/* Tagline - Responsive */}
              <p className={`text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl font-bold ${tray.theme.textAccent} mb-1 sm:mb-2 md:mb-3 lg:mb-4 leading-tight`}
                 style={{ 
                   fontFamily: 'Impact, sans-serif',
                   letterSpacing: '0.1em',
                   textShadow: '2px 2px 4px rgba(0,0,0,0.4)'
                 }}
              >
                {tray.tagline}
              </p>

              {/* Name - Responsive */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-1 sm:mb-2 md:mb-3 lg:mb-4 leading-tight"
                  style={{ 
                    fontFamily: 'Impact, sans-serif',
                    textShadow: `4px 4px 8px rgba(0,0,0,0.4), 0 0 20px ${tray.theme.accent}33`,
                    letterSpacing: '0.02em'
                  }}
              >
                {tray.name}
              </h3>

              {/* Description - Responsive */}
              <p className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold ${tray.theme.textAccent} mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-snug`}
                 style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.4)' }}
              >
                {tray.description}
              </p>

              {/* Details - Responsive */}
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/80 mb-3 sm:mb-4 md:mb-6 lg:mb-8 font-medium leading-relaxed"
                 style={{ 
                   fontFamily: 'Arial, sans-serif',
                   textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                   letterSpacing: '0.05em'
                 }}
              >
                {tray.details}
              </p>

              {/* Price - Responsive */}
              <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 md:gap-4 ${
                tray.direction === 'right' ? 'sm:justify-end' : 'sm:justify-start'
              }`}>
                <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white"
                      style={{ 
                        fontFamily: 'Impact, sans-serif',
                        textShadow: `3px 3px 6px rgba(0,0,0,0.4), 0 0 15px ${tray.theme.accent}33`
                      }}
                >
                  {tray.price}
                </span>
                <div className="px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-full"
                     style={{
                       background: tray.theme.accent,
                       boxShadow: `0 2px 10px ${tray.theme.accent}66`
                     }}
                >
                  <span className="text-black font-bold text-xs sm:text-sm md:text-base lg:text-lg">
                    BEST SELLER
                  </span>
                </div>
              </div>

              {/* Decorative line - Responsive */}
              <div className={`h-0.5 sm:h-1 bg-gradient-to-r ${tray.theme.gradient} mt-2 sm:mt-3 md:mt-4 lg:mt-6 w-12 sm:w-16 md:w-24 lg:w-32 ${
                tray.direction === 'right' ? 'ml-auto' : ''
              }`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
