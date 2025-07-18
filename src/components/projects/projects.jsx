import gsap from "gsap";
import React, { useEffect, useRef, useMemo } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from './projectcard';

gsap.registerPlugin(ScrollTrigger);

const CARD_WIDTH = 340;
const ACTIVE_RANGE = 350;
const Z_INDEX_BASE = 10;

const HorizontalProjectList = ({ projectsData }) => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  const totalCards = useMemo(() => projectsData.length, [projectsData]);

  useEffect(() => {
    if (!gsap || !ScrollTrigger) return;

    const ctx = gsap.context(() => {
      // total width of all cards
      const contentWidth = totalCards * CARD_WIDTH;
      const travelDist = Math.max(0, contentWidth - window.innerWidth + CARD_WIDTH);
      const viewportCenter = window.innerWidth / 2;

      // initial card setup
      cardRefs.current.forEach((el, i) => {
        gsap.set(el, {
          position: 'absolute',
          top: '40%',
          x: i * CARD_WIDTH,
          y: '-50%',
          opacity: 0,
          scale: 0.9,
          zIndex: Z_INDEX_BASE,
        });
      });

      // compute scroll duration
      const getDuration = () => {
        const h = headerRef.current?.offsetHeight || 0;
        return h * 1.5 + travelDist + window.innerHeight * 0.5;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getDuration()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: self => {
            self.end = `+=${getDuration()}`;
            self.update();
          }
        }
      });

      // header animations
      tl.from([titleRef.current, subtitleRef.current], {
        y: 50,
        opacity: 0,
        duration: 0.2,
        ease: 'power3.out',
        stagger: 0.1
      }, 0);

      // fade cards + center container
      tl.to(cardsContainerRef.current, {
        y: 'center',
        duration: 0.2,
        ease: 'power2.out'
      }, 0.3)
        .to(cardRefs.current, {
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out'
        }, 0.3);

      // horizontal scroll
      tl.to(cardRefs.current, {
        x: `-=${travelDist}`,
        ease: 'none'
      }, 0.3);

      // dynamic scale, opacity, zIndex
      tl.to(cardRefs.current, {
        scale: (i, el) => {
          const c = el.getBoundingClientRect().left + el.clientWidth/2;
          const d = Math.abs(c - viewportCenter);
          const n = Math.min(1, d / ACTIVE_RANGE);
          return gsap.utils.interpolate(1, 0.9, n);
        },
        opacity: (i, el) => {
          const c = el.getBoundingClientRect().left + el.clientWidth/2;
          const d = Math.abs(c - viewportCenter);
          const n = Math.min(1, d / ACTIVE_RANGE);
          return gsap.utils.interpolate(1, 0.8, n);
        },
        zIndex: (i, el) => {
          const c = el.getBoundingClientRect().left + el.clientWidth/2;
          const d = Math.abs(c - viewportCenter);
          const n = Math.min(1, d / ACTIVE_RANGE);
          // higher zIndex when closer
          return Math.round(gsap.utils.interpolate(Z_INDEX_BASE+100, Z_INDEX_BASE, n));
        },
        immediateRender: false,
        ease: 'none'
      }, "<");

    }, sectionRef);

    return () => ctx.revert();
  }, [totalCards, projectsData]);

  return (
    <div
      id="projects"
      ref={sectionRef}
      className="w-full min-h-[100vh] relative overflow-hidden text-white"
    >
      <div
        ref={headerRef}
        className="w-full pt-10 pb-5 flex flex-col items-center z-20"
      >
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-extrabold text-center mb-4
                     bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500"
        >
          Featured Projects
        </h2>
        <h3
          ref={subtitleRef}
          className="text-xl md:text-2xl text-center mb-16
                     bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          A showcase of my recent work and creations.
        </h3>
      </div>

      <div
        ref={cardsContainerRef}
        className="relative w-full h-[500px] overflow-hidden"
      >
        {projectsData.map((project, idx) => (
          <div
            key={project.id}
            ref={el => (cardRefs.current[idx] = el)}
            className="w-[340px] h-[420px]"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalProjectList;
