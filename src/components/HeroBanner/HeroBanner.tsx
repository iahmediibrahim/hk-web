import Link from 'next/link'

export interface HeroBannerProps {
	heading?: string
	paragraph?: string
	cta?: {
		fields: {
			ctaTitle: string
			linkTo: string
			large: boolean
		}
	}
	image?: string
	fromUniform?: boolean
	withCounter?: boolean
	bg?: string
}

export function HeroBanner({
	heading,
	paragraph,
	cta,
	image,
	withCounter,
	bg = '#0f75bd',
}: HeroBannerProps) {
	return (
		<div className="pb-16" style={{ background: bg }}>
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap justify-between items-start text-white">
					<div className="md:w-8/12 xs:w-full">
						<div className="font-normal w-full">
							{heading && (
								<div
									className={`my-12 md:text-5xl xs:text-4xl font-black md:w-9/12 xs:w-full`}
									style={{ lineHeight: 1.2 }}
									dangerouslySetInnerHTML={{ __html: heading }}
								/>
							)}

							{paragraph && (
								<div className="text-xl md:w-9/12 xs:w-full leading-9">
									{paragraph}
								</div>
							)}

							{cta && (
								<div className="mt-5">
									<Link
										href={cta?.fields?.linkTo}
										className={`px-8 ${
											cta?.fields?.large ? 'py-3' : 'py-2'
										} ease-out duration-300 uppercase text-sm block text-black hover:bg-gray-100 font-medium rounded-full max-w-max`}
										style={{
											backgroundColor: '#FFB100',
											color: '#fff',
										}}
									>
										{cta?.fields?.ctaTitle}
									</Link>
								</div>
							)}
						</div>

						{image && (
							<div
							// className={`md:w-4/12 xs:w-full flex md:justify-center xs:justify-center md:mt-0 xs:mt-5 ${
							// 	fromUniform ? 'items-end' : 'items-start'
							// }`}
							>
								<img
									// className={`${fromUniform ? 'w-80' : 'w-50'}`}
									src={image}
									alt="Banner visual"
								/>
							</div>
						)}

						{withCounter && (
							<div className="text-lg md:w-4/12 xs:w-full flex flex-wrap md:justify-center xs:justify-center md:mt-0 xs:mt-5 items-center">
								<div className="text-center">
									<p className="w-full">Total contributed to HAF so far:</p>
									3123
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
