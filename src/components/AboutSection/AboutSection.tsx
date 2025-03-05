import Image from 'next/image'

export interface AboutSectionProps {
	title: string
	paragraph: string
	img?: {
		fields: {
			file: {
				url: string
				fileName: string
			}
		}
	}
	specialisms?: Array<{
		fields: {
			img: {
				fields: {
					file: {
						url: string
						fileName: string
					}
				}
			}
			title: string
		}
	}>
	colorVar: string
}

export function AboutSection({
	title,
	paragraph,
	img,
	colorVar,
	specialisms,
}: AboutSectionProps) {
	return (
		<div id="about" className="container mx-auto px-4  py-12">
			<div className="flex flex-col md:flex-row justify-between items-center gap-8 text-black">
				<div className="w-full md:w-[45%] space-y-6">
					<div className="w-full my-6 md:my-10">
						<p
							style={{ color: `var(--${colorVar})` }}
							className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight md:leading-[3.5rem]"
						>
							{title}
						</p>
					</div>
					<div>
						<div
							className="text-base sm:text-lg md:text-2xl mb-6 md:mb-8 whitespace-pre-wrap"
							dangerouslySetInnerHTML={{ __html: paragraph }}
						/>
					</div>
				</div>

				{img && (
					<div className="w-full md:w-[40%] flex justify-center">
						<Image
							className="w-full max-w-[400px] h-auto object-contain"
							src={'https:' + img.fields.file.url}
							alt={img.fields.file.fileName}
							width={400}
							height={300}
							priority
						/>
					</div>
				)}
			</div>

			{specialisms && (
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 my-10 mx-3 md:mx-10 lg:mx-12">
					{specialisms.map((item, index) => (
						<div
							key={index}
							className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
						>
							<div className="relative aspect-video">
								<Image
									className="rounded-t-lg object-cover"
									src={'https:' + item.fields.img.fields.file.url}
									alt={item.fields.img.fields.file.fileName}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
								/>
							</div>
							<div className="p-4">
								<h3 className="text-lg font-semibold text-center">
									{item?.fields.title}
								</h3>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
