import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../tests/tests'
import MutualFriendsCounter from './MutualFriendsCounter'
import { Props } from './MutualFriendsCounter.types'

function renderMutualFriendsCounter(props: Partial<Props> = {}) {
  return renderWithProviders(
    <MutualFriendsCounter
      friendAddress={'anAddress'}
      isLoading={false}
      count={0}
      firstMutuals={[]}
      onFetchMutualFriends={jest.fn()}
      onClick={jest.fn()}
      {...props}
    />
  )
}

let renderedComponent: ReturnType<typeof renderMutualFriendsCounter>

describe('when rendering the component with the friends count in zero', () => {
  beforeEach(() => {
    renderedComponent = renderMutualFriendsCounter({ count: 0 })
  })

  it('should not render the component', () => {
    expect(renderedComponent.queryByTestId('mutual-friends-counter')).toBeNull()
  })
})

describe('when rendering the component with the friends count greater than zero', () => {
  beforeEach(() => {
    renderedComponent = renderMutualFriendsCounter({ count: 3 })
  })

  it('should render the component with the friends count without the clickable class', () => {
    const button = renderedComponent.getByTestId('mutual-friends-counter')
    expect(button).toHaveClass('clickable')
    expect(button).toHaveTextContent('3 mutual')
  })
})

describe('when clicking the component with a greater than zero count', () => {
  let onClick: jest.Mock

  beforeEach(() => {
    onClick = jest.fn()
    renderedComponent = renderMutualFriendsCounter({ count: 3, onClick })
    const button = renderedComponent.getByTestId('mutual-friends-counter')
    fireEvent.click(button)
  })

  it('should not call the onClick method prop', () => {
    expect(onClick).toHaveBeenCalled()
  })
})

describe('when rendering the component for the first time', () => {
  let onFetchMutualFriends: jest.Mock

  beforeEach(() => {
    onFetchMutualFriends = jest.fn()
    renderedComponent = renderMutualFriendsCounter({ count: 3, onFetchMutualFriends })
  })

  it('should call the onFetchMutualFriends method prop', () => {
    expect(onFetchMutualFriends).toHaveBeenCalled()
  })
})

describe('when rendering the component in its loading state', () => {
  beforeEach(() => {
    renderedComponent = renderMutualFriendsCounter({ isLoading: true })
  })

  it('should render the component with a loader', () => {
    expect(renderedComponent.getByTestId('mutual-friends-counter').querySelector('.loader')).not.toBeNull()
  })
})

describe('when rendering the component with the first mutuals', () => {
  beforeEach(() => {
    renderedComponent = renderMutualFriendsCounter({ isLoading: true, firstMutuals: ['0x1', '0x2', '0x3'] })
  })

  it('should render a profile for each of the mutuals', () => {
    expect(renderedComponent.findByTitle('0x1')).not.toBeNull()
    expect(renderedComponent.findByTitle('0x2')).not.toBeNull()
    expect(renderedComponent.findByTitle('0x3')).not.toBeNull()
  })
})
