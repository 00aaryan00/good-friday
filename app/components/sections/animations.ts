import { gsap } from 'gsap';
import * as THREE from 'three';

export const animateHeroContent = () => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo(
    '#hero-content',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1 }
  );

  return tl;
};

export const animateOnScroll = (camera: THREE.Camera) => {
  gsap.to(camera.position, {
    scrollTrigger: {
      trigger: 'canvas',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
      },
    },
    y: 3,
    z: 4,
    duration: 1,
  });
}; 