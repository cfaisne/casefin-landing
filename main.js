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
  SCROLL_DURATION: '+=350%',  // ~5-6 seconds on trackpad
  
  // Scrub smoothness (higher = smoother but laggier)
  SCRUB_SMOOTHNESS: 1.2,
  
  // Environment
  VIGNETTE_LOCKED: 0.9,      
  VIGNETTE_UNLOCKED: 0.15,    
  
  // Key
  KEY_BRIGHTNESS_LOCKED: 0.35,
  KEY_BRIGHTNESS_UNLOCKED: 1.15,
  KEY_SATURATION_LOCKED: 0.2,
  KEY_SATURATION_UNLOCKED: 1.25,
  
  // Gold glow intensity
  GLOW_INNER_MAX: 0.8,
  GLOW_OUTER_MAX: 0.5,
  AMBIENT_MAX: 0.4,
  
  // UI Fragment blur (when fully visible)
  BLUR_FAR: 4,
  BLUR_MID: 2,
  BLUR_NEAR: 0.5,
  
  // Data fragment opacity targets - visible but not dominant
  FRAG_OPACITY_FAR: 0.6,
  FRAG_OPACITY_MID: 0.75,
  FRAG_OPACITY_NEAR: 0.9,
  
  // Timing breakpoints (0-1 scale)
  BEAT_1: 0,      // Start - clean, just key
  BEAT_2: 0.15,   // UI starts appearing
  BEAT_3: 0.4,    // Key awakens, UI builds
  BEAT_4: 0.65,   // Full transformation
  BEAT_5: 0.85,   // Complete, text appears
  BEAT_END: 1
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
  const fragsFar = document.querySelectorAll('.data-frag[data-depth="far"]');
  const fragsMid = document.querySelectorAll('.data-frag[data-depth="mid"]');
  const fragsNear = document.querySelectorAll('.data-frag[data-depth="near"]');
  const allFrags = document.querySelectorAll('.data-frag');
  
  // ========================================
  // Set Initial States
  // ========================================
  // Nav is always visible - no opacity animation
  gsap.set(unlockText, { opacity: 0, y: 40 });
  gsap.set(envAmbient, { opacity: 0 });
  gsap.set(keyGlow, { opacity: 0, scale: 0.8 });
  gsap.set(keyGlowOuter, { opacity: 0, scale: 0.6 });
  gsap.set(keyShadow, { opacity: 0.2 });
  
  // All fragments start invisible
  gsap.set(allFrags, { opacity: 0 });
  
  // ========================================
  // Nav background on scroll
  // ========================================
  ScrollTrigger.create({
    trigger: unlockSection,
    start: 'top top',
    end: '+=100',
    onUpdate: (self) => {
      if (self.progress > 0.1) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  });
  
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
      anticipatePin: 1
    }
  });
  
  // ========================================
  // BEAT 1: Clean Start (0% - 15%)
  // Just the key, subtle pulse, nothing else
  // ========================================
  
  // Fade out scroll indicator
  masterTL.to(scrollIndicator, {
    opacity: 0,
    y: 10,
    duration: 0.1,
    ease: 'power2.out'
  }, CONFIG.BEAT_1);
  
  // Subtle key pulse - first sign of life
  masterTL.to(key, {
    filter: `brightness(${CONFIG.KEY_BRIGHTNESS_LOCKED + 0.08}) saturate(${CONFIG.KEY_SATURATION_LOCKED + 0.08})`,
    scale: 1.01,
    duration: 0.15,
    ease: 'power1.inOut'
  }, CONFIG.BEAT_1 + 0.05);
  
  // ========================================
  // BEAT 2: UI Emerges (15% - 40%)
  // Fragments start fading in from nothing
  // ========================================
  
  // Vignette starts to relax slightly
  masterTL.to(envVignette, {
    opacity: 0.75,
    duration: 0.25,
    ease: 'power2.out'
  }, CONFIG.BEAT_2);
  
  // Ambient glow starts
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.15,
    duration: 0.25
  }, CONFIG.BEAT_2);
  
  // Key continues warming
  masterTL.to(key, {
    filter: `brightness(0.5) saturate(0.4)`,
    scale: 1.03,
    duration: 0.25,
    ease: 'power2.out'
  }, CONFIG.BEAT_2);
  
  // Key bow starts color shift
  masterTL.to(keyBow, {
    background: 'linear-gradient(155deg, #5a4a3a 0%, #4a3a30 40%, #3a302a 70%, #2a2520 100%)',
    boxShadow: `
      inset 0 3px 6px rgba(255, 255, 255, 0.05),
      inset 0 -4px 8px rgba(0, 0, 0, 0.4),
      0 8px 35px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(201, 162, 39, 0.08)
    `,
    duration: 0.25
  }, CONFIG.BEAT_2);
  
  // Inner glow begins faintly
  masterTL.to(keyGlow, {
    opacity: 0.1,
    scale: 0.85,
    duration: 0.25
  }, CONFIG.BEAT_2);
  
  // FAR fragments fade in first (background)
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR * 0.4,
      duration: 0.25
    }, CONFIG.BEAT_2 + (i * 0.008));
  });
  
  // ========================================
  // BEAT 3: Building (40% - 65%)
  // More UI appears, key transforms
  // ========================================
  
  // Environment opens up
  masterTL.to(envVignette, {
    opacity: 0.5,
    duration: 0.25,
    ease: 'power2.out'
  }, CONFIG.BEAT_3);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.4,
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  // Key transforms significantly
  masterTL.to(key, {
    filter: `brightness(0.75) saturate(0.8)`,
    scale: 1.06,
    rotateY: 3,
    rotateZ: 1,
    duration: 0.25,
    ease: 'power2.out'
  }, CONFIG.BEAT_3);
  
  // Key bow goes golden
  masterTL.to(keyBow, {
    background: 'linear-gradient(155deg, #a08030 0%, #8a6a25 40%, #6a5018 70%, #4a3a12 100%)',
    boxShadow: `
      inset 0 4px 10px rgba(255, 255, 255, 0.12),
      inset 0 -4px 8px rgba(0, 0, 0, 0.3),
      0 8px 45px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(201, 162, 39, 0.25)
    `,
    borderColor: 'rgba(201, 162, 39, 0.25)',
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  // Shaft transforms
  masterTL.to(keyShaft, {
    background: 'linear-gradient(90deg, #6a5018 0%, #8a6a25 20%, #a08030 50%, #8a6a25 80%, #6a5018 100%)',
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  // Bit transforms
  masterTL.to(keyBit, {
    background: 'linear-gradient(90deg, #6a5018 0%, #8a6a25 20%, #a08030 50%, #8a6a25 80%, #6a5018 100%)',
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  // Scales brighten
  masterTL.to([scaleLeft, scaleRight], {
    background: 'linear-gradient(to bottom, #a08030 0%, #8a6a25 100%)',
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  // Glows grow
  masterTL.to(keyGlow, {
    opacity: 0.4,
    scale: 1,
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  masterTL.to(keyGlowOuter, {
    opacity: 0.2,
    scale: 0.8,
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  // Shadow grows
  masterTL.to(keyShadow, {
    opacity: 0.45,
    scale: 1.1,
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  // FAR fragments reach full opacity
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR,
      duration: 0.25
    }, CONFIG.BEAT_3 + (i * 0.005));
  });
  
  // MID fragments fade in
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID * 0.6,
      duration: 0.25
    }, CONFIG.BEAT_3 + (i * 0.006));
  });
  
  // ========================================
  // BEAT 4: Full Transformation (65% - 85%)
  // Everything lit up, UI complete
  // ========================================
  
  // Environment fully open
  masterTL.to(envVignette, {
    opacity: CONFIG.VIGNETTE_UNLOCKED + 0.1,
    duration: 0.2,
    ease: 'power2.out'
  }, CONFIG.BEAT_4);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX,
    duration: 0.2
  }, CONFIG.BEAT_4);
  
  // Key fully golden and bright
  masterTL.to(key, {
    filter: `brightness(${CONFIG.KEY_BRIGHTNESS_UNLOCKED}) saturate(${CONFIG.KEY_SATURATION_UNLOCKED})`,
    scale: 1.1,
    rotateY: 0,
    rotateZ: 0,
    duration: 0.2,
    ease: 'power2.out'
  }, CONFIG.BEAT_4);
  
  // Key bow final golden state
  masterTL.to(keyBow, {
    background: 'linear-gradient(155deg, #e8d48b 0%, #c9a227 35%, #a08020 65%, #806818 100%)',
    boxShadow: `
      inset 0 4px 12px rgba(255, 255, 255, 0.28),
      inset 0 -4px 8px rgba(0, 0, 0, 0.15),
      0 0 70px rgba(201, 162, 39, 0.45),
      0 0 100px rgba(201, 162, 39, 0.2),
      0 8px 50px rgba(0, 0, 0, 0.25)
    `,
    borderColor: 'rgba(232, 212, 139, 0.4)',
    duration: 0.2
  }, CONFIG.BEAT_4);
  
  // Shaft final
  masterTL.to(keyShaft, {
    background: 'linear-gradient(90deg, #a08020 0%, #c9a227 25%, #e8d48b 50%, #c9a227 75%, #a08020 100%)',
    boxShadow: `
      inset 4px 0 8px rgba(255, 255, 255, 0.12),
      inset -4px 0 8px rgba(0, 0, 0, 0.18),
      5px 0 18px rgba(0, 0, 0, 0.25)
    `,
    duration: 0.2
  }, CONFIG.BEAT_4);
  
  // Bit final
  masterTL.to(keyBit, {
    background: 'linear-gradient(90deg, #a08020 0%, #c9a227 25%, #e8d48b 50%, #c9a227 75%, #a08020 100%)',
    boxShadow: `
      inset 4px 0 8px rgba(255, 255, 255, 0.12),
      inset -4px 0 8px rgba(0, 0, 0, 0.18),
      0 6px 20px rgba(0, 0, 0, 0.35)
    `,
    duration: 0.2
  }, CONFIG.BEAT_4);
  
  // Scales final
  masterTL.to([scaleLeft, scaleRight], {
    background: 'linear-gradient(to bottom, #e8d48b 0%, #c9a227 100%)',
    duration: 0.2
  }, CONFIG.BEAT_4);
  
  // Full glow
  masterTL.to(keyGlow, {
    opacity: CONFIG.GLOW_INNER_MAX,
    scale: 1.2,
    duration: 0.2
  }, CONFIG.BEAT_4);
  
  masterTL.to(keyGlowOuter, {
    opacity: CONFIG.GLOW_OUTER_MAX,
    scale: 1,
    duration: 0.2
  }, CONFIG.BEAT_4);
  
  // Shadow full
  masterTL.to(keyShadow, {
    opacity: 0.55,
    scale: 1.15,
    duration: 0.2
  }, CONFIG.BEAT_4);
  
  // MID fragments reach full
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID,
      duration: 0.2
    }, CONFIG.BEAT_4 + (i * 0.004));
  });
  
  // NEAR fragments fade in
  fragsNear.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_NEAR,
      duration: 0.2
    }, CONFIG.BEAT_4 + (i * 0.005));
  });
  
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
