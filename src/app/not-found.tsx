import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="text-center">
			<h1>Page Not Found</h1>
			<Link href="/">Return Home</Link>
		</div>
	)
}
