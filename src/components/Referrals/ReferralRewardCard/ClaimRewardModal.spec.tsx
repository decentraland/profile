import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Email } from '@dcl/schemas'
import { renderWithProviders } from '../../../tests/tests'
import ClaimRewardModal from './ClaimRewardModal'
import { CLAIM_REWARD_MODAL_TEST_ID } from './constants'
import { ClaimRewardModalProps } from './ClaimRewardModal.types'

jest.mock('decentraland-ui2', () => ({
  ...jest.requireActual('decentraland-ui2'),
  DclThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="dcl-theme-provider">{children}</div>,
  dclModal: {
    Modal: ({ children, open, onClose, ...props }: any) =>
      open ? (
        <div data-testid="dcl-modal" {...props}>
          <button aria-label="close" onClick={onClose} data-testid="modal-close-button">
            Close
          </button>
          {children}
        </div>
      ) : null
  }
}))

const mockTranslations = {
  title: 'Claim your IRL Swag Pack',
  description: "Enter your email and we'll reach out to arrange the shipment of your IRL Swag Bag!",
  emailPlaceholder: 'Write your email here',
  submit: 'SUBMIT'
}

const mockT = jest.fn(key => {
  switch (key) {
    case 'claim_reward_modal.title':
      return mockTranslations.title
    case 'claim_reward_modal.description':
      return mockTranslations.description
    case 'claim_reward_modal.email_placeholder':
      return mockTranslations.emailPlaceholder
    case 'claim_reward_modal.submit':
      return mockTranslations.submit
    default:
      return key
  }
})

jest.mock('decentraland-dapps/dist/modules/translation/utils', () => ({
  t: mockT
}))

jest.mock('@dcl/schemas', () => ({
  ...jest.requireActual('@dcl/schemas'),
  ['Email']: {
    validate: jest.fn()
  }
}))

describe('ClaimRewardModal', () => {
  let props: ClaimRewardModalProps
  let onClose: jest.Mock
  let onConfirm: jest.Mock

  beforeEach(() => {
    onClose = jest.fn()
    onConfirm = jest.fn()
    props = {
      isOpen: true,
      onClose,
      onConfirm
    }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  const renderComponent = (props: ClaimRewardModalProps) => {
    return renderWithProviders(<ClaimRewardModal {...props} />)
  }

  describe('when the modal is open', () => {
    beforeEach(() => {
      renderComponent(props)
    })

    it('should display the modal with all elements', () => {
      expect(screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.title)).toBeInTheDocument()
      expect(screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.description)).toBeInTheDocument()
      expect(screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)).toBeInTheDocument()
      expect(screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)).toBeInTheDocument()
    })

    it('should display the translated content', () => {
      expect(screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.title)).toHaveTextContent(mockTranslations.title)
      expect(screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.description)).toHaveTextContent(mockTranslations.description)
      expect(screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)).toHaveTextContent(mockTranslations.submit)
    })

    it('should have submit button disabled initially', () => {
      const submitButton = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)
      expect(submitButton).toBeDisabled()
    })
  })

  describe('when the modal is closed', () => {
    beforeEach(() => {
      props = {
        ...props,
        isOpen: false
      }
      renderComponent(props)
    })

    it('should not display the modal', () => {
      expect(screen.queryByTestId(CLAIM_REWARD_MODAL_TEST_ID.title)).not.toBeInTheDocument()
    })
  })

  describe('when entering email', () => {
    let emailInput: HTMLElement
    let submitButton: HTMLElement

    beforeEach(() => {
      renderComponent(props)
      emailInput = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)
      submitButton = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)
    })

    describe('when the email is valid', () => {
      beforeEach(() => {
        ;(Email.validate as unknown as jest.Mock).mockReturnValue(true)
      })

      it('should enable submit button', async () => {
        await userEvent.type(emailInput, 'test@example.com')

        expect(Email.validate).toHaveBeenCalledWith('test@example.com')
        expect(submitButton).not.toBeDisabled()
      })
    })

    describe('when the email is invalid', () => {
      beforeEach(() => {
        ;(Email.validate as unknown as jest.Mock).mockReturnValue(false)
      })

      it('should keep submit button disabled', async () => {
        await userEvent.type(emailInput, 'invalid-email')

        expect(Email.validate).toHaveBeenCalledWith('invalid-email')
        expect(submitButton).toBeDisabled()
      })
    })

    describe('when the email is empty', () => {
      beforeEach(() => {
        ;(Email.validate as unknown as jest.Mock).mockReturnValue(false)
      })

      it('should keep submit button disabled', async () => {
        expect(submitButton).toBeDisabled()
      })
    })
  })

  describe('when clicking buttons', () => {
    let emailInput: HTMLElement
    let submitButton: HTMLElement

    beforeEach(() => {
      renderComponent(props)
      emailInput = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)
      submitButton = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)
    })

    describe('when clicking the close button', () => {
      it('should call onClose', async () => {
        const closeButton = screen.getByLabelText('close')

        await userEvent.click(closeButton)
        expect(onClose).toHaveBeenCalledTimes(1)
      })
    })

    describe('when clicking the submit button', () => {
      describe('when the email is valid', () => {
        beforeEach(() => {
          ;(Email.validate as unknown as jest.Mock).mockReturnValue(true)
        })

        it('should call onConfirm with email', async () => {
          await userEvent.type(emailInput, 'test@example.com')
          await userEvent.click(submitButton)

          expect(onConfirm).toHaveBeenCalledWith('test@example.com')
        })
      })

      describe('when the email is invalid', () => {
        beforeEach(() => {
          ;(Email.validate as unknown as jest.Mock).mockReturnValue(false)
        })

        it('should not call onConfirm', async () => {
          expect(submitButton).toBeDisabled()
          expect(onConfirm).not.toHaveBeenCalled()
        })
      })
    })
  })

  describe('when handling email validation errors', () => {
    let emailInput: HTMLElement
    let submitButton: HTMLElement

    beforeEach(() => {
      renderComponent(props)
      emailInput = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)
      submitButton = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.submitButton)
    })

    describe('when submitting invalid email', () => {
      beforeEach(() => {
        ;(Email.validate as unknown as jest.Mock).mockReturnValue(false)
      })

      it('should show error message', async () => {
        await userEvent.type(emailInput, 'invalid-email')

        expect(Email.validate).toHaveBeenCalledWith('invalid-email')
        expect(submitButton).toBeDisabled()
      })
    })

    describe('when typing valid email after error', () => {
      beforeEach(() => {
        ;(Email.validate as unknown as jest.Mock)
          .mockReturnValueOnce(false) // First call - invalid
          .mockReturnValueOnce(true) // Second call - valid
      })

      it('should clear error message', async () => {
        await userEvent.type(emailInput, 'invalid-email')
        expect(Email.validate).toHaveBeenCalledWith('invalid-email')

        await userEvent.clear(emailInput)
        await userEvent.type(emailInput, 'valid@example.com')

        expect(Email.validate).toHaveBeenCalledWith('valid@example.com')
      })
    })

    describe('when starting to type after error', () => {
      beforeEach(() => {
        ;(Email.validate as unknown as jest.Mock).mockReturnValue(false)
      })

      it('should clear error message', async () => {
        await userEvent.type(emailInput, 'invalid-email')
        expect(Email.validate).toHaveBeenCalledWith('invalid-email')

        await userEvent.clear(emailInput)
        await userEvent.type(emailInput, 'v')

        expect(Email.validate).toHaveBeenCalledWith('v')
      })
    })
  })

  describe('when closing the modal', () => {
    let emailInput: HTMLElement

    beforeEach(() => {
      renderComponent(props)
      emailInput = screen.getByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)
    })

    describe('when the modal is closed and reopened', () => {
      beforeEach(() => {
        ;(Email.validate as unknown as jest.Mock).mockReturnValue(false)
      })

      it('should clear email and error state', async () => {
        await userEvent.type(emailInput, 'invalid-email')
        expect(Email.validate).toHaveBeenCalledWith('invalid-email')

        const closeButton = screen.getByLabelText('close')
        await userEvent.click(closeButton)
        expect(onClose).toHaveBeenCalledTimes(1)

        props = { ...props, isOpen: true }
        renderComponent(props)

        const allEmailInputs = screen.getAllByTestId(CLAIM_REWARD_MODAL_TEST_ID.emailInput)
        expect(allEmailInputs[allEmailInputs.length - 1]).toHaveValue('')
      })
    })
  })
})
