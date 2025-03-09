import { CTA } from '@/lib/contentful'
import { Document } from '@contentful/rich-text-types'
import { PrimaryButton } from '../PrimaryButton'
import { RichText } from '../RichText/RichText'

interface TableData {
	headers?: string[]
	rows?: { [key: string]: string }[]
}
export interface HowItWorksSectionProps {
	title?: string
	paragraph: Document
	tableData?: TableData
	cta?: CTA
	colorVar?: string
}

export function HowItWorksSection({
	title = 'How it works',
	paragraph,
	tableData,
	cta,
	colorVar,
}: HowItWorksSectionProps) {
	return (
		<div className="container mx-auto my-10 px-4 sm:px-6 md:px-14">
			<div className="flex flex-col lg:flex-row gap-8">
				<div className="lg:w-1/5 w-full">
					<h1 className="text-2xl sm:text-3xl font-black mb-8">{title}</h1>
				</div>

				<div className="lg:w-4/5 w-full">
					<div className="space-y-8 mb-8">
						{paragraph && <RichText content={paragraph} />}
					</div>

					{tableData && (
						<div className="overflow-x-auto">
							<div className="inline-block min-w-full align-middle">
								<table className="min-w-full border-collapse">
									<thead>
										<tr
											className="text-white"
											style={{
												backgroundColor: `var(--${colorVar})`,
											}}
										>
											{tableData.headers?.map((header, index) => (
												<th
													key={index}
													className="px-4 sm:px-6 py-4 sm:py-6 text-left text-sm sm:text-base"
													style={{
														border: `2px solid var(--${colorVar})`,
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
															border: `2px solid var(--${colorVar})`,
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
						<div className="mt-16 flex md:block justify-center text-center">
							<PrimaryButton
								href={cta.fields.linkTo}
								large={cta.fields.large}
								outlined={cta.fields.outlined}
							>
								{cta.fields.title}
							</PrimaryButton>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
