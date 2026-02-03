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
  
  // Initial states
  gsap.set(heroTextLocked, { opacity: 1, y: 0 });
  gsap.set(heroTextUnlocked, { opacity: 0, y: 30 });
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
      scrub: 1.2
    }
  });
  
  // ========== A · 0-10% — Locked state ==========
  // Key: scale 1.00, y 0
  // Text: Locked fully visible
  
  masterTL.to(scrollIndicator, {
    opacity: 0,
    y: 10,
    duration: 0.1,
    ease: "power1.out"
  }, 0);
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[1],
    duration: 0.1
  }, 0);
  
  // ========== B · 10-35% — Locked text exits, key rises (EXTENDED, SYNCED) ==========
  // Key: y 0 → -250, scale 1.00 → 1.08
  // Text: Locked fades out + drifts up (y 0 → -90)
  // BOTH move at same pace over 25% of scroll
  
  masterTL.to(heroTextLocked, {
    opacity: 0,
    y: -90,
    duration: 0.25,
    ease: "power1.inOut"
  }, 0.10);
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[2],
    duration: 0.25
  }, 0.10);
  
  // Key rises in sync with text fade
  masterTL.to(keyContainer, {
    y: -250,
    duration: 0.25,
    ease: "power1.inOut"
  }, 0.10);
  
  masterTL.to(keyImage, {
    filter: 'brightness(0.5) saturate(0.4)',
    scale: 1.08,
    duration: 0.25,
    ease: "power1.inOut"
  }, 0.10);
  
  masterTL.to(keyGlow, {
    opacity: 0.1,
    scale: 0.85,
    duration: 0.25
  }, 0.15);
  
  masterTL.to(keyShadow, {
    opacity: 0.35,
    duration: 0.25
  }, 0.15);
  
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR * 0.3,
      duration: 0.2
    }, 0.25 + (i * 0.002));
  });
  
  // ========== C · 35-58% — Key solo, very slow growth ==========
  // Key: y -250 (HOLD), scale 1.08 → 1.18
  // Text: none
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[3],
    duration: 0.23
  }, 0.35);
  
  // Key HOLDS at -250
  masterTL.to(keyContainer, {
    y: -250,
    duration: 0.23,
    ease: "sine.inOut"
  }, 0.35);
  
  masterTL.to(keyImage, {
    filter: 'brightness(0.7) saturate(0.6)',
    scale: 1.18,
    duration: 0.23,
    ease: "sine.inOut"
  }, 0.35);
  
  masterTL.to(keyGlow, {
    opacity: 0.3,
    scale: 0.95,
    duration: 0.23
  }, 0.35);
  
  masterTL.to(keyGlowOuter, {
    opacity: 0.15,
    scale: 0.82,
    duration: 0.23
  }, 0.40);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.3,
    duration: 0.23
  }, 0.40);
  
  masterTL.to(keyShadow, {
    opacity: 0.4,
    scale: 1.05,
    duration: 0.23
  }, 0.42);
  
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR * 0.7,
      duration: 0.18
    }, 0.42 + (i * 0.002));
  });
  
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID * 0.4,
      duration: 0.18
    }, 0.48 + (i * 0.002));
  });
  
  // ========== D · 58-75% — Unlocked text fades in, key stays fixed ==========
  // Key: y -250 (LOCKED), scale 1.18 (HOLD), brightness/glow ramps
  // Text: Unlocked headline fades in below
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[4],
    duration: 0.17
  }, 0.58);
  
  // Nav background appears
  masterTL.to(nav, {
    onStart: () => nav.classList.add('scrolled'),
    onReverseComplete: () => nav.classList.remove('scrolled'),
    duration: 0.01
  }, 0.58);
  
  // Key stays LOCKED at -250, scale HOLDS at 1.18
  masterTL.to(keyContainer, {
    y: -250,
    duration: 0.17,
    ease: "sine.inOut"
  }, 0.58);
  
  masterTL.to(keyImage, {
    filter: 'brightness(0.85) saturate(0.8)',
    scale: 1.18,
    duration: 0.17,
    ease: "sine.inOut"
  }, 0.58);
  
  masterTL.to(keyGlow, {
    opacity: 0.45,
    scale: 1,
    duration: 0.17
  }, 0.58);
  
  masterTL.to(keyGlowOuter, {
    opacity: 0.25,
    scale: 0.88,
    duration: 0.17
  }, 0.62);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.5,
    duration: 0.17
  }, 0.58);
  
  // Unlocked text fades in below key
  masterTL.to(heroTextUnlocked, {
    opacity: 1,
    y: 0,
    duration: 0.17,
    ease: "power1.out"
  }, 0.60);
  
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR * 0.9,
      duration: 0.12
    }, 0.62 + (i * 0.001));
  });
  
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID * 0.65,
      duration: 0.12
    }, 0.65 + (i * 0.001));
  });
  
  // ========== E · 75-88% — Extra "read second" (EXTENDED) ==========
  // Key: y -250 (STILL LOCKED), scale 1.18 (STILL HOLD), brightness continues
  // Text: Unlocked headline fully readable (no movement)
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[5],
    duration: 0.13
  }, 0.75);
  
  // Key STILL at -250, scale STILL at 1.18
  masterTL.to(keyContainer, {
    y: -250,
    duration: 0.13,
    ease: "sine.inOut"
  }, 0.75);
  
  masterTL.to(keyImage, {
    filter: 'brightness(0.95) saturate(0.95)',
    scale: 1.18,
    duration: 0.13,
    ease: "sine.inOut"
  }, 0.75);
  
  masterTL.to(keyGlow, {
    opacity: 0.55,
    scale: 1.05,
    duration: 0.13
  }, 0.75);
  
  masterTL.to(keyGlowOuter, {
    opacity: 0.32,
    scale: 0.92,
    duration: 0.13
  }, 0.78);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.65,
    duration: 0.13
  }, 0.75);
  
  masterTL.to(keyShadow, {
    opacity: 0.45,
    scale: 1.1,
    duration: 0.13
  }, 0.78);
  
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID * 0.8,
      duration: 0.1
    }, 0.78 + (i * 0.001));
  });
  
  fragsNear.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_NEAR * 0.5,
      duration: 0.1
    }, 0.82 + (i * 0.001));
  });
  
  // ========== F · 88-100% — Knockaway #2 (EXTENDED, SYNCED) ==========
  // Key: y -250 → -95, scale 1.18 → 1.45
  // Text: Unlocked pushed down + out (y 0 → +80, opacity to 0)
  // BOTH move at same pace over 12% of scroll
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[7],
    duration: 0.12
  }, 0.88);
  
  // Key drops to centered position - synced with text
  masterTL.to(keyContainer, {
    y: -95,
    duration: 0.12,
    ease: "power1.inOut"
  }, 0.88);
  
  // Key reaches final scale
  masterTL.to(keyImage, {
    filter: 'brightness(1.15) saturate(1.2)',
    scale: 1.45,
    duration: 0.12,
    ease: "power1.inOut"
  }, 0.88);
  
  // Unlocked text pushed down and out - synced with key drop
  masterTL.to(heroTextUnlocked, {
    opacity: 0,
    y: 80,
    duration: 0.12,
    ease: "power1.inOut"
  }, 0.88);
  
  masterTL.to(keyGlow, {
    opacity: CONFIG.GLOW_INNER_MAX,
    scale: 1.15,
    duration: 0.12
  }, 0.88);
  
  masterTL.to(keyGlowOuter, {
    opacity: CONFIG.GLOW_OUTER_MAX,
    scale: 1,
    duration: 0.12
  }, 0.90);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX,
    duration: 0.12
  }, 0.88);
  
  masterTL.to(envVignette, {
    opacity: 0,
    duration: 0.1
  }, 0.92);
  
  masterTL.to(keyShadow, {
    opacity: 0.55,
    scale: 1.2,
    duration: 0.12
  }, 0.88);
  
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID,
      duration: 0.1
    }, 0.90 + (i * 0.001));
  });
  
  fragsNear.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_NEAR,
      duration: 0.1
    }, 0.92 + (i * 0.001));
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
