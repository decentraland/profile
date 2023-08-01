import React, { useCallback, useEffect } from 'react'
import classNames from 'classnames'
import { Env } from '@dcl/ui-env'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { Dropdown } from 'decentraland-ui/dist/components/Dropdown/Dropdown'
import jumpIcon from '../../assets/icons/Jump.png'
import verifiedIcon from '../../assets/icons/Verified.png'
import worldIcon from '../../assets/icons/World.png'
import { config } from '../../modules/config'
import { Props } from './WorldsButton.types'
import styles from './WorldsButton.module.css'
import type { World } from '../../modules/world/types'

const EXPLORER_URL = config.get('EXPLORER_URL')
const BUILDER_URL = config.get('BUILDER_URL')
const WORLDS_CONTENT_SERVER_URL = config.get('WORLDS_CONTENT_SERVER_URL')
const isDevelopment = config.getEnv() === Env.DEVELOPMENT

const WorldsButton = (props: Props) => {
  const { address, isLoading, className, hasNames, worlds, onFetchWorlds } = props

  const hasWorlds = worlds.length > 0

  const handleWorldClick = useCallback((world: World) => {
    window.open(
      isDevelopment
        ? `${EXPLORER_URL}/?realm=${WORLDS_CONTENT_SERVER_URL}/world/${world.domain}&NETWORK=goerli`
        : `${EXPLORER_URL}/world/${world.domain}`,
      '_blank,noreferrer'
    )
  }, [])

  const handleButtonClick = useCallback(() => {
    if (!hasNames) {
      window.open(`${BUILDER_URL}/names`, '_blank,noreferrer')
    } else if (hasNames && !hasWorlds) {
      window.open(`${BUILDER_URL}/worlds`, '_blank,noreferrer')
    }
  }, [hasNames, hasWorlds])

  useEffect(() => {
    onFetchWorlds(address)
  }, [address])

  return (
    <>
      <Dropdown
        className={classNames(className, styles.worldDropdown)}
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
              { [styles.smallButton]: isLoading || (hasWorlds && hasNames) },
              styles.actionButton
            )}
          >
            {!hasNames && !isLoading ? (
              <>
                <img src={verifiedIcon} /> {t('worlds_button.get_a_name')}
              </>
            ) : hasNames && !hasWorlds && !isLoading ? (
              <>
                <img src={worldIcon} /> {t('worlds_button.activate_world')}
              </>
            ) : hasWorlds && !isLoading ? (
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
