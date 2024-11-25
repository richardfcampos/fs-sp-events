// ** Hooks
import { useMemo, useState } from 'react'

export type ModalDataType<T> = {
  isOpen: boolean,
  data?: T
}

export const useModal = <T,>(isOpen?: boolean, data?: T) => {
  // ** Hooks
  const initialModal = useMemo(() => ({ isOpen: isOpen ?? false, data }), [])

  // ** States
  const [modal, setModal] = useState<ModalDataType<T>>(initialModal)

  const handleOpen = (data?: T) => {
    setModal({ isOpen: true, data })
  }

  const handleClose = () => {
    setModal(initialModal)
  }

  return {
    isOpen: modal.isOpen,
    data: modal.data,
    handleOpen,
    handleClose
  }
}

export default useModal
