'use client';

import React from 'react';

const CategoryBox = ({ image, name, itemCount }) => {
  return (
    <div className="relative w-48 h-48 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="w-full h-32 bg-white flex items-center justify-center">
        <img 
          src={image} 
          alt={name}
          className="w-20 h-20 object-contain"
        />
      </div>
      <div className="p-4 text-center bg-white">
        <h3 className="font-sans font-semibold text-base">{name}</h3>
        <p className="font-sans text-sm text-gray-600">{itemCount} items</p>
      </div>
    </div>
  );
};

export default function Categories() {
  const categories = [
    { 
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png", 
      name: "Programming", 
      itemCount: 25 
    },
    { 
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png", 
      name: "Design", 
      itemCount: 18 
    },
    { 
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", 
      name: "Business", 
      itemCount: 32 
    },
    { 
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968525.png", 
      name: "Marketing", 
      itemCount: 15 
    },
    { 
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png", 
      name: "Programming", 
      itemCount: 25 
    },
    { 
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png", 
      name: "Design", 
      itemCount: 18 
    },
    { 
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", 
      name: "Business", 
      itemCount: 32 
    },
    { 
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968525.png", 
      name: "Marketing", 
      itemCount: 15 
    },
  ];

  return (
    <div className="container mx-auto px-4 -mt-8">
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-12">
          {categories.map((category, index) => (
            <CategoryBox
              key={index}
              image={category.image}
              name={category.name}
              itemCount={category.itemCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
