import { DefaultSortMenu, SortOptionType } from '@/src/components/SortMenu'
import { FilterMenu } from './ProductFilterSideBar'

const options: SortOptionType[] = [
  {
    label: 'Newest',
    value: {
      sort: 'desc',
      sortBy: 'created_at'
    }
  },
  {
    label: 'Price Increase',
    value: {
      sort: 'asc',
      sortBy: 'price'
    }
  },
  {
    label: 'Price Decrease',
    value: {
      sort: 'desc',
      sortBy: 'price'
    }
  }
]

export const ProductSortMenu = () => {
  return (
    <div className='flex flex-wrap items-center gap-4'>
      <div className='xl:hidden'>
        <FilterMenu />
      </div>
      <DefaultSortMenu options={options} />
    </div>
  )
}
