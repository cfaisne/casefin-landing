/* ========================================
   I34 - Hero Swap + Pinned Steps + Key Unlock
======================================== */

const HERO_COLORS = [
  '#181818',
  '#1a1a1a',
  '#1c1c1c',
  '#1e1e1e',
  '#202020',
  '#222222',
  '#242424',
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
  
  // Initial states - key already visible and important
  gsap.set(heroTextLocked, { opacity: 1, y: 0 });
  gsap.set(heroTextUnlocked, { opacity: 0, y: 50 });
  gsap.set(keyImage, { scale: 1 });
  gsap.set(envAmbient, { opacity: 0 });
  gsap.set(keyGlow, { opacity: 0, scale: 0.8 });
  gsap.set(keyGlowOuter, { opacity: 0, scale: 0.6 });
  gsap.set(keyShadow, { opacity: 0.3 });
  gsap.set(allFrags, { opacity: 0 });
  
  const masterTL = gsap.timeline({
    scrollTrigger: {
      trigger: unlockSection,
      start: 'top top',
      end: 'bottom bottom',
      scrub: CONFIG.SCRUB_SMOOTHNESS
    }
  });
  
  // ========== PHASE 1: Text begins fading, key brightens (0 - 0.3) ==========
  
  masterTL.to(scrollIndicator, {
    opacity: 0,
    y: 10,
    duration: 0.1
  }, 0);
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[3],
    duration: 0.3
  }, 0);
  
  // Headline fades upward and out
  masterTL.to(heroTextLocked, {
    opacity: 0,
    y: -80,
    duration: 0.3
  }, 0.05);
  
  // Key starts brightening
  masterTL.to(keyImage, {
    filter: 'brightness(0.6) saturate(0.5)',
    scale: 1.1,
    duration: 0.3
  }, 0.05);
  
  // Key moves slightly upward
  masterTL.to(keyContainer, {
    y: -40,
    duration: 0.3
  }, 0.05);
  
  // Glow begins
  masterTL.to(keyGlow, {
    opacity: 0.2,
    scale: 0.9,
    duration: 0.3
  }, 0.1);
  
  // Far fragments start appearing
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR * 0.5,
      duration: 0.25
    }, 0.15 + (i * 0.003));
  });
  
  // ========== PHASE 2: Key takes center stage (0.3 - 0.6) ==========
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[5],
    duration: 0.3
  }, 0.3);
  
  masterTL.to(keyImage, {
    filter: 'brightness(0.85) saturate(0.8)',
    scale: 1.25,
    duration: 0.3
  }, 0.3);
  
  masterTL.to(keyContainer, {
    y: -80,
    duration: 0.3
  }, 0.3);
  
  masterTL.to(keyGlow, {
    opacity: 0.5,
    scale: 1,
    duration: 0.3
  }, 0.3);
  
  masterTL.to(keyGlowOuter, {
    opacity: 0.25,
    scale: 0.85,
    duration: 0.3
  }, 0.35);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.5,
    duration: 0.3
  }, 0.3);
  
  // More fragments
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR,
      duration: 0.25
    }, 0.35 + (i * 0.002));
  });
  
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID * 0.6,
      duration: 0.25
    }, 0.4 + (i * 0.003));
  });
  
  // ========== PHASE 3: Full unlock - key is sole focal element (0.6 - 0.85) ==========
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[7],
    duration: 0.25
  }, 0.6);
  
  // Nav background appears
  masterTL.to(nav, {
    onStart: () => nav.classList.add('scrolled'),
    onReverseComplete: () => nav.classList.remove('scrolled'),
    duration: 0.01
  }, 0.6);
  
  // Key reaches full emphasis
  masterTL.to(keyImage, {
    filter: 'brightness(1.15) saturate(1.2)',
    scale: 1.4,
    duration: 0.25
  }, 0.6);
  
  masterTL.to(keyContainer, {
    y: -100,
    duration: 0.25
  }, 0.6);
  
  masterTL.to(keyGlow, {
    opacity: CONFIG.GLOW_INNER_MAX,
    scale: 1.15,
    duration: 0.25
  }, 0.6);
  
  masterTL.to(keyGlowOuter, {
    opacity: CONFIG.GLOW_OUTER_MAX,
    scale: 1,
    duration: 0.25
  }, 0.65);
  
  masterTL.to(keyShadow, {
    opacity: 0.5,
    scale: 1.2,
    duration: 0.25
  }, 0.6);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX,
    duration: 0.25
  }, 0.6);
  
  masterTL.to(envVignette, {
    opacity: 0,
    duration: 0.2
  }, 0.65);
  
  // All fragments visible
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID,
      duration: 0.2
    }, 0.65 + (i * 0.002));
  });
  
  fragsNear.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_NEAR,
      duration: 0.2
    }, 0.7 + (i * 0.003));
  });
  
  // ========== PHASE 4: Settle, then unlocked text appears (0.85 - 1.0) ==========
  
  // Unlocked text fades in only after key has fully resolved
  masterTL.to(heroTextUnlocked, {
    opacity: 1,
    y: 0,
    duration: 0.15
  }, 0.88);
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
