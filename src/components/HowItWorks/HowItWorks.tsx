import { PrimaryButton } from '../PrimaryButton'

interface TableData {
	headers?: string[]
	rows?: { [key: string]: string }[]
}
export interface HowItWorksProps {
	title?: string
	paragraphs: string[]
	tableData?: TableData
	cta?: {
		title: string
		link: string
	}
	slug?: string
}

export function HowItWorks({
	title = 'How it works',
	paragraphs,
	tableData = {
		headers: ['Step', 'Description', 'Timeline', 'Status', 'Requirements'],
		rows: [
			{
				Step: '1',
				Description: 'Register for an account',
				Timeline: '5 minutes',
				Status: 'Required',
				Requirements: 'Valid email address',
			},
			{
				Step: '2',
				Description: 'Upload your documents',
				Timeline: '15 minutes',
				Status: 'Required',
				Requirements: 'Valid identification & proof of address',
			},
			{
				Step: '3',
				Description: 'Wait for approval',
				Timeline: '1-2 business days',
				Status: 'Processing',
				Requirements: 'Complete documentation',
			},
			{
				Step: '4',
				Description: 'Start earning',
				Timeline: 'Immediate',
				Status: 'Active',
				Requirements: 'Approved account',
			},
		],
	},
	cta,
	slug,
}: HowItWorksProps) {
	return (
		<div className="container mx-auto my-10 px-4 sm:px-6 md:px-14">
			<div className="flex flex-col lg:flex-row gap-8">
				<div className="lg:w-1/5 w-full">
					<h1 className="text-2xl sm:text-3xl font-black mb-8">{title}</h1>
				</div>

				<div className="lg:w-4/5 w-full">
					<div className="space-y-8">
						<div className="space-y-6">
							{paragraphs.map((paragraph, index) => (
								<p key={index} className="text-base sm:text-lg">
									{paragraph}
								</p>
							))}
						</div>

						{tableData && (
							<div className="overflow-x-auto">
								<div className="inline-block min-w-full align-middle">
									<table className="min-w-full border-collapse">
										<thead>
											<tr
												className="text-white"
												style={{
													backgroundColor: `var(--${slug})`,
												}}
											>
												{tableData.headers?.map((header, index) => (
													<th
														key={index}
														className="px-4 sm:px-6 py-4 sm:py-6 text-left text-sm sm:text-base"
														style={{
															border: `2px solid var(--${slug})`,
														}}
													>
														{header}
													</th>
												))}
											</tr>
										</thead>
										<tbody>
											{tableData.rows?.map((row, rowIndex) => (
												<tr key={rowIndex}>
													{Object.values(row).map((cell, cellIndex) => (
														<td
															key={cellIndex}
															className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base"
															style={{
																border: `2px solid var(--${slug})`,
															}}
														>
															{cell}
														</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						)}

						{cta && (
							<div className="pt-4">
								<PrimaryButton href={cta.link}>{cta.title}</PrimaryButton>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
