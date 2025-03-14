import { RichText } from '@/components/RichText'
import { Article, client } from '@/lib/contentful'
import Image from 'next/image'
import Link from 'next/link'

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
export default async function Post({
	params,
}: {
	params: Promise<{ id: string; slug: string }>
}) {
	const slug = (await params).slug
	const post = await getPost({ slug })

	if (!post) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
				<div className="text-center space-y-4">
					<h1 className="text-4xl font-bold text-gray-800 pb-4">
						Post not found
					</h1>
					<p className="text-gray-600 pb-8">
						The post you are looking for does not exist.
					</p>

					<Link
						href="/blog"
						className="inline-flex items-center px-6 py-3 border border-transparent text-base text-white bg-[#0B86DF] hover:bg-[#096ab2] font-medium rounded-md transition-colors duration-200"
					>
						← Back to Blog
					</Link>
				</div>
			</div>
		)
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
