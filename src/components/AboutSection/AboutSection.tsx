import { ContentfulImage, CTA } from '@/lib/contentful'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { PrimaryButton } from '../PrimaryButton'

export interface AboutSectionProps {
	title: string
	paragraph: string
	img?: ContentfulImage
	specialisms?: Array<{
		fields: {
			img: ContentfulImage
			title: string
		}
	}>
	specialismsTitle?: string
	specialismsTextList?: string[]
	cta: CTA
	colorVar: string
}

export function AboutSection({
	title,
	paragraph,
	img,
	colorVar,
	specialisms,
	specialismsTitle,
	specialismsTextList,
	cta,
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
						{img.fields.file.contentType.includes('image') ? (
							<Image
								className="w-full max-w-[400px] h-auto object-contain rounded-lg"
								src={'https:' + img.fields.file.url}
								alt={img.fields.file.fileName}
								width={400}
								height={300}
								priority
							/>
						) : img.fields.file.contentType.includes('video') ? (
							<video
								className="w-full max-w-[600px] h-auto"
								controls
								autoPlay
								muted
								loop
							>
								<source
									src={'https:' + img.fields.file.url}
									type={img.fields.file.contentType}
								/>
								Your browser does not support the video tag.
							</video>
						) : null}
					</div>
				)}
			</div>
			{specialismsTitle && (
				<h3 className="text-xl md:text-2xl text-black my-8">
					{specialismsTitle}
				</h3>
			)}
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
			{specialismsTextList && (
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{specialismsTextList.map((item, index) => (
						<div key={index} className="flex items-center gap-2">
							<FontAwesomeIcon icon={faCheck} color={`var(--${colorVar})`} />
							<p className="text-base md:text-lg whitespace-pre-wrap">{item}</p>
						</div>
					))}
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
	)
}
