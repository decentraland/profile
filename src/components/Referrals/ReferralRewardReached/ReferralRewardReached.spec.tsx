import React from 'react'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Rarity } from '@dcl/schemas'
import type { ReferralTier } from '../../../modules/referrals/types'
import { REFERRAL_REWARD_REACHED_TEST_ID } from './constants'
import { ReferralRewardReached } from './ReferralRewardReached'

const mockTranslations = {
  reward: 'Reward',
  newItemUnlocked: 'NEW ITEM UNLOCKED',
  friendsJoined: '5 Friends Joined'
}

const mockT = jest.fn((key, values) => {
  if (key === 'referral_reward_reached.friends_joined' && values?.count) {
    return mockTranslations.friendsJoined
  }
  switch (key) {
    case 'referral_reward_reached.reward':
      return mockTranslations.reward
    case 'referral_reward_reached.new_item_unlocked':
      return mockTranslations.newItemUnlocked
    default:
      return key
  }
})

jest.mock('decentraland-dapps/dist/modules/translation/utils', () => ({
  t: mockT
}))

describe('ReferralRewardReached', () => {
  const mockReward: ReferralTier = {
    image: 'test-image.png',
    rarity: Rarity.LEGENDARY,
    description: 'Test Reward Description',
    tier: 5,
    completed: true
  }

  const mockProps = {
    reward: mockReward,
    open: true,
    onClick: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when the modal is open', () => {
    beforeEach(() => {
      render(<ReferralRewardReached {...mockProps} />)
    })

    it('should display the modal with all elements', () => {
      expect(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.modal)).toBeInTheDocument()
      expect(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.container)).toBeInTheDocument()
      expect(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.animatedBackground)).toBeInTheDocument()
      expect(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.wrapper)).toBeInTheDocument()
      expect(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.gradientBorder)).toBeInTheDocument()
      expect(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.imageContainer)).toBeInTheDocument()
      expect(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.image)).toBeInTheDocument()
    })

    it('should display the translated content from props', () => {
      expect(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.preTitle)).toHaveTextContent(mockTranslations.reward)
      expect(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.title)).toHaveTextContent(mockTranslations.newItemUnlocked)
      expect(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.subtitle)).toHaveTextContent(mockTranslations.friendsJoined)
      expect(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.description)).toHaveTextContent(mockReward.description)
    })

    it('should display the image with the given props', () => {
      const image = screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.image)
      expect(image).toHaveAttribute('src', mockReward.image)
      expect(image).toHaveAttribute('alt', `${mockReward.rarity}-reward`)
    })
  })

  describe('when clicking the modal', () => {
    it('should call the onClick function', async () => {
      render(<ReferralRewardReached {...mockProps} />)
      await userEvent.click(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.modal))
      expect(mockProps.onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('when the modal is closed', () => {
    it('should not display the content', () => {
      render(<ReferralRewardReached {...mockProps} open={false} />)
      expect(screen.queryByTestId(REFERRAL_REWARD_REACHED_TEST_ID.modal)).not.toBeInTheDocument()
    })
  })
})
