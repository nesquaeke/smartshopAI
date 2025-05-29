'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, ChevronDown, ShoppingCart, Heart, User, Bell } from 'lucide-react'
import { categories } from '@/data/products'
import { storeCategories } from '@/data/stores'
import { useCart, useFavorites } from '@/contexts/AppContext'

export default function Header() {
  const [productDropdownOpen, setProductDropdownOpen] = useState(false)
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false)
  const productTimeout = useRef<NodeJS.Timeout>()
  const storeTimeout = useRef<NodeJS.Timeout>()
  
  const { cartItemCount, cartTotal } = useCart()
  const { favorites } = useFavorites()

  const handleProductMouseEnter = () => {
    if (productTimeout.current) clearTimeout(productTimeout.current)
    setProductDropdownOpen(true)
  }

  const handleProductMouseLeave = () => {
    productTimeout.current = setTimeout(() => {
      setProductDropdownOpen(false)
    }, 200)
  }

  const handleStoreMouseEnter = () => {
    if (storeTimeout.current) clearTimeout(storeTimeout.current)
    setStoreDropdownOpen(true)
  }

  const handleStoreMouseLeave = () => {
    storeTimeout.current = setTimeout(() => {
      setStoreDropdownOpen(false)
    }, 200)
  }

  useEffect(() => {
    return () => {
      if (productTimeout.current) clearTimeout(productTimeout.current)
      if (storeTimeout.current) clearTimeout(storeTimeout.current)
    }
  }, [])

  return (
    <header className="bg-white shadow-lg border-b sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-4 text-gray-600">
              <span>🎯 En iyi fiyatları karşılaştırın</span>
              <span>✨ %30'a kadar tasarruf edin</span>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/help" className="hover:text-blue-600 transition-colors">
                Yardım
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/contact" className="hover:text-blue-600 transition-colors">
                İletişim
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SmartShop AI
              </h1>
              <p className="text-xs text-gray-500">Akıllı Alışveriş</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleProductMouseEnter}
              onMouseLeave={handleProductMouseLeave}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium py-2 transition-all duration-200">
                <span>Ürünler</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    productDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {productDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-6 z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-6 pb-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Ürün Kategorileri</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-1 px-3">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/products/${category.id}`}
                        className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-blue-50 transition-colors group"
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform">
                          {category.emoji}
                        </span>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                          {category.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Stores Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleStoreMouseEnter}
              onMouseLeave={handleStoreMouseLeave}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium py-2 transition-all duration-200">
                <span>Mağazalar</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    storeDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {storeDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-6 z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-6 pb-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Mağaza Kategorileri</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-1 px-3">
                    {storeCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/stores/${category.id}`}
                        className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-blue-50 transition-colors group"
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform">
                          {category.emoji}
                        </span>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                          {category.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/ai-dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              AI Dashboard
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Ürün ara... (örn: iPhone, süt, ekmek)"
                className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Link href="/notifications" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Favorites */}
            <Link href="/favorites" className="relative p-2 text-gray-600 hover:text-red-500 transition-colors">
              <Heart className="w-6 h-6" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors group">
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {cartItemCount}
                </span>
              )}
              {cartTotal > 0 && (
                <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  ₺{cartTotal.toFixed(2)}
                </div>
              )}
            </Link>

            {/* User Account */}
            <Link href="/account" className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search (hidden on larger screens) */}
      <div className="lg:hidden px-4 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Ürün ara..."
            className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
} 