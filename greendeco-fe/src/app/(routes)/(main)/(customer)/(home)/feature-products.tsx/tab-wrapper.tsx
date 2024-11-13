'use client'
import { TabItem, TabOption } from './tab-item'
import { ProductFilterType } from './tab-item'
interface TabsWrapperProps {
  tabs: readonly TabOption[]
  activeFilter: ProductFilterType
  setActiveFilter: (type: ProductFilterType) => void
}

export function TabsWrapper({ tabs, activeFilter, setActiveFilter }: TabsWrapperProps) {
  return (
    <ul className='flex h-12 items-end lg:gap-comfortable'>
      {tabs.map((tab) => (
        <TabItem
          key={tab.type}
          tab={tab}
          isActive={tab.type === activeFilter}
          onClick={() => setActiveFilter(tab.type)}
        />
      ))}
    </ul>
  )
}
