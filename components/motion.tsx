'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

export function MotionEnhancements() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        const element = entry.target as HTMLElement;
        const animation = element.animate(
          [{opacity: 0, transform: 'translateY(18px)'}, {opacity: 1, transform: 'translateY(0)'}],
          {duration: 550, delay: Number(element.dataset.motionDelay || 0), easing: 'cubic-bezier(.22,1,.36,1)'}
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, {threshold: 0.08});

    // Animate only elements below the initial viewport. Content stays visible
    // without JavaScript, and anchor destinations never wait on an animation.
    const elements = document.querySelectorAll<HTMLElement>(
      '.section > .section-label, .section > h2, .section > .container > .section-label, .section > .container > h2, .split > div, .expertise-card, .process-item, .deliverables > div, .numbered-list li, .related a, .contact-banner > .container, .simple-steps > div, .contact-layout .form-field, .legal > h2, .footer-main > div, .footer-main > address, .footer-main > nav'
    );
    for (const element of elements) {
      if (element.getBoundingClientRect().top < window.innerHeight || element.parentElement?.closest('[data-motion-target]')) continue;
      element.dataset.motionTarget = 'true';
      const siblings = Array.from(element.parentElement?.children || []);
      element.dataset.motionDelay = String(Math.min(siblings.indexOf(element) % 4, 3) * 60);
      observer.observe(element);
    }

    const stopAnimations = () => {
      for (const animation of animations) animation.cancel();
      animations.clear();
    };
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPreference = () => { if (preference.matches) { observer.disconnect(); stopAnimations(); } };
    preference.addEventListener('change', onPreference);
    return () => {
      observer.disconnect();
      stopAnimations();
      preference.removeEventListener('change', onPreference);
      elements.forEach(element => {delete element.dataset.motionTarget; delete element.dataset.motionDelay;});
    };
  }, [pathname]);

  return null;
}
