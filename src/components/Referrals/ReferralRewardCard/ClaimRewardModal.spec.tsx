import React from 'react'
import { cleanup, screen, act, fireEvent } from '@testing-library/react'
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

  afterEach(() => {
    renderedComponent.unmount()
    cleanup()
  })

  describe.only('when the modal is open', () => {
    beforeEach(() => {
      renderedComponent = renderClaimRewardModal({})
    })

    afterEach(() => {
      renderedComponent.unmount()
      cleanup()
    })

    it('should render all components with the correct text', () => {
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.title)).toBeInTheDocument()
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.description)).toBeInTheDocument()
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)).toBeInTheDocument()
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)).toBeInTheDocument()
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.title).textContent).toBe(t('claim_reward_modal.title'))
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.description).textContent).toBe(t('claim_reward_modal.description'))
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton).textContent).toBe(t('claim_reward_modal.submit'))
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)).toBeDisabled()
    })
  })

  describe('when the modal is closed', () => {
    beforeEach(() => {
      renderedComponent = renderClaimRewardModal({ isOpen: false })
    })

    afterEach(() => {
      renderedComponent.unmount()
      cleanup()
    })

    it('should not render the modal', () => {
      expect(renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.title)).not.toBeInTheDocument()
    })
  })

  describe('when the user enters a valid email', () => {
    beforeEach(() => {
      onConfirm = jest.fn()
      renderedComponent = renderClaimRewardModal({ onConfirm })
    })

    afterEach(() => {
      renderedComponent.unmount()
      cleanup()
    })

    it('should enable the submit button', async () => {
      const emailInput = renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)
      const submitButton = renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      })

      expect(submitButton).not.toBeDisabled()
    })

    describe('and the user clicks on the submit button', () => {
      beforeEach(() => {
        onConfirm = jest.fn()
        renderedComponent = renderClaimRewardModal({ onClose, onConfirm })
      })

      afterEach(() => {
        renderedComponent.unmount()
        cleanup()
      })

      it('should call onConfirm', async () => {
        const emailInput = renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)
        const submitButton = renderedComponent.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)

        await act(async () => {
          fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        })

        expect(submitButton).not.toBeDisabled()

        await act(async () => {
          fireEvent.click(submitButton)
        })

        expect(onConfirm).toHaveBeenCalledWith('test@example.com')
      })
    })
  })

  describe('when the user enters an invalid email', () => {
    beforeEach(() => {
      renderedComponent = renderClaimRewardModal({})
    })

    afterEach(() => {
      renderedComponent.unmount()
      cleanup()
    })

    it('should keep the submit button disabled not call onConfirm when clicking submit button', async () => {
      const emailInput = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)
      const submitButton = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
      })

      expect(submitButton).toBeDisabled()

      await act(async () => {
        fireEvent.click(submitButton)
      })

      expect(onConfirm).not.toHaveBeenCalled()
    })
  })

  describe('when the user clicks the close button', () => {
    beforeEach(() => {
      onClose = jest.fn()
      renderedComponent = renderClaimRewardModal({ onClose })
    })

    afterEach(() => {
      renderedComponent.unmount()
      cleanup()
    })

    it('should call onClose', async () => {
      const closeButton = screen.getByLabelText('close')

      await act(async () => {
        fireEvent.click(closeButton)
      })

      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('when the user enters an invalid email and then a valid one', () => {
    beforeEach(() => {
      onClose = jest.fn()
      onConfirm = jest.fn()
      renderedComponent = renderClaimRewardModal({ onClose, onConfirm })
    })

    afterEach(() => {
      renderedComponent.unmount()
      cleanup()
    })

    it('should enable the submit button after entering valid email', async () => {
      const emailInput = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)
      const submitButton = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
      })

      expect(submitButton).toBeDisabled()

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: 'valid@example.com' } })
      })

      expect(submitButton).not.toBeDisabled()
    })
  })
})
