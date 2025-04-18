import {
  Security,
  LocalShipping,
  SupportAgent,
  Payments,
} from '@mui/icons-material';

const About = () => {
  const features = [
    {
      icon: <Security className="text-4xl" />,
      title: 'Secure Shopping',
      description:
        'Your security is our top priority. We use industry-leading encryption to protect your data.',
    },
    {
      icon: <LocalShipping className="text-4xl" />,
      title: 'Fast Delivery',
      description:
        'Get your orders delivered quickly and efficiently with our reliable shipping partners.',
    },
    {
      icon: <SupportAgent className="text-4xl" />,
      title: '24/7 Support',
      description:
        'Our customer support team is always ready to help you with any questions or concerns.',
    },
    {
      icon: <Payments className="text-4xl" />,
      title: 'Secure Payments',
      description:
        'Multiple payment options available with secure transaction processing.',
    },
  ];

  const stats = [
    { number: '1M+', label: 'Happy Customers' },
    { number: '50K+', label: 'Products Available' },
    { number: '100+', label: 'Brands' },
    { number: '30+', label: 'Countries Served' },
  ];

  return (
    <div className="py-8 md:py-16 bg-white text-gray-800">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent mb-4">
          Your Trusted Shopping Destination
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          We're dedicated to providing you with the best online shopping experience,
          offering quality products at competitive prices with exceptional customer service.
        </p>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white shadow-md p-6 rounded-lg text-center hover:-translate-y-2 transition-transform"
          >
            <p className="text-3xl font-bold text-blue-500 mb-2">{stat.number}</p>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white shadow-md p-6 rounded-lg text-center flex flex-col items-center transition-all hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 transition-transform transform hover:scale-110">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-4 mt-20 text-center">
        <div className="border-b border-gray-300 mb-10" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg">
          We strive to revolutionize the online shopping experience by providing
          a seamless platform that connects quality products with discerning customers.
          Our commitment to excellence, sustainability, and customer satisfaction
          drives everything we do.
        </p>
      </div>
    </div>
  );
};

export default About;
