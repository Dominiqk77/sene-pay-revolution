
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Composant Globe simplifié avec géométrie optimisée
const Globe = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  
  // Rotation automatique optimisée
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001; // Rotation plus lente pour économiser les ressources
    }
  });

  // Géométrie simplifiée pour de meilleures performances
  const earthGeometry = useMemo(() => new THREE.SphereGeometry(2, 32, 32), []); // Réduit de 64x64 à 32x32
  const earthMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: '#1a365d',
    transparent: true,
    opacity: 0.7,
    shininess: 80,
  }), []);

  return (
    <mesh ref={globeRef} geometry={earthGeometry} material={earthMaterial}>
      {/* Atmosphère simplifiée */}
      <Sphere args={[2.05, 16, 16]}>
        <meshBasicMaterial 
          color="#4a90e2" 
          transparent 
          opacity={0.08} 
          side={THREE.BackSide} 
        />
      </Sphere>
    </mesh>
  );
};

// Composant pour les particules optimisé
const TransactionParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  // Réduction drastique du nombre de particules (25 au lieu de 100)
  const particles = useMemo(() => {
    const count = 25; // Réduit significativement
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Positions focalisées sur l'Afrique
      const phi = Math.random() * Math.PI * 0.6 + Math.PI * 0.2;
      const theta = Math.random() * Math.PI * 0.4 + Math.PI * 0.8;
      const radius = 2.1 + Math.random() * 0.3;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      
      // Couleurs : plus de particules dorées pour le Sénégal
      const isSenegal = Math.random() < 0.4;
      if (isSenegal) {
        colors[i * 3] = 0.96; // R - couleur or
        colors[i * 3 + 1] = 0.62; // G
        colors[i * 3 + 2] = 0.04; // B
      } else {
        colors[i * 3] = 0.02; // R - couleur verte
        colors[i * 3 + 1] = 0.59; // G
        colors[i * 3 + 2] = 0.4; // B
      }
    }
    
    return { positions, colors };
  }, []);
  
  // Animation simplifiée
  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime();
      particlesRef.current.rotation.y = time * 0.05; // Plus lent
      
      // Effet de pulsation réduit
      const scale = 1 + Math.sin(time) * 0.05;
      particlesRef.current.scale.setScalar(scale);
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
};

// Composant de fallback CSS si WebGL échoue
const FallbackBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-green-900/20 animate-pulse"></div>
      <div className="absolute inset-0">
        {/* Particules CSS animées */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-pulse ${
              i % 3 === 0 ? 'bg-senepay-gold' : 'bg-senepay-green'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Composant principal avec gestion d'erreurs
const GlobeBackground = () => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  // Détection WebGL et capacités de l'appareil
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setHasWebGL(false);
        return;
      }

      // Détection d'appareil faible (mobile avec peu de mémoire)
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
      
      if (isMobile && hasLowMemory) {
        setShouldRender(false);
      }
    } catch (error) {
      console.warn('WebGL detection failed:', error);
      setHasWebGL(false);
    }
  }, []);

  // Si pas de WebGL ou appareil faible, utiliser le fallback
  if (!hasWebGL || !shouldRender) {
    return <FallbackBackground />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{
          background: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
        gl={{ 
          antialias: false, // Désactivé pour de meilleures performances
          alpha: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          // Configuration WebGL optimisée
          gl.setClearColor(0x000000, 0);
        }}
      >
        {/* Éclairage simplifié */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[3, 3, 3]} 
          intensity={0.8}
          color="#F59E0B"
        />
        
        {/* Globe terrestre optimisé */}
        <Globe />
        
        {/* Particules de transaction réduites */}
        <TransactionParticles />
      </Canvas>
    </div>
  );
};

export default GlobeBackground;
