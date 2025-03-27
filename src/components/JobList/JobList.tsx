'use client'
import { Document } from '@contentful/rich-text-types'
import { useState } from 'react'
import { PrimaryButton } from '../PrimaryButton'
import { RichText } from '../RichText'

interface JobFields {
	title: string
	slug: string
	id: string
	description: Document
	location: {
		formattedAddress: string
	}
	salary: {
		code: string
		unitFrom: number
		unit: number
		type: string
	}
	permanent: boolean
}

export interface JobItem {
	fields: JobFields
}

export interface JobListProps {
	items?: JobItem[]
}

export function JobList({ items }: JobListProps) {
	const [searchTerm, setSearchTerm] = useState('')
	const [searchLocation, setSearchLocation] = useState('')
	const [isPermanent, setIsPermanent] = useState<boolean | null>(null)

	const filteredJobs = items?.filter((job) => {
		const matchesTitle = job.fields.title
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
		const matchesLocation =
			searchLocation === '' ||
			job.fields.location.formattedAddress
				.toLowerCase()
				.includes(searchLocation.toLowerCase())
		const matchesPermanent =
			isPermanent === null ||
			(isPermanent
				? job.fields.permanent === true
				: job.fields.permanent === false)
		return matchesTitle && matchesLocation && matchesPermanent
	})

	return (
		<>
			<div className="mb-8 bg-white rounded-2xl shadow-lg p-8 backdrop-blur-sm bg-opacity-95 transition-all duration-300 hover:shadow-xl">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="relative">
						<label
							htmlFor="searchTerm"
							className="block text-sm font-semibold text-gray-800 mb-2"
						>
							Job Title
						</label>
						<input
							type="text"
							id="searchTerm"
							className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
							placeholder="Search jobs..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<div className="relative">
						<label
							htmlFor="searchLocation"
							className="block text-sm font-semibold text-gray-800 mb-2"
						>
							Location
						</label>
						<input
							type="text"
							id="searchLocation"
							className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
							placeholder="Search location..."
							value={searchLocation}
							onChange={(e) => setSearchLocation(e.target.value)}
						/>
					</div>
					<div className="relative">
						<label
							htmlFor="isPermanent"
							className="block text-sm font-semibold text-gray-800 mb-2"
						>
							Employment Type
						</label>
						<select
							id="isPermanent"
							className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
							value={isPermanent === null ? '' : isPermanent.toString()}
							onChange={(e) =>
								setIsPermanent(
									e.target.value === '' ? null : e.target.value === 'true',
								)
							}
						>
							<option value="">All Types</option>
							<option value="true">Permanent</option>
							<option value="false">Temporary</option>
						</select>
						<div className="absolute right-4 top-[42px] pointer-events-none">
							<svg
								className="w-4 h-4 text-gray-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8 md:my-12">
				{filteredJobs?.map((job, index) => (
					<div
						key={index}
						className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
					>
						<div className="flex flex-col p-6 h-full">
							<h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
								{job.fields.title}
							</h2>

							<div className="flex items-center justify-between flex-wrap mb-4">
								<div className="flex items-center gap-2 mb-1">
									<span className="bg-gray-100 px-3 py-1 rounded-full text-gray-600">
										📍 {job.fields.location.formattedAddress}
									</span>
								</div>
								<div className="flex items-center gap-2 mb-1">
									<span className="bg-gray-100 px-3 py-1 rounded-full text-gray-600">
										💰 {job.fields.salary.code}
										{job.fields.salary.unitFrom}-{job.fields.salary.unit}{' '}
										{job.fields.salary.type}
									</span>
								</div>
							</div>

							<div className="prose max-w-none text-gray-600 mb-6">
								<div className="line-clamp-2">
									<RichText content={job.fields.description as Document} />
								</div>
							</div>

							<PrimaryButton
								href={`/${job.fields?.id}/jobs/` + job.fields?.slug}
								className="w-full mt-auto"
							>
								Apply Now
							</PrimaryButton>
						</div>
					</div>
				))}
			</div>
		</>
	)
}
