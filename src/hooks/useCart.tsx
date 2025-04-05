'use client'
import { createContext, ReactNode, useContext, useState } from 'react'

type CartItem = {
	type: 'personal' | 'group'
	firstName: string
	lastName: string
	email: string
	phone: string
	courseId: string
	totalPrice: number
	date: Date
	quantity: number
	price: number
}

type CartContextType = {
	cart: CartItem[]
	addToCart: (item: CartItem) => void
	removeFromCart: (index: number) => void
	clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
	const [cart, setCart] = useState<CartItem[]>([])

	const addToCart = (item: CartItem) => {
		setCart([...cart, item])
	}

	const removeFromCart = (index: number) => {
		setCart(cart.filter((_, i) => i !== index))
	}

	const clearCart = () => {
		setCart([])
	}

	return (
		<CartContext.Provider
			value={{ cart, addToCart, removeFromCart, clearCart }}
		>
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	const context = useContext(CartContext)
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}
