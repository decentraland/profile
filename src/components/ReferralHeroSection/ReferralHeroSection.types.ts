import { View } from '../../utils/view'

export type Props = {
  isLoading?: boolean
  error?: string | null
  view?: View
  profileAddress: string
}

export type MapStateProps = Pick<Props, 'isLoading' | 'error' | 'profileAddress'>
export type OwnProps = Pick<Props, 'view' | 'profileAddress'>
