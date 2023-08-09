import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { useTabletAndBelowMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import { Modal } from 'decentraland-ui/dist/components/Modal/Modal'
import { ModalNavigation } from 'decentraland-ui/dist/components/ModalNavigation/ModalNavigation'
import { FriendshipStatus } from '../../../modules/social/types'
import { Props } from './ConfirmationModal.types'
import styles from './ConfirmationModal.module.css'

const ConfirmationModal = (props: Props) => {
  const { type, onConfirm, onClose, isOpen, avatarName } = props

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <Modal size="small" onClose={onClose} open={isOpen} className={styles.ConfirmationModal}>
      <ModalNavigation
        title={
          type === FriendshipStatus.FRIEND && isTabletAndBelow
            ? t(`confirmation_modal.${type}.unfriend`, { avatarName })
            : t(`confirmation_modal.${type}.title`, { avatarName })
        }
        onClose={onClose}
      />
      <Modal.Content className={styles.subtitle}>
        {type === FriendshipStatus.PENDING_REQUEST && isTabletAndBelow && (
          <span className={styles.subtitleMobile}>
            {t(`confirmation_modal.${type}.title`, { avatarName })} <br /> <br />
          </span>
        )}
        {t(`confirmation_modal.${type}.subtitle`)}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose} className={isTabletAndBelow ? styles.actionButtonsMobile : ''}>
          {t(`confirmation_modal.${type}.cancel`)}
        </Button>
        <Button primary rel="noopener noreferrer" onClick={onConfirm} className={isTabletAndBelow ? styles.actionButtonsMobile : ''}>
          {t(`confirmation_modal.${type}.confirmation`)}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ConfirmationModal
