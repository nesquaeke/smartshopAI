'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, MapPin, Lightbulb, DollarSign, Percent } from 'lucide-react'
import { sampleStores } from '@/data/stores'
import { sampleProducts } from '@/data/products'

export default function DashboardPage() {
  const [selectedLocation, setSelectedLocation] = useState('Warsaw')
  
  // AI önerileri hesapla
  const aiTips = [
    {
      id: 1,
      tip: 'Süt Lidl\'de %15 daha ucuz',
      type: 'saving',
      priority: 'high'
    },
    {
      id: 2,
      tip: 'Önce Biedronka\'ya, sonra Media Expert\'e gidin',
      type: 'route',
      priority: 'medium'
    },
    {
      id: 3,
      tip: 'Elektronik alışverişi için hafta sonu daha uygun',
      type: 'timing',
      priority: 'low'
    }
  ]

  // Kar hesaplamaları
  const calculateSavings = () => {
    let totalSavings = 0
    sampleProducts.forEach(product => {
      const prices = product.prices.filter(p => p.inStock).map(p => p.price)
      if (prices.length > 1) {
        const highest = Math.max(...prices)
        const lowest = Math.min(...prices)
        totalSavings += (highest - lowest)
      }
    })
    return totalSavings
  }

  const potentialSavings = calculateSavings()

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-lg text-gray-600">
            Akıllı alışveriş önerileriniz ve tasarruf fırsatlarınız
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Potansiyel Tasarruf</p>
                <p className="text-2xl font-bold text-gray-900">{potentialSavings.toFixed(2)} PLN</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Percent className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ortalama İndirim</p>
                <p className="text-2xl font-bold text-gray-900">23%</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Yakın Mağaza</p>
                <p className="text-2xl font-bold text-gray-900">{sampleStores.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">AI Önerisi</p>
                <p className="text-2xl font-bold text-gray-900">{aiTips.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* AI Tips */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
              AI Önerileri
            </h2>
            <div className="space-y-4">
              {aiTips.map((tip) => (
                <div
                  key={tip.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    tip.priority === 'high' 
                      ? 'bg-red-50 border-red-400' 
                      : tip.priority === 'medium'
                      ? 'bg-yellow-50 border-yellow-400'
                      : 'bg-blue-50 border-blue-400'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{tip.tip}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {tip.type === 'saving' && '💰 Tasarruf Fırsatı'}
                        {tip.type === 'route' && '🗺️ Rota Önerisi'}
                        {tip.type === 'timing' && '⏰ Zamanlama'}
                      </p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      tip.priority === 'high' 
                        ? 'bg-red-100 text-red-800'
                        : tip.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {tip.priority === 'high' ? 'Yüksek' : tip.priority === 'medium' ? 'Orta' : 'Düşük'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Store Map */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Yakındaki Mağazalar
            </h2>
            
            {/* Simple Map Placeholder */}
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Harita Görünümü</p>
                <p className="text-sm text-gray-400">Warsaw merkezli</p>
              </div>
            </div>

            <div className="space-y-3">
              {sampleStores.slice(0, 4).map((store) => (
                <div key={store.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{store.name}</h3>
                    <p className="text-sm text-gray-600">{store.location?.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">1.2 km</p>
                    <p className="text-xs text-gray-500">5 dk</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Price Trends */}
        <div className="card mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Fiyat Trendleri
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sampleProducts.slice(0, 4).map((product) => {
              const lowestPrice = Math.min(...product.prices.filter(p => p.inStock).map(p => p.price))
              const highestPrice = Math.max(...product.prices.filter(p => p.inStock).map(p => p.price))
              const trend = Math.random() > 0.5 ? 'up' : 'down'
              
              return (
                <div key={product.id} className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-900">{lowestPrice} PLN</p>
                      <p className="text-xs text-gray-500">En düşük fiyat</p>
                    </div>
                    <div className={`flex items-center ${trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                      {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="text-sm ml-1">
                        {((highestPrice - lowestPrice) / highestPrice * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 