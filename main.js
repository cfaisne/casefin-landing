/* ========================================
   CaseFin - Cinematic Scroll Experience
   
   Philosophy: Moving from outside to inside the system.
   The transition is environmental, not decorative.
   
   Behavioral Arc:
   1. Entry (0-15%): Only key visible, dark and dormant
   2. Awareness (15-40%): Subtle depth emerges, UI clouds at low opacity
   3. Structure (40-70%): Headline appears, UI gains intention, nav exists as blur
   4. Access (70-90%): Full clarity, gold sharpens, inside the system
   5. Resolved (90-100%): CTA state, access granted
======================================== */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', init);

function init() {
  
  const hero = document.querySelector('.hero-section');
  const nav = document.querySelector('.nav');
  const scrollPrompt = document.querySelector('.scroll-prompt');
  const heroContent = document.querySelector('.hero-content');
  
  const key = document.querySelector('.key');
  const keyGlow = document.querySelector('.key-glow');
  const keyAmbient = document.querySelector('.key-ambient');
  const keyContainer = document.querySelector('.key-container');
  const keyBow = document.querySelector('.key-bow');
  const keyShaft = document.querySelector('.key-shaft');
  const keyBit = document.querySelector('.key-bit');
  const scaleLeft = document.querySelector('.scale-left');
  const scaleRight = document.querySelector('.scale-right');
  const scaleBeam = document.querySelector('.scale-beam');
  
  const layerDeep = document.querySelector('.layer-deep');
  const layerMid = document.querySelector('.layer-mid');
  const layerNear = document.querySelector('.layer-near');
  const cloudsDeep = gsap.utils.toArray('.layer-deep .ui-cloud');
  const cloudsMid = gsap.utils.toArray('.layer-mid .ui-cloud');
  const cloudsNear = gsap.utils.toArray('.layer-near .ui-cloud');
  
  // ========================================
  // Initial State - Outside the system
  // ========================================
  
  gsap.set(nav, { opacity: 0, y: -60, filter: 'blur(8px)', pointerEvents: 'none' });
  gsap.set(heroContent, { opacity: 0, y: 60 });
  gsap.set(keyAmbient, { opacity: 0 });
  gsap.set(keyGlow, { opacity: 0 });
  gsap.set([...cloudsDeep, ...cloudsMid, ...cloudsNear], { opacity: 0 });
  
  // ========================================
  // Master Timeline
  // ========================================
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: '+=500%',
      pin: true,
      scrub: 1.5,
      anticipatePin: 1
    }
  });
  
  // ========================================
  // Phase 1: Entry / Locked (0% - 15%)
  // Only key visible, user is outside
  // ========================================
  
  // Scroll prompt fades
  tl.to(scrollPrompt, {
    opacity: 0,
    y: 20,
    duration: 0.08
  }, 0);
  
  // Key gives subtle sign of life
  tl.to(key, {
    filter: 'brightness(0.25) saturate(0.05)',
    duration: 0.15
  }, 0);
  
  // ========================================
  // Phase 2: Awareness (15% - 40%)
  // Depth emerges, abstract clouds appear
  // ========================================
  
  // Deep layer clouds emerge very subtly
  tl.to(cloudsDeep, {
    opacity: 0.15,
    stagger: 0.01,
    duration: 0.2
  }, 0.15);
  
  // Key brightens slightly - responding to environment
  tl.to(key, {
    filter: 'brightness(0.35) saturate(0.15)',
    duration: 0.2
  }, 0.2);
  
  // Ambient glow begins
  tl.to(keyAmbient, {
    opacity: 0.3,
    duration: 0.2
  }, 0.25);
  
  // Mid layer clouds emerge
  tl.to(cloudsMid, {
    opacity: 0.2,
    stagger: 0.008,
    duration: 0.2
  }, 0.28);
  
  // Near layer clouds - very faint
  tl.to(cloudsNear, {
    opacity: 0.15,
    stagger: 0.008,
    duration: 0.18
  }, 0.32);
  
  // Key continues warming
  tl.to(key, {
    filter: 'brightness(0.5) saturate(0.35)',
    duration: 0.15
  }, 0.35);
  
  // Key bow starts to show color
  tl.to(keyBow, {
    background: 'linear-gradient(150deg, #5a5045 0%, #4a4238 40%, #3a352e 80%, #2a2622 100%)',
    duration: 0.15
  }, 0.35);
  
  // ========================================
  // Phase 3: Structure (40% - 70%)
  // Headline appears, UI gains intention
  // ========================================
  
  // Clouds densify
  tl.to(cloudsDeep, {
    opacity: 0.28,
    duration: 0.2
  }, 0.4);
  
  tl.to(cloudsMid, {
    opacity: 0.38,
    duration: 0.2
  }, 0.42);
  
  tl.to(cloudsNear, {
    opacity: 0.35,
    duration: 0.18
  }, 0.45);
  
  // Key transformation continues
  tl.to(key, {
    filter: 'brightness(0.7) saturate(0.6)',
    duration: 0.2
  }, 0.45);
  
  tl.to(keyBow, {
    background: 'linear-gradient(150deg, #8a7a5a 0%, #7a6a4a 40%, #5a5040 80%, #4a4538 100%)',
    boxShadow: `
      inset 0 4px 12px rgba(255, 255, 255, 0.04),
      inset 0 -6px 16px rgba(0, 0, 0, 0.4),
      0 16px 48px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(201, 162, 39, 0.08)
    `,
    duration: 0.2
  }, 0.45);
  
  tl.to(keyShaft, {
    background: 'linear-gradient(90deg, #4a4538 0%, #5a5040 25%, #6a5a48 50%, #5a5040 75%, #4a4538 100%)',
    duration: 0.2
  }, 0.45);
  
  tl.to(keyBit, {
    background: 'linear-gradient(90deg, #4a4538 0%, #5a5040 25%, #6a5a48 50%, #5a5040 75%, #4a4538 100%)',
    duration: 0.2
  }, 0.45);
  
  tl.to([scaleLeft, scaleRight], {
    background: 'linear-gradient(to bottom, #6a5a48 0%, #5a5040 100%)',
    duration: 0.2
  }, 0.45);
  
  tl.to(scaleBeam, {
    background: 'linear-gradient(90deg, transparent 0%, #6a5a48 15%, #7a6a52 50%, #6a5a48 85%, transparent 100%)',
    duration: 0.2
  }, 0.45);
  
  // Glow starts
  tl.to(keyGlow, {
    opacity: 0.25,
    duration: 0.2
  }, 0.5);
  
  tl.to(keyAmbient, {
    opacity: 0.5,
    duration: 0.2
  }, 0.5);
  
  // Hero content begins appearing
  tl.to(heroContent, {
    opacity: 0.5,
    y: 30,
    duration: 0.15
  }, 0.55);
  
  // Nav exists as blurred presence
  tl.to(nav, {
    opacity: 0.3,
    y: -30,
    filter: 'blur(4px)',
    duration: 0.15
  }, 0.58);
  
  // ========================================
  // Phase 4: Access (70% - 90%)
  // Full clarity, inside the system
  // ========================================
  
  // Clouds reach full presence
  tl.to(cloudsDeep, {
    opacity: 0.4,
    filter: 'blur(10px)',
    duration: 0.15
  }, 0.7);
  
  tl.to(cloudsMid, {
    opacity: 0.55,
    filter: 'blur(4px)',
    duration: 0.15
  }, 0.72);
  
  tl.to(cloudsNear, {
    opacity: 0.65,
    filter: 'blur(1px)',
    duration: 0.15
  }, 0.74);
  
  // Key reaches full golden state
  tl.to(key, {
    filter: 'brightness(1.15) saturate(1.2)',
    duration: 0.15
  }, 0.7);
  
  tl.to(keyBow, {
    background: 'linear-gradient(150deg, #e8d48b 0%, #c9a227 35%, #a08020 70%, #806818 100%)',
    boxShadow: `
      inset 0 5px 15px rgba(255, 255, 255, 0.2),
      inset 0 -5px 12px rgba(0, 0, 0, 0.15),
      0 0 70px rgba(201, 162, 39, 0.4),
      0 0 120px rgba(201, 162, 39, 0.15),
      0 20px 50px rgba(0, 0, 0, 0.25)
    `,
    borderColor: 'rgba(232, 212, 139, 0.4)',
    duration: 0.15
  }, 0.7);
  
  tl.to(keyShaft, {
    background: 'linear-gradient(90deg, #a08020 0%, #c9a227 25%, #e8d48b 50%, #c9a227 75%, #a08020 100%)',
    boxShadow: `
      inset 5px 0 12px rgba(255, 255, 255, 0.1),
      inset -5px 0 12px rgba(0, 0, 0, 0.2),
      8px 0 24px rgba(0, 0, 0, 0.2)
    `,
    duration: 0.15
  }, 0.7);
  
  tl.to(keyBit, {
    background: 'linear-gradient(90deg, #a08020 0%, #c9a227 25%, #e8d48b 50%, #c9a227 75%, #a08020 100%)',
    boxShadow: `
      inset 5px 0 12px rgba(255, 255, 255, 0.1),
      inset -5px 0 12px rgba(0, 0, 0, 0.2),
      0 12px 28px rgba(0, 0, 0, 0.3)
    `,
    duration: 0.15
  }, 0.7);
  
  tl.to([scaleLeft, scaleRight], {
    background: 'linear-gradient(to bottom, #e8d48b 0%, #c9a227 100%)',
    duration: 0.15
  }, 0.7);
  
  tl.to(scaleBeam, {
    background: 'linear-gradient(90deg, transparent 0%, #c9a227 15%, #e8d48b 50%, #c9a227 85%, transparent 100%)',
    duration: 0.15
  }, 0.7);
  
  // Full glow
  tl.to(keyGlow, {
    opacity: 0.75,
    duration: 0.15
  }, 0.72);
  
  tl.to(keyAmbient, {
    opacity: 0.6,
    duration: 0.15
  }, 0.72);
  
  // Nav becomes usable
  tl.to(nav, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    pointerEvents: 'auto',
    duration: 0.12
  }, 0.75);
  
  // Hero content fully visible
  tl.to(heroContent, {
    opacity: 1,
    y: 0,
    duration: 0.12
  }, 0.78);
  
  // Key moves up slightly
  tl.to(keyContainer, {
    y: -60,
    duration: 0.15
  }, 0.8);
  
  // ========================================
  // Phase 5: Resolved (90% - 100%)
  // Settled state, access granted
  // ========================================
  
  // Everything holds at final state
  // Small polish adjustments
  tl.to(cloudsNear, {
    opacity: 0.7,
    duration: 0.1
  }, 0.9);
  
  // ========================================
  // Post-hero content animations
  // ========================================
  
  document.querySelectorAll('.content-section, .cta-section').forEach(section => {
    const h2 = section.querySelector('h2');
    const p = section.querySelector('.section-inner > p');
    const cards = section.querySelectorAll('.card');
    const steps = section.querySelectorAll('.step');
    const btn = section.querySelector('.btn-primary');
    
    const sectionTL = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
    
    if (h2) {
      gsap.set(h2, { opacity: 0, y: 30 });
      sectionTL.to(h2, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0);
    }
    
    if (p) {
      gsap.set(p, { opacity: 0, y: 20 });
      sectionTL.to(p, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.1);
    }
    
    if (cards.length) {
      gsap.set(cards, { opacity: 0, y: 40 });
      sectionTL.to(cards, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power2.out' }, 0.2);
    }
    
    if (steps.length) {
      gsap.set(steps, { opacity: 0, y: 40 });
      sectionTL.to(steps, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power2.out' }, 0.2);
    }
    
    if (btn && !cards.length && !steps.length) {
      gsap.set(btn, { opacity: 0, y: 20 });
      sectionTL.to(btn, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.3);
    }
  });
}
