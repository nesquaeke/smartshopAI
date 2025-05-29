'use client'

import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Truck, CreditCard, MapPin } from 'lucide-react'
import { useCart } from '@/contexts/AppContext'

export default function CartPage() {
  const { cart, cartTotal, cartItemCount, updateQuantity, removeFromCart, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sepetiniz Boş</h1>
            <p className="text-gray-600 mb-8">
              Henüz sepetinize ürün eklemediniz. En iyi fiyatları keşfetmek için alışverişe başlayın!
            </p>
            <Link 
              href="/products"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
            >
              <span>Alışverişe Başla</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/products"
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sepetim</h1>
              <p className="text-gray-600">{cartItemCount} ürün</p>
            </div>
          </div>
          
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              <span>Sepeti Temizle</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedStore}`} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📦</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/products/detail/${item.product.id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors block truncate"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.product.category} • {item.product.subcategory}
                    </p>
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-blue-600">{item.selectedStore}</span>
                    </div>

                    {/* Quantity & Price Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ₺{(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₺{item.price.toFixed(2)} / adet
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sipariş Özeti</h2>
              
              {/* Summary Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Ürün Sayısı:</span>
                  <span>{cartItemCount} adet</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Ara Toplam:</span>
                  <span>₺{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Kargo:</span>
                  <span className="text-green-600 font-medium">Ücretsiz</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Toplam:</span>
                    <span className="text-2xl font-bold text-gray-900">₺{cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Store Breakdown */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Mağaza Dağılımı</h3>
                <div className="space-y-2">
                  {Object.entries(
                    cart.reduce((acc, item) => {
                      acc[item.selectedStore] = (acc[item.selectedStore] || 0) + (item.price * item.quantity)
                      return acc
                    }, {} as Record<string, number>)
                  ).map(([store, total]) => (
                    <div key={store} className="flex justify-between text-sm">
                      <span className="text-gray-600">{store}:</span>
                      <span className="font-medium text-gray-900">₺{total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Ödemeye Geç</span>
                </button>
                
                <button className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                  <Truck className="w-5 h-5" />
                  <span>Teslimat Seçenekleri</span>
                </button>
              </div>

              {/* Benefits */}
              <div className="mt-6 p-4 bg-green-50 rounded-xl">
                <h4 className="text-sm font-semibold text-green-800 mb-2">Avantajlarınız</h4>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>✅ Ücretsiz kargo</li>
                  <li>✅ En iyi fiyat garantisi</li>
                  <li>✅ Kolay iade</li>
                  <li>✅ 7/24 müşteri desteği</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 