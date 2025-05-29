'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Search, Store } from 'lucide-react'
import { storeCategories, sampleStores } from '@/data/stores'

export default function StoresPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStores = sampleStores.filter(store => {
    const matchesCategory = !selectedCategory || store.category === selectedCategory
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mağazalar</h1>
          <p className="text-lg text-gray-600">
            Tüm popüler mağazaları keşfedin ve en yakınlarını bulun
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Store Categories */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="card sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Store className="w-5 h-5 mr-2" />
                Kategoriler
              </h2>
              
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition duration-200 ${
                    !selectedCategory 
                      ? 'bg-primary-100 text-primary-700 font-medium' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  Tüm Kategoriler
                </button>
                
                {storeCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition duration-200 flex items-center ${
                      selectedCategory === category.id
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="mr-2">{category.emoji}</span>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-gray-500">
                        {category.stores.length} mağaza
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search */}
            <div className="card mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Mağaza ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <span className="text-sm text-gray-600">
                  {filteredStores.length} mağaza bulundu
                </span>
              </div>
            </div>

            {/* Store Categories Grid */}
            {!selectedCategory && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Kategoriler</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {storeCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className="card card-hover text-center p-6 group"
                    >
                      <div className="text-4xl mb-2">{category.emoji}</div>
                      <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition duration-200 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {category.stores.length} mağaza
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stores List */}
            <div className="space-y-4">
              {selectedCategory && (
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                      {storeCategories.find(c => c.id === selectedCategory)?.name} Mağazaları
                    </h2>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      Tümünü Gör
                    </button>
                  </div>
                </div>
              )}

              {selectedCategory ? (
                // Show stores by selected category
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {storeCategories
                    .find(c => c.id === selectedCategory)
                    ?.stores.map((storeName) => (
                    <div key={storeName} className="card card-hover">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Store className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{storeName}</h3>
                          <p className="text-sm text-gray-600">
                            {storeCategories.find(c => c.id === selectedCategory)?.name}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-500 mb-4">
                        Birden fazla lokasyon
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link
                          href={`/stores/${storeName.toLowerCase().replace(/\s+/g, '-')}`}
                          className="btn-primary flex-1 text-center text-sm"
                        >
                          Lokasyonları Gör
                        </Link>
                        <button className="btn-secondary text-sm">
                          <MapPin className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Show actual store locations
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStores.map((store) => (
                    <div key={store.id} className="card card-hover">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Store className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{store.name}</h3>
                          <p className="text-sm text-gray-600">
                            {storeCategories.find(c => c.id === store.category)?.name}
                          </p>
                        </div>
                      </div>
                      
                      {store.location && (
                        <div className="mb-4">
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-900">{store.location.address}</p>
                              <p className="text-xs text-gray-500">2.5 km uzaklıkta</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <Link
                          href={`/stores/detail/${store.id}`}
                          className="btn-primary flex-1 text-center text-sm"
                        >
                          Ürünleri Gör
                        </Link>
                        <button className="btn-secondary text-sm">
                          <MapPin className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredStores.length === 0 && selectedCategory === null && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Arama kriterlerinize uygun mağaza bulunamadı.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 