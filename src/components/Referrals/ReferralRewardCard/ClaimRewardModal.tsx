import React, { useCallback, useState } from 'react'
import { Email } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { dclModal } from 'decentraland-ui2'
import { Title, Subtitle, ModalInputContainer, ModalInput, ModalButton } from './ClaimRewardModal.styled'
import { CLAIM_REWARD_MODAL_TEST_ID } from './constants'
import { ClaimRewardModalProps } from './ClaimRewardModal.types'

const ClaimRewardModal = (props: ClaimRewardModalProps) => {
  const { isOpen, onClose, onConfirm } = props
  const [email, setEmail] = useState('')
  const [hasError, setHasError] = useState(false)

  const handleConfirm = useCallback(() => {
    if (Email.validate(email)) {
      setHasError(false)
      onConfirm(email)
      setEmail('')
    } else {
      setHasError(true)
    }
  }, [onConfirm, email])

  const handleClose = useCallback(() => {
    setEmail('')
    setHasError(false)
    onClose()
  }, [onClose])

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value)
      if (hasError) {
        setHasError(false)
      }
    },
    [hasError]
  )

  return (
    <dclModal.Modal size="small" onClose={handleClose} open={isOpen} data-testid={CLAIM_REWARD_MODAL_TEST_ID.modal}>
      <>
        <Title variant="h2" data-testid={CLAIM_REWARD_MODAL_TEST_ID.title}>
          {t('claim_reward_modal.title')}
        </Title>
        <Subtitle data-testid={CLAIM_REWARD_MODAL_TEST_ID.description}>{t('claim_reward_modal.description')}</Subtitle>

        <ModalInputContainer>
          <ModalInput
            placeholder={t('claim_reward_modal.email_placeholder')}
            value={email}
            onChange={handleEmailChange}
            type="email"
            error={hasError}
            helperText={hasError ? 'Invalid email format' : ''}
            inputProps={{
              ['data-testid']: CLAIM_REWARD_MODAL_TEST_ID.emailInput
            }}
          />
          <ModalButton
            variant="contained"
            onClick={handleConfirm}
            disabled={!Email.validate(email)}
            data-testid={CLAIM_REWARD_MODAL_TEST_ID.submitButton}
          >
            {t('claim_reward_modal.submit')}
          </ModalButton>
        </ModalInputContainer>
      </>
    </dclModal.Modal>
  )
}

export default ClaimRewardModal
