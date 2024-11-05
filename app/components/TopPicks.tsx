import React from 'react';
import Image from 'next/image';

const TopPicks = () => {
  const categories = [
    { 
      name: "Sofa Sets", 
      href: "#",
      image: "https://plchldr.co/i/500x250?bg=111111"
    },
    { 
      name: "Beds", 
      href: "#",
      image: "https://plchldr.co/i/500x250?bg=111111"
    },
    { 
      name: "Dinning Tables", 
      href: "#",
      image: "https://plchldr.co/i/500x250?bg=111111"
    },
    { 
      name: "Tiles", 
      href: "#",
      image: "https://plchldr.co/i/500x250?bg=111111"
    },
    { 
      name: "Home Decor", 
      href: "#",
      image: "https://plchldr.co/i/500x250?bg=111111"
    },
    { 
      name: "Chairs", 
      href: "#",
      image: "https://plchldr.co/i/500x250?bg=111111"
    },
    { 
      name: "Tables", 
      href: "#",
      image: "https://plchldr.co/i/500x250?bg=111111"
    },
    { 
      name: "Wardrobes", 
      href: "#",
      image: "https://plchldr.co/i/500x250?bg=111111"
    },
    { 
      name: "Lighting", 
      href: "#",
      image: "https://plchldr.co/i/500x250?bg=111111"
    },
    { 
      name: "Kitchen", 
      href: "#",
      image: "https://plchldr.co/i/500x250?bg=111111"
    }
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Top Picks For You</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 justify-items-center">
        {categories.map((category, index) => (
          <a
            key={index}
            href={category.href}
            className="group flex flex-col items-center gap-2 w-full max-w-[200px]"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={category.image}
                alt={category.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="text-sm font-medium text-center">{category.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default TopPicks;
