import Block from '@/src/components/Block'
import CreateProductForm from './CreateProductForm'

export default function CreateProductPage() {
  return (
    <div className='min-h-screen py-comfortable'>
      <Block>
        <h1>Create a new product</h1>
        <div className='mt-comfortable border-x border-x-primary-625-60 px-comfortable'>
          <CreateProductForm />
        </div>
      </Block>
    </div>
  )
}
