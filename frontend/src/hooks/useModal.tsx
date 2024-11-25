// ** Hooks
import { useMemo, useState } from 'react'

export type ModalDataType<T> = {
  open: boolean,
  data?: T
}

export const useModal = <T,>(open?: boolean, data?: T) => {
  // ** Hooks
  const initialModal = useMemo(() => ({ open: open ?? false, data }), [])

  // ** States
  const [modal, setModal] = useState<ModalDataType<T>>(initialModal)

  const handleOpen = (data?: T) => {
    setModal({ open: true, data })
  }

  const handleClose = () => {
    setModal(initialModal)
  }

  return {
    open: modal.open,
    data: modal.data,
    handleOpen,
    handleClose
  }
}

export default useModal
