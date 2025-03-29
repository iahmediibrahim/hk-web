import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API!)

export async function POST(request: Request) {
	try {
		const formData = await request.formData()
		const firstName = formData.get('firstName')
		const lastName = formData.get('lastName')
		const email = formData.get('email')
		const phone = formData.get('phone')
		const message = formData.get('message')
		const contactType = formData.get('contactType')

		const msg = {
			to: 'ahmed.ramadan@saqaya.com', // Replace with your company email
			from: 'info@holdenknight.com', // Your verified SendGrid sender
			templateId: 'd-1b40367ac9df48cfb4f07cd63d4e08cd', // Replace with your contact form template ID
			dynamic_template_data: {
				firstName,
				lastName,
				email,
				phone,
				message,
				contactType,
			},
		}

		await sgMail.send(msg)
		return new Response('Message sent successfully', { status: 200 })
	} catch (error) {
		console.error('Error sending message:', error)
		return new Response('Failed to send message', { status: 500 })
	}
}
