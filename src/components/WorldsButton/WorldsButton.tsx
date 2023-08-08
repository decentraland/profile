import React, { useCallback, useEffect } from 'react'
import classNames from 'classnames'
import { getAnalytics } from 'decentraland-dapps/dist/modules/analytics/utils'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { Dropdown } from 'decentraland-ui/dist/components/Dropdown/Dropdown'
import jumpIcon from '../../assets/icons/Jump.png'
import verifiedIcon from '../../assets/icons/Verified.png'
import worldIcon from '../../assets/icons/World.png'
import { Events } from '../../modules/analytics/types'
import { config } from '../../modules/config'
import { getJumpToWorldUrl } from '../../modules/routing/locations'
import { Props } from './WorldsButton.types'
import styles from './WorldsButton.module.css'
import type { World } from '../../modules/world/types'

const BUILDER_URL = config.get('BUILDER_URL')

const WorldsButton = (props: Props) => {
  const { address, isLoading, isLoggedIn, className, hasNames, worlds, onFetchWorlds } = props

  const hasWorlds = worlds.length > 0

  const handleWorldClick = useCallback((world: World) => {
    getAnalytics().track(Events.GO_TO_WORLD, { world: world.domain })
    const timeout = setTimeout(() => {
      window.open(getJumpToWorldUrl(world), '_blank,noreferrer')
    }, 300)
    return () => clearTimeout(timeout)
  }, [])

  const handleButtonClick = useCallback(() => {
    let url: string | undefined
    if (!hasNames) {
      getAnalytics().track(Events.GET_A_NAME)
      url = `${BUILDER_URL}/names`
    } else if (hasNames && !hasWorlds) {
      getAnalytics().track(Events.ACTIVATE_WORLD)
      url = `${BUILDER_URL}/worlds`
    }

    if (url) {
      const timeout = setTimeout(() => {
        window.open(url, '_blank,noreferrer')
      }, 300)

      return () => clearTimeout(timeout)
    }
  }, [hasNames, hasWorlds])

  useEffect(() => {
    onFetchWorlds(address)
  }, [address])

  return (
    <>
      <Dropdown
        className={classNames(className, styles.worldDropdown)}
        disabled={!isLoading && !hasWorlds && !isLoggedIn}
        direction="left"
        open={!hasNames || (hasNames && !hasWorlds) ? false : undefined}
        trigger={
          <Button
            primary
            disabled={isLoading}
            loading={isLoading}
            onClick={handleButtonClick}
            className={classNames(
              className,
              styles.worldButton,
              'customIconButton',
              { [styles.smallButton]: isLoading || hasWorlds || !isLoggedIn },
              styles.actionButton
            )}
          >
            {!hasNames && !isLoading && isLoggedIn ? (
              <>
                <img src={verifiedIcon} /> {t('worlds_button.get_a_name')}
              </>
            ) : hasNames && !hasWorlds && !isLoading && isLoggedIn ? (
              <>
                <img src={worldIcon} /> {t('worlds_button.activate_world')}
              </>
            ) : !isLoading && (hasWorlds || !isLoggedIn) ? (
              <img src={worldIcon} />
            ) : null}
          </Button>
        }
      >
        <Dropdown.Menu className={styles.worldDropdown}>
          {worlds.map(world => (
            <Dropdown.Item styles={styles.worldItem} onClick={() => handleWorldClick(world)} key={world.domain}>
              <img src={jumpIcon} className={styles.jumpIcon} /> {t('worlds_button.jump', { domain: world.domain })}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default WorldsButton
