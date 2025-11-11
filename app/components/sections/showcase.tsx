'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bananaRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentFlavor, setCurrentFlavor] = useState('banana'); // For future flavor changes
  const [isFlipping, setIsFlipping] = useState(false); // For flip animation
  const lastFlipRef = useRef<string>(''); // Track last flip to prevent duplicates
  const leftPacketRef = useRef<HTMLDivElement>(null);
  const rightPacketRef = useRef<HTMLDivElement>(null);

  // Function to create flip animation when changing flavors
  const flipPacket = (newFlavor: string) => {
    if (isFlipping || currentFlavor === newFlavor || !bananaRef.current || lastFlipRef.current === newFlavor) return;
    
    lastFlipRef.current = newFlavor; // Mark this flavor as being flipped to
    setIsFlipping(true);
    
    // Consistent one-direction flip (0° → 360°)
    gsap.to(bananaRef.current, {
      rotationY: 360,
      duration: 0.6,
      ease: "power2.inOut",
      onUpdate: function() {
        const rotation = this.targets()[0]._gsap.rotationY || 0;
        
        // Show back earlier at 70° and 250°
        if ((rotation >= 70 && rotation <= 110) || (rotation >= 250 && rotation <= 290)) {
          if (currentFlavor !== 'back') {
            setCurrentFlavor('back');
          }
        }
        // Change to new flavor earlier at 160°
        else if (rotation >= 160 && rotation <= 200) {
          if (currentFlavor !== newFlavor) {
            setCurrentFlavor(newFlavor);
          }
        }
      },
      onComplete: () => {
        gsap.set(bananaRef.current, { rotationY: 0 });
        setCurrentFlavor(newFlavor);
        setIsFlipping(false);
        // Reset after successful flip
        setTimeout(() => {
          lastFlipRef.current = '';
        }, 500);
      }
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !bananaRef.current || !overlayRef.current || !textRef.current || !leftPacketRef.current || !rightPacketRef.current) return;

    // Initial showcase animation (ORIGINAL - no interference)
    const showcaseTL = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "center center",
        scrub: 0.8,
      }
    });

    // Responsive packet spacing
    const isMobile = window.innerWidth < 640;
    const isSmall = window.innerWidth >= 640 && window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    let leftX, rightX;
    if (isMobile) {
      leftX = -80;
      rightX = 80;
    } else if (isSmall) {
      leftX = -150;
      rightX = 150;
    } else if (isTablet) {
      leftX = -300;
      rightX = 200;
    } else {
      leftX = -500;
      rightX = 270;
    }
    
    // Animate all packets from bottom
    showcaseTL
      .fromTo([leftPacketRef.current, bananaRef.current, rightPacketRef.current],
        {
          scale: 0.8,
          y: 300,
          opacity: 0,
          x: (index) => [leftX * 0.5, 0, rightX * 1.5][index],
          rotation: (index) => [15, 0, -15][index],
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          x: (index) => [leftX, 0, rightX][index],
          rotation: (index) => [15, 0, -15][index],
          duration: 1,
          stagger: 0.2,
          ease: "power2.out"
        }
      );

    // Create transition timeline (ORIGINAL)
    const transitionTL = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom center",
        end: "bottom top",
        scrub: 1,
        onEnter: () => setIsTransitioning(true),
        onLeaveBack: () => setIsTransitioning(false),
      }
    });

    // Get banana's final position before transition
    if (bananaRef.current) {
      const bananaRect = bananaRef.current.getBoundingClientRect();
      const startX = bananaRect.left;
      const startY = bananaRect.top;

      transitionTL
        .to(bananaRef.current, {
          scale: 0.8,
          x: () => {
            if (!bananaRef.current) return 0;
            const rect = bananaRef.current.getBoundingClientRect();
            return -rect.width * 0.6;
          },
          y: () => {
            if (!bananaRef.current) return 0;
            const rect = bananaRef.current.getBoundingClientRect();
            return rect.height * 0.1;
          },
          rotation: -15,
          duration: 1,
          ease: "power1.inOut",
        })
        .to(bananaRef.current, {
          motionPath: {
            path: [
              {x: "-15vw", y: "-5vh"},
              {x: "-35vw", y: "2vh"},
              {x: "-40vw", y: "2vh"},
              {x: "-45vw", y: "15vh"},
              {x: "-50vw", y: "10vh"}
            ],
            curviness: 1.5
          },
          scale: 1.3,
          rotation: 30,
          duration: 0.5,
          ease: "none",
        });

      // Add ScrollTrigger for coconut section
      ScrollTrigger.create({
        trigger: document.querySelector('[data-section="coconut"]'),
        start: "top+=60% center",
        end: "bottom center",
        onEnter: () => {
          if (bananaRef.current) {
            gsap.to(bananaRef.current, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                gsap.set(bananaRef.current, { display: "none" });
              }
            });
          }
        },
        onLeaveBack: () => {
          if (bananaRef.current) {
            gsap.set(bananaRef.current, { 
              display: "block",
              opacity: 0 
            });
            gsap.to(bananaRef.current, {
              opacity: 1,
              duration: 0.3
            });
          }
        }
      });
    }

    // Text animation (ORIGINAL - no interference)
    gsap.fromTo(textRef.current,
      {
        scale: 1,
        y: -200,
        opacity: 0.9,
      },
      {
        scale: 4,
        y: 100,
        opacity: 0.7,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          scrub: 1,
        }
      }
    );

    // Removed: This was causing early fixed positioning
    // The transition timeline now handles fixed positioning at the right time



    }, []);

  // Clean useEffect for packet changing only - no position interference
  useEffect(() => {
    if (!isTransitioning) return; // Only work when banana is already fixed naturally
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Only packet changing - no position forcing
      if (scrollY > windowHeight * 3.5) { // Coconut section
        if (currentFlavor !== 'coconut' && currentFlavor !== 'back' && !isFlipping) {
          flipPacket('coconut');
        }
      } else if (scrollY > windowHeight * 2.5) { // GreenChili section
        if (currentFlavor !== 'greenchili' && currentFlavor !== 'back' && !isFlipping) {
          flipPacket('greenchili');
        }
      } else if (scrollY > windowHeight * 1.5) { // PackProducts section
        if (currentFlavor !== 'banana' && currentFlavor !== 'back' && !isFlipping) {
          flipPacket('banana');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTransitioning, currentFlavor, isFlipping]);

  // Function to get current flavor image (for future PNG changes)
  const getCurrentFlavorImage = () => {
    switch (currentFlavor) {
      case 'greenchili':
        return '/assets/greenchilly/Green Chilly_Front-Photoroom.png';
      case 'coconut':
        return '/assets/slicedcoconut/Sliced Coconut_Front-Photoroom.png';
      case 'back':
        return '/assets/bananafry/Banana Fry_Back-Photoroom.png'; // Back of packet during flip
      case 'banana':
      default:
        return '/assets/bananafry/BananaFry_.png';
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Background Text - Responsive */}
      <div 
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden px-4"
        style={{ 
          mixBlendMode: 'multiply',
          fontFamily: 'Impact, sans-serif'
        }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[70px] font-bold text-center whitespace-nowrap transform"
            style={{ color: '#FF0000' }}>
          <span className="hidden sm:inline">DIVE IN TO FLAVOURS</span>
          <span className="sm:hidden">DIVE IN</span>
        </h2>
      </div>

      {/* Left Packet - Green Chili - Responsive */}
      <div 
        ref={leftPacketRef}
        className="absolute z-20 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px]"
        style={{ 
          left: '50%',
          top: '50%',
          transform: 'translate(calc(-50% - 80px), -50%) rotate(15deg)',
        }}
      >
        <Image
          src="/assets/greenchilly/Green Chilly_Front-Photoroom.png"
          alt="Green Chili"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Main Banana container - Responsive */}
      <div 
        ref={bananaRef}
        className={`${
          isTransitioning ? 'fixed' : 'absolute'
        } z-30 w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[280px] md:h-[280px] lg:w-[350px] lg:h-[350px]`}
        style={{ 
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Image
          src={getCurrentFlavorImage()}
          alt="Product"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Right Packet - Coconut - Responsive */}
      <div 
        ref={rightPacketRef}
        className="absolute z-20 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px]"
        style={{ 
          left: '50%',
          top: '50%',
          transform: 'translate(calc(-50% + 80px), -50%) rotate(-15deg)',
        }}
      >
        <Image
          src="/assets/slicedcoconut/Sliced Coconut_Front-Photoroom.png"
          alt="Sliced Coconut"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>
    </section>
  );
}
