import {
	documentToReactComponents,
	Options,
} from '@contentful/rich-text-react-renderer'
import {
	Block,
	BLOCKS,
	Document,
	Inline,
	INLINES,
} from '@contentful/rich-text-types'
import Link from 'next/link'
import { ContentfulImage } from './ContentfulImage'

interface VideoEmbed {
	fields: {
		embedUrl: string
		title: string
	}
}

interface Asset {
	fields: {
		file: {
			url: string
			details: {
				image: {
					height: number
					width: number
				}
			}
		}
		title: string
	}
}

interface RichTextProps {
	content: Document
}

const options: Options = {
	renderNode: {
		[INLINES.ENTRY_HYPERLINK]: (node: Block | Inline) => {
			if (node.data.target.sys.contentType.sys.id === 'post') {
				return (
					<Link href={`/posts/${node.data.target.fields.slug}`}>
						{node.data.target.fields.title}
					</Link>
				)
			}
			// Add fallback return for non-post content types
			return null
		},

		[INLINES.HYPERLINK]: (node: Block | Inline) => {
			const text =
				(
					node.content.find((item) => item.nodeType === 'text') as {
						value: string
					}
				)?.value || ''
			return (
				<a href={node.data.uri} target="_blank" rel="noopener noreferrer">
					{text}
				</a>
			)
		},

		[BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
			console.log(node.data.target)

			if (node.data.target.sys.contentType.sys.id === 'video') {
				const target = node.data.target as unknown as VideoEmbed
				return (
					<iframe
						height="400"
						width="100%"
						src={target.fields.embedUrl}
						title={target.fields.title}
						allowFullScreen={true}
					/>
				)
			}
			// Add fallback return for non-videoEmbed content types
			return null
		},

		[BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
			const target = node.data.target as unknown as Asset
			return (
				<ContentfulImage
					src={target.fields.file.url}
					height={target.fields.file.details.image.height}
					width={target.fields.file.details.image.width}
					alt={target.fields.title}
					className="h-20 w-20"
				/>
			)
		},
	},
}

const RichText: React.FC<RichTextProps> = ({ content }) => {
	return (
		<div className="rich-text">
			{documentToReactComponents(content, options)}
		</div>
	)
}
export { RichText }
