import React from 'react'
import classNames from 'classnames'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import userIcon from '../../assets/icons/User.png'
import { Props } from './FriendsCounter.types'
import styles from './FriendsCounter.module.css'

const FriendsCounter = (props: Props) => {
  const { count, isLoading, className, onClick } = props

  return (
    <div
      className={classNames(styles.counter, className, { [styles.clickable]: count > 0 })}
      role="button"
      onClick={count > 0 ? onClick : undefined}
      data-testid="FriendsCounter"
    >
      {isLoading ? (
        <Loader active inline size="mini" />
      ) : (
        <>
          <img src={userIcon} />
          <span>
            {t('friends_counter.friends', {
              count
            })}
          </span>
        </>
      )}
    </div>
  )
}

export default FriendsCounter
