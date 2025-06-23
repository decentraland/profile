import React, { useEffect } from 'react'
import { REFERRALS_CONTAINER_TEST_ID, REFERRALS_HERO_SECTION_TEST_ID, REFERRALS_JOURNEY_TEST_ID } from './constants'
import { ReferralHeroSection } from './ReferralHeroSection'
import { ReferralJourney } from './ReferralJourney'
import { ReferralsContainer, ReferralJourneySectionContainer } from './Referrals.styled'
import { Props } from './Referrals.types'

const Referrals = (props: Props) => {
  const { profileAddress, onFetchReferrals, invitedUsersAccepted } = props

  useEffect(() => {
    if (profileAddress) {
      onFetchReferrals()
    }
  }, [profileAddress, onFetchReferrals])

  return (
    <ReferralsContainer data-testid={REFERRALS_CONTAINER_TEST_ID}>
      <div data-testid={REFERRALS_HERO_SECTION_TEST_ID}>
        <ReferralHeroSection profileAddress={profileAddress} />
      </div>
      <ReferralJourneySectionContainer data-testid={REFERRALS_JOURNEY_TEST_ID}>
        <ReferralJourney invitedUsersAccepted={invitedUsersAccepted} />
      </ReferralJourneySectionContainer>
    </ReferralsContainer>
  )
}

export default Referrals
