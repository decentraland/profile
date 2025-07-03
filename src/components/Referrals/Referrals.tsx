import React, { useEffect, useState } from 'react'
import { Button } from 'decentraland-ui2'
import { REFERRALS_CONTAINER_TEST_ID, REFERRALS_HERO_SECTION_TEST_ID, REFERRALS_JOURNEY_TEST_ID } from './constants'
import { ReferralHeroSection } from './ReferralHeroSection'
import { ReferralJourney } from './ReferralJourney'
import { ReferralsContainer, ReferralJourneySectionContainer, ReferralHeroContainer } from './Referrals.styled'
import { Props } from './Referrals.types'

const Referrals = (props: Props) => {
  const { profileAddress, onFetchReferrals, invitedUsersAccepted, isReferralTestingButtonEnabled } = props

  useEffect(() => {
    if (profileAddress) {
      onFetchReferrals()
    }
  }, [profileAddress, onFetchReferrals])

  const [invitedUsers, setInvitedUsers] = useState<number>(invitedUsersAccepted)

  return (
    <ReferralsContainer data-testid={REFERRALS_CONTAINER_TEST_ID}>
      <ReferralHeroContainer data-testid={REFERRALS_HERO_SECTION_TEST_ID}>
        <ReferralHeroSection profileAddress={profileAddress} />
      </ReferralHeroContainer>
      <ReferralJourneySectionContainer data-testid={REFERRALS_JOURNEY_TEST_ID}>
        <ReferralJourney invitedUsersAccepted={invitedUsers} />
      </ReferralJourneySectionContainer>
      {isReferralTestingButtonEnabled && <Button onClick={() => setInvitedUsers(invitedUsers + 1)}>Test adding invited user</Button>}
    </ReferralsContainer>
  )
}

export default Referrals
