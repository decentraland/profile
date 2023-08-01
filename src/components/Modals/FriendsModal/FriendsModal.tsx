import React, { useCallback } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { useMobileMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import { ModalNavigation } from 'decentraland-ui/dist/components/ModalNavigation/ModalNavigation'
import FriendshipButton from '../../FriendshipButton'
import { LinkedProfile } from '../../LinkedProfile'
import { Props } from './FriendsModal.types'
import styles from './FriendsModal.module.css'

const ITEM_HEIGHT = 40
const DEFAULT_LIST_HEIGHT = 300
const DEFAULT_LIST_WIDTH = 650

const FriendsModal = (props: Props) => {
  const { onClose, friends } = props

  const isMobile = useMobileMediaQuery()
  console.log('Friends', friends)

  const Row = useCallback(
    ({ index, style }: { index: number; style: object }) => {
      console.log('Rendering row', index)
      return (
        <div style={style} className={styles.row} tabIndex={0}>
          <LinkedProfile size="large" key={friends[index]} sliceAddressBy={isMobile ? 18 : 42} address={friends[index]} />
          <FriendshipButton className={styles.friendshipButton} friendAddress={friends[index]} />
        </div>
      )
    },
    [friends, isMobile]
  )

  return (
    <Modal size="tiny" onClose={onClose}>
      <ModalNavigation title={t('friends_modal.friends.title')} onClose={onClose} data-testid="friends-modal" />
      <Modal.Content className={styles.content}>
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              itemCount={friends.length}
              itemSize={ITEM_HEIGHT}
              height={height ?? DEFAULT_LIST_HEIGHT}
              width={width ?? DEFAULT_LIST_WIDTH}
            >
              {Row}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Modal.Content>
    </Modal>
  )
}

export default FriendsModal
