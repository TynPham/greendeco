import { SHOP_ROUTE } from '@/app/_configs/constants/variables'
import Link from 'next/link'
import Image from 'next/image'
import HeroImage from '@/app/_assets/images/homepage/hero.png'
import PlantIcon from '@/app/_assets/images/homepage/plant.svg'
export default function Hero() {
	return (
		<section className='h-screen w-full bg-primary-5555-20/40'>
			<div className='container h-full'>
				<div className='grid h-full grid-cols-7'>
					<div className='col-span-4 flex items-center justify-center px-comfortable'>
						<div className='flex-col-start gap-cozy'>
							<h1 className='text-heading-1 font-semi-bold uppercase text-primary-418-80'>
								Welcome to GreenDeco
							</h1>
							<p className='text-[4.4rem] font-bold capitalize text-primary-5555'>
								A beautiful plant is like having a friend around the house
							</p>
							<Link
								href={SHOP_ROUTE.SHOP_LIST.LINK}
								className='btn w-fit px-comfortable'
							>
								Shop now
							</Link>
						</div>
					</div>
					<div className='relative col-span-3 pl-[40px]'>
						<div className='absolute bottom-[24%] left-0 z-20 max-w-[60%] rounded-[16px] border-[3px] border-primary-625 bg-neutral-gray-1 p-cozy shadow-26'>
							<div className='flex items-center gap-cozy'>
								<div className='relative aspect-square h-[70px] rounded-[100%] bg-primary-5555'>
									<Image
										src={PlantIcon}
										alt='hero image'
										className='p-[12px]'
										fill
										style={{ objectFit: 'contain' }}
									/>
								</div>
								<div className='flex-col-start'>
									<span className='text-heading-1 font-bold text-primary-418'>
										+100
									</span>
									<p className='text-body-md font-semi-bold capitalize text-primary-418-60'>
										Greenery Waiting to be your friend
									</p>
								</div>
							</div>
						</div>
						<div className='flex h-full w-full items-end bg-primary-5555'>
							<div className='relative h-full  w-full'>
								<Image
									src={HeroImage}
									alt='hero image'
									fill
									style={{ objectFit: 'cover' }}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
