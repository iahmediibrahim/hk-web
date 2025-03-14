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
	MARKS,
} from '@contentful/rich-text-types'
import Link from 'next/link'
import { ContentfulImage } from './ContentfulImage'

// interface VideoEmbed {
// 	fields: {
// 		embedUrl: string
// 		title: string
// 	}
// }

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
	renderMark: {
		[MARKS.BOLD]: (text) => <strong className="font-bold">{text}</strong>,
		[MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
		[MARKS.UNDERLINE]: (text) => <u className="underline">{text}</u>,
		[MARKS.CODE]: (text) => (
			<code className="bg-gray-100 rounded px-1 font-mono text-sm">{text}</code>
		),
	},
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node, children) => (
			<p className="mb-4 leading-relaxed">{children}</p>
		),
		[BLOCKS.HEADING_1]: (node, children) => (
			<h1 className="text-4xl font-bold mb-6">{children}</h1>
		),
		[BLOCKS.HEADING_2]: (node, children) => (
			<h2 className="text-3xl font-bold mb-5">{children}</h2>
		),
		[BLOCKS.HEADING_3]: (node, children) => (
			<h3 className="text-2xl font-bold mb-4">{children}</h3>
		),
		[BLOCKS.HEADING_4]: (node, children) => (
			<h4 className="text-xl font-bold mb-3">{children}</h4>
		),
		[BLOCKS.HEADING_5]: (node, children) => (
			<h5 className="text-lg font-bold mb-2">{children}</h5>
		),
		[BLOCKS.HEADING_6]: (node, children) => (
			<h6 className="text-base font-bold mb-2">{children}</h6>
		),
		[BLOCKS.UL_LIST]: (node, children) => (
			<ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
		),
		[BLOCKS.OL_LIST]: (node, children) => (
			<ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
		),
		[BLOCKS.LIST_ITEM]: (node, children) => <li className="">{children}</li>,
		[BLOCKS.QUOTE]: (node, children) => (
			<blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-600">
				{children}
			</blockquote>
		),
		[BLOCKS.HR]: () => <hr className="my-8 border-t border-gray-200" />,
		[BLOCKS.TABLE]: (node, children) => (
			<table className="min-w-full border-collapse border border-gray-200 mb-4">
				<tbody>{children}</tbody>
			</table>
		),
		[BLOCKS.TABLE_ROW]: (node, children) => (
			<tr className="border-b border-gray-200">{children}</tr>
		),
		[BLOCKS.TABLE_CELL]: (node, children) => (
			<td className="p-2 border border-gray-200">{children}</td>
		),

		[INLINES.ENTRY_HYPERLINK]: (node: Block | Inline) => {
			if (node.data.target.sys.contentType.sys.id === 'post') {
				return (
					<Link
						href={`/posts/${node.data.target.fields.slug}`}
						className="text-blue-600 hover:text-blue-800 underline"
					>
						{node.data.target.fields.title}
					</Link>
				)
			}
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
				<a
					href={node.data.uri}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 hover:text-blue-800 underline"
				>
					{text}
				</a>
			)
		},

		[BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
			console.log('target', node)

			if (node.data.target.sys.contentType.sys.id === 'video') {
				console.log('target', node)

				const target = node.data.target

				return target?.fields.embedUrl ? (
					<iframe
						className="w-full aspect-video rounded-lg shadow-lg my-4"
						src={target.fields.embedUrl}
						title={target.fields.title}
						allowFullScreen={true}
					/>
				) : (
					<video
						className="w-full max-w-[600px] h-auto"
						controls
						autoPlay
						muted
						loop
					>
						<source
							src={'https:' + target.fields.video?.fields?.file?.url}
							type={target.fields.video?.fields?.file?.contentType}
						/>
						Your browser does not support the video tag.
					</video>
				)
			}
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
					className="rounded-lg shadow-md max-w-full h-auto my-4"
				/>
			)
		},
	},
}

const RichText: React.FC<RichTextProps> = ({ content }) => {
	return (
		<div className="rich-text prose prose-lg max-w-none">
			{documentToReactComponents(content, options)}
		</div>
	)
}
export { RichText }
