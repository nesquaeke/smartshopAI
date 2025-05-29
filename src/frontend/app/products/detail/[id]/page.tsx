'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, Heart, ShoppingCart, MapPin, Truck, Shield, TrendingDown, AlertCircle } from 'lucide-react'
import { sampleProducts } from '@/data/products'
import { useCart, useFavorites } from '@/contexts/AppContext'

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = sampleProducts.find(p => p.id === params.id)
  const [selectedStore, setSelectedStore] = useState('')
  const [quantity, setQuantity] = useState(1)
  
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ürün Bulunamadı</h1>
          <Link 
            href="/products" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ürünlere Geri Dön
          </Link>
        </div>
      </div>
    )
  }

  const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price)
  const cheapestPrice = sortedPrices[0]
  const mostExpensivePrice = sortedPrices[sortedPrices.length - 1]
  const savings = mostExpensivePrice.price - cheapestPrice.price

  const handleAddToCart = () => {
    if (selectedStore && product) {
      addToCart(product, selectedStore, quantity)
      // Show success notification or modal here
      alert(`${product.name} sepete eklendi! (${quantity} adet - ${selectedStore})`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-blue-600 transition-colors">Ürünler</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image & Info */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 p-8">
                <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center">
                  <span className="text-6xl text-gray-400">📦</span>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <p className="text-gray-600">Kategori: {product.category} • {product.subcategory}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`p-3 rounded-full transition-colors ${
                    isFavorite(product.id) 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Price Range */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">En Düşük Fiyat</p>
                    <p className="text-3xl font-bold text-green-600">₺{cheapestPrice.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{cheapestPrice.store}</p>
                  </div>
                  <div className="text-center">
                    <TrendingDown className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Tasarruf</p>
                    <p className="text-xl font-bold text-green-600">₺{savings.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Güvenli</p>
                  <p className="text-xs text-gray-600">Alışveriş</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Truck className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Hızlı</p>
                  <p className="text-xs text-gray-600">Teslimat</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">En İyi</p>
                  <p className="text-xs text-gray-600">Fiyat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Price Comparison & Purchase */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Fiyat Karşılaştırma</h2>
              
              <div className="space-y-4 mb-8">
                {sortedPrices.map((price, index) => (
                  <div 
                    key={price.store}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedStore === price.store 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    } ${!price.inStock ? 'opacity-50' : ''}`}
                    onClick={() => price.inStock && setSelectedStore(price.store)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedStore === price.store 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300'
                        }`} />
                        <div>
                          <p className="font-semibold text-gray-900">{price.store}</p>
                          <div className="flex items-center space-x-2">
                            {index === 0 && (
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                En Ucuz
                              </span>
                            )}
                            {!price.inStock && (
                              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Stokta Yok
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">₺{price.price.toFixed(2)}</p>
                        {index > 0 && (
                          <p className="text-sm text-red-600">
                            +₺{(price.price - cheapestPrice.price).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="border-t pt-6">
                <div className="flex items-center space-x-4 mb-6">
                  <label className="text-sm font-medium text-gray-700">Adet:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-medium text-gray-900">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!selectedStore}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>
                    {selectedStore 
                      ? `Sepete Ekle - ₺${(sortedPrices.find(p => p.store === selectedStore)?.price || 0) * quantity}` 
                      : 'Mağaza Seçin'
                    }
                  </span>
                </button>

                {selectedStore && (
                  <p className="text-center text-sm text-gray-600 mt-3">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {selectedStore} mağazasından {quantity} adet
                  </p>
                )}
              </div>
            </div>

            {/* Related Products Suggestion */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Öneriler</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm text-gray-700">🛒 Alışveriş listesine ekle</span>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Ekle
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-gray-700">🔔 Fiyat alarmı kur</span>
                  <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                    Kur
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-700">📊 Fiyat geçmişini gör</span>
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                    Görüntüle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 