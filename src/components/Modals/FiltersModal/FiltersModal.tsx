import React, { useCallback } from 'react'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { Props } from './FiltersModal.types'
import styles from './FiltersModal.module.css'

const FiltersModal = (props: Props) => {
  const { onClose, children, clearFilters, applyFilters, ...others } = props

  const handleApplyFilters = useCallback(() => {
    applyFilters()
    onClose()
  }, [applyFilters, onClose])

  return (
    <Modal onClose={onClose} className={styles.assetFiltersModal} {...others}>
      <Modal.Header className={styles.modalHeader}>
        <Button basic className="clear-filters-modal" onClick={clearFilters}>
          {t('filters_modal.reset')}
        </Button>
        <h3 className={styles.modalTitle}>{t('filters_modal.title')}</h3>
        <Button basic className={styles.closeButton} onClick={onClose} />
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
      <Modal.Actions className={styles.modalFooter}>
        <Button className={styles.applyFilters} primary onClick={handleApplyFilters}>
          {t('filters_modal.apply')}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default FiltersModal
