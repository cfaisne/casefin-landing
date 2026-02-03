/* ========================================
   I34 - Hero Swap + Pinned Steps + Key Unlock
======================================== */

const HERO_COLORS = [
  '#181818',
  '#1c1c1c',
  '#1f1f1f',
  '#212121',
  '#232323',
  '#252525',
  '#282828',
  '#262626'
];

const CONFIG = {
  SCROLL_DURATION: '+=350%',
  SCRUB_SMOOTHNESS: 1.2,
  GLOW_INNER_MAX: 0.6,
  GLOW_OUTER_MAX: 0.4,
  AMBIENT_MAX: 0.5,
  FRAG_OPACITY_FAR: 0.5,
  FRAG_OPACITY_MID: 0.7,
  FRAG_OPACITY_NEAR: 0.85,
  // Timeline beats
  BEAT_1: 0,
  BEAT_2: 0.15,
  BEAT_3: 0.4,
  BEAT_4: 0.65,
  BEAT_5: 0.85,
  // Hero text swap timing
  TEXT_FADE_START: 0.5,
  TEXT_FADE_END: 0.75,
};

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initHeroUnlock();
  initHowItWorks();
});

/* ========================================
   Hero Unlock Animation + Text Swap
======================================== */
function initHeroUnlock() {
  const unlockSection = document.querySelector('.unlock-section');
  const unlockSticky = document.querySelector('.unlock-sticky');
  const nav = document.querySelector('.nav');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const heroTextLocked = document.querySelector('.hero-text-locked');
  const heroTextUnlocked = document.querySelector('.hero-text-unlocked');
  const heroTextContainer = document.querySelector('.hero-text-container');
  const envVignette = document.querySelector('.env-vignette');
  const envAmbient = document.querySelector('.env-ambient');
  const keyContainer = document.querySelector('.key-container');
  const keyImage = document.querySelector('.key-image');
  const keyGlow = document.querySelector('.key-glow');
  const keyGlowOuter = document.querySelector('.key-glow-outer');
  const keyShadow = document.querySelector('.key-shadow');
  
  const fragsFar = document.querySelectorAll('.data-fragment[data-depth="far"]');
  const fragsMid = document.querySelectorAll('.data-fragment[data-depth="mid"]');
  const fragsNear = document.querySelectorAll('.data-fragment[data-depth="near"]');
  const allFrags = document.querySelectorAll('.data-fragment');
  
  // Initial states
  // Text: visible, positioned for reading
  // Key: below text area, smaller, muted
  gsap.set(heroTextLocked, { opacity: 1, y: 0 });
  gsap.set(heroTextUnlocked, { opacity: 0, y: 60 });
  gsap.set(heroTextContainer, { y: -80 }); // Text starts higher
  gsap.set(keyContainer, { y: 100 }); // Key starts lower
  gsap.set(keyImage, { scale: 0.85 }); // Key starts smaller
  gsap.set(envAmbient, { opacity: 0 });
  gsap.set(keyGlow, { opacity: 0, scale: 0.8 });
  gsap.set(keyGlowOuter, { opacity: 0, scale: 0.6 });
  gsap.set(keyShadow, { opacity: 0.2 });
  gsap.set(allFrags, { opacity: 0 });
  
  const masterTL = gsap.timeline({
    scrollTrigger: {
      trigger: unlockSection,
      start: 'top top',
      end: 'bottom bottom',
      scrub: CONFIG.SCRUB_SMOOTHNESS
    }
  });
  
  // ========== PHASE 1: Text fades up, key begins rising ==========
  masterTL.to(scrollIndicator, {
    opacity: 0,
    y: 10,
    duration: 0.1
  }, 0);
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[2],
    duration: 0.2
  }, 0);
  
  // Text fades up and out
  masterTL.to(heroTextLocked, {
    opacity: 0,
    y: -60,
    duration: 0.3
  }, 0.05);
  
  masterTL.to(heroTextContainer, {
    y: -200,
    duration: 0.4
  }, 0.05);
  
  // Key rises into vacated space
  masterTL.to(keyContainer, {
    y: 0,
    duration: 0.4
  }, 0.1);
  
  // Key begins to brighten
  masterTL.to(keyImage, {
    filter: 'brightness(0.55) saturate(0.45)',
    scale: 0.95,
    duration: 0.3
  }, 0.1);
  
  // Fragments start appearing (far layer)
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR * 0.5,
      duration: 0.25
    }, 0.15 + (i * 0.003));
  });
  
  // ========== PHASE 2: Key takes center stage ==========
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[4],
    duration: 0.2
  }, 0.35);
  
  masterTL.to(keyImage, {
    filter: 'brightness(0.8) saturate(0.75)',
    scale: 1.05,
    duration: 0.25
  }, 0.35);
  
  masterTL.to(keyGlow, {
    opacity: 0.25,
    scale: 0.9,
    duration: 0.25
  }, 0.35);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.4,
    duration: 0.25
  }, 0.35);
  
  // Mid fragments
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR,
      duration: 0.2
    }, 0.4 + (i * 0.002));
  });
  
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID * 0.6,
      duration: 0.2
    }, 0.4 + (i * 0.003));
  });
  
  // ========== PHASE 3: Full unlock - key dominant ==========
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[7],
    duration: 0.2
  }, 0.6);
  
  masterTL.to(nav, {
    onStart: () => nav.classList.add('scrolled'),
    onReverseComplete: () => nav.classList.remove('scrolled'),
    duration: 0.01
  }, 0.6);
  
  // Key reaches full size and brightness
  masterTL.to(keyImage, {
    filter: 'brightness(1.1) saturate(1.2)',
    scale: 1.25,
    duration: 0.25
  }, 0.6);
  
  masterTL.to(keyGlow, {
    opacity: CONFIG.GLOW_INNER_MAX,
    scale: 1.1,
    duration: 0.25
  }, 0.6);
  
  masterTL.to(keyGlowOuter, {
    opacity: CONFIG.GLOW_OUTER_MAX,
    scale: 1,
    duration: 0.25
  }, 0.65);
  
  masterTL.to(keyShadow, {
    opacity: 0.5,
    scale: 1.1,
    duration: 0.2
  }, 0.6);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX,
    duration: 0.2
  }, 0.6);
  
  masterTL.to(envVignette, {
    opacity: 0,
    duration: 0.2
  }, 0.65);
  
  // Supporting text fades in below key
  masterTL.to(heroTextUnlocked, {
    opacity: 1,
    y: 0,
    duration: 0.2
  }, 0.75);
  
  // All fragments fully visible
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID,
      duration: 0.15
    }, 0.65 + (i * 0.002));
  });
  
  fragsNear.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_NEAR,
      duration: 0.15
    }, 0.7 + (i * 0.003));
  });
  
  // ========== BEAT 5: Settle ==========
  masterTL.to(keyImage, {
    filter: 'brightness(1.15) saturate(1.25)',
    duration: 0.1
  }, 0.85);
}

/* ========================================
   How It Works - Pinned with Step Focus
======================================== */
function initHowItWorks() {
  const section = document.querySelector('.how-it-works-section');
  const steps = document.querySelectorAll('.step');
  const totalSteps = steps.length;
  
  // Set first step as active initially
  steps[0].classList.add('active');
  
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      // Map scroll progress to step index
      const progress = self.progress;
      // Divide progress into segments for each step
      const stepIndex = Math.min(
        Math.floor(progress * totalSteps),
        totalSteps - 1
      );
      
      // Update active state
      steps.forEach((step, i) => {
        if (i === stepIndex) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    }
  });
}
