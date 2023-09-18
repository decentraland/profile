import React from 'react'
import { renderWithProviders } from '../../tests/tests'
import { View } from '../../utils/view'
import { ITEMS_PER_PAGE } from './constants'
import Creations from './Creations'
import { Props } from './Creations.types'

function renderCreations(props: Partial<Props> = {}) {
  return renderWithProviders(
    <Creations profileAddress={'0x1'} isLoading={false} items={[]} error={null} view={View.OWN} onFetchCreations={jest.fn()} {...props} />
  )
}

let renderedComponent: ReturnType<typeof renderCreations>

describe('when rendering the component as loading', () => {
  beforeEach(() => {
    renderedComponent = renderCreations({ isLoading: true })
  })

  it('should render the loading component', () => {
    const { getByTestId } = renderedComponent

    expect(getByTestId('loader')).toBeDefined()
  })
})

describe('when rendering the component', () => {
  let onFetchCreations: jest.Mock

  beforeEach(() => {
    onFetchCreations = jest.fn()
    renderedComponent = renderCreations({ onFetchCreations, profileAddress: '0x1' })
  })

  it("should fetch the user's creations", () => {
    expect(onFetchCreations).toHaveBeenCalledWith({
      creator: '0x1',
      first: ITEMS_PER_PAGE,
      skip: 0,
      category: 'wearables'
    })
  })
})
