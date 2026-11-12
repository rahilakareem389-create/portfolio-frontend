import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Islamic 3D Constellation & Star Geometry Canvas
 * Renders an elegant, non-intrusive 3D sacred Islamic geometric constellation
 * using Royal Purple (#6D28D9) and Golden Yellow (#F2C94C) node points.
 */
export default function Islamic3DBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch (_) {
      return; // Fallback smoothly if WebGL not supported
    }

    // Size to the hero box itself (not the window) so the shapes are never stretched
    const getSize = () => ({
      w: Math.max(1, container.clientWidth),
      h: Math.max(1, container.clientHeight),
    });
    const { w, h } = getSize();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000);
    camera.position.z = 85;

    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    // Particle Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Core Rotating Islamic Star Polyhedron
    const starGeom = new THREE.IcosahedronGeometry(22, 1);
    const starMat = new THREE.MeshBasicMaterial({
      color: 0x6D28D9,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const starMesh = new THREE.Mesh(starGeom, starMat);
    group.add(starMesh);

    // 2. Inner Golden Accent Octahedron
    const innerGeom = new THREE.OctahedronGeometry(12, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xF2C94C,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    group.add(innerMesh);

    // 3. Floating Ambient Particles (Spiritual Golden & Purple dust)
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const purple = new THREE.Color(0x6D28D9);
    const gold = new THREE.Color(0xF2C94C);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 160;
      positions[i3 + 1] = (Math.random() - 0.5) * 120;
      positions[i3 + 2] = (Math.random() - 0.5) * 80;

      const c = Math.random() > 0.4 ? purple : gold;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.6
    });

    const particles = new THREE.Points(pGeom, pMat);
    group.add(particles);

    // Interactive mouse movement
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let visible = true;

    // Container Resize Handler (hero height changes with screen width)
    const handleResize = () => {
      const s = getSize();
      camera.aspect = s.w / s.h;
      camera.updateProjectionMatrix();
      renderer.setSize(s.w, s.h, false);
      if (reduceMotion || !visible) renderer.render(scene, camera);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop (paused while the hero is scrolled out of view)
    let animationFrameId = null;
    const clock = new THREE.Clock();
    let elapsedTime = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      // Clamp the step so resuming after a pause continues smoothly (no jump)
      elapsedTime += Math.min(clock.getDelta(), 0.1);

      // Smooth slow rotation
      starMesh.rotation.y = elapsedTime * 0.08;
      starMesh.rotation.x = elapsedTime * 0.04;

      innerMesh.rotation.y = -elapsedTime * 0.12;
      innerMesh.rotation.z = elapsedTime * 0.06;

      particles.rotation.y = elapsedTime * 0.02;

      // Gentle mouse parallax
      targetX += (mouseX * 8 - targetX) * 0.05;
      targetY += (-mouseY * 8 - targetY) * 0.05;
      group.position.x = targetX;
      group.position.y = targetY;

      renderer.render(scene, camera);
    };

    const start = () => {
      if (animationFrameId === null) {
        animate();
      }
    };
    const stop = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    let io = null;
    if (reduceMotion) {
      // Still show the geometry, just without movement
      renderer.render(scene, camera);
    } else {
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      });
      io.observe(container);
      start();
    }

    return () => {
      stop();
      if (io) io.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      starGeom.dispose();
      starMat.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      pGeom.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-80"
    />
  );
}
