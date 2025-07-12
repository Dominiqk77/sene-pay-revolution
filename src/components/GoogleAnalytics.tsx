import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface GoogleAnalyticsProps {
  trackingId?: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ 
  trackingId = 'G-SENEPAY2025' 
}) => {
  useEffect(() => {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    // Configure GA4
    window.gtag('js', new Date());
    window.gtag('config', trackingId, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        'custom_parameter_1': 'payment_method',
        'custom_parameter_2': 'merchant_type',
        'custom_parameter_3': 'integration_type'
      }
    });

    // Enhanced E-commerce Events pour SenePay
    window.gtag('config', trackingId, {
      enhanced_ecommerce: true,
      send_page_view: true,
      transport_type: 'beacon'
    });

    // Track Core Web Vitals automatiquement
    const trackWebVitals = () => {
      try {
        // Fonction simple pour tracking sans import externe
        if ('PerformanceObserver' in window) {
          // Mesurer LCP (Largest Contentful Paint)
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'LCP',
              value: Math.round(lastEntry.startTime),
              non_interaction: true
            });
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // Mesurer FID (First Input Delay)
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const fidEntry = entry as any;
              window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'FID',
                value: Math.round(fidEntry.processingStart ? fidEntry.processingStart - fidEntry.startTime : 0),
                non_interaction: true
              });
            }
          });
          try {
            fidObserver.observe({ entryTypes: ['first-input'] });
          } catch (e) {
            console.log('FID tracking not supported');
          }
        }
      } catch (error) {
        console.log('Web Vitals tracking not available');
      }
    };

    trackWebVitals();
    // Track business events spécifiques SenePay
    const trackSenePayEvents = () => {
      // API Documentation views
      if (window.location.pathname.includes('/api-') || window.location.pathname.includes('/documentation')) {
        window.gtag('event', 'api_documentation_view', {
          event_category: 'API Engagement',
          event_label: window.location.pathname,
          value: 1
        });
      }

      // Payment method interest tracking
      const paymentButtons = document.querySelectorAll('[data-payment-method]');
      paymentButtons.forEach(button => {
        button.addEventListener('click', () => {
          const method = button.getAttribute('data-payment-method');
          window.gtag('event', 'payment_method_interest', {
            event_category: 'Payment Methods',
            event_label: method,
            payment_method: method,
            value: 1
          });
        });
      });

      // Integration funnel tracking
      const integrationSteps = document.querySelectorAll('[data-integration-step]');
      integrationSteps.forEach(step => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const stepName = step.getAttribute('data-integration-step');
              window.gtag('event', 'integration_funnel', {
                event_category: 'Integration Journey',
                event_label: stepName,
                integration_step: stepName,
                value: 1
              });
            }
          });
        }, { threshold: 0.5 });
        
        observer.observe(step);
      });
    };

    // Initialize tracking after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', trackSenePayEvents);
    } else {
      trackSenePayEvents();
    }

  }, [trackingId]);

  return (
    <Helmet>
      {/* Google Analytics 4 */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
      
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="senepay-seo-verification-2025" />
      
      {/* Additional SEO tracking scripts */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": ["h1", "h2", ".highlight-text"]
          },
          "lastReviewed": new Date().toISOString(),
          "mainContentOfPage": {
            "@type": "WebPageElement",
            "cssSelector": "main"
          }
        })}
      </script>
    </Helmet>
  );
};

export default GoogleAnalytics;