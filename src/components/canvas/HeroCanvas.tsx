'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function ArchitecturalStructure() {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { invalidate } = useThree();

  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

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
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.targetX = x * 0.35;
      mouse.current.targetY = y * 0.25;
      invalidate();
    };

    const handleScroll = () => {
      if (meshRef.current) {
        meshRef.current.position.y = -window.scrollY * 0.0015;
      }
      invalidate();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial render
    invalidate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [invalidate]);

  useFrame((state, delta) => {
    // Smooth dampening towards target mouse coordinates
    const dx = mouse.current.targetX - mouse.current.x;
    const dy = mouse.current.targetY - mouse.current.y;

    if (Math.abs(dx) > 0.0005 || Math.abs(dy) > 0.0005) {
      mouse.current.x += dx * 0.05;
      mouse.current.y += dy * 0.05;

      if (meshRef.current) {
        meshRef.current.rotation.y = mouse.current.x * 0.8 + state.clock.elapsedTime * 0.03;
        meshRef.current.rotation.x = -mouse.current.y * 0.5;
      }

      if (ringRef.current) {
        ringRef.current.rotation.z = state.clock.elapsedTime * 0.02;
      }

      invalidate();
    }
  });

  return (
    <group ref={meshRef} position={[2.8, -0.2, -1]}>
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
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
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
