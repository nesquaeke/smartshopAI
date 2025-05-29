'use client'

import Link from 'next/link'
import { Search, TrendingDown, Star, Users, Shield, Zap, ArrowRight, Heart, ShoppingCart, Target, MapPin, Clock, Award } from 'lucide-react'
import { categories, sampleProducts } from '@/data/products'
import { useCart, useFavorites } from '@/contexts/AppContext'

export default function HomePage() {
  const { addToCart, cartItemCount } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  // Featured products with best savings
  const featuredProducts = sampleProducts
    .map(product => {
      const prices = product.prices.sort((a, b) => a.price - b.price)
      const savings = prices[prices.length - 1].price - prices[0].price
      return { ...product, savings, cheapestPrice: prices[0] }
    })
    .sort((a, b) => b.savings - a.savings)
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-2 shadow-lg mb-8">
              <Award className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-sm font-semibold text-gray-900">Türkiye'nin #1 Fiyat Karşılaştırma Platformu</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                En İyi Fiyatları
              </span>
              <br />
              <span className="text-gray-900">Akıllıca Bul</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              🚀 Binlerce ürünü karşılaştır, %50'ye kadar tasarruf et!<br/>
              🎯 AI destekli öneriler ile akıllı alışveriş yap.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Hangi ürünü arıyorsunuz? (iPhone, süt, deterjan...)"
                  className="w-full pl-6 pr-16 py-6 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-xl transition-all"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold">
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1000+</div>
                <div className="text-gray-600">Ürün</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">50+</div>
                <div className="text-gray-600">Mağaza</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">₺50M+</div>
                <div className="text-gray-600">Tasarruf</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">100K+</div>
                <div className="text-gray-600">Kullanıcı</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Neden SmartShop AI?</h2>
            <p className="text-xl text-gray-600">Alışveriş deneyiminizi revolutionize ediyoruz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Gerçek Zamanlı Fiyatlar</h3>
              <p className="text-gray-600 leading-relaxed">
                Tüm mağazalardan anlık fiyat güncellemeleri. Her zaman en güncel bilgiye sahip olun.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Destekli Öneriler</h3>
              <p className="text-gray-600 leading-relaxed">
                Yapay zeka alışveriş alışkanlıklarınızı öğrenir ve size özel öneriler sunar.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Güvenli & Hızlı</h3>
              <p className="text-gray-600 leading-relaxed">
                SSL şifrelemesi ve hızlı sunucular ile güvenli ve sorunsuz alışveriş deneyimi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Kategorileri Keşfet</h2>
            <p className="text-xl text-gray-600">Her ihtiyacınız için en iyi fiyatları bulun</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.slice(0, 12).map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.id}`}
                className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center hover:from-blue-50 hover:to-indigo-100 transition-all hover:shadow-lg hover:scale-105"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {category.emoji}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {category.subcategories.length} alt kategori
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold"
            >
              <span>Tüm Kategoriler</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🔥 En Çok Tasarruf Ettiren Ürünler</h2>
            <p className="text-xl text-gray-600">Bu ürünlerle büyük tasarruf yapabilirsiniz!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
                <Link href={`/products/detail/${product.id}`}>
                  <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                    <div className="w-full h-48 flex items-center justify-center">
                      <span className="text-4xl text-gray-400">📦</span>
                    </div>
                    
                    {/* Savings Badge */}
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      ₺{product.savings.toFixed(2)} tasarruf
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
                  </div>
                </Link>

                <div className="p-6">
                  <Link href={`/products/detail/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {product.category} • {product.subcategory}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-green-600">
                        ₺{product.cheapestPrice.price.toFixed(2)}
                      </span>
                      <p className="text-sm text-gray-600">{product.cheapestPrice.store}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500 line-through">
                        ₺{(product.cheapestPrice.price + product.savings).toFixed(2)}
                      </span>
                      <p className="text-sm font-semibold text-red-600">
                        %{Math.round((product.savings / (product.cheapestPrice.price + product.savings)) * 100)} indirim
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link 
                      href={`/products/detail/${product.id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                    >
                      Karşılaştır
                    </Link>
                    <button
                      onClick={() => addToCart(product, product.cheapestPrice.store)}
                      className="p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-semibold"
            >
              <span>Daha Fazla Ürün Gör</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Rakamlarla SmartShop AI</h2>
            <p className="text-xl text-blue-100">Büyüyen topluluğumuzun parçası olun</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">₺2.5M</div>
              <div className="text-blue-100">Toplam Tasarruf</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">150K+</div>
              <div className="text-blue-100">Aktif Kullanıcı</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Partner Mağaza</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Müşteri Memnuniyeti</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Hemen Başla, Tasarruf Et! 💰
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Ücretsiz hesap oluştur ve akıllı alışverişin keyfini çıkar
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Ürün Ara</h3>
                <p className="text-gray-600 text-sm">İstediğin ürünü bul</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Fiyat Karşılaştır</h3>
                <p className="text-gray-600 text-sm">En iyi fiyatı seç</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Tasarruf Et</h3>
                <p className="text-gray-600 text-sm">Paranı biriktir</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-5 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all font-bold text-lg"
            >
              <span>Hemen Alışverişe Başla</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
            
            <p className="text-sm text-gray-500">
              ✅ Ücretsiz kayıt • ✅ Kredi kartı gerektirmez • ✅ Anında kullanım
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
