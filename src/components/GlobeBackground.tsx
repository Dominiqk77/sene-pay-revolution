
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Composant Globe 3D
const Globe = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  
  // Rotation automatique du globe
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002; // Rotation lente
    }
  });

  // Texture de la Terre (utilisation d'une texture simple pour éviter les problèmes de chargement)
  const earthGeometry = useMemo(() => new THREE.SphereGeometry(2, 64, 64), []);
  const earthMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: '#1a365d',
    transparent: true,
    opacity: 0.8,
    shininess: 100,
  }), []);

  return (
    <mesh ref={globeRef} geometry={earthGeometry} material={earthMaterial}>
      {/* Atmosphère du globe */}
      <Sphere args={[2.1, 32, 32]}>
        <meshBasicMaterial 
          color="#4a90e2" 
          transparent 
          opacity={0.1} 
          side={THREE.BackSide} 
        />
      </Sphere>
    </mesh>
  );
};

// Composant pour les particules de transaction
const TransactionParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  // Génération des positions des particules (concentrées sur l'Afrique/Sénégal)
  const particles = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Répartition géographique focalisée sur l'Afrique
      const phi = Math.random() * Math.PI; // 0 à π
      const theta = (Math.random() * 0.8 + 0.1) * Math.PI; // Focalisé sur l'Afrique
      const radius = 2.2 + Math.random() * 0.5;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      
      // Couleurs : or pour le Sénégal, vert pour les autres
      const isSenegal = Math.random() < 0.3; // 30% des particules représentent le Sénégal
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
  
  // Animation des particules
  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime();
      particlesRef.current.rotation.y = time * 0.1;
      
      // Effet de pulsation
      const scale = 1 + Math.sin(time * 2) * 0.1;
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
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Composant principal GlobeBackground
const GlobeBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{
          background: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      >
        {/* Éclairage */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1}
          color="#F59E0B" // Couleur or SenePay
        />
        <pointLight 
          position={[-5, -5, -5]} 
          intensity={0.5}
          color="#059669" // Couleur verte SenePay
        />
        
        {/* Globe terrestre */}
        <Globe />
        
        {/* Particules de transaction */}
        <TransactionParticles />
        
        {/* Étoiles d'arrière-plan */}
        <mesh>
          <sphereGeometry args={[50, 32, 32]} />
          <meshBasicMaterial 
            color="#0F172A" 
            side={THREE.BackSide}
            transparent
            opacity={0.3}
          />
        </mesh>
      </Canvas>
    </div>
  );
};

export default GlobeBackground;
