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
  
  // Initial states - Phase A starting point
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
  
  // ========== PHASE A: 0-15% — Locked state ==========
  // Locked text visible, key underneath and dim
  // Key: scale 1.00, y 0
  
  masterTL.to(scrollIndicator, {
    opacity: 0,
    y: 10,
    duration: 0.15,
    ease: "power1.out"
  }, 0);
  
  // Subtle background shift
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[1],
    duration: 0.15
  }, 0);
  
  // ========== PHASE B: 15-35% — Knockaway #1 ==========
  // Locked text fades up/out, key rises to push it away
  // Key: scale 1.00 → 1.08, y 0 → -120
  // Text: opacity 1 → 0, y 0 → -80
  
  masterTL.to(heroTextLocked, {
    opacity: 0,
    y: -80,
    duration: 0.2,
    ease: "power1.inOut"
  }, 0.15);
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[2],
    duration: 0.2
  }, 0.15);
  
  masterTL.to(keyContainer, {
    y: -120,
    duration: 0.2,
    ease: "power1.inOut"
  }, 0.15);
  
  masterTL.to(keyImage, {
    filter: 'brightness(0.5) saturate(0.4)',
    scale: 1.08,
    duration: 0.2,
    ease: "power1.inOut"
  }, 0.15);
  
  masterTL.to(keyGlow, {
    opacity: 0.1,
    scale: 0.85,
    duration: 0.2
  }, 0.2);
  
  masterTL.to(keyShadow, {
    opacity: 0.35,
    duration: 0.2
  }, 0.2);
  
  // Far fragments start appearing
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR * 0.3,
      duration: 0.15
    }, 0.25 + (i * 0.002));
  });
  
  // ========== PHASE C: 35-55% — Solo build (NO TEXT) ==========
  // Key continues slow climb + slow growth
  // Key: scale 1.08 → 1.16, y -120 → -180
  // Glow builds gradually
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[3],
    duration: 0.2
  }, 0.35);
  
  masterTL.to(keyContainer, {
    y: -180,
    duration: 0.2,
    ease: "sine.inOut"
  }, 0.35);
  
  masterTL.to(keyImage, {
    filter: 'brightness(0.7) saturate(0.6)',
    scale: 1.16,
    duration: 0.2,
    ease: "sine.inOut"
  }, 0.35);
  
  masterTL.to(keyGlow, {
    opacity: 0.3,
    scale: 0.95,
    duration: 0.2
  }, 0.35);
  
  masterTL.to(keyGlowOuter, {
    opacity: 0.15,
    scale: 0.8,
    duration: 0.2
  }, 0.4);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.3,
    duration: 0.2
  }, 0.4);
  
  masterTL.to(keyShadow, {
    opacity: 0.4,
    scale: 1.05,
    duration: 0.2
  }, 0.4);
  
  // More fragments
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR * 0.7,
      duration: 0.15
    }, 0.4 + (i * 0.002));
  });
  
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID * 0.4,
      duration: 0.15
    }, 0.45 + (i * 0.002));
  });
  
  // ========== PHASE D: 55-72% — Unlocked text appears below ==========
  // Key stays high, unlocked text fades in below
  // Key: scale 1.16 → 1.22, y -180 → -170 (tiny drift)
  // Text: opacity 0 → 1, y +30 → 0
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[5],
    duration: 0.17
  }, 0.55);
  
  // Nav background appears
  masterTL.to(nav, {
    onStart: () => nav.classList.add('scrolled'),
    onReverseComplete: () => nav.classList.remove('scrolled'),
    duration: 0.01
  }, 0.55);
  
  masterTL.to(keyContainer, {
    y: -170,
    duration: 0.17,
    ease: "sine.inOut"
  }, 0.55);
  
  masterTL.to(keyImage, {
    filter: 'brightness(0.9) saturate(0.85)',
    scale: 1.22,
    duration: 0.17,
    ease: "sine.inOut"
  }, 0.55);
  
  masterTL.to(keyGlow, {
    opacity: 0.5,
    scale: 1,
    duration: 0.17
  }, 0.55);
  
  masterTL.to(keyGlowOuter, {
    opacity: 0.3,
    scale: 0.9,
    duration: 0.17
  }, 0.58);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.6,
    duration: 0.17
  }, 0.55);
  
  // Unlocked text fades in below key
  masterTL.to(heroTextUnlocked, {
    opacity: 1,
    y: 0,
    duration: 0.17,
    ease: "power1.out"
  }, 0.58);
  
  // More fragments
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR,
      duration: 0.12
    }, 0.6 + (i * 0.001));
  });
  
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID * 0.7,
      duration: 0.12
    }, 0.62 + (i * 0.001));
  });
  
  // ========== PHASE E: 72-92% — Knockaway #2 ==========
  // Key grows and returns down, pushing unlocked text out
  // Key: scale 1.22 → 1.34, y -170 → -40
  // Unlocked text: opacity 1 → 0, y 0 → +80
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[6],
    duration: 0.2
  }, 0.72);
  
  masterTL.to(keyContainer, {
    y: -40,
    duration: 0.2,
    ease: "power1.inOut"
  }, 0.72);
  
  masterTL.to(keyImage, {
    filter: 'brightness(1.1) saturate(1.1)',
    scale: 1.34,
    duration: 0.2,
    ease: "power1.inOut"
  }, 0.72);
  
  masterTL.to(keyGlow, {
    opacity: CONFIG.GLOW_INNER_MAX * 0.9,
    scale: 1.1,
    duration: 0.2
  }, 0.72);
  
  masterTL.to(keyGlowOuter, {
    opacity: CONFIG.GLOW_OUTER_MAX * 0.8,
    scale: 0.95,
    duration: 0.2
  }, 0.75);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.85,
    duration: 0.2
  }, 0.72);
  
  // Unlocked text pushed down and out
  masterTL.to(heroTextUnlocked, {
    opacity: 0,
    y: 80,
    duration: 0.2,
    ease: "power1.inOut"
  }, 0.72);
  
  masterTL.to(keyShadow, {
    opacity: 0.5,
    scale: 1.15,
    duration: 0.2
  }, 0.75);
  
  // More fragments
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID,
      duration: 0.15
    }, 0.78 + (i * 0.001));
  });
  
  fragsNear.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_NEAR * 0.7,
      duration: 0.15
    }, 0.8 + (i * 0.001));
  });
  
  // ========== PHASE F: 92-100% — Settle / hero end ==========
  // Key ends centered and dominant, no text
  // Key: scale 1.34 → 1.38, y -40 → -20
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[7],
    duration: 0.08
  }, 0.92);
  
  masterTL.to(keyContainer, {
    y: -20,
    duration: 0.08,
    ease: "power1.out"
  }, 0.92);
  
  masterTL.to(keyImage, {
    filter: 'brightness(1.15) saturate(1.2)',
    scale: 1.38,
    duration: 0.08,
    ease: "power1.out"
  }, 0.92);
  
  masterTL.to(keyGlow, {
    opacity: CONFIG.GLOW_INNER_MAX,
    scale: 1.15,
    duration: 0.08
  }, 0.92);
  
  masterTL.to(keyGlowOuter, {
    opacity: CONFIG.GLOW_OUTER_MAX,
    scale: 1,
    duration: 0.08
  }, 0.94);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX,
    duration: 0.08
  }, 0.92);
  
  masterTL.to(envVignette, {
    opacity: 0,
    duration: 0.08
  }, 0.94);
  
  masterTL.to(keyShadow, {
    opacity: 0.55,
    scale: 1.2,
    duration: 0.08
  }, 0.92);
  
  // Final fragments
  fragsNear.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_NEAR,
      duration: 0.08
    }, 0.94 + (i * 0.001));
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
