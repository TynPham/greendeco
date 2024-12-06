import { useMutation } from '@tanstack/react-query'
import paymentApis from '../apiRequests/payment.api'
import { VNPayReturnData } from '../types/payment.type'

export const useCreateVNPayPaymentMutation = ({
  onSuccess
}: {
  onSuccess?: (data: VNPayReturnData) => void
}) => {
  return useMutation({
    mutationFn: paymentApis.createVNPayPayment,
    onSuccess: (data) => {
      onSuccess && onSuccess(data.data)
    }
  })
}
