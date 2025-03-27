import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API!)

export async function POST(request: Request) {
	try {
		const formData = await request.formData()
		const firstName = formData.get('firstName')
		const lastName = formData.get('lastName')
		const email = formData.get('email')
		const phone = formData.get('phone')
		const cv = formData.get('cv') as File
		// Get job details from form data
		const jobTitle = formData.get('jobTitle')
		const jobId = formData.get('jobId')
		const jobLocation = formData.get('jobLocation')
		const jobType = formData.get('jobType')
		// Convert file to base64
		const buffer = Buffer.from(await cv.arrayBuffer())
		const base64CV = buffer.toString('base64')

		const msg = {
			to: 'ahmed.ramadan@saqaya.com', // Replace with your email
			from: 'info@holdenknight.com', // Replace with your SendGrid verified sender
			subject: `TESTING Job Application: ${jobTitle}`,
			// text: `TESTING New application received from ${firstName} ${lastName}`,
			dynamic_template_data: {
				// Add this section
				firstName: firstName,
				lastName: lastName,
				email: email,
				phone: phone,
				jobTitle: jobTitle,
				jobId: jobId,
				jobLocation: jobLocation,
				jobType: jobType,
				cvFilename: cv.name, // Optional: show filename in template
			},
			templateId: 'd-e99d71a27979428fbb6de23f923f2eb1', // Replace with your SendGrid template ID
			attachments: [
				{
					content: base64CV,
					filename: cv.name,
					type: cv.type,
					disposition: 'attachment',
				},
			],
		}

		await sgMail.send(msg)

		return new Response('Application submitted successfully', { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return new Response('Failed to submit application', { status: 500 })
	}
}
