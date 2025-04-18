import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-10">
          Our Products
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-sm animate-pulse min-h-[400px] flex flex-col"
                >
                  <div className="h-44 bg-gray-200 rounded-t-lg"></div>
                  <div className="flex flex-col p-4 flex-grow">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-5 bg-gray-300 rounded w-1/2 mt-auto"></div>
                  </div>
                </div>
              ))
            : products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 flex flex-col min-h-[400px]"
                >
                  <div className="relative pt-[75%] overflow-hidden rounded-t-lg bg-gray-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col p-4 flex-grow">
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1 mb-2 line-clamp-3">
                      {product.description}
                    </p>
                    <p className="text-blue-600 text-lg font-semibold mb-4">
                      ${product.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="mt-auto bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
