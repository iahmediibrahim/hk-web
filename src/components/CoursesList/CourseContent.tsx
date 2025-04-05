'use client'
import { DayContent } from '@/types/course'
import { useState } from 'react'

export function CourseContent({
	content,
}: {
	content: {
		[key: string]: DayContent
	}
}) {
	const days = Object.keys(content)
	const [activeDay, setActiveDay] = useState(days[0])
	return (
		<div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
				<h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
					Course Content
				</h2>
				<div className="flex flex-nowrap space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400">
					{days.map((day) => (
						<button
							key={day}
							onClick={() => setActiveDay(day)}
							className={`py-2 sm:py-3 px-4 sm:px-6 text-center whitespace-nowrap rounded-lg transition-all text-sm sm:text-base ${
								activeDay === day
									? 'bg-gray-800 text-white shadow-lg'
									: 'bg-white hover:bg-gray-100 border border-gray-300 text-gray-700'
							}`}
						>
							{day}
						</button>
					))}
				</div>
			</div>

			<div className="mb-4 text-sm text-gray-600"></div>
			<div className="bg-white rounded-lg p-3 sm:p-6 shadow-lg border border-gray-200 mt-6">
				<div className="overflow-x-auto">
					<table className="w-full min-w-[600px]">
						<thead>
							<tr className="border-b border-gray-200">
								<th className="text-left py-3 px-3 sm:px-4 text-sm font-semibold text-gray-600 w-[120px] sm:w-[180px]">
									Session
								</th>
								<th className="text-left py-3 px-3 sm:px-4 text-sm font-semibold text-gray-600">
									Content
								</th>
								<th className="w-[100px] sm:w-[160px] text-right pr-3 sm:pr-4">
									{Object.keys(content[activeDay]).length} sessions
								</th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(content[activeDay]).map(([session, { name }]) => (
								<tr
									key={session}
									className="hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
								>
									<td className="py-3 sm:py-4 px-3 sm:px-4">
										<span className="text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 py-1 px-2 sm:px-3 rounded-md inline-block">
											{session}
										</span>
									</td>
									<td className="py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base text-gray-700 hover:text-gray-900 transition-colors">
										{name}
									</td>
									<td></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
