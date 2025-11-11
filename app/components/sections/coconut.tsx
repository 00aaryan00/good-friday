'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CoconutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const coconutRef = useRef<HTMLDivElement>(null);
  const [showCoconut, setShowCoconut] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    color: string;
    left: string;
    top: string;
    delay: string;
    duration: string;
  }>>([]);

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const colors = ['#ff6b9d', '#c44569', '#f39c12', '#e91e63', '#7c3aed'];
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      color: colors[i % 5],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${i * 0.3}s`,
      duration: `${3 + Math.random() * 1}s`,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !coconutRef.current) return;

    // Animate in coconut when section enters viewport
    gsap.fromTo(
      coconutRef.current,
      { x: 200, opacity: 0, scale: 0.8, rotate: 30 },
      {
        x: 0,
        opacity: 1,
        scale: 1.3,
        rotate: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          onEnter: () => setShowCoconut(true),
          onLeaveBack: () => setShowCoconut(false),
        },
      }
    );

    // Animate text when packet approaches (similar to green chili)
    const textElements = document.querySelectorAll('[data-coconut-text]');
    
    textElements.forEach((element, index) => {
      gsap.fromTo(element,
        {
          scale: 0.8,
          y: 50,
          opacity: 0,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center+=150px",
            end: "center center",
            scrub: 0.4,
          },
          delay: index * 0.1
        }
      );
    });

  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="coconut"
      className="relative min-h-screen w-full overflow-hidden max-w-full flex flex-col md:flex-row items-center"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Left: Coconut Animation - Responsive */}
      <div className="w-full md:w-1/2 flex justify-center items-center h-1/2 md:h-full py-8 md:py-0">
        {showCoconut && (
          <div ref={coconutRef} className="w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] relative">
            <Image
              src="/assets/slicedcoconut/Sliced Coconut_Front-Photoroom.png"
              alt="Sliced Coconut"
              fill
              className="object-contain"
              priority
            />
          </div>
        )}
      </div>

      {/* Right: Product Description - Responsive */}
      <div className="w-full md:w-1/2 px-4 sm:px-6 md:pl-8 lg:pl-16 xl:pl-24 pb-8 md:pb-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-white mb-3 md:mb-6 lg:mb-8 leading-tight"
            data-coconut-text
            style={{ 
              fontFamily: 'Impact, sans-serif',
              textShadow: '3px 3px 0px #CC5500',
              letterSpacing: '0.05em'
            }}>
          COCONUT SLICE
        </h2>
        <div className="space-y-2 md:space-y-3 lg:space-y-4 xl:space-y-6">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-yellow-100"
             data-coconut-text
             style={{ 
               fontFamily: 'Arial, sans-serif',
               textShadow: '2px 2px 0px #CC5500'
             }}>
            🥥 CRISPY & SWEET 🥥
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-white"
             data-coconut-text
             style={{ 
               fontFamily: 'Arial, sans-serif',
               textShadow: '2px 2px 0px #CC5500'
             }}>
            TROPICAL DELIGHT
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-yellow-100"
             data-coconut-text
             style={{ 
               fontFamily: 'Impact, sans-serif',
               textShadow: '3px 3px 0px #CC5500',
               letterSpacing: '0.03em'
             }}>
            PERFECTLY SLICED
          </p>
          <div className="mt-3 md:mt-4 lg:mt-6 xl:mt-8">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white"
               data-coconut-text
               style={{ 
                 fontFamily: 'Impact, sans-serif',
                 textShadow: '4px 4px 0px #CC5500',
                 letterSpacing: '0.05em'
               }}>
              HEAVENLY! ✨
            </p>
          </div>
        </div>
      </div>

      {/* Reduced floating particles - less funky - Responsive */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full animate-bounce opacity-30"
            style={{
              backgroundColor: particle.color,
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>
    </section>
  );
} 