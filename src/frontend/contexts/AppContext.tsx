'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { Product } from '@/data/products'

// Types
export interface CartItem {
  product: Product
  quantity: number
  selectedStore: string
  price: number
}

export interface PriceAlert {
  id: string
  productId: string
  targetPrice: number
  email?: string
  isActive: boolean
  createdAt: Date
}

export interface ShoppingListItem {
  id: string
  productId: string
  quantity: number
  purchased: boolean
  notes?: string
}

export interface ShoppingList {
  id: string
  name: string
  items: ShoppingListItem[]
  createdAt: Date
  totalBudget?: number
}

export interface User {
  id: string
  name: string
  email: string
  monthlyBudget: number
  preferences: {
    currency: string
    location: string
    notifications: boolean
  }
}

interface AppState {
  cart: CartItem[]
  favorites: string[]
  priceAlerts: PriceAlert[]
  shoppingLists: ShoppingList[]
  user: User | null
  isLoading: boolean
}

// Actions
type AppAction = 
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'ADD_PRICE_ALERT'; payload: PriceAlert }
  | { type: 'REMOVE_PRICE_ALERT'; payload: string }
  | { type: 'ADD_SHOPPING_LIST'; payload: ShoppingList }
  | { type: 'UPDATE_SHOPPING_LIST'; payload: ShoppingList }
  | { type: 'DELETE_SHOPPING_LIST'; payload: string }
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_FROM_STORAGE'; payload: Partial<AppState> }

// Initial state
const initialState: AppState = {
  cart: [],
  favorites: [],
  priceAlerts: [],
  shoppingLists: [],
  user: null,
  isLoading: false
}

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingCartItem = state.cart.find(
        item => item.product.id === action.payload.product.id && 
                item.selectedStore === action.payload.selectedStore
      )
      
      if (existingCartItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.product.id && 
            item.selectedStore === action.payload.selectedStore
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        }
      }
      
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => 
          !(item.product.id === action.payload)
        )
      }

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      }

    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.includes(action.payload)
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(id => id !== action.payload)
          : [...state.favorites, action.payload]
      }

    case 'ADD_PRICE_ALERT':
      return {
        ...state,
        priceAlerts: [...state.priceAlerts, action.payload]
      }

    case 'REMOVE_PRICE_ALERT':
      return {
        ...state,
        priceAlerts: state.priceAlerts.filter(alert => alert.id !== action.payload)
      }

    case 'ADD_SHOPPING_LIST':
      return {
        ...state,
        shoppingLists: [...state.shoppingLists, action.payload]
      }

    case 'UPDATE_SHOPPING_LIST':
      return {
        ...state,
        shoppingLists: state.shoppingLists.map(list =>
          list.id === action.payload.id ? action.payload : list
        )
      }

    case 'DELETE_SHOPPING_LIST':
      return {
        ...state,
        shoppingLists: state.shoppingLists.filter(list => list.id !== action.payload)
      }

    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        cart: [],
        favorites: [],
        priceAlerts: [],
        shoppingLists: []
      }

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }

    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | undefined>(undefined)

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('smartshop-data')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedData })
      } catch (error) {
        console.error('Failed to load saved data:', error)
      }
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      cart: state.cart,
      favorites: state.favorites,
      priceAlerts: state.priceAlerts,
      shoppingLists: state.shoppingLists,
      user: state.user
    }
    localStorage.setItem('smartshop-data', JSON.stringify(dataToSave))
  }, [state.cart, state.favorites, state.priceAlerts, state.shoppingLists, state.user])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Hook
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// Helper hooks
export function useCart() {
  const { state, dispatch } = useApp()
  
  const addToCart = (product: Product, selectedStore: string, quantity: number = 1) => {
    const storePrice = product.prices.find(p => p.store === selectedStore)
    if (!storePrice) return
    
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity,
        selectedStore,
        price: storePrice.price
      }
    })
  }

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const cartTotal = state.cart.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  )

  const cartItemCount = state.cart.reduce(
    (count, item) => count + item.quantity,
    0
  )

  return {
    cart: state.cart,
    cartTotal,
    cartItemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
}

export function useFavorites() {
  const { state, dispatch } = useApp()
  
  const toggleFavorite = (productId: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: productId })
  }

  const isFavorite = (productId: string) => {
    return state.favorites.includes(productId)
  }

  return {
    favorites: state.favorites,
    toggleFavorite,
    isFavorite
  }
}