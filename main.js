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
  
  // Initial states (0-10%)
  gsap.set(heroTextLocked, { opacity: 1, y: 0 });
  gsap.set(heroTextUnlocked, { opacity: 0, y: 40 });
  gsap.set(keyImage, { scale: 1 });
  gsap.set(keyContainer, { y: 0 });
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
  
  // ========== 0-10%: Scroll indicator fades ==========
  masterTL.to(scrollIndicator, {
    opacity: 0,
    y: 10,
    duration: 0.1
  }, 0);
  
  // ========== PHASE 1: 10-30% — Key knocks locked text out of frame ==========
  
  // Locked text gets pushed up and out
  masterTL.to(heroTextLocked, {
    opacity: 0,
    y: -120,
    duration: 0.2,
    ease: "power2.out"
  }, 0.1);
  
  // Background shifts
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[2],
    duration: 0.2
  }, 0.1);
  
  // Key moves up aggressively to clear space
  masterTL.to(keyContainer, {
    y: -80,
    duration: 0.2,
    ease: "power2.out"
  }, 0.1);
  
  // Key scales and brightens
  masterTL.to(keyImage, {
    filter: 'brightness(0.55) saturate(0.45)',
    scale: 1.1,
    duration: 0.2,
    ease: "power1.inOut"
  }, 0.1);
  
  // Glow starts
  masterTL.to(keyGlow, {
    opacity: 0.15,
    scale: 0.85,
    duration: 0.2
  }, 0.15);
  
  // Far fragments begin
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR * 0.4,
      duration: 0.15
    }, 0.2 + (i * 0.002));
  });
  
  // ========== PHASE 2: 30-60% — Dominance (NO TEXT) ==========
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[4],
    duration: 0.3
  }, 0.3);
  
  // Key continues rising, creates empty pocket below
  masterTL.to(keyContainer, {
    y: -120,
    duration: 0.3,
    ease: "power1.inOut"
  }, 0.3);
  
  // Key scales up
  masterTL.to(keyImage, {
    filter: 'brightness(0.8) saturate(0.7)',
    scale: 1.25,
    duration: 0.3,
    ease: "power1.inOut"
  }, 0.3);
  
  // Glow ramps up
  masterTL.to(keyGlow, {
    opacity: 0.45,
    scale: 1,
    duration: 0.3
  }, 0.3);
  
  masterTL.to(keyGlowOuter, {
    opacity: 0.25,
    scale: 0.85,
    duration: 0.3
  }, 0.35);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.4,
    duration: 0.3
  }, 0.35);
  
  masterTL.to(keyShadow, {
    opacity: 0.4,
    scale: 1.1,
    duration: 0.3
  }, 0.35);
  
  // More fragments
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR,
      duration: 0.2
    }, 0.4 + (i * 0.002));
  });
  
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID * 0.5,
      duration: 0.2
    }, 0.45 + (i * 0.002));
  });
  
  // ========== PHASE 3: 60-80% — Unlocked text enters below key ==========
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[6],
    duration: 0.2
  }, 0.6);
  
  // Nav background appears
  masterTL.to(nav, {
    onStart: () => nav.classList.add('scrolled'),
    onReverseComplete: () => nav.classList.remove('scrolled'),
    duration: 0.01
  }, 0.6);
  
  // Key stays high, still dominant
  masterTL.to(keyContainer, {
    y: -120,
    duration: 0.2
  }, 0.6);
  
  // Key continues to grow
  masterTL.to(keyImage, {
    filter: 'brightness(1.0) saturate(1.0)',
    scale: 1.35,
    duration: 0.2,
    ease: "power1.inOut"
  }, 0.6);
  
  // Glow peaks
  masterTL.to(keyGlow, {
    opacity: CONFIG.GLOW_INNER_MAX,
    scale: 1.1,
    duration: 0.2
  }, 0.6);
  
  masterTL.to(keyGlowOuter, {
    opacity: CONFIG.GLOW_OUTER_MAX * 0.8,
    scale: 0.95,
    duration: 0.2
  }, 0.65);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.8,
    duration: 0.2
  }, 0.6);
  
  // Unlocked text fades in BELOW the key
  masterTL.to(heroTextUnlocked, {
    opacity: 1,
    y: 0,
    duration: 0.2,
    ease: "power1.out"
  }, 0.65);
  
  // More fragments
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID,
      duration: 0.15
    }, 0.65 + (i * 0.002));
  });
  
  fragsNear.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_NEAR * 0.7,
      duration: 0.15
    }, 0.7 + (i * 0.002));
  });
  
  // ========== PHASE 4: 80-100% — Key knocks unlocked text away, settles as hero ==========
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[7],
    duration: 0.2
  }, 0.8);
  
  // Unlocked text fades down and out
  masterTL.to(heroTextUnlocked, {
    opacity: 0,
    y: 80,
    duration: 0.2,
    ease: "power2.in"
  }, 0.8);
  
  // Key moves back toward center, settles as hero object
  masterTL.to(keyContainer, {
    y: -40,
    duration: 0.2,
    ease: "power1.inOut"
  }, 0.8);
  
  // Key reaches final scale
  masterTL.to(keyImage, {
    filter: 'brightness(1.15) saturate(1.2)',
    scale: 1.4,
    duration: 0.2,
    ease: "power1.out"
  }, 0.8);
  
  // Final glow state
  masterTL.to(keyGlow, {
    opacity: CONFIG.GLOW_INNER_MAX,
    scale: 1.15,
    duration: 0.2
  }, 0.8);
  
  masterTL.to(keyGlowOuter, {
    opacity: CONFIG.GLOW_OUTER_MAX,
    scale: 1,
    duration: 0.2
  }, 0.85);
  
  masterTL.to(keyShadow, {
    opacity: 0.55,
    scale: 1.2,
    duration: 0.2
  }, 0.8);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX,
    duration: 0.2
  }, 0.8);
  
  masterTL.to(envVignette, {
    opacity: 0,
    duration: 0.15
  }, 0.85);
  
  // All fragments at full
  fragsNear.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_NEAR,
      duration: 0.15
    }, 0.85 + (i * 0.002));
  });
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
