import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { RootState } from '../../modules/reducer'
import { fetchReferralsRequest } from '../../modules/referrals/actions'
import { getError, isLoadingReferrals, getInvitedUsersAccepted, getInvitedUsersAcceptedViewed } from '../../modules/referrals/selectors'
import Referrals from './Referrals'
import { MapStateProps, MapDispatch, MapDispatchProps, OwnProps } from './Referrals.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => ({
  error: getError(state),
  isLoading: isLoadingReferrals(state),
  invitedUsersAccepted: getInvitedUsersAccepted(state),
  invitedUsersAcceptedViewed: getInvitedUsersAcceptedViewed(state),
  profileAddress: ownProps.profileAddress
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps =>
  bindActionCreators(
    {
      onFetchReferrals: fetchReferralsRequest
    },
    dispatch
  )

export default connect(mapState, mapDispatch)(Referrals)
