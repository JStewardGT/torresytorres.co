'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function ArchitecturalStructure() {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { gl, invalidate, setDpr, size } = useThree();
  const compact = size.width < 768;

  const parallax = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Generate delicate ambient particles
  const particleCount = 120;
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setDpr(compact ? 1 : [1, 1.5]);

    if (compact) {
      let visible = false;
      let spinTimer: number | undefined;
      const updateSpin = () => {
        window.clearInterval(spinTimer);
        const mesh = meshRef.current;
        if (!mesh || !visible || document.hidden || reducedMotion.matches) return;

        const startAngle = mesh.rotation.y;
        const startTime = performance.now();
        const fullTurn = 2 * Math.PI;
        spinTimer = window.setInterval(() => {
          const turns = (performance.now() - startTime) / 60_000;
          mesh.rotation.y = (startAngle + turns * fullTurn) % fullTurn;
          invalidate();
        }, 1000 / 30);
      };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        updateSpin();
      });
      observer.observe(gl.domElement);
      reducedMotion.addEventListener('change', updateSpin);
      document.addEventListener('visibilitychange', updateSpin);

      return () => {
        observer.disconnect();
        reducedMotion.removeEventListener('change', updateSpin);
        document.removeEventListener('visibilitychange', updateSpin);
        window.clearInterval(spinTimer);
      };
    }

    const updatePointer = (e: PointerEvent) => {
      if (reducedMotion.matches || !e.isPrimary || e.pointerType === 'touch') return;

      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      parallax.current.targetX = x * 0.35;
      parallax.current.targetY = y * 0.25;
      invalidate();
    };

    const handleScroll = () => {
      if (reducedMotion.matches || !meshRef.current) return;
      meshRef.current.position.y = -0.2 - window.scrollY * 0.0015;
      invalidate();
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    invalidate();

    return () => {
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [compact, gl, invalidate, setDpr]);

  useFrame(() => {
    if (compact) return;

    const pointer = parallax.current;
    const dx = pointer.targetX - pointer.x;
    const dy = pointer.targetY - pointer.y;

    if (Math.abs(dx) > 0.0005 || Math.abs(dy) > 0.0005) {
      pointer.x += dx * 0.08;
      pointer.y += dy * 0.08;

      if (meshRef.current) {
        meshRef.current.rotation.y = pointer.x * 0.8;
        meshRef.current.rotation.x = -pointer.y * 0.5;
      }

      if (ringRef.current) {
        ringRef.current.rotation.z = pointer.x * 0.45;
      }

      invalidate();
    }
  });

  return (
    <group ref={meshRef} position={[compact ? 1.45 : 2.8, -0.2, -1]} scale={compact ? 0.62 : 1}>
      {/* Primary Architectural Wireframe Column / Monolith */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.4, 1.8, 5.2, 8, 4, true]} />
        <meshBasicMaterial
          color="#D1E3FF"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* Inner Concentric Structural Prism */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.9, 1.2, 6.2, 6, 3, true]} />
        <meshBasicMaterial
          color="#C5A880"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Geometric Orbital Balance Ring (Symbol of Justice & Order) */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0.4, 0]}>
        <torusGeometry args={[2.5, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#D1E3FF"
          metalness={0.9}
          roughness={0.1}
          emissive="#D1E3FF"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Second Slanted Ring */}
      <mesh rotation={[-Math.PI / 4, -0.3, 0]}>
        <torusGeometry args={[3.1, 0.01, 16, 64]} />
        <meshBasicMaterial
          color="#C5A880"
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Floating Particles Matrix */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#D1E3FF"
          transparent
          opacity={0.45}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden max-md:opacity-[0.55]" aria-hidden="true">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.4} />
        {/* Raking architectural light in ice and gold tones */}
        <directionalLight position={[10, 15, 10]} intensity={1.2} color="#D1E3FF" />
        <directionalLight position={[-10, -5, -5]} intensity={0.6} color="#C5A880" />
        <pointLight position={[2, 2, 3]} intensity={0.8} color="#D1E3FF" distance={12} />
        <ArchitecturalStructure />
      </Canvas>
    </div>
  );
}
