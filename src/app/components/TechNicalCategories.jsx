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

  const renderCategories = () => {
    const rows = [];
    for (let i = 0; i < categories.length; i += 4) {
      const rowCategories = categories.slice(i, i + 4);
      rows.push(
        <div key={i}  className="mt-[5vh] flex flex-row gap-6 justify-center w-[70%]">
          {rowCategories.map((category, index) => (
            <div key={i + index} className="relative h-[40vh] w-[25vh] rounded-[8%] overflow-hidden group shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.9)] transition-shadow duration-300">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="font-poppins absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-end justify-center">
                <h3 className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-15 group-hover:translate-y-0 px-2 pb-4">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="flex flex-col gap-6 mt-[5vh] justify-center items-center">
      {renderCategories()}
    </div>
  );
};

export default TechNicalCategories;













