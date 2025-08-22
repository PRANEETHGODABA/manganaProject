import React, { useEffect, useRef, useState } from 'react';
import { Factory } from 'lucide-react';

const Manufacturing: React.FC = () => {
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

  return (
    <section id="manufacturing" ref={sectionRef} className="py-20 bg-gradient-to-br from-teal-900 to-blue-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Manufacturing Process
            </h2>
            <div className="w-24 h-1 bg-teal-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-teal-200 mb-4">
                Advanced Manufacturing Techniques
              </h3>
              
              <p className="text-lg text-white/90 leading-relaxed">
                Our manufacturing process employs cutting-edge technology and 
                lean atmosphere to closed loop systems. Our Manufacturing Process have in-conducive controls 
                as you seen that it is positioned every minute. But human formula is made sure that the following 
                elements as at a safety gears are always effectively to keep the environment safe and 
                sustainable.
              </p>

              <p className="text-lg text-white/90 leading-relaxed">
                During the Pyrolysis process the oil r&s are Converted into Pyrolyzed Coal Oil, Carbon Clay and 
                Gas Waste, assuring saving on environmental balance.
              </p>

              <p className="text-lg text-white/90 leading-relaxed">
                We have one of the leading production capacities world wide to give you a outlook of the same, 
                we consume about 200MTPD of Tyres and we can produce about 100MTPD and our balance 
                produced is Carbon and Gas. We also produce high-quality rubber products across different Tyre 
                Wires.
              </p>

              <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg">
                <Factory className="w-12 h-12 text-teal-400 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-2">State-of-the-Art Facility</h4>
                  <p className="text-white/80">Modern equipment and processes ensuring consistent quality</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Industrial manufacturing"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/30 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-6 rounded-lg shadow-xl">
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm">MTPD Capacity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manufacturing;