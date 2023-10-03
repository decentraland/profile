import { Dispatch } from '@reduxjs/toolkit'
import { CloseModalAction } from 'decentraland-dapps/dist/modules/modal/actions'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'

export type Props = ModalProps & {
  children: React.ReactNode
  onClose: () => void
  clearFilters: () => unknown
  applyFilters: () => unknown
}

export type MapDispatchProps = Pick<Props, 'onClose'>
export type MapDispatch = Dispatch<CloseModalAction>
