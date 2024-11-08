'use client'
import { useCartQuery } from '@/src/app/_hooks/useCart'
import { CartList as List } from './CartList'
import { CartCalculator as Calculator } from './CartCalculator'
import { useDialogStore } from '@/src/app/_configs/store/useDialogStore'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import useClickOutside from '@/src/app/_hooks/useClickOutside'
import { MutatingDots } from 'react-loader-spinner'

export default function Cart() {
  const { cartQuery } = useCartQuery()
  const cartRef = useRef<any>()

  useClickOutside(cartRef, () => {
    closeDialog()
  })

  const { closeDialog } = useDialogStore()

  const { data, isLoading, isFetching, isSuccess, isFetched } = cartQuery

  return (
    <motion.div
      initial={{
        translateY: '30%',
      }}
      animate={{ translateY: 0, transition: { type: 'spring', stiffness: 300 } }}
      exit={{
        opacity: 0,
        translateY: '-20%',
        transition: { ease: 'easeInOut', duration: 0.5 },
      }}
      ref={cartRef}
      className='flex-col-start relative h-full max-h-full w-[550px] gap-compact overflow-hidden rounded-[8px]  bg-white  shadow-26'
    >
      <div className=' p-comfortable pb-0'>
        <div className='flex'>
          <h3 className='mb-[4px] flex-1 text-heading-1 capitalize text-primary-5555'>Your Cart</h3>
          <span
            onClick={() => closeDialog()}
            className='flex cursor-pointer items-center gap-compact text-body-xsm text-primary-5555-60 hover:text-primary-5555'
          >
            Continue Shopping{' '}
            <ArrowRightIcon className='aspect-square h-[14px] translate-y-[1px]' />
          </span>
        </div>
        <p className='text-body-md text-primary-5555-80'>All of your finest choices.</p>
      </div>
      {isFetching && (
        <MutatingDots
          height='100'
          width='100'
          color='#71998c'
          secondaryColor='#71998c'
          radius='10'
          ariaLabel='mutating-dots-loading'
          wrapperStyle={{}}
          wrapperClass='flex z-20 absolute bg-primary-580-20/50 items-center inset-0 opacity-[80%] justify-center'
          visible={true}
        />
      )}

      {isFetched && data && data.page_size > 0 && (
        <>
          <div className='flex-1 overflow-y-auto'>
            <List {...data} />
          </div>
          <div className='p-comfortable pt-cozy'>
            <Calculator {...data} />
          </div>
        </>
      )}
      {data?.page_size === 0 && isFetched && (
        <div className='flex-col-start h-full justify-end'>
          <NoItemMessage />
        </div>
      )}
    </motion.div>
  )
}

function NoItemMessage() {
  return (
    <div className='p-comfortable'>
      <div className='mb-compact flex items-center gap-comfortable'>
        <span className='flex-1 text-body-sm text-primary-625-80'>
          Seems like there are no items in your cart...
        </span>
      </div>
    </div>
  )
}
