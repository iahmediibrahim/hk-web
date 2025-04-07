import { NotFound } from '@/components'
import { RichText } from '@/components/RichText'
import { Article, client } from '@/lib/contentful'
import { Metadata } from 'next'
import Image from 'next/image'

async function getPost({ slug }: { slug: string }) {
	try {
		const response = await client.getEntries({
			content_type: 'article',
			'fields.slug': slug,
		})

		if (!response?.items?.length) {
			return null
		}

		return response.items[0] as unknown as Article
	} catch (error) {
		console.error('Error fetching post:', error)
		return null
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const post = await getPost({ slug })

	if (!post) {
		return {
			title: 'Post Not Found',
		}
	}

	const {
		fields: { title, excerpt },
	} = post

	return {
		title,
		description: excerpt,
		openGraph: {
			title,
			description: excerpt,
			type: 'article',
		},
	}
}

export default async function Post({
	params,
}: {
	params: Promise<{ id: string; slug: string }>
}) {
	const { id, slug } = await params

	const post = await getPost({ slug })

	if (!post) {
		return <NotFound id={id} title="Blog" />
	}

	const {
		fields: { img, title, excerpt, content, date },
	} = post

	return (
		<article className="min-h-screen bg-white">
			<div className="max-w-5xl mx-auto px-4 py-12">
				{/* Hero Section */}
				<header className="mb-12">
					<h1 className="text-5xl font-bold text-gray-900 mb-4">{title}</h1>
					<div className="flex items-center text-gray-600 mb-6">
						<time dateTime={date} className="text-sm">
							{new Date(date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</time>
					</div>
					<p className="text-xl text-gray-600 leading-relaxed mb-8">
						{excerpt}
					</p>
					<div className="relative aspect-[25/9] mb-8">
						{img && (
							<Image
								src={'https:' + img.fields.file.url}
								alt={title}
								width={1200}
								height={575}
								className="w-full h-full object-cover object-top rounded-lg shadow-lg"
							/>
						)}
					</div>
				</header>

				{/* Main Content */}
				<div className="prose prose-lg max-w-none">
					{content && <RichText content={content} />}
				</div>
			</div>
		</article>
	)
}
