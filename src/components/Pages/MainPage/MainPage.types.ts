import { Dispatch } from 'redux'
import { LoadProfileRequestAction, loadProfileRequest } from 'decentraland-dapps/dist/modules/profile/actions'
import { RouterProps } from '../../../utils/WithRouter'

export type Props = {
  onFetchProfile: typeof loadProfileRequest
  loggedInAddress?: string
  profileAddress?: string
  isLoading: boolean
  isBlocked: boolean
}

export type MapStateProps = Pick<Props, 'loggedInAddress' | 'isLoading' | 'profileAddress' | 'isBlocked'>
export type MapDispatchProps = Pick<Props, 'onFetchProfile'>
export type MapDispatch = Dispatch<LoadProfileRequestAction>
type Params = {
  profileAddress?: string
}
export type OwnProps = {
  router: RouterProps<Params>
}
