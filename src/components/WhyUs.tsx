import React, { useEffect, useRef, useState } from 'react';
import { Award, Shield, Recycle } from 'lucide-react';

const WhyUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Award,
      title: "Pure Tyre Oil",
      description: "Our tire oil is pure and unadulterated, with no synthetic additives that could compromise performance and quality."
    },
    {
      icon: Shield,
      title: "Quality",
      description: "We ensure the strictest standards in manufacturing, with rigorous quality control measures and certifications."
    },
    {
      icon: Recycle,
      title: "Sustainable",
      description: "Our processes are environmentally friendly, prioritizing sustainability while reducing the manufacturing footprint from waste."
    }
  ];

  return (
    <section id="why-us" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Our Product Is The Best
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A 5-star team, quality control measures, and ethical business practices 
              that has earned us trust and appreciation from our customers within the 
              short span of time. Diligence and dedication of our team and strict 
              adherence to quality standards have made us stand solidly at this highly 
              competitive scenario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`group text-center p-8 bg-gray-50 rounded-xl hover:bg-teal-50 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-200 transition-colors duration-300">
                    <Icon className="w-10 h-10 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;