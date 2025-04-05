import { NextResponse } from 'next/server'
import Stripe from 'stripe'

interface CartItem {
	type: 'personal' | 'group'
	firstName: string
	lastName: string
	email: string
	phone: string
	courseId: string
}

const stripe = new Stripe(
	// process.env.STRIPE_SECRET_KEY!
	'dasdasd',

	{
		apiVersion: '2025-03-31.basil',
	},
)

export async function POST(request: Request) {
	try {
		const { cart } = (await request.json()) as { cart: CartItem[] }

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: cart.map((item: CartItem) => ({
				price_data: {
					currency: 'gbp',
					product_data: {
						name: `Course Booking - ${item.type}`,
						description: `Booking for ${item.firstName} ${item.lastName}`,
					},
					unit_amount: 29900, // £299.00
				},
				quantity: 1,
			})),
			mode: 'payment',
			success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses`,
		})

		return NextResponse.json({ sessionId: session.id })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json(
			{ error: 'Error creating checkout session' },
			{ status: 500 },
		)
	}
}
