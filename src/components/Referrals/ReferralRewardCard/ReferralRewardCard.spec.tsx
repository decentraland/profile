import React from 'react'
import { Rarity } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import type { ReferralTier } from '../../../modules/referrals/types'
import { renderWithProviders } from '../../../tests/tests'
import {
  REFERRAL_REWARD_CARD_TEST_ID,
  REFERRAL_REWARD_TIER_TEST_ID,
  REFERRAL_REWARD_IMAGE_TEST_ID,
  REFERRAL_REWARD_RARITY_TEST_ID,
  REFERRAL_REWARD_SWAG_CONTAINER_TEST_ID,
  REFERRAL_REWARD_DESCRIPTION_TEST_ID,
  REFERRAL_REWARD_CLAIM_BUTTON_TEST_ID
} from './constants'
import { ReferralRewardCard } from './ReferralRewardCard'

describe('ReferralRewardCard', () => {
  let props: ReferralTier
  let renderedComponent: ReturnType<typeof renderReferralRewardCard>

  const renderReferralRewardCard = (props: ReferralTier) => {
    return renderWithProviders(<ReferralRewardCard {...props} />)
  }

  beforeEach(() => {
    props = {
      tier: 1,
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

    it('should display the given prop tier', () => {
      const { getByTestId } = renderedComponent
      const tierElement = getByTestId(REFERRAL_REWARD_TIER_TEST_ID)
      expect(tierElement).toHaveTextContent(t('referral_reward_card.tier', { count: props.tier }))
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
  })

  describe('when rendering the component is not being completed', () => {
    beforeEach(() => {
      renderedComponent = renderReferralRewardCard(props)
    })

    it('should display the unlock message', () => {
      const { getByTestId } = renderedComponent
      const descriptionElement = getByTestId(REFERRAL_REWARD_DESCRIPTION_TEST_ID)
      expect(descriptionElement).toHaveTextContent(t('referral_reward_card.unlock'))
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

    it('should display the unlocked message', () => {
      const { getByTestId } = renderedComponent
      const descriptionElement = getByTestId(REFERRAL_REWARD_DESCRIPTION_TEST_ID)
      expect(descriptionElement).toHaveTextContent(t('referral_reward_card.unlocked'))
    })

    describe('when claim is available', () => {
      beforeEach(() => {
        props = {
          ...props,
          claim: true
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

  describe('when rarity is SWAG', () => {
    beforeEach(() => {
      props = {
        ...props,
        rarity: 'SWAG'
      }
      renderedComponent = renderReferralRewardCard(props)
    })

    it('should display the SWAG container with tooltip', () => {
      const { getByTestId } = renderedComponent
      const swagContainer = getByTestId(REFERRAL_REWARD_SWAG_CONTAINER_TEST_ID)
      expect(swagContainer).toHaveTextContent(t('referral_reward_card.swag'))
    })
  })

  describe('when rarity is not defined', () => {
    beforeEach(() => {
      props = {
        ...props,
        rarity: null as unknown as Rarity | 'SWAG'
      }
      renderedComponent = renderReferralRewardCard(props)
    })

    it('should not display the rarity container', () => {
      const { queryByTestId } = renderedComponent
      expect(queryByTestId(REFERRAL_REWARD_RARITY_TEST_ID)).not.toBeInTheDocument()
    })
  })
})
