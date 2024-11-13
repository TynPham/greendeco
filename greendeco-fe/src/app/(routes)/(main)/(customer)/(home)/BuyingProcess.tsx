import Image from 'next/image'
import Step1 from '@/src/app/_assets/images/homepage/buyingprocess/step1.svg'
import Step2 from '@/src/app/_assets/images/homepage/buyingprocess/step2.svg'
import Step3 from '@/src/app/_assets/images/homepage/buyingprocess/step3.svg'
import Step4 from '@/src/app/_assets/images/homepage/buyingprocess/step4.svg'
import Step5 from '@/src/app/_assets/images/homepage/buyingprocess/step5.svg'
import Arrow1 from '@/src/app/_assets/images/homepage/buyingprocess/arrow1.svg'

type BuyingStepProps = {
  label: string
  icon: typeof Step1
  showArrow?: boolean
}

const BUYING_STEPS: BuyingStepProps[] = [
  { label: 'pick your plants', icon: Step1 },
  { label: 'choose a pot color', icon: Step2 },
  { label: 'put in your cart', icon: Step3 },
  { label: 'have them shipped', icon: Step4 },
  { label: 'watch them grow', icon: Step5 },
]

const BuyingStep = ({ label, icon, showArrow = false }: BuyingStepProps) => (
  <div className='flex items-center gap-comfortable'>
    <div className='flex-col-start items-center gap-cozy'>
      <div className='aspect-square w-[100px] border border-primary-5555-60 bg-neutral-gray-1 p-cozy shadow-26'>
        <Image
          src={icon}
          alt={`Step: ${label}`}
          width={0}
          height={0}
          sizes='100vw'
        />
      </div>
      <p className='text-body-md font-semi-bold capitalize text-primary-625'>{label}</p>
    </div>
    {showArrow && (
      <div className='hidden lg:block'>
        <Image
          src={Arrow1}
          alt='Next step'
          width={24}
          height={24}
        />
      </div>
    )}
  </div>
)

export default function BuyingProcess() {
  return (
    <section className='section-home bg-primary-5555-20/20'>
      <div className='flex-col-start container items-center gap-comfortable'>
        <h2 className='text-heading-3 text-primary-418 md:text-heading-2 lg:text-heading-1'>
          Have Your Own Plants With 5 Simple Steps
        </h2>
        <div className='flex w-full flex-wrap items-center justify-center gap-comfortable'>
          {BUYING_STEPS.map((step, index) => (
            <BuyingStep
              key={step.label}
              {...step}
              showArrow={index < BUYING_STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
