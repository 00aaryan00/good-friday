'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

export default function TraySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const traysTextRef = useRef<HTMLDivElement>(null);
  const leftTrayRef = useRef<HTMLDivElement>(null);
  const middleTrayRef = useRef<HTMLDivElement>(null);
  const rightTrayRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const smileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Copy ref values to variables for cleanup
    const question = questionRef.current;
    const dots = dotsRef.current;
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;
    const smile = smileRef.current;
    const leftTray = leftTrayRef.current;
    const middleTray = middleTrayRef.current;
    const rightTray = rightTrayRef.current;
    const traysText = traysTextRef.current;
    const content = contentRef.current;

    // Initial setup
    gsap.set(leftTrayRef.current, {
      x: '-100vw',
      opacity: 0,
      rotate: -180
    });

    gsap.set(middleTrayRef.current, {
      y: '100vh',
      opacity: 0,
      rotate: 180
    });

    gsap.set(rightTrayRef.current, {
      x: '100vw',
      opacity: 0,
      rotate: 180
    });

    gsap.set([leftEyeRef.current, rightEyeRef.current, smileRef.current], {
      opacity: 0,
      scale: 0.5
    });

    gsap.set(traysTextRef.current, {
      opacity: 0,
      scale: 0.5
    });

    // Simple blink animation
    function startBlinking() {
      gsap.to([leftEyeRef.current, rightEyeRef.current], {
        scaleY: 0.1,
        duration: 0.05,  // Reduced from 0.1
        repeat: 1,
        yoyo: true,
        repeatDelay: 0.01,  // Increased delay between blinks
        onComplete: function() {
          // Restart blink after a delay
          gsap.delayedCall(3, startBlinking);
        }
      });
    }

    // Initial animations
    const initialTl = gsap.timeline();
    
    initialTl
      .to(questionRef.current, {
        opacity: 1,
        y: 0,
        duration: 1
      })
      .to([leftEyeRef.current, rightEyeRef.current, smileRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        onComplete: startBlinking
      })
      .to(dotsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.1
      });

   

    // Scroll trigger for transition
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "center center",
      end: "bottom center",
      onEnter: () => {
        // Hide initial content
        gsap.to(contentRef.current, {
          scale: 2,
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            // Show trays text
            gsap.to(traysTextRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              onComplete: () => {
                // Animate trays
                gsap.to([leftTrayRef.current, middleTrayRef.current, rightTrayRef.current], {
                  opacity: 1,
                  duration: 0.3
                });

                // Left tray comes from far left
                gsap.fromTo(leftTrayRef.current, 
                  {
                    x: '-100vw',
                    rotate: -180
                  },
                  {
                    x: '-150px',
                    rotate: 15,
                    duration: 1.2,
                    ease: "power2.out"
                  }
                );

                // Middle tray comes from bottom
                gsap.fromTo(middleTrayRef.current,
                  {
                    y: '100vh',
                    rotate: 180
                  },
                  {
                    y: 0,
                    rotate: 0,
                    duration: 1.2,
                    ease: "power2.out"
                  }
                );

                // Right tray comes from far right
                gsap.fromTo(rightTrayRef.current,
                  {
                    x: '100vw',
                    rotate: 180
                  },
                  {
                    x: '150px',
                    rotate: -15,
                    duration: 1.2,
                    ease: "power2.out"
                  }
                );
              }
            });
          }
        });
      },
      onLeaveBack: () => {
        // Reset trays with animation
        gsap.to(leftTrayRef.current, {
          x: '-100vw',
          opacity: 0,
          rotate: -180,
          duration: 0.8
        });

        gsap.to(middleTrayRef.current, {
          y: '100vh',
          opacity: 0,
          rotate: 180,
          duration: 0.8
        });

        gsap.to(rightTrayRef.current, {
          x: '100vw',
          opacity: 0,
          rotate: 180,
          duration: 0.8
        });

        // Hide trays text
        gsap.to(traysTextRef.current, {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          onComplete: () => {
            // Show initial content
            gsap.to(contentRef.current, {
              scale: 1,
              opacity: 1,
              duration: 0.5
            });
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.killTweensOf([
        question,
        dots,
        leftEye,
        rightEye,
        smile,
        leftTray,
        middleTray,
        rightTray,
        traysText,
        content
      ]);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full max-w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #0066ff 0%, #2c79ff 100%)'
      }}
    >
      {/* Content wrapper for zoom effect - Responsive */}
      <div 
        ref={contentRef}
        className="flex flex-col items-center justify-center px-4"
      >
        {/* Question Text - Responsive */}
        <div 
          ref={questionRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white text-center mb-4"
          style={{ 
            fontFamily: 'Impact, sans-serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          Want to dive more?
        </div>

        {/* Smiley Face Container - Responsive */}
        <div className="relative w-24 h-20 sm:w-28 sm:h-22 md:w-32 md:h-24 mb-6 flex items-center justify-center">
          {/* Left Eye */}
          <div
            ref={leftEyeRef}
            className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full"
            style={{
              background: '#FFD700',
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
              top: '20%',
              left: '25%',
              transformOrigin: 'center'
            }}
          />
          {/* Right Eye */}
          <div
            ref={rightEyeRef}
            className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full"
            style={{
              background: '#FFD700',
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
              top: '20%',
              right: '25%',
              transformOrigin: 'center'
            }}
          />
          {/* Smile */}
          <div
            ref={smileRef}
            className="absolute w-16 h-8 sm:w-20 sm:h-10 overflow-hidden"
            style={{
              bottom: '15%'
            }}
          >
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 border-[2px] sm:border-[3px] border-white rounded-full"
              style={{
                marginTop: '-32px',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
              }}
            />
          </div>
        </div>

       
      </div>

      {/* Trays Text - Responsive */}
      <div 
        ref={traysTextRef}
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-center flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-4"
        style={{ 
          fontFamily: 'Impact, sans-serif',
          textShadow: '4px 4px 8px rgba(0,0,0,0.4)',
        }}
      >
        <span className="text-white whitespace-nowrap">TRY OUR</span>
        <span style={{ color: '#FFD700' }} className="whitespace-nowrap">TRAYS</span>
        <span style={{ color: '#FF0000' }}>!!</span>
      </div>

      {/* Tray Images - Responsive */}
      <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center gap-0">
        {/* Left Tray */}
        <div 
          ref={leftTrayRef}
          className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] -mr-8 sm:-mr-12 md:-mr-16 lg:-mr-20"
        >
          <Image
            src="/assets/trays/Banana Roast Front-Photoroom.png"
            alt="Left Tray"
            fill
            className="object-contain drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.8))'
            }}
            priority
          />
        </div>

        {/* Middle Tray */}
        <div 
          ref={middleTrayRef}
          className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] z-10"
        >
          <Image
            src="/assets/trays/Laddu Front-Photoroom.png"
            alt="Middle Tray"
            fill
            className="object-contain drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.8))'
            }}
            priority
          />
        </div>

        {/* Right Tray */}
        <div 
          ref={rightTrayRef}
          className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] -ml-8 sm:-ml-12 md:-ml-16 lg:-ml-20"
        >
          <Image
            src="/assets/trays/Mango Pachadi Front-Photoroom.png"
            alt="Right Tray"
            fill
            className="object-contain drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.8))'
            }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
