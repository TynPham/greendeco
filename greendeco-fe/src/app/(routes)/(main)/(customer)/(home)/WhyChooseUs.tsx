import Image from 'next/image'
import HandPlantedIcon from '@/src/app/_assets/images/homepage/whychooseus/handplant.svg'
import EasyCareIcon from '@/src/app/_assets/images/homepage/whychooseus/easycare.svg'
import FascinatingIcon from '@/src/app/_assets/images/homepage/whychooseus/fascinating.svg'

interface ReasonProps {
  title: string
  description: string
  icon: string
}

const REASONS: ReasonProps[] = [
  {
    title: 'Hand Planted',
    description: 'These lovely plants can be planted in organic soil with easy guide.',
    icon: HandPlantedIcon,
  },
  {
    title: 'Easy Care',
    description: "They aren't fussy and will thrive for years with bright light or natural light.",
    icon: EasyCareIcon,
  },
  {
    title: 'Fascinating',
    description: 'We sell these greenery that have unique shapes, colors and texture.',
    icon: FascinatingIcon,
  },
]

const ReasonCard = ({ title, description, icon }: ReasonProps) => (
  <div className='flex gap-comfortable'>
    <div className='relative aspect-square h-20 w-20 rounded-full bg-primary-5555 p-cozy shadow-30'>
      <Image
        src={icon}
        alt={`${title} icon`}
        className='p-4'
        fill
        style={{ objectFit: 'fill' }}
      />
    </div>
    <div className='flex-1'>
      <h3 className='mb-1 text-heading-3 capitalize text-primary-5555'>{title}</h3>
      <p className='text-body-md text-primary-418-60'>{description}</p>
    </div>
  </div>
)

const FeatureImage = () => (
  <div className='relative pb-comfortable pl-comfortable'>
    <Image
      src='https://firebasestorage.googleapis.com/v0/b/greendeco-2726b.appspot.com/o/text.webp?alt=media&token=4a72eac5-ca37-4676-9b42-e20cd47098c6'
      className='z-20 shadow-26'
      alt='Why choose GreenDeco'
      width={0}
      height={0}
      sizes='100vw'
    />
    <div className='absolute bottom-0 left-0 right-comfortable top-comfortable z-[-1] bg-primary-5555' />
  </div>
)

export default function WhyChooseUs() {
  return (
    <section className='px-8 py-20 md:px-12 lg:px-20'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-0'>
          <div className='grid grid-cols-6'>
            <div className='col-span-6 lg:col-span-4 lg:col-start-2'>
              <FeatureImage />
            </div>
          </div>

          <div className='flex-col-start gap-comfortable'>
            <div>
              <h2 className='mb-cozy text-heading text-primary-625'>Why Choose Us?</h2>
              <p className='text-body-md text-primary-418-80'>
                We know how much you love plants and even more, how wary you are to nurture them
                with full care.
              </p>
            </div>

            <ul className='flex-col-start gap-cozy'>
              {REASONS.map((reason) => (
                <li key={reason.title}>
                  <ReasonCard {...reason} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
