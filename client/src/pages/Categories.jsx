import {
  Category as CategoryIcon,
  Devices as DevicesIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Categories = () => {
  const categories = [
    { name: 'Ceiling Fans', icon: <CategoryIcon className="text-[40px]" />, color: '#3B82F6' },
    { name: 'Split ACs', icon: <DevicesIcon className="text-[40px]" />, color: '#F97316' },
    { name: 'Window ACs', icon: <HomeIcon className="text-[40px]" />, color: '#8B5CF6' },
    { name: 'Tower Fans', icon: <CategoryIcon className="text-[40px]" />, color: '#10B981' },
    { name: 'Air Coolers', icon: <DevicesIcon className="text-[40px]" />, color: '#EC4899' },
    { name: 'Pedestal Fans', icon: <CategoryIcon className="text-[40px]" />, color: '#6B7280' },
  ];

  return (
    <div className="py-8 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">
          Shop by Category
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {categories.map((category) => (
            <RouterLink
              key={category.name}
              to={`/categories/${category.name.toLowerCase()}`}
              className="bg-white p-6 rounded-lg shadow transition-transform transform hover:-translate-y-2 hover:shadow-xl flex flex-col items-center gap-4 text-gray-800 text-center no-underline"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center transition-transform icon"
                style={{
                  backgroundColor: `${category.color}15`,
                  color: category.color,
                }}
              >
                {category.icon}
              </div>
              <h2 className="text-lg font-semibold">{category.name}</h2>
            </RouterLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
