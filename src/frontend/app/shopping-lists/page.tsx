'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, ListChecks, Edit, Trash2, Check, X, Calendar, DollarSign } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { ShoppingList } from '@/contexts/AppContext'

export default function ShoppingListsPage() {
  const { state, dispatch } = useApp()
  const [isCreating, setIsCreating] = useState(false)
  const [newListName, setNewListName] = useState('')
  const [newListBudget, setNewListBudget] = useState('')

  const createNewList = () => {
    if (!newListName.trim()) return

    const newList: ShoppingList = {
      id: Date.now().toString(),
      name: newListName,
      items: [],
      createdAt: new Date(),
      totalBudget: newListBudget ? parseFloat(newListBudget) : undefined
    }

    dispatch({ type: 'ADD_SHOPPING_LIST', payload: newList })
    setNewListName('')
    setNewListBudget('')
    setIsCreating(false)
  }

  const deleteList = (listId: string) => {
    if (confirm('Bu alışveriş listesini silmek istediğinize emin misiniz?')) {
      dispatch({ type: 'DELETE_SHOPPING_LIST', payload: listId })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alışveriş Listelerim</h1>
            <p className="text-gray-600">{state.shoppingLists.length} liste</p>
          </div>
          
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Yeni Liste</span>
          </button>
        </div>

        {/* Create New List Modal */}
        {isCreating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Yeni Alışveriş Listesi</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Liste Adı *
                  </label>
                  <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Örn: Haftalık Market"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bütçe (İsteğe bağlı)
                  </label>
                  <input
                    type="number"
                    value={newListBudget}
                    onChange={(e) => setNewListBudget(e.target.value)}
                    placeholder="₺0.00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-8">
                <button
                  onClick={() => {
                    setIsCreating(false)
                    setNewListName('')
                    setNewListBudget('')
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={createNewList}
                  disabled={!newListName.trim()}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Oluştur
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Shopping Lists */}
        {state.shoppingLists.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ListChecks className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Henüz Liste Yok</h2>
            <p className="text-gray-600 mb-8">
              İlk alışveriş listenizi oluşturarak organize alışveriş yapmaya başlayın!
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              İlk Listeni Oluştur
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.shoppingLists.map((list) => {
              const completedItems = list.items.filter(item => item.purchased).length
              const totalItems = list.items.length
              const completionRate = totalItems > 0 ? (completedItems / totalItems) * 100 : 0

              return (
                <div key={list.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{list.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(list.createdAt).toLocaleDateString('tr-TR')}
                        </div>
                        {list.totalBudget && (
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            ₺{list.totalBudget.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link
                        href={`/shopping-lists/${list.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => deleteList(list.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">İlerleme</span>
                      <span className="font-medium text-gray-900">
                        {completedItems}/{totalItems} tamamlandı
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="space-y-2 mb-4">
                    {list.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center space-x-2 text-sm">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          item.purchased 
                            ? 'bg-green-600 border-green-600' 
                            : 'border-gray-300'
                        }`}>
                          {item.purchased && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`flex-1 ${item.purchased ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {item.quantity}x Ürün
                        </span>
                      </div>
                    ))}
                    {list.items.length > 3 && (
                      <p className="text-xs text-gray-500">+{list.items.length - 3} ürün daha...</p>
                    )}
                  </div>

                  <Link
                    href={`/shopping-lists/${list.id}`}
                    className="w-full bg-blue-600 text-white text-center py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium block"
                  >
                    Listeyi Aç
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
} 