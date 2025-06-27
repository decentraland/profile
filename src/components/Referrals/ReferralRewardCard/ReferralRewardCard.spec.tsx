import React from 'react'
import { Rarity } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import type { ReferralTier } from '../../../modules/referrals/types'
import { renderWithProviders } from '../../../tests/tests'
import {
  REFERRAL_REWARD_CARD_TEST_ID,
  REFERRAL_REWARD_IMAGE_TEST_ID,
  REFERRAL_REWARD_RARITY_TEST_ID,
  REFERRAL_REWARD_CLAIM_BUTTON_TEST_ID,
  REFERRAL_REWARD_CHECK_ICON_TEST_ID,
  REFERRAL_REWARD_LOCK_ICON_TEST_ID
} from './constants'
import { ReferralRewardCard } from './ReferralRewardCard'

describe('ReferralRewardCard', () => {
  let props: ReferralTier & { completed: boolean }
  let renderedComponent: ReturnType<typeof renderReferralRewardCard>

  const renderReferralRewardCard = (props: ReferralTier & { completed: boolean }) => {
    return renderWithProviders(<ReferralRewardCard {...props} />)
  }

  beforeEach(() => {
    props = {
      invitesAccepted: 1,
      rarity: Rarity.COMMON,
      completed: false,
      image: 'test-image.png',
      claim: false,
      description: 'Test reward description'
    }
  })

  describe('when rendering the component', () => {
    beforeEach(() => {
      renderedComponent = renderReferralRewardCard(props)
    })

    it('should render the card container', () => {
      const { getByTestId } = renderedComponent
      expect(getByTestId(REFERRAL_REWARD_CARD_TEST_ID)).toBeInTheDocument()
    })

    it('should display the image with the translated alt text', () => {
      const { getByTestId } = renderedComponent
      const imageElement = getByTestId(REFERRAL_REWARD_IMAGE_TEST_ID)
      expect(imageElement).toHaveAttribute('alt', t('referral_reward_card.image_alt'))
      expect(imageElement).toHaveAttribute('src', props.image)
    })

    it('should display the rarity in uppercase', () => {
      const { getByTestId } = renderedComponent
      const rarityElement = getByTestId(REFERRAL_REWARD_RARITY_TEST_ID)
      expect(rarityElement).toHaveTextContent(props.rarity.toUpperCase())
    })

    describe('when the tier is not completed', () => {
      beforeEach(() => {
        props = {
          ...props,
          completed: false
        }
      })

      it('should display the lock icon', () => {
        const { getByTestId } = renderedComponent
        const lockIcon = getByTestId(REFERRAL_REWARD_LOCK_ICON_TEST_ID)
        expect(lockIcon).toBeInTheDocument()
      })
    })
  })

  describe('when the tier is completed', () => {
    beforeEach(() => {
      props = {
        ...props,
        completed: true
      }
      renderedComponent = renderReferralRewardCard(props)
    })

    it('should display the completed icon', () => {
      const { getByTestId } = renderedComponent
      const completedIcon = getByTestId(REFERRAL_REWARD_CHECK_ICON_TEST_ID)
      expect(completedIcon).toBeInTheDocument()
    })

    describe('when rarity is SWAG', () => {
      beforeEach(() => {
        props = {
          ...props,
          completed: true,
          rarity: 'SWAG'
        }
        renderedComponent = renderReferralRewardCard(props)
      })

      it('should display the claim button', () => {
        const { getByTestId } = renderedComponent
        const claimButton = getByTestId(REFERRAL_REWARD_CLAIM_BUTTON_TEST_ID)
        expect(claimButton).toHaveTextContent(t('referral_reward_card.claim'))
      })
    })
  })
})
