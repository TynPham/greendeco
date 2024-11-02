import TopReviewSlider from './TopReviewSlider'
export default function CustomerReviews() {
	return (
		<section className='section-home bg-primary-580-20'>
			<div className='container'>
				<h2 className='text-center text-[2rem] capitalize text-primary-5555'>
					Huge love from our customers 😍
				</h2>
				<div>
					<TopReviewSlider />
				</div>
			</div>
		</section>
	)
}
