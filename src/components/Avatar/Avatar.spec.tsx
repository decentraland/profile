import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { renderWithProviders } from '../../tests/tests'
import Avatar from './Avatar'

describe('Avatar', () => {
  it('should render the avatar and the edit button', async () => {
    const { getByText } = renderWithProviders(<Avatar />)
    expect(getByText(t('avatar.edit'))).toBeInTheDocument()
  })
})
