import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { useTabletAndBelowMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import { Modal } from 'decentraland-ui/dist/components/Modal/Modal'
import { ModalNavigation } from 'decentraland-ui/dist/components/ModalNavigation/ModalNavigation'
import { Props } from './ConfirmationModal.types'
import styles from './ConfirmationModal.module.css'

const ConfirmationModal = (props: Props) => {
  const { type, onConfirm, onClose, isOpen, avatarName } = props

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <Modal size="small" onClose={onClose} open={isOpen} className={styles.ConfirmationModal}>
      <ModalNavigation
        title={
          isTabletAndBelow
            ? t(`confirmation_modal.${type}_title_mobile`, { avatarName })
            : t(`confirmation_modal.${type}_title`, { avatarName })
        }
        onClose={onClose}
      />
      <Modal.Content className={styles.subtitle}>
        {isTabletAndBelow && (
          <span className={styles.subtitleMobile}>
            {t(`confirmation_modal.${type}_title`, { avatarName })} <br /> <br />
          </span>
        )}
        {t(`confirmation_modal.${type}_subtitle`)}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose} className={isTabletAndBelow ? styles.actionButtonsMobile : ''}>
          {t(`confirmation_modal.${type}_cancel`)}
        </Button>
        <Button primary rel="noopener noreferrer" onClick={onConfirm} className={isTabletAndBelow ? styles.actionButtonsMobile : ''}>
          {t(`confirmation_modal.${type}_confirmation`)}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ConfirmationModal
