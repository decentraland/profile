import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Modal, Profile, Close } from 'decentraland-ui'
import { config } from '../../../modules/config'
import { getAvatarName } from '../../../modules/profile/utils'
import { locations } from '../../../modules/routing/locations'
import { Props } from './ShareQrCodeModal.types'
import styles from './ShareQrCodeModal.module.css'

const PROFILE_URL = config.get('PROFILE_URL', '')

export default function ShareQrCodeModal({ profile, profileAddress, onClose }: Props) {
  const avatarName = getAvatarName(profile?.avatars[0])

  return (
    <Modal size="small" onClose={onClose} open className={styles.container} closeIcon={<Close />}>
      <Profile size="huge" imageOnly address={profileAddress} avatar={profile?.avatars[0]} />
      <span className={styles.title}>{avatarName.fullName}</span>
      <QRCodeCanvas value={`${PROFILE_URL}${locations.account(profileAddress)}`} size={250} />
      <span className={styles.info}>
        {!profile?.avatars[0]
          ? t('profile_information.qr_code_info')
          : t('profile_information.qr_code_info_with_name', { name: avatarName.fullName })}
      </span>
    </Modal>
  )
}
