/* ========================================
   CaseFin - Scroll-Driven Unlock Interaction
   GSAP + ScrollTrigger
======================================== */

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  initUnlockSequence();
});

function initUnlockSequence() {
  // Elements
  const unlockSection = document.querySelector('.unlock-section');
  const key = document.querySelector('.key');
  const keyBow = document.querySelector('.key-bow');
  const keyGlow = document.querySelector('.key-glow');
  const unlockText = document.querySelector('.unlock-text');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  // UI Elements by depth
  const elementsDepth1 = document.querySelectorAll('.ui-element[data-depth="1"]');
  const elementsDepth2 = document.querySelectorAll('.ui-element[data-depth="2"]');
  const elementsDepth3 = document.querySelectorAll('.ui-element[data-depth="3"]');
  const accents = document.querySelectorAll('.ui-accent');
  
  // Create the master timeline
  const masterTL = gsap.timeline({
    scrollTrigger: {
      trigger: unlockSection,
      start: 'top top',
      end: '+=200%', // 2x viewport height of scroll distance
      pin: true,
      scrub: 1, // Smooth scrubbing
      anticipatePin: 1,
      onUpdate: (self) => {
        // Optional: track progress for debugging
        // console.log('Progress:', self.progress);
      },
      onLeave: () => {
        // Ensure final state is set when leaving
        gsap.set(unlockText, { opacity: 1, y: 0 });
      }
    }
  });
  
  // ========================================
  // Phase 1: Locked → Transitioning (0% - 40%)
  // Key begins to wake up, elements start organizing
  // ========================================
  
  // Fade out scroll indicator immediately
  masterTL.to(scrollIndicator, {
    opacity: 0,
    duration: 0.1
  }, 0);
  
  // Key initial transformation - subtle awakening
  masterTL.to(key, {
    scale: 1.05,
    duration: 0.4
  }, 0);
  
  // Key bow starts warming up (color shift begins)
  masterTL.to(keyBow, {
    background: 'linear-gradient(145deg, #a08050 0%, #806540 50%, #5a4a38 100%)',
    boxShadow: `
      inset 0 2px 4px rgba(255, 255, 255, 0.15),
      inset 0 -2px 4px rgba(0, 0, 0, 0.3),
      0 4px 30px rgba(201, 162, 39, 0.2)
    `,
    duration: 0.4
  }, 0);
  
  // Depth 3 elements (far) - start becoming less chaotic
  elementsDepth3.forEach((el, i) => {
    const offsetX = (i % 2 === 0) ? -30 : 30;
    const offsetY = (i % 3 === 0) ? -20 : 20;
    
    masterTL.to(el, {
      filter: 'blur(5px)',
      opacity: 0.4,
      x: offsetX,
      y: offsetY,
      rotation: el.style.transform ? parseFloat(el.style.transform.match(/-?\d+/)?.[0] || 0) * 0.7 : 0,
      duration: 0.4
    }, 0);
  });
  
  // Depth 2 elements - start organizing
  elementsDepth2.forEach((el, i) => {
    const offsetX = (i % 2 === 0) ? -20 : 20;
    const offsetY = (i % 3 === 0) ? -15 : 15;
    
    masterTL.to(el, {
      filter: 'blur(2px)',
      opacity: 0.5,
      x: offsetX,
      y: offsetY,
      rotation: '+=3',
      duration: 0.4
    }, 0.05);
  });
  
  // Depth 1 elements - most responsive
  elementsDepth1.forEach((el, i) => {
    const offsetX = (i % 2 === 0) ? -15 : 15;
    const offsetY = (i % 3 === 0) ? -10 : 10;
    
    masterTL.to(el, {
      filter: 'blur(1px)',
      opacity: 0.6,
      x: offsetX,
      y: offsetY,
      rotation: '+=2',
      duration: 0.4
    }, 0.1);
  });
  
  // Accents start gaining color
  masterTL.to(accents, {
    opacity: 0.5,
    background: 'rgba(201, 162, 39, 0.2)',
    duration: 0.4
  }, 0.1);
  
  // ========================================
  // Phase 2: Transitioning → Almost Unlocked (40% - 70%)
  // Key transforms dramatically, elements organize
  // ========================================
  
  // Key major transformation
  masterTL.to(key, {
    scale: 1.1,
    rotateY: 5,
    rotateZ: 2,
    duration: 0.3
  }, 0.4);
  
  // Key bow goes golden
  masterTL.to(keyBow, {
    background: 'linear-gradient(145deg, #c9a227 0%, #a08020 50%, #7a6018 100%)',
    boxShadow: `
      inset 0 2px 6px rgba(255, 255, 255, 0.25),
      inset 0 -2px 4px rgba(0, 0, 0, 0.2),
      0 4px 40px rgba(201, 162, 39, 0.4)
    `,
    borderColor: 'rgba(201, 162, 39, 0.5)',
    duration: 0.3
  }, 0.4);
  
  // Key shaft and bit also transform
  masterTL.to('.key-shaft', {
    background: 'linear-gradient(90deg, #a08020 0%, #c9a227 30%, #e8d48b 50%, #c9a227 70%, #a08020 100%)',
    duration: 0.3
  }, 0.4);
  
  masterTL.to('.key-bit', {
    background: 'linear-gradient(90deg, #a08020 0%, #c9a227 30%, #e8d48b 50%, #c9a227 70%, #a08020 100%)',
    duration: 0.3
  }, 0.4);
  
  // Glow begins appearing
  masterTL.to(keyGlow, {
    opacity: 0.6,
    scale: 1.2,
    duration: 0.3
  }, 0.4);
  
  // Depth 3 - more organized, clearer
  elementsDepth3.forEach((el, i) => {
    masterTL.to(el, {
      filter: 'blur(3px)',
      opacity: 0.5,
      x: 0,
      y: 0,
      rotation: (i % 2 === 0) ? -3 : 3,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      duration: 0.3
    }, 0.4);
  });
  
  // Depth 2 - getting crisp
  elementsDepth2.forEach((el, i) => {
    masterTL.to(el, {
      filter: 'blur(1px)',
      opacity: 0.6,
      x: 0,
      y: 0,
      rotation: (i % 2 === 0) ? -2 : 2,
      borderColor: 'rgba(255, 255, 255, 0.12)',
      background: 'rgba(255, 255, 255, 0.05)',
      duration: 0.3
    }, 0.45);
  });
  
  // Depth 1 - almost clear
  elementsDepth1.forEach((el, i) => {
    masterTL.to(el, {
      filter: 'blur(0px)',
      opacity: 0.7,
      x: 0,
      y: 0,
      rotation: (i % 2 === 0) ? -1 : 1,
      borderColor: 'rgba(255, 255, 255, 0.15)',
      background: 'rgba(255, 255, 255, 0.06)',
      duration: 0.3
    }, 0.5);
  });
  
  // Accents brighten
  masterTL.to(accents, {
    opacity: 0.7,
    background: 'rgba(201, 162, 39, 0.35)',
    scale: 1.1,
    duration: 0.3
  }, 0.45);
  
  // ========================================
  // Phase 3: Unlocked State (70% - 100%)
  // Key fully illuminated, elements crisp, text appears
  // ========================================
  
  // Key final state - bright and powerful
  masterTL.to(key, {
    scale: 1.15,
    rotateY: 0,
    rotateZ: 0,
    duration: 0.3
  }, 0.7);
  
  // Key bow final golden state
  masterTL.to(keyBow, {
    background: 'linear-gradient(145deg, #e8d48b 0%, #c9a227 50%, #a08020 100%)',
    boxShadow: `
      inset 0 2px 8px rgba(255, 255, 255, 0.4),
      inset 0 -2px 4px rgba(0, 0, 0, 0.15),
      0 0 60px rgba(201, 162, 39, 0.6),
      0 0 100px rgba(201, 162, 39, 0.3)
    `,
    borderColor: 'rgba(232, 212, 139, 0.6)',
    duration: 0.3
  }, 0.7);
  
  // Scale pans brighten
  masterTL.to('.scale-left, .scale-right', {
    background: 'linear-gradient(to bottom, #e8d48b 0%, #c9a227 100%)',
    duration: 0.3
  }, 0.7);
  
  // Full glow
  masterTL.to(keyGlow, {
    opacity: 1,
    scale: 1.5,
    duration: 0.3
  }, 0.7);
  
  // All UI elements reach final organized state
  elementsDepth3.forEach((el) => {
    masterTL.to(el, {
      filter: 'blur(2px)',
      opacity: 0.55,
      rotation: 0,
      borderColor: 'rgba(201, 162, 39, 0.1)',
      duration: 0.3
    }, 0.7);
  });
  
  elementsDepth2.forEach((el) => {
    masterTL.to(el, {
      filter: 'blur(0px)',
      opacity: 0.65,
      rotation: 0,
      borderColor: 'rgba(201, 162, 39, 0.15)',
      background: 'rgba(255, 255, 255, 0.06)',
      duration: 0.3
    }, 0.72);
  });
  
  elementsDepth1.forEach((el) => {
    masterTL.to(el, {
      filter: 'blur(0px)',
      opacity: 0.75,
      rotation: 0,
      borderColor: 'rgba(201, 162, 39, 0.2)',
      background: 'rgba(255, 255, 255, 0.08)',
      duration: 0.3
    }, 0.74);
  });
  
  // Accents final state
  masterTL.to(accents, {
    opacity: 0.85,
    background: 'rgba(201, 162, 39, 0.5)',
    scale: 1,
    duration: 0.3
  }, 0.75);
  
  // Key moves up slightly to make room for text
  masterTL.to('.key-container', {
    y: -60,
    duration: 0.3
  }, 0.8);
  
  // Text fades in
  masterTL.to(unlockText, {
    opacity: 1,
    y: 0,
    duration: 0.2
  }, 0.85);
  
  // Set initial state for unlock text
  gsap.set(unlockText, {
    opacity: 0,
    y: 30
  });
  
  // ========================================
  // Post-unlock content animations
  // These trigger as you scroll past the pinned section
  // ========================================
  
  // Animate content sections as they enter viewport
  const contentSections = document.querySelectorAll('.content-section');
  
  contentSections.forEach((section) => {
    const heading = section.querySelector('h2');
    const paragraph = section.querySelector('.section-inner > p');
    const cards = section.querySelectorAll('.card');
    const steps = section.querySelectorAll('.step');
    
    // Create a timeline for each section
    const sectionTL = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    });
    
    if (heading) {
      gsap.set(heading, { opacity: 0, y: 30 });
      sectionTL.to(heading, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, 0);
    }
    
    if (paragraph) {
      gsap.set(paragraph, { opacity: 0, y: 20 });
      sectionTL.to(paragraph, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, 0.1);
    }
    
    if (cards.length) {
      gsap.set(cards, { opacity: 0, y: 30 });
      sectionTL.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      }, 0.2);
    }
    
    if (steps.length) {
      gsap.set(steps, { opacity: 0, y: 30 });
      sectionTL.to(steps, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      }, 0.2);
    }
  });
}
