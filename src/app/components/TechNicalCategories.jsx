import React from 'react';

const TechNicalCategories = () => {
  const categories = [
    { 
      name: "Frontend Development", 
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=200&h=400&fit=crop&crop=center" 
    },
    { 
      name: "Backend Development", 
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=200&h=400&fit=crop&crop=center" 
    },
    { 
      name: "Mobile Development", 
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=400&fit=crop&crop=center" 
    },
    { 
      name: "Data Science", 
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=400&fit=crop&crop=center" 
    },
    { 
      name: "DevOps", 
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=200&h=400&fit=crop&crop=center" 
    }
  ];

  return (
    <div className="flex flex-col gap-6 mt-8 lg:mt-[5vh] justify-center items-center px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full max-w-6xl">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="relative h-48 sm:h-56 lg:h-[40vh] w-full lg:w-[25vh] rounded-lg lg:rounded-[8%] overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 mx-auto"
            style={{ boxShadow: '0 0 20px rgba(168,85,247,0.5)' }}
          >
            <img 
              src={category.image} 
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="font-poppins absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-end justify-center">
              <h3 className="text-white text-lg sm:text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 px-2 pb-4 text-center">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechNicalCategories;













