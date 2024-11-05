'use client'

import { useEffect, useState } from 'react'
import { products, categories } from './Product-data'
import Image from 'next/image'

export default function SuggestionSlider() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || '')
  const [filteredProducts, setFilteredProducts] = useState(products || [])

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(product => product.category === selectedCategory)
      setFilteredProducts(filtered)
    }
  }, [selectedCategory])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedCategory(prevCategory => {
        const currentIndex = categories.indexOf(prevCategory)
        const nextIndex = (currentIndex + 1) % categories.length
        return categories[nextIndex]
      })
    }, 3000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Explore Top Products From Best Brands
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-48 shrink-0">
          <div className="flex flex-col gap-2 sticky top-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full px-4 py-3 text-left rounded-lg transition-colors
                  ${
                    selectedCategory === category
                      ? 'bg-gray-400 text-black font-medium'
                      : 'bg-gray-100 text-black hover:bg-gray-400'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="flex gap-4 pb-4 flex-wrap">
            {filteredProducts.map((product) => (
              <div key={product.id} className="w-[200px] shrink-0 border rounded-lg overflow-hidden">
                <div className="relative">
                  <div className="absolute top-2 left-2 bg-white text-black px-2 py-1 rounded-md text-xs">
                    {product.title}
                  </div>
                  <a href={product.route} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={200} // Set an appropriate width
                      height={200} // Set an appropriate height
                      className="w-full aspect-square object-cover"
                    />
                  </a>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">
                      {product.options || 'No options available'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
