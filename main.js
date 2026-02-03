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
      scrub: 1.5
      // NO pin - CSS sticky handles it
    }
  });
  
  // ========== A · 0-10% — Locked state ==========
  masterTL.addLabel("start", 0);
  
  masterTL.to(scrollIndicator, {
    opacity: 0,
    y: 10,
    duration: 0.1,
    ease: "power1.out"
  }, "start");
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[1],
    duration: 0.1
  }, "start");
  
  // ========== B · 10-35% — KNOCKAWAY #1 (synced label) ==========
  masterTL.addLabel("knock1", 0.10);
  
  // Key rises - synced with text
  masterTL.to(keyContainer, {
    y: -250,
    duration: 0.25,
    ease: "power1.inOut"
  }, "knock1");
  
  masterTL.to(keyImage, {
    filter: 'brightness(0.5) saturate(0.4)',
    scale: 1.08,
    duration: 0.25,
    ease: "power1.inOut"
  }, "knock1");
  
  // Locked text exits - LINEAR opacity so it tracks exactly with scroll
  // Text fade completes exactly when key reaches y: -120 (halfway point)
  masterTL.to(heroTextLocked, {
    y: -120,
    duration: 0.25,
    ease: "power1.inOut"
  }, "knock1");
  
  // Opacity fades LINEAR - tied directly to scroll, not eased
  masterTL.to(heroTextLocked, {
    opacity: 0,
    duration: 0.15,
    ease: "none"
  }, "knock1");
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[2],
    duration: 0.25
  }, "knock1");
  
  masterTL.to(keyGlow, {
    opacity: 0.1,
    scale: 0.85,
    duration: 0.25
  }, "knock1+=0.05");
  
  masterTL.to(keyShadow, {
    opacity: 0.35,
    duration: 0.25
  }, "knock1+=0.05");
  
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR * 0.3,
      duration: 0.2
    }, "knock1+=0.15");
  });
  
  // ========== C · 35-58% — Key solo, holds high ==========
  masterTL.addLabel("solo", 0.35);
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[3],
    duration: 0.23
  }, "solo");
  
  masterTL.to(keyContainer, {
    y: -250,
    duration: 0.23,
    ease: "sine.inOut"
  }, "solo");
  
  masterTL.to(keyImage, {
    filter: 'brightness(0.7) saturate(0.6)',
    scale: 1.18,
    duration: 0.23,
    ease: "sine.inOut"
  }, "solo");
  
  masterTL.to(keyGlow, {
    opacity: 0.3,
    scale: 0.95,
    duration: 0.23
  }, "solo");
  
  masterTL.to(keyGlowOuter, {
    opacity: 0.15,
    scale: 0.82,
    duration: 0.23
  }, "solo+=0.05");
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.3,
    duration: 0.23
  }, "solo+=0.05");
  
  masterTL.to(keyShadow, {
    opacity: 0.4,
    scale: 1.05,
    duration: 0.23
  }, "solo+=0.07");
  
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR * 0.7,
      duration: 0.18
    }, "solo+=0.07");
  });
  
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID * 0.4,
      duration: 0.18
    }, "solo+=0.13");
  });
  
  // ========== D · 58-75% — Unlocked text fades in AFTER key holds ==========
  masterTL.addLabel("textIn", 0.58);
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[4],
    duration: 0.17
  }, "textIn");
  
  masterTL.to(nav, {
    onStart: () => nav.classList.add('scrolled'),
    onReverseComplete: () => nav.classList.remove('scrolled'),
    duration: 0.01
  }, "textIn");
  
  // Key stays LOCKED at -250, no movement
  masterTL.to(keyContainer, {
    y: -250,
    duration: 0.17,
    ease: "sine.inOut"
  }, "textIn");
  
  masterTL.to(keyImage, {
    filter: 'brightness(0.85) saturate(0.8)',
    scale: 1.18,
    duration: 0.17,
    ease: "sine.inOut"
  }, "textIn");
  
  masterTL.to(keyGlow, {
    opacity: 0.45,
    scale: 1,
    duration: 0.17
  }, "textIn");
  
  masterTL.to(keyGlowOuter, {
    opacity: 0.25,
    scale: 0.88,
    duration: 0.17
  }, "textIn+=0.04");
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.5,
    duration: 0.17
  }, "textIn");
  
  // Unlocked text fades in ONLY after key has held - delayed start
  // LINEAR opacity so it tracks exactly with scroll
  masterTL.to(heroTextUnlocked, {
    y: 0,
    duration: 0.14,
    ease: "power1.out"
  }, "textIn+=0.06");
  
  masterTL.to(heroTextUnlocked, {
    opacity: 1,
    duration: 0.12,
    ease: "none"
  }, "textIn+=0.06");
  
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR * 0.9,
      duration: 0.12
    }, "textIn+=0.04");
  });
  
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID * 0.65,
      duration: 0.12
    }, "textIn+=0.07");
  });
  
  // ========== E · 75-88% — Read time ==========
  masterTL.addLabel("read", 0.75);
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[5],
    duration: 0.13
  }, "read");
  
  masterTL.to(keyContainer, {
    y: -250,
    duration: 0.13,
    ease: "sine.inOut"
  }, "read");
  
  masterTL.to(keyImage, {
    filter: 'brightness(0.95) saturate(0.95)',
    scale: 1.18,
    duration: 0.13,
    ease: "sine.inOut"
  }, "read");
  
  masterTL.to(keyGlow, {
    opacity: 0.55,
    scale: 1.05,
    duration: 0.13
  }, "read");
  
  masterTL.to(keyGlowOuter, {
    opacity: 0.32,
    scale: 0.92,
    duration: 0.13
  }, "read+=0.03");
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.65,
    duration: 0.13
  }, "read");
  
  masterTL.to(keyShadow, {
    opacity: 0.45,
    scale: 1.1,
    duration: 0.13
  }, "read+=0.03");
  
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID * 0.8,
      duration: 0.1
    }, "read+=0.03");
  });
  
  fragsNear.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_NEAR * 0.5,
      duration: 0.1
    }, "read+=0.07");
  });
  
  // ========== F · 88-100% — KNOCKAWAY #2 (synced label) ==========
  masterTL.addLabel("knock2", 0.88);
  
  masterTL.to(unlockSticky, {
    backgroundColor: HERO_COLORS[7],
    duration: 0.12
  }, "knock2");
  
  // Key drops - synced with text
  masterTL.to(keyContainer, {
    y: -95,
    duration: 0.12,
    ease: "power1.inOut"
  }, "knock2");
  
  masterTL.to(keyImage, {
    filter: 'brightness(1.15) saturate(1.2)',
    scale: 1.45,
    duration: 0.12,
    ease: "power1.inOut"
  }, "knock2");
  
  // Unlocked text pushed down - synced with key drop
  masterTL.to(heroTextUnlocked, {
    y: 80,
    duration: 0.12,
    ease: "power1.inOut"
  }, "knock2");
  
  // Opacity fades LINEAR - tied directly to scroll
  masterTL.to(heroTextUnlocked, {
    opacity: 0,
    duration: 0.10,
    ease: "none"
  }, "knock2");
  
  masterTL.to(keyGlow, {
    opacity: CONFIG.GLOW_INNER_MAX,
    scale: 1.15,
    duration: 0.12
  }, "knock2");
  
  masterTL.to(keyGlowOuter, {
    opacity: CONFIG.GLOW_OUTER_MAX,
    scale: 1,
    duration: 0.12
  }, "knock2+=0.02");
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX,
    duration: 0.12
  }, "knock2");
  
  masterTL.to(envVignette, {
    opacity: 0,
    duration: 0.1
  }, "knock2+=0.04");
  
  masterTL.to(keyShadow, {
    opacity: 0.55,
    scale: 1.2,
    duration: 0.12
  }, "knock2");
  
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID,
      duration: 0.1
    }, "knock2+=0.02");
  });
  
  fragsNear.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_NEAR,
      duration: 0.1
    }, "knock2+=0.04");
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
