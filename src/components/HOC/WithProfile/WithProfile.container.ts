import { connect } from 'react-redux'
import { isAddress } from 'ethers'
import { getProfileOfAddress } from 'decentraland-dapps/dist/modules/profile/selectors'
import type { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { enhancedFetchProfileRequest } from '../../../modules/profile/action'
import { getErrorLoadingProfile, getProfileWithName, isLoadingProfile } from '../../../modules/profile/selectors'
import type { RootState } from '../../../modules/reducer'
import WithRouter from '../WithRouter'
import WithProfile from './WithProfile'
import type { MapDispatch, MapStateProps, OwnProps } from './WithProfile.types'

const mapStateToProps = (state: RootState, ownProps: OwnProps): MapStateProps => {
  const addressOrName = (ownProps.router.params.profileAddress as string).toLowerCase()
  const isAddressFromPath = isAddress(addressOrName)

  const isLoadingProfileFromPath = addressOrName ? isLoadingProfile(state, addressOrName) : false

  let profile: Profile | undefined
  if (isAddressFromPath) {
    profile = getProfileOfAddress(state, addressOrName)
  } else {
    profile = addressOrName ? getProfileWithName(state, addressOrName) : undefined
  }

  return {
    addressOrName,
    profileAddress: isAddressFromPath ? addressOrName : profile?.avatars[0].userId,
    error: getErrorLoadingProfile(state, addressOrName),
    isLoading: isLoadingProfileFromPath,
    hasLoadedProfile: Boolean(profile),
    isAddress: isAddressFromPath
  }
}

const mapDispatch = (dispatch: MapDispatch, ownProps: OwnProps) => ({
  onFetchProfile: () => dispatch(enhancedFetchProfileRequest(ownProps.router.params.profileAddress?.toLowerCase() as string))
})

export default WithRouter(connect(mapStateToProps, mapDispatch)(WithProfile))
