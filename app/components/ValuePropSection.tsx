'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ValuePropSection() {
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const handleMouseMove = (e: MouseEvent) => {
      itemsRef.current.forEach(item => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        
        if (distance < 300) {
          const x = (e.clientX - centerX) * 0.2;
          const y = (e.clientY - centerY) * 0.2;
          gsap.to(item, { x, y, duration: 0.6, ease: "power2.out" });
        } else {
          gsap.to(item, { x: 0, y: 0, duration: 0.6 });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  });

  return (
    <section className="w-full py-[40vh] bg-transparent flex justify-center gap-20">
      {[1, 2, 3].map((i) => (
        <div 
          key={i}
          ref={el => { if(el) itemsRef.current[i] = el }}
          className="p-10 border border-grolow-cyan/30 bg-black/40 backdrop-blur-md"
        >
          <span className="text-7xl font-bold">+{i * 20}</span>
        </div>
      ))}
    </section>
  );
}