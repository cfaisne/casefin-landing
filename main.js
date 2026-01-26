/* ========================================
   I32 - GSAP Solid Color Animation
   
   Hero: #2A2423 → #453D3C (8 stops)
   Post-hero: #453D3C hold → #2A2423 (11 stops)
   No CSS gradients - all GSAP interpolated
======================================== */

const HERO_COLORS = [
  '#2A2423', // start (locked)
  '#2F2928',
  '#332C2B',
  '#37302E',
  '#3B3331',
  '#3F3735',
  '#423A39',
  '#453D3C'  // end (unlocked/brightest)
];

const POST_HERO_COLORS = [
  '#453D3C', // hold
  '#453D3C', // hold longer
  '#433B3A',
  '#403837',
  '#3D3534',
  '#3A3231',
  '#372F2E',
  '#332C2B',
  '#2F2928',
  '#2C2625',
  '#2A2423'  // end (matches nav)
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
  BEAT_1: 0,
  BEAT_2: 0.15,
  BEAT_3: 0.4,
  BEAT_4: 0.65,
  BEAT_5: 0.85,
};

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initHeroUnlock();
  initPostHeroGradient();
  initContentAnimations();
});

function initHeroUnlock() {
  const unlockSection = document.querySelector('.unlock-section');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const unlockText = document.querySelector('.unlock-text');
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
  gsap.set(unlockText, { opacity: 0, y: 40 });
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
      anticipatePin: 1
    }
  });
  
  // BEAT 1: Clean Start - color 0→1
  masterTL.to(scrollIndicator, {
    opacity: 0,
    y: 10,
    duration: 0.1
  }, CONFIG.BEAT_1);
  
  masterTL.to(unlockSection, {
    backgroundColor: HERO_COLORS[1], // #2F2928
    duration: 0.15
  }, CONFIG.BEAT_1);
  
  masterTL.to(key, {
    filter: 'brightness(0.43) saturate(0.28)',
    scale: 1.01,
    duration: 0.15
  }, CONFIG.BEAT_1 + 0.05);
  
  // BEAT 2: Awakening - colors 2→3
  masterTL.to(unlockSection, {
    backgroundColor: HERO_COLORS[2], // #332C2B
    duration: 0.12
  }, CONFIG.BEAT_2);
  
  masterTL.to(unlockSection, {
    backgroundColor: HERO_COLORS[3], // #37302E
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
  
  // BEAT 3: Building - colors 4→5
  masterTL.to(unlockSection, {
    backgroundColor: HERO_COLORS[4], // #3B3331
    duration: 0.12
  }, CONFIG.BEAT_3);
  
  masterTL.to(unlockSection, {
    backgroundColor: HERO_COLORS[5], // #3F3735
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
  
  // BEAT 4: Full Unlock - colors 6→7 (brightest)
  masterTL.to(unlockSection, {
    backgroundColor: HERO_COLORS[6], // #423A39
    duration: 0.1
  }, CONFIG.BEAT_4);
  
  masterTL.to(unlockSection, {
    backgroundColor: HERO_COLORS[7], // #453D3C (brightest)
    duration: 0.1
  }, CONFIG.BEAT_4 + 0.1);
  
  // Fade vignette to 0 at unlock for clean edge
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
  
  // BEAT 5: Text Appears
  masterTL.to(keyContainer, {
    y: -50,
    duration: 0.15
  }, CONFIG.BEAT_5);
  
  masterTL.to(unlockText, {
    opacity: 1,
    y: 0,
    duration: 0.15
  }, CONFIG.BEAT_5 + 0.05);
}

/* ========================================
   Post-Hero Gradient Animation
   GSAP animates background-color through stops
======================================== */
function initPostHeroGradient() {
  const postHero = document.querySelector('.post-hero-gradient');
  
  // Create timeline for post-hero color animation
  const postHeroTL = gsap.timeline({
    scrollTrigger: {
      trigger: postHero,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1
    }
  });
  
  // Animate through each color stop
  // First two are holds at brightest
  const totalStops = POST_HERO_COLORS.length;
  const durationPerStop = 1 / (totalStops - 1);
  
  POST_HERO_COLORS.forEach((color, i) => {
    if (i === 0) return; // Skip first, it's the starting state
    postHeroTL.to(postHero, {
      backgroundColor: color,
      duration: durationPerStop,
      ease: 'none'
    });
  });
}

function initContentAnimations() {
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
      sectionTL.to(heading, { opacity: 1, y: 0, duration: 0.7 }, 0);
    }
    
    if (paragraph) {
      gsap.set(paragraph, { opacity: 0, y: 20 });
      sectionTL.to(paragraph, { opacity: 1, y: 0, duration: 0.7 }, 0.1);
    }
    
    if (cards.length) {
      gsap.set(cards, { opacity: 0, y: 40 });
      sectionTL.to(cards, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }, 0.2);
    }
    
    if (steps.length) {
      gsap.set(steps, { opacity: 0, y: 40 });
      sectionTL.to(steps, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, 0.2);
    }
  });
}
