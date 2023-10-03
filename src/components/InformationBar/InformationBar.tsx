import React, { useCallback } from 'react'
import classNames from 'classnames'
import { Dropdown, DropdownProps } from 'decentraland-ui/dist/components/Dropdown/Dropdown'
import { useMobileMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import { INFORMATION_BAR_COUNTER_DATA_TEST_ID, INFORMATION_BAR_MOBILE_DATA_TEST_ID } from './constants'
import { Props } from './InformationBar.types'
import styles from './InformationBar.module.css'

const InformationBar = <T extends string>(props: Props<T>) => {
  const { count, sortBy, sortByOptions, isLoading, className, hasFiltersEnabled, getCountText, onSortByChange, onOpenFiltersModal } = props
  const isMobile = useMobileMediaQuery()

  const handleOnSortChange = useCallback((_: unknown, props: DropdownProps) => {
    onSortByChange(props.value as T)
  }, [])

  return (
    <div className={classNames(styles.infoRow, className)}>
      {!isLoading && count !== undefined ? (
        <div className={styles.countContainer} data-testid={INFORMATION_BAR_COUNTER_DATA_TEST_ID}>
          <p className={styles.countText}>{getCountText(count)}</p>
        </div>
      ) : null}
      <div className={styles.rightOptionsContainer}>
        <Dropdown direction="left" value={sortBy} options={sortByOptions} onChange={handleOnSortChange} />
        {isMobile ? (
          <i
            data-testid={INFORMATION_BAR_MOBILE_DATA_TEST_ID}
            className={classNames(styles.openFilters, styles.openFiltersWrapper, hasFiltersEnabled && styles.active)}
            onClick={onOpenFiltersModal}
          />
        ) : null}
      </div>
    </div>
  )
}

export default InformationBar
