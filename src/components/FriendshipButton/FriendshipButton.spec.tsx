import React from 'react'
import { act, fireEvent } from '@testing-library/react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { FriendshipStatus } from '../../modules/social/types'
import { renderWithProviders } from '../../tests/tests'
import FriendshipButton from './FriendshipButton'
import { Props } from './FriendshipButton.types'

function renderFriendshipButton(props: Partial<Props> = {}) {
  return renderWithProviders(
    <FriendshipButton
      friendshipStatus={FriendshipStatus.FRIEND}
      isLoading={false}
      friendAddress="0x1234"
      onAcceptFriendRequest={jest.fn()}
      onRemoveFriend={jest.fn()}
      onFetchFriends={jest.fn()}
      onAddFriend={jest.fn()}
      onCancelFriendRequest={jest.fn()}
      {...props}
    />
  )
}

let renderedComponent: ReturnType<typeof renderFriendshipButton>

describe('when rendering the button in its loading state', () => {
  beforeEach(() => {
    renderedComponent = renderFriendshipButton({ isLoading: true })
  })

  it('should render the button as loading', async () => {
    expect(await renderedComponent.findByTestId('FriendshipButton')).toHaveClass('loading')
  })

  it('should render the button disabled', async () => {
    expect(await renderedComponent.findByTestId('FriendshipButton')).toBeDisabled()
  })
})

describe.each([
  [FriendshipStatus.FRIEND, t('friendship_button.friends'), t('friendship_button.unfriend'), true],
  [FriendshipStatus.NOT_FRIEND, t('friendship_button.add_friend'), t('friendship_button.add_friend'), false],
  [FriendshipStatus.PENDING_REQUEST, t('friendship_button.cancel_request'), t('friendship_button.pending'), true],
  [FriendshipStatus.PENDING_RESPONSE, t('friendship_button.accept_request'), t('friendship_button.accept_request'), false],
  [FriendshipStatus.BLOCKED, t('friendship_button.blocked'), t('friendship_button.blocked'), true]
])('when rendering the button for a friend with the status "%s"', (status, notHoveredText, hoveredText, isInverted) => {
  let button: HTMLElement

  beforeEach(async () => {
    renderedComponent = renderFriendshipButton({ friendshipStatus: status })
    button = await renderedComponent.findByTestId('FriendshipButton')
  })

  describe('and the button is hovered', () => {
    beforeEach(async () => {
      act(() => {
        fireEvent.mouseOver(button)
      })
    })

    it(`should render the button with the label "${hoveredText}"`, async () => {
      expect(button).toHaveTextContent(hoveredText)
    })
  })

  describe('and the button is not hovered', () => {
    it(`should render the button with the label "${notHoveredText}"`, async () => {
      expect(button).toHaveTextContent(notHoveredText)
    })
  })

  it(`should render the button ${isInverted ? 'inverted' : 'is not inverted'}`, () => {
    if (isInverted) {
      expect(button).toHaveClass('inverted')
    } else {
      expect(button).not.toHaveClass('inverted')
    }
  })
})

describe('when clicking the button for a friend with the status "FRIEND"', () => {
  let onClick: jest.Mock
  let button: HTMLElement

  beforeEach(async () => {
    onClick = jest.fn()
    renderedComponent = renderFriendshipButton({ friendshipStatus: FriendshipStatus.FRIEND, onRemoveFriend: onClick })
    button = await renderedComponent.findByTestId('FriendshipButton')
    fireEvent.click(button)
  })

  it('should call the onRemoveFriend prop method', () => {
    expect(onClick).toHaveBeenCalled()
  })
})

describe('when click the button for a friend with the status "NOT_FRIEND"', () => {
  let onClick: jest.Mock
  let button: HTMLElement

  beforeEach(async () => {
    onClick = jest.fn()
    renderedComponent = renderFriendshipButton({ friendshipStatus: FriendshipStatus.NOT_FRIEND, onAddFriend: onClick })
    button = await renderedComponent.findByTestId('FriendshipButton')
    fireEvent.click(button)
  })

  it('should call the onAddFriend prop method', () => {
    expect(onClick).toHaveBeenCalled()
  })
})

describe('when click the button for a friend with the status "PENDING_REQUEST"', () => {
  let onClick: jest.Mock
  let button: HTMLElement

  beforeEach(async () => {
    onClick = jest.fn()
    renderedComponent = renderFriendshipButton({ friendshipStatus: FriendshipStatus.PENDING_REQUEST, onCancelFriendRequest: onClick })
    button = await renderedComponent.findByTestId('FriendshipButton')
    fireEvent.click(button)
  })

  it('should call the onCancelFriendRequest prop method', () => {
    expect(onClick).toHaveBeenCalled()
  })
})

describe('when click the button for a friend with the status "PENDING_RESPONSE"', () => {
  let onClick: jest.Mock
  let button: HTMLElement

  beforeEach(async () => {
    onClick = jest.fn()
    renderedComponent = renderFriendshipButton({ friendshipStatus: FriendshipStatus.PENDING_RESPONSE, onAcceptFriendRequest: onClick })
    button = await renderedComponent.findByTestId('FriendshipButton')
    fireEvent.click(button)
  })

  it('should call the onAcceptFriendRequest prop method', () => {
    expect(onClick).toHaveBeenCalled()
  })
})
