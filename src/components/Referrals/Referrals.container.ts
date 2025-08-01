import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { getProfileOfAddress } from 'decentraland-dapps/dist/modules/profile/selectors'
import { getIsReferralTestingButtonEnabled } from '../../modules/features/selectors'
import { RootState } from '../../modules/reducer'
import { fetchReferralsRequest } from '../../modules/referrals/actions'
import { getInvitedUsersAccepted, getInvitedUsersAcceptedViewed, getRewardGrantedImages } from '../../modules/referrals/selectors'
import Referrals from './Referrals'
import { MapStateProps, MapDispatch, MapDispatchProps, OwnProps } from './Referrals.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => ({
  invitedUsersAccepted: getInvitedUsersAccepted(state),
  invitedUsersAcceptedViewed: getInvitedUsersAcceptedViewed(state),
  rewardGrantedImages: getRewardGrantedImages(state),
  profileAddress: ownProps.profileAddress,
  isReferralTestingButtonEnabled: getIsReferralTestingButtonEnabled(state),
  avatar: getProfileOfAddress(state, ownProps.profileAddress)?.avatars[0]
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps =>
  bindActionCreators(
    {
      onFetchReferrals: fetchReferralsRequest
    },
    dispatch
  )

export default connect(mapState, mapDispatch)(Referrals)
