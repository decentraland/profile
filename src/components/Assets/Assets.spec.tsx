import React from 'react'
import { renderWithProviders } from '../../tests/tests'
import { View } from '../../utils/view'
import { LOADER_DATA_TEST_ID } from '../Creations/constants'
import Assets from './Assets'
import { Props } from './Assets.types'

function renderAssets(props: Partial<Props> = {}, initialEntries: string[] = ['/']) {
  return renderWithProviders(
    <Assets
      profileName="a name"
      profileAddress={'0x1'}
      isLoading={false}
      assets={[]}
      total={0}
      error={null}
      view={View.OWN}
      onFetchAssets={jest.fn()}
      onOpenMobileFilters={jest.fn()}
      {...props}
    />,
    { router: { initialEntries } }
  )
}

let renderedComponent: ReturnType<typeof renderAssets>

describe('when rendering the component as loading', () => {
  beforeEach(() => {
    renderedComponent = renderAssets({ isLoading: true })
  })

  it('should render the loading component', () => {
    const { getByTestId } = renderedComponent
    expect(getByTestId(LOADER_DATA_TEST_ID)).toBeDefined()
  })
})
