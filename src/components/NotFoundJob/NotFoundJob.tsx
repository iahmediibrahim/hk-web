'use client'
import { PrimaryButton } from '../PrimaryButton'

export function NotFoundJob({ id }: { id: string }) {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
			<div className="max-w-lg w-full mx-4">
				<div className="text-center space-y-8 backdrop-blur-lg bg-white/40 p-12 rounded-3xl shadow-2xl border border-white/50">
					<div className="relative">
						<svg
							className="w-24 h-24 mx-auto mb-6 opacity-20"
							style={{
								color: `var(--${id})`,
							}}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<h1
							className="text-6xl font-bold mb-4"
							style={{
								color: `var(--${id})`,
							}}
						>
							404
						</h1>
						<h2 className="text-3xl font-semibold text-slate-800 mb-2">
							Job Not Found
						</h2>
					</div>
					<p className="text-slate-600 text-lg leading-relaxed">
						We couldn&apos;t find the job posting you&apos;re looking for. It
						may have been removed or doesn&apos;t exist.
					</p>
					<div className="flex justify-center pt-4">
						<PrimaryButton
							bgWhite
							onClick={() => {
								window?.history?.back()
							}}
						>
							← Return to Jobs
						</PrimaryButton>
					</div>
				</div>
			</div>
		</div>
	)
}
