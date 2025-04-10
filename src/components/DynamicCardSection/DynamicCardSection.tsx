import { Article, ContentfulImage, Location } from '@/lib/contentful'
import { Course } from '@/types/course'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { CardProps, CardWithIcon } from '../CardWithIcon'
import { Carousel } from '../Carousel'
import { CoursesList } from '../CoursesList'
import { FormId, FormSection } from '../FormSection'
import { HomeCard, HomeCardFields } from '../HomeCard'
import RenderListTabs from '../HomeCard/RenderListTabs'
import { JobItem, JobList } from '../JobList'

type ContentfulEntry<T> = {
	fields: T
	sys: {
		contentType: {
			sys: {
				id: string
			}
		}
	}
}

export interface DynamicCardSectionProps {
	title: string
	paragraph?: string
	items?: Array<
		ContentfulEntry<HomeCardFields | CardProps> | JobItem | Course | Article[]
	>
	images?: ContentfulImage[]
	list?: string[]
	colorVar: string
	type: string
	formId: FormId
	locations?: Location[]
	tabs?: string[]
}

export function DynamicCardSection({
	title,
	colorVar,
	paragraph,
	type,
	items,
	list,
	images,
	formId,
	locations,
	tabs,
}: DynamicCardSectionProps) {
	const shouldUseCarousel = !tabs && items && items.length > 3
	return (
		<div id="about" className="container mx-auto px-4 py-12">
			<div className="flex flex-col items-center justify-center text-center text-black mb-8">
				<div className="w-full md:w-[70%] space-y-6">
					{title && (
						<div className="w-full my-6 md:my-10">
							<p
								style={{ color: `var(--${colorVar})` }}
								className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight md:leading-[3.5rem]"
							>
								{title}
							</p>
						</div>
					)}
					{paragraph && (
						<div>
							<p className="text-base sm:text-lg md:text-2xl mb-6 md:mb-8">
								{paragraph}
							</p>
						</div>
					)}
				</div>
			</div>

			{type === 'home-card' ? (
				<>
					{shouldUseCarousel ? (
						<Carousel colorVar={colorVar}>
							{items?.map((item, index) => {
								const fields = 'fields' in item ? item.fields : item
								return (
									<div
										className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%]  px-4 pb-20 pt-4"
										key={index}
									>
										<HomeCard {...(fields as HomeCardFields)} />
									</div>
								)
							})}
						</Carousel>
					) : tabs ? (
						<RenderListTabs
							tabs={tabs}
							items={items as Array<ContentfulEntry<HomeCardFields>>}
						/>
					) : (
						<div
							className={`grid grid-cols-1 gap-8 mx-4 ${
								items && items.length > 2 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
							}`}
						>
							{items?.map((item, index) => {
								// Handle ContentfulEntry<HomeCardFields>
								const contentfulEntry = item as ContentfulEntry<HomeCardFields>
								return (
									<HomeCard
										key={`home-card-${index}`}
										{...contentfulEntry.fields}
									/>
								)
							})}
						</div>
					)}
				</>
			) : type === 'articles' ? (
				<>
					{tabs ? (
						<RenderListTabs
							tabs={tabs}
							items={items as Array<ContentfulEntry<HomeCardFields>>}
						/>
					) : (
						<div
							className={`grid grid-cols-1 gap-8 mx-4 ${
								items && items.length > 2 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
							}`}
						>
							{items?.map((item, index) => {
								// Check if item is an Article
								if (
									'sys' in item &&
									item.sys?.contentType?.sys?.id === 'article'
								) {
									const article = item as unknown as Article
									return (
										<HomeCard
											key={`home-card-${index}`}
											isArticle
											paragraph={article.fields.excerpt}
											title={article.fields.title}
											img={article.fields.img}
											id=""
											link={
												article?.fields?.linkTo
													? article?.fields?.linkTo
													: `/${article.fields.id}/blog/${article.fields.slug}`
											}
											date={article.fields.date}
										/>
									)
								}
							})}
						</div>
					)}
				</>
			) : type === 'why-us' ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 my-8 md:my-10 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
					{items?.map((item, index) => (
						<div key={index} className="flex justify-center">
							<CardWithIcon
								{...(('fields' in item ? item.fields : item) as CardProps)}
								colorVar={colorVar}
							/>
						</div>
					))}
				</div>
			) : type === 'clients' ? (
				<div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-8">
					{images?.map((image, index) => (
						<div key={index} className="flex items-center justify-center p-4">
							<div className="w-80 h-44 flex items-center justify-center transition-transform duration-300 hover:scale-110">
								<Image
									className="w-full h-full object-contain"
									src={'https:' + image.fields.file.url}
									alt={image.fields.file.fileName}
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									width={320}
									height={176}
								/>
							</div>
						</div>
					))}
				</div>
			) : type === 'text-list' ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mx-4">
					{list?.map((item, index) => (
						<div key={index} className="h-full">
							<div className="relative h-full p-6 sm:p-8 bg-gray-100/70 hover:bg-gray-200/70 transition-colors duration-300 flex items-center rounded-lg">
								<div className="pl-12 sm:pl-14">{item}</div>
								<div className="absolute  -top-[20px]  -left-[19px]">
									<FontAwesomeIcon
										icon={faCheck}
										className="text-[64px]"
										style={{ color: `var(--${colorVar})` }}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			) : type === 'jobs' ? (
				<JobList items={items as JobItem[]} />
			) : type === 'contact-form' ? (
				<FormSection formId={formId} locations={locations} />
			) : type === 'courses' ? (
				<CoursesList items={items as Course[]} />
			) : null}
		</div>
	)
}
