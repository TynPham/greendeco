import { decode } from 'jsonwebtoken'
import { TokenPayloadType } from '../types'
import { UseFormSetError } from 'react-hook-form'
import { HttpError, UnprocessableEntityError } from './http'
import { toast } from 'react-toastify'

export const decodeToken = (token: string) => decode(token) as TokenPayloadType

export const handleErrorApi = ({
  error,
  setError
}: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof UnprocessableEntityError && setError) {
    const errors = error.payload.errors
    Object.entries(errors).forEach(([key, value]) => {
      setError(key.toLowerCase(), {
        type: 'server',
        message: value
      })
    })
  } else if (error instanceof HttpError) {
    toast.error(capitalizeFirstLetter(error.payload?.msg) || 'Something went wrong')
  } else {
    toast.error('Something went wrong')
  }
}

export const capitalizeFirstLetter = (input: string): string => {
  return input.replace(/^\w/, (match) => match.toUpperCase())
}
