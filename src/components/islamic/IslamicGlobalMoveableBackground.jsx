import React, { useEffect, useRef } from 'react';

/**
 * IslamicGlobalMoveableBackground
 * 
 * Specifications:
 * - Minimalist clean website background
 * - Floating small golden Islamic 8-point stars (Rub-el-Hizb / Khatam)
 * - Crescent moon and delicate hanging lanterns
 * - Soft floating glowing particles (Gold #F2C94C & Purple #6D28D9 dust)
 * - Pure white or very light off-white background (#FAF8FF)
 * - Subtle gold bokeh with gentle glow
 * - Elegant, modern vector aesthetic UI
 * - Moveable: Interactive mouse parallax + smooth organic floating physics
 * - Global: Applied fixed across all pages and sections of the website
 */
export default function IslamicGlobalMoveableBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse Tracking for Parallax
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initElements();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // 1. Floating 8-Point Stars
    let stars = [];
    // 2. Soft Floating Particles
    let particles = [];
    // 3. Subtle Bokeh Orbs
    let bokehOrbs = [];
    // 4. Delicate Hanging Lanterns (Anchored at top sides)
    let lanterns = [];
    // 5. Crescent Moons
    let crescents = [];

    const initElements = () => {
      // 8-point stars
      const starCount = Math.min(Math.floor(width / 50), 32);
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        outerR: 5 + Math.random() * 8,
        innerR: 2.2 + Math.random() * 3.5,
        speedY: 0.15 + Math.random() * 0.35,
        oscAmp: 10 + Math.random() * 20,
        oscSpeed: 0.008 + Math.random() * 0.015,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        opacity: 0.25 + Math.random() * 0.55,
        depth: 0.2 + Math.random() * 0.8,
        seed: Math.random() * 100,
      }));

      // Soft Floating Particles
      const particleCount = Math.min(Math.floor(width / 25), 65);
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1 + Math.random() * 2.5,
        speedY: 0.2 + Math.random() * 0.45,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: 0.2 + Math.random() * 0.6,
        isGold: Math.random() > 0.35,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
        depth: 0.1 + Math.random() * 0.9,
      }));

      // Subtle Gold Bokeh Orbs
      const bokehCount = 10;
      bokehOrbs = Array.from({ length: bokehCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 40 + Math.random() * 90,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: 0.04 + Math.random() * 0.09,
        isPurple: Math.random() > 0.6,
        depth: 0.08 + Math.random() * 0.2,
      }));

      // Delicate Lanterns (positioned at top left and top right, avoiding center)
      lanterns = [
        { anchorX: width * 0.04, chainLength: 50 + Math.random() * 30, width: 22, height: 42, swayFreq: 0.0018, phase: 0 },
        { anchorX: width * 0.10, chainLength: 85 + Math.random() * 40, width: 26, height: 50, swayFreq: 0.0015, phase: 1.2 },
        { anchorX: width * 0.90, chainLength: 60 + Math.random() * 35, width: 24, height: 46, swayFreq: 0.0016, phase: 2.1 },
        { anchorX: width * 0.96, chainLength: 100 + Math.random() * 40, width: 28, height: 54, swayFreq: 0.0013, phase: 3.4 },
      ];

      // Crescent Moons
      crescents = [
        {
          x: width * 0.88,
          y: height * 0.18,
          radius: 28,
          rotation: -0.35,
          opacity: 0.55,
          speedY: 0.08,
          oscAmp: 12,
          depth: 0.35,
        },
        {
          x: width * 0.08,
          y: height * 0.65,
          radius: 20,
          rotation: 0.45,
          opacity: 0.35,
          speedY: 0.06,
          oscAmp: 8,
          depth: 0.25,
        },
      ];
    };

    initElements();

    // Helper: Draw 8-Point Islamic Star (Khatam / Rub el Hizb)
    const draw8PointStar = (x, y, outerR, innerR, rot, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      const numPoints = 8;
      const step = Math.PI / numPoints;
      for (let i = 0; i < numPoints * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const a = i * step;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Golden gradient fill
      const grad = ctx.createLinearGradient(-outerR, -outerR, outerR, outerR);
      grad.addColorStop(0, '#FFF4B8');
      grad.addColorStop(0.5, '#F2C94C');
      grad.addColorStop(1, '#D99F26');
      ctx.fillStyle = grad;
      ctx.fill();

      // Delicate border
      ctx.strokeStyle = 'rgba(255, 244, 184, 0.6)';
      ctx.lineWidth = 0.75;
      ctx.stroke();

      ctx.restore();
    };

    // Helper: Draw Crescent Moon
    const drawCrescent = (x, y, radius, rot, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = opacity;

      // Glow behind crescent
      const glow = ctx.createRadialGradient(0, 0, radius * 0.3, 0, 0, radius * 1.5);
      glow.addColorStop(0, 'rgba(242, 201, 76, 0.25)');
      glow.addColorStop(1, 'rgba(242, 201, 76, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Crescent Shape
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2, false);
      ctx.arc(radius * 0.36, -radius * 0.12, radius * 0.82, Math.PI * 2, 0, true);
      ctx.closePath();

      const grad = ctx.createLinearGradient(-radius, -radius, radius, radius);
      grad.addColorStop(0, '#FFF4B8');
      grad.addColorStop(0.6, '#F2C94C');
      grad.addColorStop(1, '#E5B834');
      ctx.fillStyle = grad;
      ctx.fill();

      // Subtle bright star next to crescent
      const starX = radius * 0.85;
      const starY = -radius * 0.35;
      draw8PointStar(starX, starY, 4.5, 2, rot, opacity * 0.9);

      ctx.restore();
    };

    // Helper: Draw Hanging Lantern (Fanous)
    const drawLantern = (anchorX, chainLength, width, height, swayAngle) => {
      ctx.save();
      ctx.translate(anchorX, 0);
      ctx.rotate(swayAngle);

      // Hanging chain
      ctx.strokeStyle = 'rgba(217, 159, 38, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, chainLength);
      ctx.stroke();

      ctx.translate(0, chainLength);

      // Top Hanging Ring
      ctx.strokeStyle = '#F2C94C';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, -4, 4, 0, Math.PI * 2);
      ctx.stroke();

      // Top Dome
      ctx.fillStyle = '#D99F26';
      ctx.beginPath();
      ctx.moveTo(-width * 0.45, 0);
      ctx.lineTo(width * 0.45, 0);
      ctx.lineTo(width * 0.25, -height * 0.2);
      ctx.lineTo(0, -height * 0.28);
      ctx.lineTo(-width * 0.25, -height * 0.2);
      ctx.closePath();
      ctx.fill();

      // Glowing Candle Core inside lantern
      const candleGlow = ctx.createRadialGradient(0, height * 0.4, 0, 0, height * 0.4, width * 1.2);
      candleGlow.addColorStop(0, 'rgba(255, 255, 230, 0.9)');
      candleGlow.addColorStop(0.3, 'rgba(242, 201, 76, 0.6)');
      candleGlow.addColorStop(0.7, 'rgba(109, 40, 217, 0.15)');
      candleGlow.addColorStop(1, 'rgba(250, 248, 255, 0)');
      ctx.fillStyle = candleGlow;
      ctx.beginPath();
      ctx.arc(0, height * 0.4, width * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Glass Body
      const glassGrad = ctx.createLinearGradient(0, 0, 0, height);
      glassGrad.addColorStop(0, 'rgba(255, 244, 184, 0.7)');
      glassGrad.addColorStop(0.5, 'rgba(242, 201, 76, 0.85)');
      glassGrad.addColorStop(1, 'rgba(109, 40, 217, 0.35)');
      ctx.fillStyle = glassGrad;

      ctx.beginPath();
      ctx.moveTo(-width * 0.4, 0);
      ctx.lineTo(-width * 0.55, height * 0.35);
      ctx.lineTo(-width * 0.35, height * 0.85);
      ctx.lineTo(width * 0.35, height * 0.85);
      ctx.lineTo(width * 0.55, height * 0.35);
      ctx.lineTo(width * 0.4, 0);
      ctx.closePath();
      ctx.fill();

      // Golden cage lines
      ctx.strokeStyle = 'rgba(217, 159, 38, 0.8)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Center vertical grill wire
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, height * 0.85);
      ctx.stroke();

      // Base of Lantern
      ctx.fillStyle = '#D99F26';
      ctx.beginPath();
      ctx.moveTo(-width * 0.35, height * 0.85);
      ctx.lineTo(width * 0.35, height * 0.85);
      ctx.lineTo(width * 0.25, height);
      ctx.lineTo(-width * 0.25, height);
      ctx.closePath();
      ctx.fill();

      // Bottom hanging tassel / pendant
      ctx.fillStyle = '#F2C94C';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(-width * 0.15, height + height * 0.18);
      ctx.lineTo(width * 0.15, height + height * 0.18);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Helper: Draw Bokeh Orbs
    const drawBokeh = (x, y, r, isPurple, opacity) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      if (isPurple) {
        grad.addColorStop(0, 'rgba(109, 40, 217, 0.35)');
        grad.addColorStop(0.5, 'rgba(237, 229, 255, 0.15)');
        grad.addColorStop(1, 'rgba(250, 248, 255, 0)');
      } else {
        grad.addColorStop(0, 'rgba(242, 201, 76, 0.4)');
        grad.addColorStop(0.6, 'rgba(255, 244, 184, 0.15)');
        grad.addColorStop(1, 'rgba(250, 248, 255, 0)');
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Animation Loop
    let time = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 1;

      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      const parallaxOffsetX = (mouseX - width / 2) * 0.025;
      const parallaxOffsetY = (mouseY - height / 2) * 0.025;

      ctx.clearRect(0, 0, width, height);

      // 1. Render Subtle Gold Bokeh Orbs
      bokehOrbs.forEach((b) => {
        b.x += b.speedX;
        b.y += b.speedY;
        if (b.x < -b.radius) b.x = width + b.radius;
        if (b.x > width + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) b.y = height + b.radius;
        if (b.y > height + b.radius) b.y = -b.radius;

        const bx = b.x + parallaxOffsetX * b.depth * 15;
        const by = b.y + parallaxOffsetY * b.depth * 15;
        drawBokeh(bx, by, b.radius, b.isPurple, b.opacity);
      });

      // 2. Render Delicate Hanging Lanterns (with gentle pendulum physics)
      lanterns.forEach((l) => {
        const mouseTorque = (targetMouseX - width / 2) * 0.00003;
        const sway = Math.sin(time * l.swayFreq + l.phase) * 0.05 + mouseTorque;
        drawLantern(l.anchorX, l.chainLength, l.width, l.height, sway);
      });

      // 3. Render Crescent Moons
      crescents.forEach((c) => {
        c.y -= c.speedY;
        if (c.y < -c.radius * 2) c.y = height + c.radius * 2;
        const cx = c.x + Math.sin(time * 0.005) * c.oscAmp + parallaxOffsetX * c.depth * 20;
        const cy = c.y + parallaxOffsetY * c.depth * 20;
        drawCrescent(cx, cy, c.radius, c.rotation, c.opacity);
      });

      // 4. Render Floating Small Golden 8-Point Stars
      stars.forEach((s) => {
        s.y -= s.speedY;
        s.rotation += s.rotSpeed;
        if (s.y < -20) {
          s.y = height + 20;
          s.x = Math.random() * width;
        }

        const oscX = Math.sin(time * s.oscSpeed + s.seed) * s.oscAmp;
        const sx = s.x + oscX + parallaxOffsetX * s.depth * 25;
        const sy = s.y + parallaxOffsetY * s.depth * 25;

        // Twinkle factor
        const twinkle = s.opacity * (0.8 + 0.2 * Math.sin(time * 0.04 + s.seed));
        draw8PointStar(sx, sy, s.outerR, s.innerR, s.rotation, twinkle);
      });

      // 5. Render Soft Floating Particles (Spiritual Golden & Purple Dust)
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const px = p.x + parallaxOffsetX * p.depth * 30;
        const py = p.y + parallaxOffsetY * p.depth * 30;
        const pulse = Math.sin(time * p.pulseSpeed + p.phase) * 0.3 + 0.7;

        ctx.save();
        ctx.globalAlpha = p.opacity * pulse;
        ctx.fillStyle = p.isGold ? '#F2C94C' : '#6D28D9';
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Base Layer: Pure white to light off-white background */}
      <div className="absolute inset-0 bg-[#FAF8FF]" />

      {/* Subtle Ambient High-Res Backdrop Image (Matching Logo Colors) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "url('/islamic-hero-bg.jpg')",
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Atmospheric Soft Lavender & Gold Radial Glows */}
      <div
        className="absolute -top-[10%] left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none filter blur-[120px] opacity-20"
        style={{ backgroundColor: '#EDE5FF' }}
      />
      <div
        className="absolute top-1/2 -right-[10%] w-[600px] h-[600px] rounded-full pointer-events-none filter blur-[130px] opacity-15"
        style={{ backgroundColor: '#FFF4B8' }}
      />
      <div
        className="absolute -bottom-[10%] left-1/3 w-[800px] h-[600px] rounded-full pointer-events-none filter blur-[140px] opacity-20"
        style={{ backgroundColor: '#EDE5FF' }}
      />

      {/* High-Performance Canvas: Live Moveable Stars, Crescent, Lanterns, Bokeh & Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
