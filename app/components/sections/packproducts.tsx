'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PackProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !detailsRef.current) return;

    // Reveal product details with stagger
    const details = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "center center",
        scrub: 0.8,
      }
    });

    details.fromTo(detailsRef.current.children,
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
      }
    );

  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="packproducts"
      className="relative min-h-screen w-full overflow-hidden max-w-full"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Product details container - Responsive */}
      <div
        ref={detailsRef}
        className="absolute right-2 sm:right-4 md:right-8 lg:right-12 xl:right-20 top-1/2 transform -translate-y-1/2 text-right px-2 sm:px-3 md:px-4 max-w-[90%] sm:max-w-[85%] md:max-w-none"
      >
        <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6 xl:space-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl font-bold text-black/80 font-impact leading-tight" 
              style={{ fontFamily: 'Impact, sans-serif' }}>
            BANANA FRY
          </h2>
          
          <div className="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-4xl font-bold text-black/70 transform skew-x-6">
              CRUNCHY & CRISPY
            </p>
            <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-3xl font-bold text-black/60 transform -skew-x-6">
              100% NATURAL
            </p>
            <p className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-5xl font-bold text-black/75 transform rotate-2">
              PERFECTLY SLICED
            </p>
          </div>

          <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-6 xl:mt-8">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-red-600 transform rotate-[-2deg]">
              IRRESISTIBLE
            </p>
          </div>
        </div>
      </div>

      {/* Background elements for added depth */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>
    </section>
  );
}
