'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroNew() {
  const parottaRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Preload the image
    const img = new window.Image();
    img.src = '/assets/Parottapng.png';
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  useEffect(() => {
    if (!parottaRef.current || !imageLoaded || !imageRef.current || !logoRef.current || !shadowRef.current || !textRef.current) return;

    // Initial position and darkness
    gsap.set(parottaRef.current, {
      x: '-100%',
      y: '-100%',
      rotation: -45,
      scale: 1,
    });

    gsap.set(shadowRef.current, {
      x: '-100%',
      y: '-95%',
      rotation: -45,
      scale: 1,
      opacity: 1,
    });

    gsap.set(imageRef.current, {
      filter: 'brightness(0.3) contrast(1.5) drop-shadow(0 0 20px rgba(0, 0, 0, 0.9))',
    });

    // Hide logo and text initially
    gsap.set(logoRef.current, {
      opacity: 0,
      y: -50
    });

    gsap.set(textRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 50
    });

    // Create timeline for coordinated animations
    const tl = gsap.timeline();

    // Movement animation for both parotta and shadow together
    tl.to([parottaRef.current, shadowRef.current], {
      x: '212%',
      y: (i) => i === 0 ? '130%' : '135%',
      rotation: 360,
      scale: 2,
      duration: 2.5,
      ease: "power2.out",
      transformOrigin: "center center",
    });

    // Simultaneous brightness animation
    tl.to(imageRef.current, {
      filter: 'brightness(1) contrast(1.1) drop-shadow(0 25px 25px rgba(0, 0, 0, 0.5))',
      duration: 2.5,
      ease: "power2.out",
    }, "<");

    // Fade in logo after parotta reaches center
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    }, "-=0.5");

    // Fade in text after logo appears
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out",
    }, "-=0.3");

    // Add scroll-triggered animation for the text zoom effect
    ScrollTrigger.create({
      trigger: textRef.current,
      start: "top center+=100",
      end: "bottom center",
      onEnter: () => {
        gsap.to(textRef.current, {
          scale: 1.2,
          duration: 0.8,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(textRef.current, {
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    });

  }, [imageLoaded]);

  return (
    <div className="relative w-full h-screen overflow-hidden max-w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/woodu.png"
          alt="Wooden Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Good Friday Logo - Responsive */}
      <div 
        ref={logoRef}
        className="absolute top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-20 w-40 sm:w-56 md:w-72 lg:w-80"
      >
        <Image
          src="/assets/Gud Friday_Logo_Primary-06.png"
          alt="Good Friday Logo"
          width={300}
          height={100}
          className="object-contain w-full h-auto"
          priority
        />
      </div>

      {/* Left Black Gradient - Responsive */}
      <div 
        className="absolute inset-y-0 left-0 w-1/4 md:w-1/3 bg-gradient-to-r from-black to-transparent"
        style={{ boxShadow: '10px 0 15px rgba(0, 0, 0, 0.3)' }}
      />

      {/* Right Black Gradient - Responsive */}
      <div 
        className="absolute inset-y-0 right-0 w-1/4 md:w-1/3 bg-gradient-to-l from-black to-transparent"
        style={{ boxShadow: '-10px 0 15px rgba(0, 0, 0, 0.3)' }}
      />

      {/* Shadow Element - Responsive */}
      <div 
        ref={shadowRef}
        className="absolute z-5 transform -translate-x-1/2 -translate-y-1/2"
        style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
      >
        <div 
          className="relative w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, transparent 70%)',
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
            transform: 'perspective(1000px) rotateX(45deg)',
            filter: 'blur(15px)',
          }}
        />
      </div>

      {/* Animated Parotta - Responsive */}
      <div 
        ref={parottaRef}
        className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
        style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
      >
        <div className="relative w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]">
          <Image
            ref={imageRef}
            src="/assets/Parottapng.png"
            alt="Parotta"
            fill
            className="object-contain"
            priority
            style={{ 
              mixBlendMode: 'multiply',
            }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>

      {/* Animated Text - Responsive */}
      <div 
        ref={textRef}
        className="absolute bottom-12 md:bottom-20 left-1/2 transform -translate-x-1/2 z-20 px-4"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center"
            style={{ 
              textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
              fontFamily: 'serif'
            }}>
          Ready to dive in to{' '}
          <span 
            className="inline-block"
            style={{
              fontSize: '1.2em',
              fontFamily: 'serif',
              fontWeight: 'black',
              color: '#D4AF37', // Golden color to match Good Friday theme
              textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(212,175,55,0.3)',
              letterSpacing: '0.02em',
              textTransform: 'uppercase'
            }}
          >
            FLAVOURS
          </span>{' '}
          ??!!
        </h2>
      </div>
    </div>
  );
}
