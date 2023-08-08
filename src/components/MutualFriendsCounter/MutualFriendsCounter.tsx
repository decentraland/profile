import React, { useEffect } from 'react'
import classNames from 'classnames'
import Profile from 'decentraland-dapps/dist/containers/Profile'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import { Props } from './MutualFriendsCounter.types'
import styles from './MutualFriendsCounter.module.css'

const MutualFriendsCounter = (props: Props) => {
  const { count, firstMutuals, friendAddress, isLoading, className, onClick, onFetchMutualFriends } = props

  useEffect(() => {
    onFetchMutualFriends()
  }, [friendAddress])

  if (!isLoading && count === 0) {
    return null
  }

  return (
    <div
      className={classNames(styles.counter, className, { [styles.clickable]: count > 0 })}
      role="button"
      onClick={count > 0 ? onClick : undefined}
      data-testid="mutual-friends-counter"
    >
      {isLoading ? (
        <Loader active inline size="mini" />
      ) : (
        <>
          {count > 0 ? firstMutuals.map(mutual => <Profile address={mutual} key={mutual} imageOnly />) : null}
          <span>
            {count} {t('mutual_friends_counter.mutual')}
          </span>
        </>
      )}
    </div>
  )
}

export default MutualFriendsCounter
