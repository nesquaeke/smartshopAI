'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Search, MapPin, Store } from 'lucide-react'
import { storeCategories, sampleStores } from '@/data/stores'

export default function StoreCategoryPage() {
  const params = useParams()
  const categoryId = params.category as string
  
  const [searchTerm, setSearchTerm] = useState('')

  // Find the current store category
  const currentCategory = storeCategories.find(cat => cat.id === categoryId)
  
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Mağaza Kategorisi Bulunamadı</h1>
            <Link href="/stores" className="btn-primary">
              Mağazalara Dön
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Filter stores by category and search
  const categoryStores = currentCategory.stores.filter(storeName =>
    storeName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Also get actual store locations for this category
  const actualStoreLocations = sampleStores.filter(store => store.category === categoryId)

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
            <Link href="/stores" className="text-primary-600 hover:text-primary-700">
              Mağazalar
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
                {categoryStores.length} mağaza zinciri • {actualStoreLocations.length} lokasyon
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="card sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Store className="w-5 h-5 mr-2" />
                Filtreler
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Mağaza Tipi
                  </label>
                  <div className="text-sm text-gray-600">
                    {currentCategory.name} kategorisindeki tüm mağazalar
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Lokasyon
                  </label>
                  <div className="text-sm text-gray-600">
                    Warsaw ve çevresi
                  </div>
                </div>
              </div>

              {/* Back to Store Categories */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  href="/stores"
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
            {/* Search */}
            <div className="card mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={`${currentCategory.name} mağazalarında ara...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <span className="text-sm text-gray-600">
                  {categoryStores.length} mağaza zinciri bulundu
                </span>
              </div>
            </div>

            {/* Store Chains */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Mağaza Zincirleri</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryStores.map((storeName) => (
                  <div key={storeName} className="card card-hover group">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition duration-200">
                        <Store className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition duration-200">
                          {storeName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {currentCategory.name}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-4">
                      Birden fazla lokasyon
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link
                        href={`/stores/detail/${storeName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                        className="btn-primary flex-1 text-center text-sm group-hover:bg-primary-700 transition duration-200"
                      >
                        Lokasyonları Gör
                      </Link>
                      <button className="btn-secondary text-sm group-hover:border-primary-300 transition duration-200">
                        <MapPin className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actual Store Locations */}
            {actualStoreLocations.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Yakındaki Lokasyonlar
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {actualStoreLocations.map((store) => (
                    <div key={store.id} className="card card-hover group">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition duration-200">
                          <Store className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition duration-200">
                            {store.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {currentCategory.name}
                          </p>
                        </div>
                      </div>
                      
                      {store.location && (
                        <div className="mb-4">
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-900">{store.location.address}</p>
                              <p className="text-xs text-gray-500">2.5 km uzaklıkta • 8 dk</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <Link
                          href={`/stores/detail/${store.id}`}
                          className="btn-primary flex-1 text-center text-sm group-hover:bg-primary-700 transition duration-200"
                        >
                          Ürünleri Gör
                        </Link>
                        <button className="btn-secondary text-sm group-hover:border-primary-300 transition duration-200">
                          <MapPin className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {categoryStores.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏪</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Mağaza Bulunamadı</h3>
                <p className="text-gray-500 mb-6">
                  "{currentCategory.name}" kategorisinde 
                  {searchTerm && ` "${searchTerm}" aramasına`} uygun mağaza bulunamadı.
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="btn-secondary"
                  >
                    Aramayı Temizle
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 