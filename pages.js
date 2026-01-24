/* ========================================
   CaseFin - Product & About Page Animations
   Subtle scroll-triggered reveals
======================================== */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initPageAnimations();
});

function initPageAnimations() {
  // Page hero animation on load
  const heroH1 = document.querySelector('.page-hero h1');
  const heroP = document.querySelector('.page-hero p');
  
  if (heroH1) {
    gsap.fromTo(heroH1, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.1 }
    );
  }
  
  if (heroP) {
    gsap.fromTo(heroP,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.25 }
    );
  }
  
  // Feature sections - staggered reveal
  const featureSections = document.querySelectorAll('.feature-section');
  
  featureSections.forEach((section) => {
    const label = section.querySelector('.feature-label');
    const h2 = section.querySelector('h2');
    const p = section.querySelector('.feature-content > p');
    const list = section.querySelector('.feature-list');
    const visual = section.querySelector('.feature-visual');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'top 25%',
        toggleActions: 'play none none reverse'
      }
    });
    
    if (label) {
      gsap.set(label, { opacity: 0, y: 15 });
      tl.to(label, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0);
    }
    
    if (h2) {
      gsap.set(h2, { opacity: 0, y: 20 });
      tl.to(h2, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.1);
    }
    
    if (p) {
      gsap.set(p, { opacity: 0, y: 20 });
      tl.to(p, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.2);
    }
    
    if (list) {
      const items = list.querySelectorAll('li');
      gsap.set(items, { opacity: 0, x: -15 });
      tl.to(items, { 
        opacity: 1, 
        x: 0, 
        duration: 0.5, 
        stagger: 0.1,
        ease: 'power2.out' 
      }, 0.35);
    }
    
    if (visual) {
      gsap.set(visual, { opacity: 0, scale: 0.95 });
      tl.to(visual, { 
        opacity: 1, 
        scale: 1, 
        duration: 0.7, 
        ease: 'power2.out' 
      }, 0.15);
    }
  });
  
  // About sections - simple fade up
  const aboutSections = document.querySelectorAll('.about-section');
  
  aboutSections.forEach((section) => {
    const h2 = section.querySelector('h2');
    const paragraphs = section.querySelectorAll('.about-block p');
    const valueItems = section.querySelectorAll('.value-item');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'top 25%',
        toggleActions: 'play none none reverse'
      }
    });
    
    if (h2) {
      gsap.set(h2, { opacity: 0, y: 20 });
      tl.to(h2, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0);
    }
    
    if (paragraphs.length) {
      gsap.set(paragraphs, { opacity: 0, y: 15 });
      tl.to(paragraphs, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.15,
        ease: 'power2.out' 
      }, 0.15);
    }
    
    if (valueItems.length) {
      gsap.set(valueItems, { opacity: 0, y: 25 });
      tl.to(valueItems, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.12,
        ease: 'power2.out' 
      }, 0.2);
    }
  });
  
  // CTA section
  const ctaSection = document.querySelector('.section-cta');
  if (ctaSection) {
    const ctaH2 = ctaSection.querySelector('h2');
    const ctaP = ctaSection.querySelector('p');
    const ctaBtn = ctaSection.querySelector('.btn-primary');
    
    const ctaTL = gsap.timeline({
      scrollTrigger: {
        trigger: ctaSection,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
    
    if (ctaH2) {
      gsap.set(ctaH2, { opacity: 0, y: 20 });
      ctaTL.to(ctaH2, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0);
    }
    
    if (ctaP) {
      gsap.set(ctaP, { opacity: 0, y: 15 });
      ctaTL.to(ctaP, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.1);
    }
    
    if (ctaBtn) {
      gsap.set(ctaBtn, { opacity: 0, y: 15 });
      ctaTL.to(ctaBtn, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.2);
    }
  }
}
