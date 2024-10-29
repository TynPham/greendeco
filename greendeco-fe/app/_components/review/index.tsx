import ReviewDialog, { ReviewDialogProps } from './ReviewDialog'

export default function ReviewDialogContainer(props: ReviewDialogProps) {
	return (
		<div className='sticky inset-0 flex h-full max-h-screen items-center justify-center'>
			<ReviewDialog {...props} />
		</div>
	)
}
