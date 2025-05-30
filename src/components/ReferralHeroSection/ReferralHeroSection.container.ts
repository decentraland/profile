import { connect } from 'react-redux'
import { isLoadingReferrals } from '../../modules/items/selectors'
import { RootState } from '../../modules/reducer'
import Referrals from './ReferralHeroSection'
import { MapStateProps, OwnProps } from './ReferralHeroSection.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return {
    isLoading: isLoadingReferrals(state),
    profileAddress: ownProps.profileAddress
  }
}

export default connect(mapState)(Referrals)
