import { Location } from '@/lib/contentful'
import { ContactForm } from '../ContactForm'
import { GoogleMapComp } from '../GoogleMapComp'

// Define a mapping of form IDs to their corresponding components
const FORM_COMPONENTS = {
	'holden-knight': ContactForm,
	healthcare: ContactForm,
	education: ContactForm,
	'international-medical': ContactForm,
	academy: ContactForm,
} as const

export type FormId = keyof typeof FORM_COMPONENTS

export function FormSection({
	formId,
	locations,
}: {
	formId: FormId
	locations?: Location[]
}) {
	// Get the form component from the mapping
	const FormComponent = FORM_COMPONENTS[formId]

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
			{FormComponent ? (
				<div className="space-y-12">
					{locations && (
						<div className="space-y-6">
							{locations.length > 1 && (
								<h2 className="text-2xl font-bold text-gray-900">
									Our Locations
								</h2>
							)}
							<div
								className={`grid grid-cols-1 ${
									locations.length > 1 ? 'md:grid-cols-2' : ''
								} gap-8`}
							>
								{locations?.map((location, index) => (
									<GoogleMapComp location={location} key={index} />
								))}
							</div>
						</div>
					)}
					<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
						<FormComponent formId={formId} />
					</div>
				</div>
			) : (
				<div className="text-center py-12 bg-gray-50 rounded-lg">
					<p className="text-gray-500">Form not found</p>
				</div>
			)}
		</div>
	)
}
