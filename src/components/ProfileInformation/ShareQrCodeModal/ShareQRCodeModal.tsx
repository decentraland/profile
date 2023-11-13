import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Modal, Profile } from 'decentraland-ui'
import { config } from '../../../modules/config'
import { getAvatarName } from '../../../modules/profile/utils'
import { locations } from '../../../modules/routing/locations'
import { Props } from './ShareQrCodeModal.types'
import styles from './ShareQrCodeModal.module.css'

const PROFILE_URL = config.get('PROFILE_URL', '')

export default function ShareQrCodeModal({ profile, profileAddress, onClose }: Props) {
  const avatarName = getAvatarName(profile?.avatars[0])

  return (
    <Modal size="small" onClose={onClose} open className={styles.container}>
      <Profile size="huge" imageOnly address={profileAddress} avatar={profile?.avatars[0]} />
      <span className={styles.title}>{avatarName.fullName}</span>
      <QRCodeCanvas value={`${PROFILE_URL}${locations.account(profileAddress)}`} size={250} />
      <span className={styles.info}>{t('profile_information.qr_code.info')}</span>
    </Modal>
  )
}