export default function formatDate(date: Date) {
	if (date) {
		const formatter = new Intl.DateTimeFormat('en-US', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
		return formatter.format(date)
	}
}
