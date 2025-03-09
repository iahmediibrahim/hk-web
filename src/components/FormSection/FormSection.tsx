// Define a mapping of form IDs to their corresponding components
// const FORM_COMPONENTS = {
// 	// contact: ContactForm,
// 	// newsletter: NewsletterForm,
// 	// feedback: FeedbackForm,
// } as const

// type FormId = keyof typeof FORM_COMPONENTS

export function FormSection() {
	// export function FormSection({ formId }: { formId: FormId }) {
	// Get the form component from the mapping
	// const FormComponent = FORM_COMPONENTS[formId]

	return (
		<div className="form-section">
			{/* {FormComponent ? <FormComponent /> : <div>Form not found</div>} */}
		</div>
	)
}
