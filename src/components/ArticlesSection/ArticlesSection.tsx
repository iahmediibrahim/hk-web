import { Article, CTA } from '@/lib/contentful'
import { HomeCard } from '../HomeCard'
import { PrimaryButton } from '../PrimaryButton'

export interface ArticlesSectionProps {
	title: string
	paragraph: string
	articles?: Article[]
	cta: CTA
	colorVar: string
}

export function ArticlesSection({
	title,
	paragraph,
	colorVar,
	articles,
	cta,
}: ArticlesSectionProps) {
	return (
		<div id="articles" className="container mx-auto">
			<div className="text-center mb-12">
				<h2
					style={{ color: `var(--${colorVar})` }}
					className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight md:leading-[3.5rem] mb-6"
				>
					{title}
				</h2>
				<p className="text-base sm:text-lg md:text-2xl mb-6 md:mb-8 whitespace-pre-wrap max-w-3xl mx-auto">
					{paragraph}
				</p>
			</div>

			{articles && articles.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 my-10">
					{articles.map((article, index) => {
						const { fields } = article
						console.log(fields)
						return (
							<div
								className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%]  px-4 pb-20 pt-4"
								key={index}
							>
								<HomeCard
									isArticle
									paragraph={fields?.excerpt}
									title={fields?.title}
									img={fields?.img}
									id={''}
									link={`/${fields?.id}/blog/` + fields?.slug}
									date={fields?.date}
								/>
							</div>
						)
					})}
				</div>
			)}

			{cta && (
				<div className="mt-16 flex justify-center">
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
