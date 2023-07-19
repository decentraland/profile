import { Dispatch } from 'redux'
import { LoadProfileRequestAction, loadProfileRequest } from 'decentraland-dapps/dist/modules/profile/actions'

export type Props = {
  profileAddress?: string
  onFetchProfile: typeof loadProfileRequest
  loggedInAddress?: string
  isLoading: boolean
}

export type OwnProps = Pick<Props, 'profileAddress'>

export type MapStateProps = Pick<Props, 'loggedInAddress' | 'isLoading'>

export type MapDispatchProps = Pick<Props, 'onFetchProfile'>

export type MapDispatch = Dispatch<LoadProfileRequestAction>

export type MainPageParams = {
  profileAddress?: string
}