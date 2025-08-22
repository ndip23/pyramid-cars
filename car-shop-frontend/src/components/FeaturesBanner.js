// src/components/FeaturesBanner.jsx

import { FaCog, FaShippingFast, FaHeadset } from 'react-icons/fa';

const features = [
  {
    icon: <FaCog className="text-primary-red text-4xl" />,
    title: 'Genuine Spare Parts',
    description: 'Quality parts you can trust for your car.',
  },
  {
    icon: <FaShippingFast className="text-primary-red text-4xl" />,
    title: 'Delivery in Douala & Yaoundé',
    description: 'Fast and reliable delivery to your doorstep.',
  },
  {
    icon: <FaHeadset className="text-primary-red text-4xl" />,
    title: 'WhatsApp Support',
    description: 'Quickly get help and answers from our team.',
  },
];

const FeaturesBanner = () => {
  return (
    <div className="bg-dark-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-light-text">{feature.title}</h3>
                <p className="text-secondary-text">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesBanner;