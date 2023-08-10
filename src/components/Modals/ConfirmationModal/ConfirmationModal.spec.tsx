import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { FriendshipStatus } from '../../../modules/social/types'
import { renderWithProviders } from '../../../tests/tests'
import ConfirmationModal from './ConfirmationModal'

const avatarName = 'anAvatarName'

jest.mock('decentraland-ui/dist/components/Media/Media', () => {
  const module = jest.requireActual('decentraland-ui/dist/components/Media/Media')
  return {
    ...module,
    isTabletAndBelow: false
  }
})

function renderConfirmationModal(friendshipStatus: FriendshipStatus) {
  return renderWithProviders(
    <ConfirmationModal
      isOpen={true}
      onClose={() => null}
      onConfirm={function (): void {
        throw new Error('On Confirm function')
      }}
      type={friendshipStatus}
      avatarName={avatarName}
    />
  )
}

let renderedComponent: ReturnType<typeof renderConfirmationModal>

describe(`when rendering the confirmation modal with friendship status = ${FriendshipStatus.PENDING_REQUEST}`, () => {
  beforeEach(() => {
    renderedComponent = renderConfirmationModal(FriendshipStatus.PENDING_REQUEST)
  })

  it('should render the cancel pending status texts', async () => {
    expect(await renderedComponent.getByText(t('confirmation_modal.pending_request_title'))).toBeInTheDocument()
    expect(await renderedComponent.findByText(t('confirmation_modal.pending_request_subtitle'))).toBeInTheDocument()
  })
})

describe(`when rendering the confirmation modal with friendship status = ${FriendshipStatus.FRIEND}`, () => {
  beforeEach(() => {
    renderedComponent = renderConfirmationModal(FriendshipStatus.FRIEND)
  })

  it('should render the cancel pending status texts', async () => {
    expect(await renderedComponent.findByText(t('confirmation_modal.friend_title', { avatarName })))
    expect(await renderedComponent.findByText(t('confirmation_modal.friend_subtitle')))
  })
})
