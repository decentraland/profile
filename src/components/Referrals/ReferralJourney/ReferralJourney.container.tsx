import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { RootState } from '../../../modules/reducer'
import { setReferralEmailRequest } from '../../../modules/referrals/actions'
import { ReferralJourney } from './ReferralJourney'
import { MapStateProps, MapDispatch, MapDispatchProps, OwnProps } from './ReferralJourney.types'

const mapState = (_: RootState, ownProps: OwnProps): MapStateProps => ({
  invitedUsersAccepted: ownProps.invitedUsersAccepted,
  invitedUsersAcceptedViewed: ownProps.invitedUsersAcceptedViewed,
  rewardImages: ownProps.rewardImages
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps =>
  bindActionCreators(
    {
      onSetReferralEmail: setReferralEmailRequest
    },
    dispatch
  )

export default connect(mapState, mapDispatch)(ReferralJourney)
