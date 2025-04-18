import { useState } from 'react';
import { Search, Sliders, Flame, Sparkles, TrendingUp } from 'lucide-react';

const Explore = () => {
  const [activeTab, setActiveTab] = useState(0);

  const trendingSearches = [
    'Energy Efficient ACs', 'Smart Cooling', 'Inverter Split AC',
    'Designer Fans', 'Air Coolers', 'Industrial Fans'
  ];

  const featuredCollections = [
    {
      title: 'Smart Cooling Solutions',
      description: 'Wi-Fi enabled ACs with advanced features',
      image: 'https://4.imimg.com/data4/WM/BQ/MY-6515166/wall-moutned-air-conditioner-500x500.jpg',
      tags: ['Smart', 'Trending']
    },
    {
      title: 'Premium Fans',
      description: 'Elegant ceiling fans with modern designs',
      image: 'https://m.media-amazon.com/images/I/61ZQ-K83GjL._AC_UF894,1000_QL80_.jpg',
      tags: ['Featured', 'New']
    },
    {
      title: 'Portable Cooling',
      description: 'Compact coolers and fans for any space',
      image: 'https://mustgrab.in/cdn/shop/files/71U98QDH3qS._SX679.jpg?v=1712916610',
      tags: ['Portable', 'Popular']
    }
  ];

  const tabs = [
    { icon: <Flame className="w-4 h-4 mr-1" />, label: 'Popular' },
    { icon: <Sparkles className="w-4 h-4 mr-1" />, label: 'New Arrivals' },
    { icon: <TrendingUp className="w-4 h-4 mr-1" />, label: 'Trending' }
  ];

  return (
    <div className="py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Explore Products</h1>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="flex items-center border border-gray-300 rounded-lg bg-white px-4 py-2 shadow-sm">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search products, brands, and categories..."
              className="w-full outline-none text-sm"
            />
            <button>
              <Sliders className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Trending Searches */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-3">Trending Searches</h2>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((search) => (
              <button
                key={search}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-blue-600 hover:text-white transition"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-4 border-b">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center px-4 py-2 text-sm font-medium ${
                  activeTab === index
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Collections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredCollections.map((collection) => (
            <div
              key={collection.title}
              className="bg-white rounded-xl shadow-md hover:-translate-y-2 hover:shadow-xl transition transform duration-300 flex flex-col"
            >
              <div className="relative pt-[56.25%]">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-t-xl"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-1">
                  {collection.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {collection.description}
                </p>
                <div className="flex gap-2 mt-auto">
                  {collection.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-blue-100 text-blue-600 rounded-full px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
