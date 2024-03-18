import React, { useMemo } from 'react'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { ModalNavigation } from 'decentraland-ui/dist/components/ModalNavigation/ModalNavigation'
import { AvatarFacts } from '../../../modules/profile/types'
import { getAvatarFacts } from '../../../modules/profile/utils'
import { hasHttpProtocol } from '../../../utils/url'
import { AvatarLink } from '../../AvatarLink'
import { AvatarFact } from './AvatarFact'
import { Props } from './AboutModal.types'
import styles from './AboutModal.module.css'

const AboutModal = (props: Props) => {
  const {
    onClose,
    metadata: { avatar }
  } = props

  const avatarFacts = getAvatarFacts(avatar)
  const links = useMemo(() => avatar.links?.filter(link => hasHttpProtocol(link.url)) ?? [], [avatar.links])

  return (
    <Modal onClose={onClose} className={styles.modal} size="large">
      <ModalNavigation title={t('about_modal.title')} onClose={onClose} data-testid="about-modal" />
      <Modal.Content className={styles.content}>
        {avatar.description && <AvatarFact title="description" value={avatar.description} />}
        <div className={styles.facts}>
          {Object.entries(avatarFacts)
            .filter(([_key, value]) => value)
            .map(([key, value], index) => (
              <AvatarFact title={key as keyof AvatarFacts} value={value} key={`fact-${index}`} />
            ))}
        </div>
        {links.length ? (
          <div className={styles.links}>
            <div className={styles.label}>{t('about_modal.links_label')}</div>
            <div className={styles.values}>
              {links.map((link, index) => (
                <AvatarLink link={link} key={`link-${index}`} />
              ))}
            </div>
          </div>
        ) : null}
      </Modal.Content>
    </Modal>
  )
}

export default AboutModal
