import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Rarity, Email } from '@dcl/schemas'
import type { ReferralTier } from '../../../modules/referrals/types'
import { renderWithProviders } from '../../../tests/tests'
import { REFERRAL_REWARD_REACHED_TEST_ID } from './constants'
import { ReferralRewardReached } from './ReferralRewardReached'

// Mock decentraland-ui2 to avoid MUI CssVarsProvider errors
jest.mock('decentraland-ui2', () => ({
  ...jest.requireActual('decentraland-ui2'),
  DclThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="dcl-theme-provider">{children}</div>,
  dclModal: {
    Modal: ({ children, open, onClose, ...props }: any) =>
      open ? (
        <div data-testid="dcl-modal" onClick={onClose} {...props}>
          {children}
        </div>
      ) : null
  }
}))

jest.mock('@dcl/schemas', () => ({
  ...jest.requireActual('@dcl/schemas'),
  ['Email']: {
    validate: jest.fn()
  }
}))

const mockTranslations = {
  reward: 'Reward',
  newItemUnlocked: 'NEW ITEM UNLOCKED',
  friendsJoined: '5 Invites accepted',
  swagRewardTitle: 'Claim your swag',
  swagRewardInputPlaceholder: 'Enter your email',
  swagRewardButton: 'Submit'
}

const mockT = jest.fn((key, values) => {
  if (key === 'referral_reward_reached.invites_accepted' && values?.count) {
    return mockTranslations.friendsJoined
  }
  switch (key) {
    case 'referral_reward_reached.reward':
      return mockTranslations.reward
    case 'referral_reward_reached.new_item_unlocked':
      return mockTranslations.newItemUnlocked
    case 'referral_reward_reached.swag_reward_title':
      return mockTranslations.swagRewardTitle
    case 'referral_reward_reached.swag_reward_input_placeholder':
      return mockTranslations.swagRewardInputPlaceholder
    case 'referral_reward_reached.swag_reward_button':
      return mockTranslations.swagRewardButton
    default:
      return key
  }
})

jest.mock('decentraland-dapps/dist/modules/translation/utils', () => ({
  t: mockT
}))

describe('ReferralRewardReached', () => {
  let mockReward: ReferralTier
  let mockOnClick: jest.Mock

  beforeEach(() => {
    mockReward = {
      image: 'test-image.png',
      rarity: Rarity.LEGENDARY,
      description: 'Test Reward Description',
      invitesAccepted: 5
    }

    mockOnClick = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  const renderComponent = (props: { reward: ReferralTier; open: boolean; onClick: jest.Mock }) => {
    return renderWithProviders(<ReferralRewardReached {...props} />)
  }

  describe('when the modal is open', () => {
    beforeEach(() => {
      renderComponent({
        reward: mockReward,
        open: true,
        onClick: mockOnClick
      })
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
    beforeEach(() => {
      renderComponent({
        reward: mockReward,
        open: true,
        onClick: mockOnClick
      })
    })

    it('should call the onClick function', async () => {
      await userEvent.click(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.modal))
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('when the modal is closed', () => {
    beforeEach(() => {
      renderComponent({
        reward: mockReward,
        open: false,
        onClick: mockOnClick
      })
    })

    it('should not display the content', () => {
      expect(screen.queryByTestId(REFERRAL_REWARD_REACHED_TEST_ID.modal)).not.toBeInTheDocument()
    })
  })

  describe('when rarity is SWAG', () => {
    beforeEach(() => {
      mockReward = {
        ...mockReward,
        rarity: 'SWAG'
      }
      renderComponent({
        reward: mockReward,
        open: true,
        onClick: mockOnClick
      })
    })

    it('should display the SWAG reward form', () => {
      expect(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardContainer)).toBeInTheDocument()
      expect(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardTitle)).toBeInTheDocument()
      expect(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardInput)).toBeInTheDocument()
      expect(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardButton)).toBeInTheDocument()
    })

    it('should handle email input changes', async () => {
      const emailInput = screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardInput)
      await userEvent.type(emailInput, 'test@example.com')
      expect(emailInput).toHaveValue('test@example.com')
    })

    it('should prevent event propagation when clicking input', async () => {
      const emailInput = screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardInput)
      await userEvent.click(emailInput)
      expect(mockOnClick).not.toHaveBeenCalled()
    })

    describe('when submitting valid email', () => {
      beforeEach(() => {
        ;(Email.validate as unknown as jest.Mock).mockReturnValue(true)
      })

      it('should not show error message', async () => {
        const emailInput = screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardInput)
        const submitButton = screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardButton)

        await userEvent.type(emailInput, 'valid@example.com')
        await userEvent.click(submitButton)

        expect(Email.validate).toHaveBeenCalledWith('valid@example.com')
        expect(screen.queryByText('Invalid email format')).not.toBeInTheDocument()
      })
    })

    describe('when submitting invalid email', () => {
      beforeEach(() => {
        ;(Email.validate as unknown as jest.Mock).mockReturnValue(false)
      })

      it('should show error message', async () => {
        const emailInput = screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardInput)
        const submitButton = screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardButton)

        await userEvent.type(emailInput, 'invalid-email')
        await userEvent.click(submitButton)

        expect(Email.validate).toHaveBeenCalledWith('invalid-email')
        expect(screen.getByText('Invalid email format')).toBeInTheDocument()
      })

      it('should clear error when typing valid email', async () => {
        const emailInput = screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardInput)
        const submitButton = screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardButton)

        await userEvent.type(emailInput, 'invalid-email')
        await userEvent.click(submitButton)
        expect(screen.getByText('Invalid email format')).toBeInTheDocument()

        await userEvent.clear(emailInput)
        await userEvent.type(emailInput, 'valid@example.com')
        expect(screen.queryByText('Invalid email format')).not.toBeInTheDocument()
      })
    })

    it('should prevent event propagation when clicking submit button', async () => {
      const submitButton = screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardButton)
      await userEvent.click(submitButton)
      expect(mockOnClick).not.toHaveBeenCalled()
    })
  })

  describe('when rarity is not SWAG', () => {
    beforeEach(() => {
      mockReward = {
        ...mockReward,
        rarity: Rarity.LEGENDARY
      }
      renderComponent({
        reward: mockReward,
        open: true,
        onClick: mockOnClick
      })
    })

    it('should not display the SWAG reward form', () => {
      expect(screen.queryByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardContainer)).not.toBeInTheDocument()
      expect(screen.queryByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardTitle)).not.toBeInTheDocument()
      expect(screen.queryByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardInput)).not.toBeInTheDocument()
      expect(screen.queryByTestId(REFERRAL_REWARD_REACHED_TEST_ID.swagRewardButton)).not.toBeInTheDocument()
    })
  })
})
