import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background3D = ({ enabled = true }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0705, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Cloud
    const particleCount = 650;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xff7a1a); // Vibrant Orange
    const color2 = new THREE.Color(0xffb347); // Golden Amber
    const color3 = new THREE.Color(0xeaa487); // Soft Terracotta

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 800;

      const randomColor = Math.random();
      const c = randomColor < 0.5 ? color1 : randomColor < 0.8 ? color2 : color3;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle 3D Wireframe Floating Polyhedrons
    const geoWire = new THREE.IcosahedronGeometry(70, 1);
    const matWire = new THREE.MeshBasicMaterial({
      color: 0xff7a1a,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const mesh1 = new THREE.Mesh(geoWire, matWire);
    mesh1.position.set(220, 80, -50);
    scene.add(mesh1);

    const geoTorus = new THREE.TorusGeometry(55, 16, 8, 24);
    const matTorus = new THREE.MeshBasicMaterial({
      color: 0xeaa487,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const mesh2 = new THREE.Mesh(geoTorus, matTorus);
    mesh2.position.set(-250, -120, -100);
    scene.add(mesh2);

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.15;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.15;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX * 0.4;
      camera.position.y = -targetY * 0.4;
      camera.lookAt(scene.position);

      particles.rotation.y += 0.0006;
      particles.rotation.x += 0.0003;

      mesh1.rotation.x += 0.003;
      mesh1.rotation.y += 0.004;

      mesh2.rotation.x -= 0.002;
      mesh2.rotation.z += 0.003;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      geoWire.dispose();
      matWire.dispose();
      geoTorus.dispose();
      matTorus.dispose();
      renderer.dispose();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};

export default Background3D;
