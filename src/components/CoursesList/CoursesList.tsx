import { Course } from '@/types/course'
import { CourseCard } from './CourseCard'

export function CoursesList({ items }: { items: Course[] }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{items.map((course) => (
				<CourseCard key={course.sys.id} course={course} />
			))}
		</div>
	)
}
