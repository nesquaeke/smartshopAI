'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, Grid, List, TrendingDown, Heart, ShoppingCart, Star } from 'lucide-react'
import { sampleProducts, categories } from '@/data/products'
import { useCart, useFavorites } from '@/contexts/AppContext'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  // Filter and sort products
  const filteredProducts = sampleProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return Math.min(...a.prices.map(p => p.price)) - Math.min(...b.prices.map(p => p.price))
        case 'price-high':
          return Math.min(...b.prices.map(p => p.price)) - Math.min(...a.prices.map(p => p.price))
        case 'savings':
          const aSavings = Math.max(...a.prices.map(p => p.price)) - Math.min(...a.prices.map(p => p.price))
          const bSavings = Math.max(...b.prices.map(p => p.price)) - Math.min(...b.prices.map(p => p.price))
          return bSavings - aSavings
        default:
          return a.name.localeCompare(b.name)
      }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tüm Ürünler</h1>
          <p className="text-xl text-gray-600">{filteredProducts.length} ürün bulundu</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tüm Kategoriler</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.emoji} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="w-full lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">İsim (A-Z)</option>
                <option value="price-low">Fiyat (Düşük-Yüksek)</option>
                <option value="price-high">Fiyat (Yüksek-Düşük)</option>
                <option value="savings">En Çok Tasarruf</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
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
                        <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'text-red-600 fill-current' : 'text-gray-400'}`} />
                      </button>

                      {/* Savings Badge */}
                      {savings > 0 && (
                        <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                          <TrendingDown className="w-4 h-4 mr-1" />
                          ₺{savings.toFixed(2)}
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
                      <p className="text-xs text-blue-600 font-medium">{product.prices.length} mağazada</p>
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
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredProducts.map((product) => {
              const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price)
              const cheapestPrice = sortedPrices[0]
              const mostExpensivePrice = sortedPrices[sortedPrices.length - 1]
              const savings = mostExpensivePrice.price - cheapestPrice.price

              return (
                <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center space-x-6">
                    {/* Product Image */}
                    <Link href={`/products/detail/${product.id}`}>
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl text-gray-400">📦</span>
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Link href={`/products/detail/${product.id}`}>
                            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors truncate">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-gray-600 mt-1">
                            {product.category} • {product.subcategory}
                          </p>
                          <p className="text-sm text-blue-600 font-medium mt-2">
                            {product.prices.length} mağazada karşılaştırıldı
                          </p>
                        </div>

                        {/* Price & Actions */}
                        <div className="flex items-center space-x-6 ml-4">
                          <div className="text-right">
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
                            <p className="text-sm text-gray-600">{cheapestPrice.store}</p>
                            {savings > 0 && (
                              <p className="text-sm text-green-600 font-semibold">
                                ₺{savings.toFixed(2)} tasarruf
                              </p>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleFavorite(product.id)}
                              className="p-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                            >
                              <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'text-red-600 fill-current' : 'text-gray-400'}`} />
                            </button>
                            
                            <button
                              onClick={() => addToCart(product, cheapestPrice.store)}
                              className="p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                              <ShoppingCart className="w-5 h-5" />
                            </button>
                            
                            <Link 
                              href={`/products/detail/${product.id}`}
                              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                            >
                              Karşılaştır
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ürün Bulunamadı</h2>
            <p className="text-gray-600 mb-8">
              Arama kriterlerinizi değiştirmeyi deneyin.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('')
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 