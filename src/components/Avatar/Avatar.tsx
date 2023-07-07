import { Icon } from 'semantic-ui-react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { WearablePreview } from 'decentraland-ui/dist/components/WearablePreview/WearablePreview'

import styles from './Avatar.module.css'

const Avatar = () => {
  return (
    <div className={styles.Avatar}>
      <WearablePreview disableBackground={true} profile="0xd4fEC88A49EB514e9347eC655D0481D8483a9AE0" />
      <Button secondary fluid>
        <Icon name="edit" />
        {t('avatar.edit')}
      </Button>
    </div>
  )
}

export default Avatar
