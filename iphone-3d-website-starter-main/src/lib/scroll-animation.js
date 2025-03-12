import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

export const scrollAnimation = (position,target,onUpdate) => {
    const tl = gsap.timeline();

    tl.to(position, {
      scrollTrigger: {
        trigger: ".sound-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
        onUpdate: onUpdate,
      },
      x: -3.38,
      y: -10.74,
      z: -5.93,
      duration: 1, // Smooth transition
      ease: "power2.out",
      onUpdate: () => viewer.setDirty(),
    })
      .to(target, {
        scrollTrigger: {
          trigger: ".sound-section",
          start: "top bottom",
          end: "top top",
          scrub: 2,
          immediateRender: false,
        },
        x: 1.52,
        y: 0.77,
        z: -1.08,
      })
      .to(".jumbotron-section", {
        scrollTrigger: {
          opacity: 0,
          trigger: ".sound-section",
          start: "top bottom",
          end: "top top",
          scrub: 2,
          immediateRender: false,
        },
      })
      .to(".sound-section-content", {
        scrollTrigger: {
          trigger: ".sound-section",
          start: "top bottom",
          end: "top top",
          scrub: 2,
          immediateRender: false,
        },
        opacity: 1,
      })
      .to(position, {
        scrollTrigger: {
          trigger: ".display-section",
          start: "top bottom",
          end: "top top",
          scrub: 2,
          immediateRender: false,
          onUpdate: onUpdate,
        },
        x:1.56,
        y: 5.0,
        z: 0.01,
        duration: 1, // Smooth transition
        ease: "power2.out",
        onUpdate: () => viewer.setDirty(),
      })
      .to(target, {
        scrollTrigger: {
          trigger: ".display-section",
          start: "top bottom",
          end: "top top",
          scrub: 2,
          immediateRender: false,
        },
        x: -0.55,
        y: 0.32,
        z: 0.0,
      });
    console.log("Scroll animation setup complete");
}
