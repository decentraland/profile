import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../tests/tests'
import { FRIENDS_COUNTER_DATA_TEST_ID } from './constants'
import FriendsCounter from './FriendsCounter'
import { Props } from './FriendsCounter.types'

function renderFriendsCounter(props: Partial<Props> = {}) {
  return renderWithProviders(<FriendsCounter isLoading={false} count={0} onClick={jest.fn()} {...props} />)
}

let renderedComponent: ReturnType<typeof renderFriendsCounter>

describe('when rendering the FriendsCounter with the friends count in zero', () => {
  beforeEach(() => {
    renderedComponent = renderFriendsCounter({ count: 0 })
  })

  it('should render the component with the friends count without the clickable class', async () => {
    const button = renderedComponent.getByTestId(FRIENDS_COUNTER_DATA_TEST_ID)
    expect(button).not.toHaveClass('clickable')
    expect(button).toHaveTextContent('0 friends')
  })
})

describe('when rendering the FriendsCounter with the friends count greater than zero', () => {
  beforeEach(() => {
    renderedComponent = renderFriendsCounter({ count: 3 })
  })

  it('should render the component with the friends count without the clickable class', () => {
    const button = renderedComponent.getByTestId(FRIENDS_COUNTER_DATA_TEST_ID)
    expect(button).toHaveClass('clickable')
    expect(button).toHaveTextContent('3 friends')
  })
})

describe('when rendering the FriendsCounter in its loading state', () => {
  beforeEach(() => {
    renderedComponent = renderFriendsCounter({ isLoading: true })
  })

  it('should render the component with a loader', () => {
    expect(renderedComponent.getByTestId(FRIENDS_COUNTER_DATA_TEST_ID).querySelector('.loader')).not.toBeNull()
  })
})

describe('when clicking the FriendsCounter with a zero count', () => {
  let onClick: jest.Mock

  beforeEach(() => {
    onClick = jest.fn()
    renderedComponent = renderFriendsCounter({ count: 0, onClick })
    const button = renderedComponent.getByTestId(FRIENDS_COUNTER_DATA_TEST_ID)
    fireEvent.click(button)
  })

  it('should not call the onClick method prop', () => {
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('when clicking the FriendsCounter with a greater than zero count', () => {
  let onClick: jest.Mock

  beforeEach(() => {
    onClick = jest.fn()
    renderedComponent = renderFriendsCounter({ count: 3, onClick })
    const button = renderedComponent.getByTestId(FRIENDS_COUNTER_DATA_TEST_ID)
    fireEvent.click(button)
  })

  it('should not call the onClick method prop', () => {
    expect(onClick).toHaveBeenCalled()
  })
})
