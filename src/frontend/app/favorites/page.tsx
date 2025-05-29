'use client'

import Link from 'next/link'
import { Heart, ShoppingCart, TrendingDown, ArrowLeft } from 'lucide-react'
import { sampleProducts } from '@/data/products'
import { useFavorites, useCart } from '@/contexts/AppContext'

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites()
  const { addToCart } = useCart()

  const favoriteProducts = sampleProducts.filter(product => favorites.includes(product.id))

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Favori Ürününüz Yok</h1>
            <p className="text-gray-600 mb-8">
              Beğendiğiniz ürünleri favorilere ekleyerek kolayca takip edebilirsiniz!
            </p>
            <Link 
              href="/products"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
            >
              <span>Ürünleri Keşfet</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link 
            href="/products"
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Favorilerim</h1>
            <p className="text-gray-600">{favoriteProducts.length} favori ürün</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => {
            const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price)
            const cheapestPrice = sortedPrices[0]
            const mostExpensivePrice = sortedPrices[sortedPrices.length - 1]
            const savings = mostExpensivePrice.price - cheapestPrice.price

            return (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Product Image */}
                <Link href={`/products/detail/${product.id}`}>
                  <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 relative">
                    <div className="w-full h-48 flex items-center justify-center">
                      <span className="text-4xl text-gray-400">📦</span>
                    </div>
                    
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite(product.id)
                      }}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                      <Heart className="w-5 h-5 text-red-600 fill-current" />
                    </button>

                    {/* Savings Badge */}
                    {savings > 0 && (
                      <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        ₺{savings.toFixed(2)} tasarruf
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-6">
                  <Link href={`/products/detail/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {product.category} • {product.subcategory}
                  </p>

                  {/* Price Info */}
                  <div className="mb-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-green-600">
                        ₺{cheapestPrice.price.toFixed(2)}
                      </span>
                      {savings > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                          ₺{mostExpensivePrice.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">En düşük: {cheapestPrice.store}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Link 
                      href={`/products/detail/${product.id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                    >
                      Karşılaştır
                    </Link>
                    <button
                      onClick={() => addToCart(product, cheapestPrice.store)}
                      className="p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 