export interface BenefitsProps {
	heading?: string
	listOfBenefits: {
		fields: {
			text: string
		}
	}[]
	slug: string
}

export function BenefitsSection({
	heading = 'Benefits',
	listOfBenefits,
	slug,
}: BenefitsProps) {
	return (
		<div className="container mx-auto px-4 py-12">
			<div className="mt-8 sm:mt-12">
				<div className="w-full mb-8 sm:mb-10">
					<h2
						className="text-2xl sm:text-3xl md:text-4xl font-bold"
						style={{ color: `var(--${slug})` }}
					>
						{heading}
					</h2>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mx-4">
				{listOfBenefits.map((item, index) => (
					<div key={index} className="h-full">
						<div className="relative h-full p-6 sm:p-8 bg-gray-100/70 hover:bg-gray-200/70 transition-colors duration-300 flex items-center rounded-lg">
							<div className="pl-12 sm:pl-14">{item?.fields.text}</div>
							<div className="absolute -top-[30px] -left-[30px]">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="md:w-24 w-16"
								>
									<path
										d="M20 6L9 17L4 12"
										stroke={`var(--${slug})`}
										strokeWidth="3.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
