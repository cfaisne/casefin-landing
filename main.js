/* ========================================
   I34 - Hero Swap + Pinned Steps + Key Unlock
======================================== */

const HERO_COLORS = [
  '#2A2423',
  '#2F2928',
  '#332C2B',
  '#37302E',
  '#3B3331',
  '#3F3735',
  '#423A39',
  '#453D3C'
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
  initRefreshHandlers();
});

/* ========================================
   ScrollTrigger Refresh Handlers
   Prevents horizontal nudge on zoom/resize
======================================== */
function initRefreshHandlers() {
  // Debounced resize refresh
  let resizeTO;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTO);
    resizeTO = setTimeout(() => ScrollTrigger.refresh(), 150);
  });
  
  // Clear stale inline widths before refresh
  ScrollTrigger.addEventListener('refreshInit', () => {
    gsap.set('.unlock-section', { clearProps: 'width,maxWidth,left,right' });
  });
}

/* ========================================
   Hero Unlock Animation + Text Swap
======================================== */
function initHeroUnlock() {
  const unlockSection = document.querySelector('.unlock-section');
  const nav = document.querySelector('.nav');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const heroTextLocked = document.querySelector('.hero-text-locked');
  const heroTextUnlocked = document.querySelector('.hero-text-unlocked');
  const envVignette = document.querySelector('.env-vignette');
  const envAmbient = document.querySelector('.env-ambient');
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
  
  const fragsFar = document.querySelectorAll('.data-fragment[data-depth="far"]');
  const fragsMid = document.querySelectorAll('.data-fragment[data-depth="mid"]');
  const fragsNear = document.querySelectorAll('.data-fragment[data-depth="near"]');
  const allFrags = document.querySelectorAll('.data-fragment');
  
  // Initial states
  gsap.set(heroTextLocked, { opacity: 1, y: 0 });
  gsap.set(heroTextUnlocked, { opacity: 0, y: 30 });
  gsap.set(envAmbient, { opacity: 0 });
  gsap.set(keyGlow, { opacity: 0, scale: 0.8 });
  gsap.set(keyGlowOuter, { opacity: 0, scale: 0.6 });
  gsap.set(keyShadow, { opacity: 0.2 });
  gsap.set(allFrags, { opacity: 0 });
  
  const masterTL = gsap.timeline({
    scrollTrigger: {
      trigger: unlockSection,
      start: 'top top',
      end: CONFIG.SCROLL_DURATION,
      pin: true,
      scrub: CONFIG.SCRUB_SMOOTHNESS,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });
  
  // ========== BEAT 1: Clean Start ==========
  masterTL.to(scrollIndicator, {
    opacity: 0,
    y: 10,
    duration: 0.1
  }, CONFIG.BEAT_1);
  
  masterTL.to(unlockSection, {
    backgroundColor: HERO_COLORS[1],
    duration: 0.15
  }, CONFIG.BEAT_1);
  
  masterTL.to(key, {
    filter: 'brightness(0.43) saturate(0.28)',
    scale: 1.01,
    duration: 0.15
  }, CONFIG.BEAT_1 + 0.05);
  
  // ========== BEAT 2: Awakening ==========
  masterTL.to(unlockSection, {
    backgroundColor: HERO_COLORS[2],
    duration: 0.12
  }, CONFIG.BEAT_2);
  
  masterTL.to(unlockSection, {
    backgroundColor: HERO_COLORS[3],
    duration: 0.13
  }, CONFIG.BEAT_2 + 0.12);
  
  masterTL.to(envVignette, {
    opacity: 0.4,
    duration: 0.25
  }, CONFIG.BEAT_2);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.2,
    duration: 0.25
  }, CONFIG.BEAT_2);
  
  masterTL.to(key, {
    filter: 'brightness(0.5) saturate(0.4)',
    scale: 1.03,
    duration: 0.25
  }, CONFIG.BEAT_2);
  
  masterTL.to(keyBow, {
    background: 'linear-gradient(155deg, #4a4035 0%, #3a332c 40%, #2a2520 70%, #1a1815 100%)',
    boxShadow: `inset 0 3px 6px rgba(255,255,255,0.04), inset 0 -4px 8px rgba(0,0,0,0.5), 0 8px 35px rgba(0,0,0,0.6), 0 0 20px rgba(201,162,39,0.08)`,
    duration: 0.25
  }, CONFIG.BEAT_2);
  
  masterTL.to(keyGlow, {
    opacity: 0.1,
    scale: 0.85,
    duration: 0.25
  }, CONFIG.BEAT_2);
  
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR * 0.4,
      duration: 0.25
    }, CONFIG.BEAT_2 + (i * 0.004));
  });
  
  // ========== BEAT 3: Building ==========
  masterTL.to(unlockSection, {
    backgroundColor: HERO_COLORS[4],
    duration: 0.12
  }, CONFIG.BEAT_3);
  
  masterTL.to(unlockSection, {
    backgroundColor: HERO_COLORS[5],
    duration: 0.13
  }, CONFIG.BEAT_3 + 0.12);
  
  masterTL.to(envVignette, {
    opacity: 0.3,
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX * 0.5,
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  masterTL.to(key, {
    filter: 'brightness(0.75) saturate(0.8)',
    scale: 1.06,
    rotateY: 3,
    rotateZ: 1,
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  masterTL.to(keyBow, {
    background: 'linear-gradient(155deg, #a08030 0%, #8a6a25 40%, #6a5018 70%, #4a3a12 100%)',
    boxShadow: `inset 0 4px 10px rgba(255,255,255,0.12), inset 0 -4px 8px rgba(0,0,0,0.3), 0 8px 45px rgba(0,0,0,0.4), 0 0 40px rgba(201,162,39,0.25)`,
    borderColor: 'rgba(201, 162, 39, 0.25)',
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  masterTL.to(keyShaft, {
    background: 'linear-gradient(90deg, #6a5018 0%, #8a6a25 20%, #a08030 50%, #8a6a25 80%, #6a5018 100%)',
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  masterTL.to(keyBit, {
    background: 'linear-gradient(90deg, #6a5018 0%, #8a6a25 20%, #a08030 50%, #8a6a25 80%, #6a5018 100%)',
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  masterTL.to([scaleLeft, scaleRight], {
    background: 'linear-gradient(to bottom, #a08030 0%, #8a6a25 100%)',
    duration: 0.25
  }, CONFIG.BEAT_3);
  
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
  
  masterTL.to(keyShadow, {
    opacity: 0.45,
    scale: 1.1,
    duration: 0.25
  }, CONFIG.BEAT_3);
  
  fragsFar.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_FAR,
      duration: 0.25
    }, CONFIG.BEAT_3 + (i * 0.003));
  });
  
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID * 0.6,
      duration: 0.25
    }, CONFIG.BEAT_3 + (i * 0.005));
  });
  
  // ========== HERO TEXT SWAP (during BEAT_3 to BEAT_4) ==========
  masterTL.to(heroTextLocked, {
    opacity: 0,
    y: -20,
    duration: 0.2
  }, CONFIG.TEXT_FADE_START);
  
  masterTL.to(heroTextUnlocked, {
    opacity: 1,
    y: 0,
    duration: 0.2
  }, CONFIG.TEXT_FADE_END);
  
  // ========== BEAT 4: Full Unlock ==========
  masterTL.to(unlockSection, {
    backgroundColor: HERO_COLORS[6],
    duration: 0.1
  }, CONFIG.BEAT_4);
  
  masterTL.to(unlockSection, {
    backgroundColor: HERO_COLORS[7],
    duration: 0.1
  }, CONFIG.BEAT_4 + 0.1);
  
  // Nav background appears at unlock
  masterTL.to(nav, {
    onStart: () => nav.classList.add('scrolled'),
    onReverseComplete: () => nav.classList.remove('scrolled'),
    duration: 0.01
  }, CONFIG.BEAT_4);
  
  // Fade vignette to 0 for clean edge
  masterTL.to(envVignette, {
    opacity: 0,
    duration: 0.2
  }, CONFIG.BEAT_4);
  
  masterTL.to(envAmbient, {
    opacity: CONFIG.AMBIENT_MAX,
    duration: 0.2
  }, CONFIG.BEAT_4);
  
  masterTL.to(key, {
    filter: 'brightness(1.15) saturate(1.25)',
    scale: 1.1,
    rotateY: 0,
    rotateZ: 0,
    duration: 0.2
  }, CONFIG.BEAT_4);
  
  masterTL.to(keyBow, {
    background: 'linear-gradient(155deg, #e8d48b 0%, #c9a227 35%, #a08020 65%, #806818 100%)',
    boxShadow: `inset 0 4px 12px rgba(255,255,255,0.28), inset 0 -4px 8px rgba(0,0,0,0.15), 0 0 70px rgba(201,162,39,0.45), 0 0 100px rgba(201,162,39,0.2), 0 8px 50px rgba(0,0,0,0.25)`,
    borderColor: 'rgba(232, 212, 139, 0.4)',
    duration: 0.2
  }, CONFIG.BEAT_4);
  
  masterTL.to(keyShaft, {
    background: 'linear-gradient(90deg, #a08020 0%, #c9a227 25%, #e8d48b 50%, #c9a227 75%, #a08020 100%)',
    boxShadow: `inset 4px 0 8px rgba(255,255,255,0.12), inset -4px 0 8px rgba(0,0,0,0.18), 5px 0 18px rgba(0,0,0,0.25)`,
    duration: 0.2
  }, CONFIG.BEAT_4);
  
  masterTL.to(keyBit, {
    background: 'linear-gradient(90deg, #a08020 0%, #c9a227 25%, #e8d48b 50%, #c9a227 75%, #a08020 100%)',
    boxShadow: `inset 4px 0 8px rgba(255,255,255,0.12), inset -4px 0 8px rgba(0,0,0,0.18), 0 6px 20px rgba(0,0,0,0.35)`,
    duration: 0.2
  }, CONFIG.BEAT_4);
  
  masterTL.to([scaleLeft, scaleRight], {
    background: 'linear-gradient(to bottom, #e8d48b 0%, #c9a227 100%)',
    duration: 0.2
  }, CONFIG.BEAT_4);
  
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
  
  masterTL.to(keyShadow, {
    opacity: 0.55,
    scale: 1.15,
    duration: 0.2
  }, CONFIG.BEAT_4);
  
  fragsMid.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_MID,
      duration: 0.2
    }, CONFIG.BEAT_4 + (i * 0.003));
  });
  
  fragsNear.forEach((frag, i) => {
    masterTL.to(frag, {
      opacity: CONFIG.FRAG_OPACITY_NEAR,
      duration: 0.2
    }, CONFIG.BEAT_4 + (i * 0.006));
  });
  
  // ========== BEAT 5: Key lifts ==========
  masterTL.to(keyContainer, {
    y: -60,
    duration: 0.15
  }, CONFIG.BEAT_5);
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
