'use client'
import { useCart } from '@/hooks/useCart'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { PrimaryButton } from '../PrimaryButton'

const stripePromise = loadStripe(
	'asdadad',
	// process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)

interface CoursePrice {
	personal: number
	group: number
}

export const BookingForm = ({
	courseId,
	maxAttendees,
	prices,
}: {
	courseId: string
	prices: CoursePrice
	maxAttendees: number
}) => {
	const [bookingType, setBookingType] = useState<'personal' | 'group'>(
		'personal',
	)
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [quantity, setQuantity] = useState(1)
	const { addToCart, cart, removeFromCart } = useCart()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)

		if (!selectedDate) {
			return
		}

		const bookingData = {
			type: bookingType,
			firstName: formData.get('firstName') as string,
			lastName: formData.get('lastName') as string,
			email: formData.get('email') as string,
			phone: formData.get('phone') as string,
			courseId,
			date: selectedDate,
			quantity,
			price: bookingType === 'personal' ? prices.personal : prices.group,
			totalPrice:
				bookingType === 'personal' ? prices.personal * quantity : prices.group,
		}

		if (
			!bookingData.firstName ||
			!bookingData.lastName ||
			!bookingData.email ||
			!bookingData.phone
		) {
			return
		}

		addToCart(bookingData)
	}

	const handleCheckout = async () => {
		try {
			const response = await fetch('/api/create-checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ cart }),
			})

			const { sessionId } = await response.json()
			const stripe = await stripePromise
			await stripe?.redirectToCheckout({ sessionId })
		} catch (error) {
			console.error('Error:', error)
		}
	}

	const calculateTotal = () => {
		return cart.reduce((total, item) => total + item.totalPrice, 0)
	}

	return (
		<div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
			<div className="border rounded-lg p-4 md:p-8 lg:flex-1">
				<h2 className="text-2xl font-semibold mb-6">Book This Course</h2>

				<div className="mb-6">
					<label className="block text-sm font-medium mb-2">Booking Type</label>
					<div className="flex flex-col sm:flex-row gap-4">
						<button
							type="button"
							className={`px-4 py-2 rounded w-full sm:w-auto ${
								bookingType === 'personal'
									? 'bg-gray-600 text-white'
									: 'bg-gray-200'
							}`}
							onClick={() => setBookingType('personal')}
						>
							Personal Use (£{prices.personal})
						</button>
						<button
							type="button"
							className={`px-4 py-2 rounded w-full sm:w-auto ${
								bookingType === 'group'
									? 'bg-gray-600 text-white'
									: 'bg-gray-200'
							}`}
							onClick={() => setBookingType('group')}
						>
							Group Booking (£{prices.group})
						</button>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">
								Course Date
							</label>
							<DatePicker
								selected={selectedDate}
								onChange={(date) => setSelectedDate(date)}
								className="w-full px-4 py-2 border rounded"
								dateFormat="MMMM d, yyyy"
								minDate={new Date()}
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-1">
								Quantity {`(Max ${maxAttendees})`}
							</label>
							<input
								type="number"
								min="1"
								max={bookingType === 'group' ? maxAttendees : undefined}
								value={quantity}
								onChange={(e) => {
									const value = parseInt(e.target.value)
									if (value > maxAttendees) {
										setQuantity(maxAttendees)
									} else {
										setQuantity(value)
									}
								}}
								className="w-full px-4 py-2 border rounded"
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-1">
								First Name
							</label>
							<input
								type="text"
								name="firstName"
								required
								className="w-full px-4 py-2 border rounded"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">
								Last Name
							</label>
							<input
								type="text"
								name="lastName"
								required
								className="w-full px-4 py-2 border rounded"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Email</label>
							<input
								type="email"
								name="email"
								required
								className="w-full px-4 py-2 border rounded"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Phone</label>
							<input
								type="tel"
								name="phone"
								required
								className="w-full px-4 py-2 border rounded"
							/>
						</div>
					</div>
					<div className="flex justify-center mt-6">
						<PrimaryButton large={false} type="submit">
							Add to Cart
						</PrimaryButton>
					</div>
				</form>
			</div>

			<div
				className={`border rounded-lg p-4 md:p-8 lg:w-96 ${
					cart.length === 0 ? 'hidden' : ''
				}`}
			>
				<h3 className="text-xl font-semibold mb-4">Cart</h3>
				<div className="space-y-4">
					{cart.map((item, index) => (
						<div key={index} className="border-b py-4">
							<div className="flex flex-col gap-4">
								<div className="space-y-2">
									<p className="font-medium">Type: {item.type}</p>
									<p>
										Name: {item.firstName} {item.lastName}
									</p>
									<p>Email: {item.email}</p>
									<p>Date: {item.date?.toLocaleDateString()}</p>
									<p>Quantity: {item.quantity}</p>
									<p>Price per person: £{item.price}</p>
									<p className="font-semibold">Total: £{item.totalPrice}</p>
								</div>
								<button
									onClick={() => removeFromCart(index)}
									className="text-red-600 hover:text-red-800 w-full"
								>
									Remove
								</button>
							</div>
						</div>
					))}
				</div>
				<div className="mt-6">
					<p className="text-xl font-bold text-right">
						Cart Total: £{calculateTotal()}
					</p>
				</div>
				<div className="flex justify-center mt-6">
					<PrimaryButton onClick={handleCheckout}>
						Proceed to Checkout
					</PrimaryButton>
				</div>
			</div>
		</div>
	)
}
