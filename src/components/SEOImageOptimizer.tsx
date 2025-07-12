import React, { useState, useEffect } from 'react';

interface SEOImageOptimizerProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

const SEOImageOptimizer: React.FC<SEOImageOptimizerProps> = ({
  src,
  alt,
  title,
  className = '',
  width,
  height,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);

  // Intersection Observer pour lazy loading
  useEffect(() => {
    if (!imgRef || priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(imgRef);
        }
      },
      {
        rootMargin: '50px'
      }
    );

    observer.observe(imgRef);

    return () => {
      if (imgRef) {
        observer.unobserve(imgRef);
      }
    };
  }, [imgRef, priority, isInView]);

  // Génération des srcsets pour différentes tailles
  const generateSrcSet = (baseSrc: string) => {
    const extensions = ['.webp', '.avif'];
    const sizes = [320, 640, 768, 1024, 1280, 1600];
    
    // Si c'est déjà une image optimisée ou externe, pas de transformation
    if (baseSrc.includes('http') || baseSrc.includes('.webp') || baseSrc.includes('.avif')) {
      return baseSrc;
    }
    
    // Générer les srcsets pour différentes tailles
    return sizes.map(size => `${baseSrc}?w=${size}&q=75 ${size}w`).join(', ');
  };

  const generateWebPSrc = (baseSrc: string) => {
    if (baseSrc.includes('http') || baseSrc.includes('.webp')) {
      return baseSrc;
    }
    return baseSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  const generateAvifSrc = (baseSrc: string) => {
    if (baseSrc.includes('http') || baseSrc.includes('.avif')) {
      return baseSrc;
    }
    return baseSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '.avif');
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder pendant le chargement */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      {/* Image optimisée avec formats modernes */}
      {isInView && (
        <picture>
          {/* Format AVIF pour les navigateurs compatibles */}
          <source
            srcSet={generateSrcSet(generateAvifSrc(src))}
            sizes={sizes}
            type="image/avif"
          />
          
          {/* Format WebP pour les navigateurs compatibles */}
          <source
            srcSet={generateSrcSet(generateWebPSrc(src))}
            sizes={sizes}
            type="image/webp"
          />
          
          {/* Format original en fallback */}
          <img
            ref={setImgRef}
            src={src}
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            alt={alt}
            title={title}
            width={width}
            height={height}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            // SEO attributes
            itemProp="image"
          />
        </picture>
      )}
      
      {/* Image placeholder pour le lazy loading */}
      {!isInView && !priority && (
        <div
          className="bg-gray-100"
          style={{ width, height }}
          aria-label={`Chargement de l'image: ${alt}`}
        />
      )}
    </div>
  );
};

export default SEOImageOptimizer;