import Image from 'next/image'
import HandPlantedIcon from '@/app/_assets/images/homepage/whychooseus/handplant.svg'
import EasyCareIcon from '@/app/_assets/images/homepage/whychooseus/easycare.svg'
import FascinatingIcon from '@/app/_assets/images/homepage/whychooseus/fascinating.svg'

type ReasonType = {
	title: string
	paragraph: string
	icon: any
}

const reasons: ReasonType[] = [
	{
		title: 'hand plated',
		paragraph: 'These lovely plants can be planted in organic soil with easy guide.',
		icon: HandPlantedIcon,
	},
	{
		title: 'easy care',
		paragraph:
			'They aren’t fussy and will thrive for years with bright light or natural light.',
		icon: EasyCareIcon,
	},
	{
		title: 'fascinating',
		paragraph: 'We sell these greenery that have unique shapes, colors and texture.',
		icon: FascinatingIcon,
	},
]
export default function WhyChooseUs() {
	return (
		<section className='p-[80px]'>
			<div className='container'>
				<div className='grid grid-cols-2'>
					<div className='grid grid-cols-6'>
						<div className='col-span-4 col-start-2'>
							<SectionImage />
						</div>
					</div>
					<div className='flex-col-start gap-comfortable'>
						<div>
							<h2 className='mb-cozy text-heading text-primary-625'>
								Why Choose Us?
							</h2>
							<p className='text-body-md text-primary-418-80'>
								We know how much you love plants and even more, how wary you are to
								nurture them with full care.
							</p>
						</div>
						<ul className='flex-col-start gap-cozy'>
							{reasons.map((reason) => (
								<li key={reason.title}>
									<Reason {...reason} />
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}

function Reason({ title, paragraph, icon }: ReasonType) {
	return (
		<div className='flex gap-comfortable'>
			<div className=' relative aspect-square w-[80px]  justify-center rounded-[100%]  bg-primary-5555 p-cozy shadow-30'>
				<Image
					src={icon}
					alt='reasonwhyicon'
					className='p-common'
					fill
					style={{ objectFit: 'fill' }}
				/>
			</div>
			<div>
				<h3 className='mb-[4px] text-heading-3 capitalize text-primary-5555'>{title}</h3>
				<p className='text-body-md text-primary-418-60'>{paragraph}</p>
			</div>
		</div>
	)
}

function SectionImage() {
	return (
		<div className='relative pb-comfortable pl-comfortable'>
			<Image
				src={
					'https://firebasestorage.googleapis.com/v0/b/greendeco-2726b.appspot.com/o/text.webp?alt=media&token=4a72eac5-ca37-4676-9b42-e20cd47098c6'
				}
				className='z-20 shadow-26'
				alt='whychooseus'
				width={0}
				height={0}
				sizes='100vw'
			/>
			<div className='absolute  bottom-0 left-0 right-comfortable top-comfortable z-[-1] bg-primary-5555'></div>
		</div>
	)
}
