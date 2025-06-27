import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { renderWithProviders } from '../../../tests/tests'
import ClaimRewardModal from './ClaimRewardModal'
import { CLAIM_REWARD_MODAL_TEST_ID } from './constants'
import { ClaimRewardModalProps } from './ClaimRewardModal.types'

const renderClaimRewardModal = (props: Partial<ClaimRewardModalProps>) =>
  renderWithProviders(<ClaimRewardModal isOpen={true} onClose={() => undefined} onConfirm={() => undefined} {...props} />)

describe('ClaimRewardModal', () => {
  let onClose: jest.Mock
  let onConfirm: jest.Mock
  let renderedComponent: ReturnType<typeof renderClaimRewardModal>

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe.only('when the modal is open', () => {
    beforeEach(() => {
      onClose = jest.fn()
      onConfirm = jest.fn()
      renderedComponent = renderClaimRewardModal({ isOpen: true, onClose, onConfirm })
    })

    it.only('should render the modal', () => {
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.modal)).toBeInTheDocument()
    })

    it('should render the title component', () => {
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.title)).toBeInTheDocument()
    })

    it('should render the description component', () => {
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.description)).toBeInTheDocument()
    })

    it('should render the email input component', () => {
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)).toBeInTheDocument()
    })

    it('should render the submit button component', () => {
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)).toBeInTheDocument()
    })

    it('should render the title with the correct text', () => {
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.title).textContent).toBe(t('claim_reward_modal.title'))
    })

    it('should render the description with the correct text', () => {
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.description).textContent).toBe(t('claim_reward_modal.description'))
    })

    it('should render the submit button with the correct text', () => {
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton).textContent).toBe(t('claim_reward_modal.submit'))
    })
  })

  describe('when the modal is closed', () => {
    beforeEach(() => {
      renderClaimRewardModal({ isOpen: false, onClose, onConfirm })
    })

    it('should not render the modal', () => {
      expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
    })
  })

  describe('when the email input is empty', () => {
    beforeEach(() => {
      onClose = jest.fn()
      onConfirm = jest.fn()
      renderedComponent = renderClaimRewardModal({ isOpen: true, onClose, onConfirm })
    })

    it('should render the email input with empty value', () => {
      const emailInput = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput).querySelector('input') as HTMLInputElement
      expect(emailInput.value).toBe('')
    })

    it('should render the submit button as disabled', () => {
      expect(screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)).toBeDisabled()
    })
  })

  describe('when the user enters a valid email', () => {
    beforeEach(() => {
      renderClaimRewardModal({ onClose, onConfirm })
    })

    it('should enable the submit button', async () => {
      const emailInput = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)
      const submitButton = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)

      await userEvent.type(emailInput, 'test@example.com')

      expect(submitButton).not.toBeDisabled()
    })

    it('should call onConfirm when clicking submit button', async () => {
      const emailInput = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)
      const submitButton = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)

      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.click(submitButton)

      expect(onConfirm).toHaveBeenCalledWith('test@example.com')
    })
  })

  describe('when the user enters an invalid email', () => {
    beforeEach(() => {
      renderClaimRewardModal({ onClose, onConfirm })
    })

    it('should keep the submit button disabled', async () => {
      const emailInput = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)
      const submitButton = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)

      await userEvent.type(emailInput, 'invalid-email')

      expect(submitButton).toBeDisabled()
    })

    it('should not call onConfirm when clicking submit button', async () => {
      const emailInput = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)
      const submitButton = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)

      await userEvent.type(emailInput, 'invalid-email')
      await userEvent.click(submitButton)

      expect(onConfirm).not.toHaveBeenCalled()
    })
  })

  describe('when the user clicks the close button', () => {
    beforeEach(() => {
      renderClaimRewardModal({ onClose, onConfirm })
    })

    it('should call onClose', async () => {
      const closeButton = screen.getByLabelText('close')

      await userEvent.click(closeButton)

      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('when the user enters an invalid email and then a valid one', () => {
    beforeEach(() => {
      renderClaimRewardModal({ onClose, onConfirm })
    })

    it('should enable the submit button after entering valid email', async () => {
      const emailInput = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)
      const submitButton = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)

      await userEvent.type(emailInput, 'invalid-email')
      expect(submitButton).toBeDisabled()

      await userEvent.clear(emailInput)
      await userEvent.type(emailInput, 'valid@example.com')

      expect(submitButton).not.toBeDisabled()
    })
  })

  describe('when the modal is closed and reopened', () => {
    it('should clear the email input', async () => {
      const { rerender } = renderClaimRewardModal({ isOpen: true, onClose, onConfirm })

      const emailInput = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput).querySelector('input') as HTMLInputElement
      await userEvent.type(emailInput, 'test@example.com')

      rerender(<ClaimRewardModal isOpen={false} onClose={onClose} onConfirm={onConfirm} />)

      rerender(<ClaimRewardModal isOpen={true} onClose={onClose} onConfirm={onConfirm} />)

      const newEmailInput = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput).querySelector('input') as HTMLInputElement
      expect(newEmailInput.value).toBe('')
    })
  })
})
