/* ========================================
   CaseFin - Cinematic Unlock Sequence
   GSAP + ScrollTrigger
   
   TUNABLE VARIABLES (adjust these):
   - SCROLL_DURATION: '+=350%' = ~5-6 seconds of scrubbing
   - GOLD_INTENSITY: multiplier for glow opacity
   - BLUR_MAX: maximum blur in locked state
   - GRAIN_LOCKED: grain opacity when locked
======================================== */

// ============ TUNABLE VARIABLES ============
const CONFIG = {
  // Scroll duration (percentage of viewport height)
  // Higher = longer scroll to complete animation
  SCROLL_DURATION: '+=350%',  // ~5-6 seconds on trackpad
  
  // Scrub smoothness (higher = smoother but laggier)
  SCRUB_SMOOTHNESS: 1.2,
  
  // Environment
<<<<<<< HEAD
  VIGNETTE_LOCKED: 1,        // Vignette intensity when locked
  VIGNETTE_UNLOCKED: 0.3,    // Vignette intensity when unlocked
  GRAIN_LOCKED: 0.5,         // Grain opacity when locked
  GRAIN_UNLOCKED: 0.08,      // Grain opacity when unlocked
=======
  VIGNETTE_LOCKED: 0.8,      // Vignette intensity when locked (softer)
  VIGNETTE_UNLOCKED: 0.2,    // Vignette intensity when unlocked
  GRAIN_LOCKED: 0.06,        // Grain opacity when locked (very subtle)
  GRAIN_UNLOCKED: 0.02,      // Grain opacity when unlocked
>>>>>>> parent of 8c96225 (I4)
  
  // Key
  KEY_BRIGHTNESS_LOCKED: 0.35,
  KEY_BRIGHTNESS_UNLOCKED: 1.1,
  KEY_SATURATION_LOCKED: 0.2,
  KEY_SATURATION_UNLOCKED: 1.2,
  
  // Gold glow intensity
<<<<<<< HEAD
  GLOW_INNER_MAX: 0.9,
  GLOW_OUTER_MAX: 0.7,
  AMBIENT_MAX: 0.6,
  
  // UI Fragment blur
  BLUR_FAR_LOCKED: 14,
  BLUR_MID_LOCKED: 9,
  BLUR_NEAR_LOCKED: 5,
=======
  GLOW_INNER_MAX: 0.85,
  GLOW_OUTER_MAX: 0.6,
  AMBIENT_MAX: 0.5,
  
  // UI Fragment blur (locked state)
  BLUR_FAR_LOCKED: 4,
  BLUR_MID_LOCKED: 2,
  BLUR_NEAR_LOCKED: 1,
  
  // UI Fragment opacity targets
  FRAG_OPACITY_FAR_LOCKED: 0.25,
  FRAG_OPACITY_MID_LOCKED: 0.35,
  FRAG_OPACITY_NEAR_LOCKED: 0.45,
  FRAG_OPACITY_FAR_UNLOCKED: 0.55,
  FRAG_OPACITY_MID_UNLOCKED: 0.65,
  FRAG_OPACITY_NEAR_UNLOCKED: 0.75,
>>>>>>> parent of 8c96225 (I4)
  
  // Timing breakpoints (0-1 scale)
  BEAT_1: 0,      // Start - deep locked
  BEAT_2: 0.2,    // First stirring
  BEAT_3: 0.45,   // Awakening
  BEAT_4: 0.7,    // Transformation
  BEAT_5: 0.85,   // Unlocked
  BEAT_END: 1     // Text appears
};

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  initCinematicUnlock();
});

function initCinematicUnlock() {
  
  // ========================================
  // Element References
  // ========================================
  const nav = document.querySelector('.nav');
  const unlockSection = document.querySelector('.unlock-section');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const unlockText = document.querySelector('.unlock-text');
  
  // Environment
  const envVignette = document.querySelector('.env-vignette');
  const envGrain = document.querySelector('.env-grain');
  const envAmbient = document.querySelector('.env-ambient');
  
  // Key elements
  const keyContainer = document.querySelector('.key-container');
  const key = document.querySelector('.key');
  const keyBow = document.querySelector('.key-bow');
  const keyShaft = document.querySelector('.key-shaft');
  const keyBit = document.querySelector('.key-bit');
  const keyGlow = document.querySelector('.key-glow');
  const keyGlowOuter = document.querySelector('.key-glow-outer');
  const keyShadow = document.querySelector('.key-shadow');
  const scaleLeft = document.querySelector('.scale-left');
  const scaleRight = document.querySelector('.scale-right');
  
  // UI Fragments by depth
  const fragsFar = document.querySelectorAll('.ui-fragment[data-depth="far"]');
  const fragsMid = document.querySelectorAll('.ui-fragment[data-depth="mid"]');
  const fragsNear = document.querySelectorAll('.ui-fragment[data-depth="near"]');
  const allFrags = document.querySelectorAll('.ui-fragment');
  
  // ========================================
  // Set Initial States
  // ========================================
  gsap.set(nav, { opacity: 0, y: -12, pointerEvents: 'none' });
  gsap.set(unlockText, { opacity: 0, y: 40 });
  gsap.set(envGrain, { opacity: CONFIG.GRAIN_LOCKED });
  gsap.set(envAmbient, { opacity: 0 });
  gsap.set(keyGlow, { opacity: 0, scale: 0.8 });
  gsap.set(keyGlowOuter, { opacity: 0, scale: 0.6 });
  gsap.set(keyShadow, { opacity: 0.2 });
  
  // ========================================
  // Create Master Timeline
  // ========================================
  const masterTL = gsap.timeline({
    scrollTrigger: {
      trigger: unlockSection,
      start: 'top top',
      end: CONFIG.SCROLL_DURATION,
      pin: true,
      scrub: CONFIG.SCRUB_SMOOTHNESS,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Add 'revealed' class to nav when past 50%
        if (self.progress > 0.5) {
          nav.classList.add('revealed');
        } else {
          nav.classList.remove('revealed');
        }
      }
    }
  });
  
  // ========================================
  // BEAT 1: Locked State (0% - 20%)
  // Everything dormant, first hint of life
  // ========================================
  
  // Fade out scroll indicator
  masterTL.to(scrollIndicator, {
    opacity: 0,
    y: 10,
    duration: 0.15,
    ease: 'power2.out'
  }, CONFIG.BEAT_1);
  
  // Subtle key pulse - first sign of life
  masterTL.to(key, {
    filter: `brightness(${CONFIG.KEY_BRIGHTNESS_LOCKED + 0.1}) saturate(${CONFIG.KEY_SATURATION_LOCKED + 0.1})`,
    scale: 1.02,
    duration: 0.2,
    ease: 'power1.inOut'
  }, CONFIG.BEAT_1 + 0.05);
  
  // Far fragments - barely perceptible movement
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      x: (i % 2 === 0) ? 8 : -8,
      y: (i % 3 === 0) ? 5 : -5,
      opacity: 0.18,
      duration: 0.2
    }, CONFIG.BEAT_1 + 0.02);
  });
  
  // ========================================
  // BEAT 2: First Stirring (20% - 45%)
  // Environment begins to respond
  // ========================================
  
  // Vignette starts to relax
  masterTL.to(envVignette, {
    opacity: 0.85,
    duration: 0.25,
    ease: 'power2.out'
  }, CONFIG.BEAT_2);
  
  // Grain reduces
  masterTL.to(envGrain, {
    opacity: CONFIG.GRAIN_LOCKED * 0.7,
    duration: 0.25
  }, CONFIG.BEAT_2);
  
  // Ambient glow starts appearing
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.2,
    duration: 0.25
  }, CONFIG.BEAT_2);
  
  // Key warms up
  masterTL.to(key, {
    filter: `brightness(0.55) saturate(0.5)`,
    scale: 1.04,
    rotateY: 2,
    rotateZ: 1,
    duration: 0.25,
    ease: 'power2.out'
  }, CONFIG.BEAT_2);
  
  // Key bow color shift begins
  masterTL.to(keyBow, {
    background: 'linear-gradient(155deg, #6a5a45 0%, #5a4a3a 40%, #4a3a2a 70%, #3a302a 100%)',
    boxShadow: `
      inset 0 3px 8px rgba(255, 255, 255, 0.06),
      inset 0 -4px 8px rgba(0, 0, 0, 0.4),
      0 8px 40px rgba(0, 0, 0, 0.6),
      0 0 30px rgba(201, 162, 39, 0.1)
    `,
    duration: 0.25
  }, CONFIG.BEAT_2);
  
  // Inner glow begins
  masterTL.to(keyGlow, {
    opacity: 0.15,
    scale: 0.9,
    duration: 0.25
  }, CONFIG.BEAT_2);
  
  // Mid fragments respond
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      filter: `blur(${CONFIG.BLUR_MID_LOCKED * 0.8}px)`,
      opacity: 0.28,
      x: (i % 2 === 0) ? 12 : -12,
      y: (i % 3 === 0) ? 8 : -8,
      rotation: `+=${(i % 2 === 0) ? 2 : -2}`,
      duration: 0.25
    }, CONFIG.BEAT_2 + 0.03);
  });
  
  // Far fragments - more movement
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      filter: `blur(${CONFIG.BLUR_FAR_LOCKED * 0.85}px)`,
      opacity: 0.22,
      x: (i % 2 === 0) ? 15 : -15,
      rotation: `+=${(i % 2 === 0) ? 3 : -3}`,
      duration: 0.25
    }, CONFIG.BEAT_2 + 0.02);
  });
  
  // Nav starts fading in
  masterTL.to(nav, {
    opacity: 0.3,
    y: -8,
    duration: 0.25,
    ease: 'power2.out'
  }, CONFIG.BEAT_2 + 0.1);
  
  // ========================================
  // BEAT 3: Awakening (45% - 70%)
  // Major transformation, gold emerges
  // ========================================
  
  // Environment brightens significantly
  masterTL.to(envVignette, {
    opacity: 0.6,
    duration: 0.25,
    ease: 'power2.out'
  }, CONFIG.BEAT_3);
  
  masterTL.to(envGrain, {
    opacity: CONFIG.GRAIN_LOCKED * 0.4,
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.5,
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  // Key transforms dramatically
  masterTL.to(key, {
    filter: `brightness(0.8) saturate(0.9)`,
    scale: 1.08,
    rotateY: 4,
    rotateZ: 2,
    duration: 0.25,
    ease: 'power2.out'
  }, CONFIG.BEAT_3);
  
  // Key bow goes golden
  masterTL.to(keyBow, {
    background: 'linear-gradient(155deg, #b8942a 0%, #9a7a22 40%, #7a6018 70%, #5a4a15 100%)',
    boxShadow: `
      inset 0 4px 10px rgba(255, 255, 255, 0.15),
      inset 0 -4px 8px rgba(0, 0, 0, 0.25),
      0 8px 50px rgba(0, 0, 0, 0.4),
      0 0 50px rgba(201, 162, 39, 0.3)
    `,
    borderColor: 'rgba(201, 162, 39, 0.3)',
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  // Shaft transforms
  masterTL.to(keyShaft, {
    background: 'linear-gradient(90deg, #7a6018 0%, #9a7a22 20%, #b8942a 50%, #9a7a22 80%, #7a6018 100%)',
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  // Bit transforms
  masterTL.to(keyBit, {
    background: 'linear-gradient(90deg, #7a6018 0%, #9a7a22 20%, #b8942a 50%, #9a7a22 80%, #7a6018 100%)',
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  // Scales brighten
  masterTL.to([scaleLeft, scaleRight], {
    background: 'linear-gradient(to bottom, #b8942a 0%, #9a7a22 100%)',
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  // Glows intensify
  masterTL.to(keyGlow, {
    opacity: 0.5,
    scale: 1.1,
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  masterTL.to(keyGlowOuter, {
    opacity: 0.25,
    scale: 0.85,
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  // Shadow becomes more defined
  masterTL.to(keyShadow, {
    opacity: 0.5,
    scale: 1.1,
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  // Near fragments respond - becoming clearer
  fragsNear.forEach((frag, i) => {
    masterTL.to(frag, {
      filter: `blur(${CONFIG.BLUR_NEAR_LOCKED * 0.4}px)`,
      opacity: 0.45,
      x: (i % 2 === 0) ? 5 : -5,
      y: (i % 3 === 0) ? 3 : -3,
      rotation: (i % 2 === 0) ? -1 : 1,
      borderColor: 'rgba(201, 162, 39, 0.08)',
      duration: 0.25
    }, CONFIG.BEAT_3 + 0.02);
  });
  
  // Mid fragments organize
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      filter: `blur(${CONFIG.BLUR_MID_LOCKED * 0.5}px)`,
      opacity: 0.38,
      x: (i % 2 === 0) ? 6 : -6,
      rotation: (i % 2 === 0) ? 1 : -1,
      borderColor: 'rgba(201, 162, 39, 0.06)',
      duration: 0.25
    }, CONFIG.BEAT_3 + 0.03);
  });
  
  // Far fragments
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      filter: `blur(${CONFIG.BLUR_FAR_LOCKED * 0.6}px)`,
      opacity: 0.3,
      x: 0,
      rotation: (i % 2 === 0) ? 2 : -2,
      duration: 0.25
    }, CONFIG.BEAT_3 + 0.04);
  });
  
  // Nav more visible
  masterTL.to(nav, {
    opacity: 0.7,
    y: -4,
    pointerEvents: 'auto',
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  // ========================================
  // BEAT 4: Transformation (70% - 85%)
  // Full golden state, environment bright
  // ========================================
  
  // Environment fully transformed
  masterTL.to(envVignette, {
    opacity: CONFIG.VIGNETTE_UNLOCKED + 0.1,
    duration: 0.15,
    ease: 'power2.out'
  }, CONFIG.BEAT_4);
  
  masterTL.to(envGrain, {
    opacity: CONFIG.GRAIN_UNLOCKED + 0.05,
    duration: 0.15
  }, CONFIG.BEAT_4);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX,
    duration: 0.15
  }, CONFIG.BEAT_4);
  
  // Key fully golden and bright
  masterTL.to(key, {
    filter: `brightness(${CONFIG.KEY_BRIGHTNESS_UNLOCKED}) saturate(${CONFIG.KEY_SATURATION_UNLOCKED})`,
    scale: 1.12,
    rotateY: 0,
    rotateZ: 0,
    duration: 0.15,
    ease: 'power2.out'
  }, CONFIG.BEAT_4);
  
  // Key bow final golden state
  masterTL.to(keyBow, {
    background: 'linear-gradient(155deg, #e8d48b 0%, #c9a227 35%, #a08020 65%, #806818 100%)',
    boxShadow: `
      inset 0 4px 12px rgba(255, 255, 255, 0.3),
      inset 0 -4px 8px rgba(0, 0, 0, 0.15),
      0 0 80px rgba(201, 162, 39, 0.5),
      0 0 120px rgba(201, 162, 39, 0.25),
      0 8px 60px rgba(0, 0, 0, 0.3)
    `,
    borderColor: 'rgba(232, 212, 139, 0.5)',
    duration: 0.15
  }, CONFIG.BEAT_4);
  
  // Shaft final
  masterTL.to(keyShaft, {
    background: 'linear-gradient(90deg, #a08020 0%, #c9a227 25%, #e8d48b 50%, #c9a227 75%, #a08020 100%)',
    boxShadow: `
      inset 4px 0 8px rgba(255, 255, 255, 0.15),
      inset -4px 0 8px rgba(0, 0, 0, 0.2),
      6px 0 20px rgba(0, 0, 0, 0.3)
    `,
    duration: 0.15
  }, CONFIG.BEAT_4);
  
  // Bit final
  masterTL.to(keyBit, {
    background: 'linear-gradient(90deg, #a08020 0%, #c9a227 25%, #e8d48b 50%, #c9a227 75%, #a08020 100%)',
    boxShadow: `
      inset 4px 0 8px rgba(255, 255, 255, 0.15),
      inset -4px 0 8px rgba(0, 0, 0, 0.2),
      0 8px 24px rgba(0, 0, 0, 0.4)
    `,
    duration: 0.15
  }, CONFIG.BEAT_4);
  
  // Scales final
  masterTL.to([scaleLeft, scaleRight], {
    background: 'linear-gradient(to bottom, #e8d48b 0%, #c9a227 100%)',
    duration: 0.15
  }, CONFIG.BEAT_4);
  
  // Full glow
  masterTL.to(keyGlow, {
    opacity: CONFIG.GLOW_INNER_MAX,
    scale: 1.3,
    duration: 0.15
  }, CONFIG.BEAT_4);
  
  masterTL.to(keyGlowOuter, {
    opacity: CONFIG.GLOW_OUTER_MAX,
    scale: 1,
    duration: 0.15
  }, CONFIG.BEAT_4);
  
  // Shadow full
  masterTL.to(keyShadow, {
    opacity: 0.6,
    scale: 1.2,
    duration: 0.15
  }, CONFIG.BEAT_4);
  
  // All fragments reach final organized state
  fragsNear.forEach((frag, i) => {
    masterTL.to(frag, {
      filter: 'blur(0px)',
      opacity: 0.65,
      x: 0,
      y: 0,
      rotation: 0,
      borderColor: 'rgba(201, 162, 39, 0.15)',
      background: 'rgba(255, 255, 255, 0.04)',
      duration: 0.15
    }, CONFIG.BEAT_4);
  });
  
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      filter: 'blur(1px)',
      opacity: 0.5,
      x: 0,
      y: 0,
      rotation: 0,
      borderColor: 'rgba(201, 162, 39, 0.1)',
      background: 'rgba(255, 255, 255, 0.03)',
      duration: 0.15
    }, CONFIG.BEAT_4 + 0.02);
  });
  
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      filter: 'blur(3px)',
      opacity: 0.4,
      x: 0,
      y: 0,
      rotation: 0,
      borderColor: 'rgba(201, 162, 39, 0.08)',
      duration: 0.15
    }, CONFIG.BEAT_4 + 0.04);
  });
  
  // Nav fully visible
  masterTL.to(nav, {
    opacity: 1,
    y: 0,
    duration: 0.15
  }, CONFIG.BEAT_4);
  
  // ========================================
  // BEAT 5: Unlocked - Text Appears (85% - 100%)
  // ========================================
  
  // Key moves up slightly
  masterTL.to(keyContainer, {
    y: -50,
    duration: 0.15,
    ease: 'power2.out'
  }, CONFIG.BEAT_5);
  
  // Text fades in
  masterTL.to(unlockText, {
    opacity: 1,
    y: 0,
    duration: 0.15,
    ease: 'power2.out'
  }, CONFIG.BEAT_5 + 0.05);
  
  // Final environment settle
  masterTL.to(envVignette, {
    opacity: CONFIG.VIGNETTE_UNLOCKED,
    duration: 0.15
  }, CONFIG.BEAT_5);
  
  masterTL.to(envGrain, {
    opacity: CONFIG.GRAIN_UNLOCKED,
    duration: 0.15
  }, CONFIG.BEAT_5);
  
  // ========================================
  // Post-Unlock Content Animations
  // ========================================
  
  const contentSections = document.querySelectorAll('.content-section');
  
  contentSections.forEach((section) => {
    const heading = section.querySelector('h2');
    const paragraph = section.querySelector('.section-inner > p');
    const cards = section.querySelectorAll('.card');
    const steps = section.querySelectorAll('.step');
    
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
        duration: 0.7,
        ease: 'power2.out'
      }, 0);
    }
    
    if (paragraph) {
      gsap.set(paragraph, { opacity: 0, y: 20 });
      sectionTL.to(paragraph, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out'
      }, 0.1);
    }
    
    if (cards.length) {
      gsap.set(cards, { opacity: 0, y: 40 });
      sectionTL.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      }, 0.2);
    }
    
    if (steps.length) {
      gsap.set(steps, { opacity: 0, y: 40 });
      sectionTL.to(steps, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out'
      }, 0.2);
    }
  });
}
