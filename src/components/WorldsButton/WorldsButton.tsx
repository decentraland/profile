import React, { useCallback, useEffect } from 'react'
import classNames from 'classnames'
import { getAnalytics } from 'decentraland-dapps/dist/modules/analytics/utils'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { Dropdown } from 'decentraland-ui/dist/components/Dropdown/Dropdown'
import { Popup } from 'decentraland-ui/dist/components/Popup/Popup'
import { launchDesktopApp } from 'decentraland-ui2/dist/modules/jumpIn'
import jumpIcon from '../../assets/icons/Jump.png'
import verifiedIcon from '../../assets/icons/Verified.png'
import worldIcon from '../../assets/icons/World.png'
import { Events } from '../../modules/analytics/types'
import { config } from '../../modules/config'
import { getJumpToWorldUrl } from '../../modules/routing/locations'
import type { World } from '../../modules/world/types'
import { Props } from './WorldsButton.types'
import styles from './WorldsButton.module.css'

const BUILDER_URL = config.get('BUILDER_URL')

const WorldsButton = (props: Props) => {
  const { address, isLoading, isLoggedIn, className, hasNames, worlds, onFetchWorlds } = props

  const hasWorlds = worlds.length > 0
  const promptUserToGetAName = !isLoading && !hasNames && !hasWorlds && isLoggedIn
  const promptUserToActivateWorld = hasNames && !hasWorlds && !isLoading && isLoggedIn
  const showUserWorlds = !isLoading && hasWorlds

  const handleWorldClick = useCallback(async (world: World) => {
    getAnalytics()?.track(Events.GO_TO_WORLD, { world: world.domain })

    const hasLauncher = await launchDesktopApp({
      realm: world.domain
    })
    const timeout = setTimeout(() => {
      if (!hasLauncher) {
        window.open(getJumpToWorldUrl(world), '_blank,noreferrer')
      }
    }, 300)
    return () => clearTimeout(timeout)
  }, [])

  const handleButtonClick = useCallback(() => {
    let url: string | undefined
    if (!hasNames) {
      getAnalytics()?.track(Events.GET_A_NAME)
      url = `${BUILDER_URL}/names`
    } else if (hasNames && !hasWorlds) {
      getAnalytics()?.track(Events.ACTIVATE_WORLD)
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

  return showUserWorlds || isLoggedIn || isLoading ? (
    <Popup
      content={t('profile_information.worlds_tooltip')}
      position="top center"
      disabled={isLoading || !hasWorlds}
      trigger={
        <Dropdown
          className={classNames(className, styles.worldDropdown)}
          disabled={!isLoading && !hasWorlds && !isLoggedIn}
          direction="left"
          open={!hasNames || (hasNames && !hasWorlds) ? false : undefined}
          trigger={
            <Button
              primary={promptUserToGetAName || promptUserToActivateWorld}
              disabled={isLoading}
              loading={isLoading}
              inverted={showUserWorlds}
              onClick={handleButtonClick}
              className={classNames(
                className,
                styles.worldButton,
                'customIconButton',
                { [styles.smallButton]: isLoading || showUserWorlds },
                styles.actionButton
              )}
            >
              {promptUserToGetAName ? (
                <>
                  <img src={verifiedIcon} /> {t('worlds_button.get_a_name')}
                </>
              ) : promptUserToActivateWorld ? (
                <>
                  <img src={worldIcon} /> {t('worlds_button.activate_world')}
                </>
              ) : !isLoading ? (
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
      }
      on="hover"
    />
  ) : null
}

export default WorldsButton
