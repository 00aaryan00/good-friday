'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type DecorationType = 'triangle' | 'product';

interface DecorationProps {
  type: DecorationType;
  color?: string;
  productSrc?: string;
  index: number;
}

const Decoration = ({ type, color, productSrc, index }: DecorationProps) => {
  return (
    <div
      style={{
        position: "relative",
        width: '120px',
        height: '180px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
      className="sm:w-[150px] sm:h-[220px] md:w-[180px] md:h-[260px] lg:w-[220px] lg:h-[320px]"
    >
      <motion.div
        animate={{ 
          y: [0, 40, 0],
          rotate: [-3, 3, -3]
        }}
        transition={{ 
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {type === 'triangle' ? (
          <motion.div
            style={{
              width: 0,
              height: 0,
              borderLeft: "25px solid transparent",
              borderRight: "25px solid transparent",
              borderTop: `50px solid ${color}`,
              filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.2))",
              marginTop: '-2px'
            }}
            className="sm:border-l-[30px] sm:border-r-[30px] sm:border-t-[60px] md:border-l-[35px] md:border-r-[35px] md:border-t-[70px] lg:border-l-[40px] lg:border-r-[40px] lg:border-t-[80px]"
          />
        ) : (
          <motion.div
            style={{
              position: "relative",
              width: "100px",
              height: "100px",
              marginTop: '-20px'
            }}
            className="sm:w-[130px] sm:h-[130px] sm:-mt-7 md:w-[160px] md:h-[160px] md:-mt-8 lg:w-[200px] lg:h-[200px] lg:-mt-[38px]"
          >
            <Image
              src={productSrc || ""}
              alt="Product"
              fill
              style={{ 
                objectFit: "contain",
                filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.2))"
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

const RopeSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const products = [
    "/assets/bananafry/BananaFry_.png",
    "/assets/greenchilly/Green Chilly_Front-Photoroom.png",
    "/assets/slicedcoconut/Sliced Coconut_Front-Photoroom.png"
  ];

  const triangleColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#FFD93D",
    "#FF9F45",
    "#96CEB4",
    "#FFEEAD"
  ];

  // Create base decorations
  const baseDecorations = Array(8).fill(null).map((_, index) => {
    const type: DecorationType = index % 2 === 0 ? 'triangle' : 'product';
    return {
      type,
      color: triangleColors[index % triangleColors.length],
      productSrc: products[Math.floor(index / 2) % products.length]
    };
  });

  // Create multiple sets for seamless looping
  const decorations = [...baseDecorations, ...baseDecorations, ...baseDecorations];

  return (
    <section className="relative min-h-screen w-full max-w-full overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100">
      {/* Clouds - Responsive */}
      <div className="absolute inset-0 z-0">
        {/* Left Cloud - Responsive */}
        <div className="absolute top-12 sm:top-16 md:top-20 left-1/4 animate-float">
          <div className="relative w-20 h-8 sm:w-24 sm:h-10 md:w-32 md:h-12 bg-white rounded-[100px]">
            <div className="absolute bottom-0 left-3 sm:left-4 md:left-6 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white rounded-full" />
            <div className="absolute bottom-0 left-6 sm:left-8 md:left-12 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white rounded-full" />
            <div className="absolute bottom-0 right-3 sm:right-4 md:right-6 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white rounded-full" />
          </div>
        </div>
        
        {/* Right Cloud with Logo - Responsive */}
        <div className="absolute top-24 sm:top-32 md:top-40 right-1/4 sm:right-1/3 animate-float-delayed">
          <div className="relative w-40 h-16 sm:w-52 sm:h-20 md:w-64 md:h-24 bg-white rounded-[100px]">
            {/* Cloud parts */}
            <div className="absolute bottom-0 left-6 sm:left-8 md:left-12 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 bg-white rounded-full" />
            <div className="absolute bottom-0 left-12 sm:left-16 md:left-24 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white rounded-full" />
            <div className="absolute bottom-0 right-6 sm:right-8 md:right-12 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 bg-white rounded-full" />
            
            {/* Logo - Responsive */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-14 sm:w-28 sm:h-16 md:w-38 md:h-22">
              <Image
                src="/assets/Gud Friday_Logo_Primary-06.png"
                alt="Good Friday Logo"
                fill
                style={{ 
                  objectFit: "contain",
                  filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))"
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rope and Decorations Container */}
      <div className="absolute top-1/3 left-0 w-full overflow-hidden">
        <div className="relative w-full overflow-hidden">
          {/* The Rope */}
          <div className="absolute top-0 left-[-5%] w-[110%]">
            <motion.div
              animate={{ y: [0, 40, 0] }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0
              }}
            >
              <div 
                className="w-full h-[4px] bg-black"
                style={{
                  transform: "perspective(1000px) rotateX(5deg)",
                  transformOrigin: "center top",
                  borderRadius: "2px"
                }}
              />
            </motion.div>
          </div>

          {/* Decorations Container */}
          <div className="relative overflow-hidden w-full">
            <motion.div
              style={{ 
                display: 'flex',
                width: 'max-content',
                gap: '0px',
                willChange: 'transform'
              }}
              animate={{
                x: [-120, `-${decorations.length * 120}px`]
              }}
              transition={{
                x: {
                  duration: decorations.length * 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 0
                }
              }}
            >
              {decorations.map((item, index) => (
                <Decoration
                  key={index}
                  type={item.type}
                  color={item.color}
                  productSrc={item.productSrc}
                  index={index}
                />
              ))}
              {/* Duplicate first set for seamless loop */}
              {baseDecorations.map((item, index) => (
                <Decoration
                  key={`duplicate-${index}`}
                  type={item.type}
                  color={item.color}
                  productSrc={item.productSrc}
                  index={decorations.length + index}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Add new TraySection component
const TraySection = () => {
  const trays = [
    {
      name: "Banana Roast",
      image: "/assets/trays/Banana Roast Front-Photoroom.png"
    },
    {
      name: "Laddu",
      image: "/assets/trays/Laddu Front-Photoroom.png"
    },
    {
      name: "Mango Pachadi",
      image: "/assets/trays/Mango Pachadi Front-Photoroom.png"
    },
    {
      name: "Potato Curry",
      image: "/assets/trays/Potato Curry Front-Photoroom.png"
    }
  ];

  return (
    <div className="relative w-full max-w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] bg-gradient-to-b from-sky-100 to-sky-200 py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background Clouds - Responsive */}
      <div className="absolute inset-0 z-0 opacity-50 hidden md:block">
        {/* Left floating cloud */}
        <motion.div 
          className="absolute left-[10%] top-[20%]"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-28 h-12 md:w-32 md:h-14 lg:w-40 lg:h-16 bg-white rounded-[100px]">
            <div className="absolute bottom-0 left-6 md:left-7 lg:left-8 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white rounded-full" />
            <div className="absolute bottom-0 left-12 md:left-13 lg:left-16 w-18 h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-full" />
            <div className="absolute bottom-0 right-6 md:right-7 lg:right-8 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white rounded-full" />
          </div>
        </motion.div>

        {/* Right floating cloud */}
        <motion.div 
          className="absolute right-[15%] top-[60%]"
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="relative w-24 h-10 md:w-28 md:h-11 lg:w-32 lg:h-12 bg-white rounded-[100px]">
            <div className="absolute bottom-0 left-4 md:left-5 lg:left-6 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-full" />
            <div className="absolute bottom-0 left-8 md:left-10 lg:left-12 w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-white rounded-full" />
            <div className="absolute bottom-0 right-4 md:right-5 lg:right-6 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-full" />
          </div>
        </motion.div>

        {/* Center small cloud */}
        <motion.div 
          className="absolute left-[50%] top-[40%]"
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="relative w-20 h-8 md:w-22 md:h-9 lg:w-24 lg:h-10 bg-white rounded-[100px]">
            <div className="absolute bottom-0 left-3 md:left-3.5 lg:left-4 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white rounded-full" />
            <div className="absolute bottom-0 left-6 md:left-7 lg:left-8 w-14 h-14 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-white rounded-full" />
            <div className="absolute bottom-0 right-3 md:right-3.5 lg:right-4 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Content - Responsive */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 lg:mb-16 text-gray-800"
        >
          Our Special Trays
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {trays.map((tray, index) => (
            <motion.div
              key={tray.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] w-full backdrop-blur-sm bg-white/30 rounded-xl md:rounded-2xl shadow-lg overflow-hidden group-hover:shadow-xl transition-all duration-300 border border-white/50">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center p-3 sm:p-4 md:p-5 lg:p-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={tray.image}
                    alt={tray.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              >
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-center mt-2 md:mt-3 lg:mt-4 text-gray-800">{tray.name}</h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Modify the main component to include both sections
const AllSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <RopeSection />
      <TraySection />
    </>
  );
};

export default AllSection;
