'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Filter, Search, Grid, List } from 'lucide-react'
import { categories, sampleProducts } from '@/data/products'

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.category as string
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Find the current category
  const currentCategory = categories.find(cat => cat.id === categoryId)
  
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Kategori Bulunamadı</h1>
            <Link href="/products" className="btn-primary">
              Ürünlere Dön
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Filter products by category and search
  const filteredProducts = sampleProducts.filter(product => {
    const matchesCategory = product.category === categoryId
    const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSubcategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-primary-600 hover:text-primary-700">
              Ana Sayfa
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-primary-600 hover:text-primary-700">
              Ürünler
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{currentCategory.name}</span>
          </nav>
        </div>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-4xl">{currentCategory.emoji}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{currentCategory.name}</h1>
              <p className="text-lg text-gray-600">
                {filteredProducts.length} ürün bulundu
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Subcategories */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="card sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Alt Kategoriler
              </h2>
              
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedSubcategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition duration-200 ${
                    !selectedSubcategory 
                      ? 'bg-primary-100 text-primary-700 font-medium' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  Tümü
                </button>
                
                {currentCategory.subcategories.map((subcategory) => {
                  const productCount = sampleProducts.filter(p => p.category === categoryId && p.subcategory === subcategory).length
                  
                  return (
                    <button
                      key={subcategory}
                      onClick={() => setSelectedSubcategory(subcategory)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition duration-200 ${
                        selectedSubcategory === subcategory
                          ? 'bg-primary-100 text-primary-700 font-medium'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{subcategory}</span>
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                          {productCount}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Back to Categories */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  href="/products"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Tüm Kategoriler
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and View Controls */}
            <div className="card mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={`${currentCategory.name} içinde ara...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {filteredProducts.length} ürün
                    {selectedSubcategory && (
                      <span className="ml-1">• {selectedSubcategory}</span>
                    )}
                  </span>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const lowestPrice = Math.min(...product.prices.filter(p => p.inStock).map(p => p.price))
                  const bestStore = product.prices.find(p => p.price === lowestPrice && p.inStock)
                  
                  return (
                    <div key={product.id} className="card card-hover group">
                      <div className="mb-4">
                        <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center group-hover:bg-gray-50 transition duration-200">
                          <span className="text-4xl">📦</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition duration-200">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600">{product.subcategory}</p>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-primary-600 mb-1">
                          {lowestPrice} PLN
                        </div>
                        <div className="text-sm text-gray-600">
                          En ucuz: {bestStore?.store}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-500 mb-4">
                        {product.prices.length} mağazada mevcut
                      </div>
                      
                      <Link
                        href={`/products/detail/${product.id}`}
                        className="btn-primary w-full text-center group-hover:bg-primary-700 transition duration-200"
                      >
                        Fiyatları Karşılaştır
                      </Link>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => {
                  const lowestPrice = Math.min(...product.prices.filter(p => p.inStock).map(p => p.price))
                  const highestPrice = Math.max(...product.prices.filter(p => p.inStock).map(p => p.price))
                  const bestStore = product.prices.find(p => p.price === lowestPrice && p.inStock)
                  
                  return (
                    <div key={product.id} className="card card-hover group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-50 transition duration-200">
                            <span className="text-2xl">📦</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition duration-200">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600">{product.subcategory}</p>
                            <p className="text-sm text-gray-500">{product.prices.length} mağazada mevcut</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-600">
                            {lowestPrice} PLN
                          </div>
                          <div className="text-sm text-gray-600">
                            En ucuz: {bestStore?.store}
                          </div>
                          {highestPrice > lowestPrice && (
                            <div className="text-xs text-red-600">
                              {((highestPrice - lowestPrice) / highestPrice * 100).toFixed(0)}% tasarruf
                            </div>
                          )}
                        </div>
                        
                        <Link
                          href={`/products/detail/${product.id}`}
                          className="btn-primary group-hover:bg-primary-700 transition duration-200"
                        >
                          Karşılaştır
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Ürün Bulunamadı</h3>
                <p className="text-gray-500 mb-6">
                  {selectedSubcategory ? `"${selectedSubcategory}"` : `"${currentCategory.name}"`} kategorisinde
                  {searchTerm && ` "${searchTerm}" aramasına`} uygun ürün bulunamadı.
                </p>
                <div className="flex justify-center space-x-4">
                  {selectedSubcategory && (
                    <button
                      onClick={() => setSelectedSubcategory(null)}
                      className="btn-secondary"
                    >
                      Tüm Alt Kategoriler
                    </button>
                  )}
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="btn-secondary"
                    >
                      Aramayı Temizle
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 