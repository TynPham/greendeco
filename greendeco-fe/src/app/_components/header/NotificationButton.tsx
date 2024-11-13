'use client'

import { BellIcon } from '@heroicons/react/24/solid'
import { useRef, useState } from 'react'
import useNotification from '@/src/app/_hooks/useNotification'
import NotificationList from '../notification/NotificationList'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import useClickOutside from '@/src/app/_hooks/useClickOutside'

export default function NotificationDisplayButton() {
  const [open, setOpen] = useState(false)
  const notificationListRef = useRef<any>()

  const handleToggleNotification = () => {
    setOpen(!open)
  }
  useClickOutside(notificationListRef, () => {
    if (open) {
      setOpen(false)
    }
  })

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (latestWindowY) => {
    const previousWindowY = scrollY.getPrevious()
    if (latestWindowY > previousWindowY && latestWindowY > 90) {
      setOpen(false)
    }
  })

  const { userNotificationQuery } = useNotification({})
  const { data, isSuccess, isError } = userNotificationQuery

  return (
    <div
      ref={notificationListRef}
      className='relative'
    >
      <button
        onClick={handleToggleNotification}
        className='group rounded-xl border border-primary-5555-40 bg-primary-5555-20/40 px-[8px] py-[4px] text-primary-625 transition duration-75 ease-in hover:bg-primary-625 hover:text-neutral-gray-1'
      >
        {data && data?.page_size > 0 && <NotificationAmountDisplay amount={data.page_size} />}
        <BellIcon className='aspect-square h-[24px] ' />
      </button>
      <div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                translateY: '-16px',
                opacity: 0,
              }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{
                opacity: 0,
                translateY: '-16px',
              }}
              transition={{ ease: 'easeInOut', duration: 0.2 }}
              className='absolute right-0 top-[calc(100%+8px)] max-h-[60vh] w-[24vw] overflow-y-auto rounded-xl bg-white shadow-38 '
            >
              <div className='bg-primary-625-20/40 p-compact text-heading-3 font-bold text-primary-5555'>
                Notification
              </div>

              {data && <NotificationList {...data} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function NotificationAmountDisplay({ amount }: { amount: number | undefined }) {
  if (amount && amount > 0)
    return (
      <span className='absolute right-[-4px] top-[-4px] flex aspect-square h-[16px] items-center justify-center rounded-[100%] border border-primary-625 bg-primary-625 font-semi-bold text-white transition duration-75  ease-in group-hover:bg-white group-hover:text-primary-625'>
        {amount}
      </span>
    )
}
