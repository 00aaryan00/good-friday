'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function GreenChiliSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chiliRef = useRef<HTMLDivElement>(null);
  const [showChili, setShowChili] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !chiliRef.current) return;

    // Animate in green chili when section enters viewport
    gsap.fromTo(
      chiliRef.current,
      { x: -200, opacity: 0, scale: 0.8, rotate: -30 },
      {
        x: 0,
        opacity: 1,
        scale: 1.2,
        rotate: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          onEnter: () => setShowChili(true),
          onLeaveBack: () => setShowChili(false),
        },
      }
    );

    // Animate text when packet approaches (similar to showcase)
    const textElements = document.querySelectorAll('[data-green-chili-text]');
    
    textElements.forEach((element, index) => {
      gsap.fromTo(element,
        {
          scale: 0.5,
          y: 100,
          opacity: 0,
          rotation: -10,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center+=100px",
            end: "center center",
            scrub: 0.5,
          },
          delay: index * 0.1 // Stagger each text element
        }
      );
    });

  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="greenchili"
      className="relative min-h-screen w-full overflow-hidden max-w-full flex flex-col md:flex-row items-center"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Left: Green Chili Animation - Responsive */}
      <div className="w-full md:w-1/2 flex justify-center items-center h-1/2 md:h-full py-8 md:py-0">
        {showChili && (
          <div ref={chiliRef} className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
            <Image
              src="/assets/greenchili/GreenChili.png"
              alt="Green Chili"
              fill
              className="object-contain"
              priority
            />
          </div>
        )}
      </div>

      {/* Right: Product Description - Responsive */}
      <div className="w-full md:w-1/2 px-4 sm:px-6 md:pr-8 lg:pr-16 xl:pr-24 pb-8 md:pb-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black text-white mb-3 md:mb-6 lg:mb-8 transform -rotate-1 leading-tight"
            data-green-chili-text
            style={{ 
              fontFamily: 'Impact, sans-serif',
              textShadow: '3px 3px 0px #ff4500',
              letterSpacing: '0.05em'
            }}>
          GREEN CHILI
        </h2>
        <div className="space-y-2 md:space-y-3 lg:space-y-4 xl:space-y-6">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-yellow-300"
             data-green-chili-text
             style={{ 
               fontFamily: 'Impact, sans-serif',
               textShadow: '2px 2px 0px #000'
             }}>
            🌶️ SPICY & FRESH
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-green-200"
             data-green-chili-text
             style={{ 
               fontFamily: 'Arial, sans-serif',
               textShadow: '2px 2px 0px #darkgreen'
             }}>
            100% NATURAL
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-red-400 transform rotate-1"
             data-green-chili-text
             style={{ 
               fontFamily: 'Impact, sans-serif',
               textShadow: '2px 2px 0px #8b0000',
               letterSpacing: '0.03em'
             }}>
            PERFECTLY PICKED
          </p>
          <div className="mt-3 md:mt-4 lg:mt-6 xl:mt-8">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-lime-300"
               data-green-chili-text
               style={{ 
                 fontFamily: 'Impact, sans-serif',
                 textShadow: '3px 3px 0px #228b22',
                 letterSpacing: '0.05em'
               }}>
              IRRESISTIBLE!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 
