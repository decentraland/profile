import React, { useCallback, useMemo } from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Box } from 'decentraland-ui/dist/components/Box'
import { Checkbox, CheckboxProps } from 'decentraland-ui/dist/components/Checkbox/Checkbox'
import { InfoTooltip } from 'decentraland-ui/dist/components/InfoTooltip'
import { useTabletAndBelowMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import { ON_SALE_FILTER_DATA_TEST_ID } from './constants'
import { Props } from './OnSaleFilter.types'
import styles from './OnSaleFilter.module.css'

const OnSaleFilter = (props: Props) => {
  const { value, onChange } = props

  const isMobileOrTablet = useTabletAndBelowMediaQuery()
  const handleOnChange = useCallback(
    (_: unknown, data: CheckboxProps) => {
      onChange(!!data.checked)
    },
    [onChange]
  )
  const header = useMemo(
    () => (
      <div className={styles.header} data-testid={ON_SALE_FILTER_DATA_TEST_ID}>
        {!isMobileOrTablet ? (
          <>
            <span className={styles.name}>
              {t('on_sale_filter.title')} <InfoTooltip content={t('on_sale_filter.tooltip')} position="bottom left" />
            </span>
          </>
        ) : (
          <>
            <span className={styles.name}>{t('on_sale_filter.title')}</span>
            <span className={styles.value}>{value ? t('on_sale_filter.for_sale') : t('on_sale_filter.not_for_sale')}</span>
          </>
        )}
      </div>
    ),
    [value, isMobileOrTablet]
  )

  return (
    <Box className={styles.box} collapsible header={header}>
      <Checkbox label={t('on_sale_filter.label')} toggle checked={value} onChange={handleOnChange} />
    </Box>
  )
}

export default OnSaleFilter
