'use client';
import React, { useRef } from 'react';
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from 'lucide-react';

export default function CategoryBar() {
  const categories = [
    { name: 'Furnitures', link: '/furnitures' },
    { name: 'Walls/Ceiling', link: '/walls-ceiling' },
    { name: 'Decor', link: '/decor' },
    { name: 'Floor', link: '/floor' },
    { name: 'Paints', link: '/paints' },
    { name: 'Kitchen', link: '/kitchen' },
    { name: 'Electronics', link: '/electronics' },
    { name: 'Lighting', link: '/lighting' },
    { name: 'Bathroom', link: '/bathroom' },
  ];

  const scrollRef = useRef<HTMLUListElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="categoryBar"
      className="flex items-center justify-center h-16 w-full border-y-2 border-[#909090]"
    >
      <div className="flex items-center space-x-2 px-4 md:px-8 lg:px-12 py-6 max-w-4xl w-full ">
        <ChevronLeftCircleIcon
          onClick={scrollLeft}
          className="cursor-pointer text-gray-500 hover:text-gray-700"
          size={24}
        />
        
        <div className="overflow-hidden w-full">
          <ul
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto px-4 scrollbar-hide"
          >
            {categories.map((category, index) => (
              <li key={index} className="whitespace-nowrap">
                <a href={category.link} className="text-sm md:text-base">
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <ChevronRightCircleIcon
          onClick={scrollRight}
          className="cursor-pointer text-gray-500 hover:text-gray-700"
          size={24}
        />
      </div>
    </section>
  );
}
