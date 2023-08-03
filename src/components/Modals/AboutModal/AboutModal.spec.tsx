import React from 'react'
import { Link } from '@dcl/schemas'
import { Avatar } from '../../../modules/profile/types'
import { renderWithProviders } from '../../../tests/tests'
import AboutModal from './AboutModal'
import { Props } from './AboutModal.types'

describe('AboutModal', () => {
  let avatar: Avatar

  const renderAboutModal = (props: Partial<Props>) => {
    return renderWithProviders(<AboutModal metadata={{ avatar }} name={'AboutModal'} onClose={jest.fn()} {...props} />)
  }

  describe('when the avatar has a description', () => {
    beforeEach(() => {
      avatar = {
        description: 'This is my description'
      } as Avatar
    })

    it('should render the description', async () => {
      const { getByText } = renderAboutModal({ metadata: { avatar } })
      expect(getByText(avatar.description)).toBeInTheDocument()
    })
  })

  describe('when the avatar has some facts', () => {
    const country = 'aCountry'
    beforeEach(() => {
      avatar = {
        country
      } as Avatar
    })

    it('should render the country info', async () => {
      const { getByText } = renderAboutModal({ metadata: { avatar } })
      expect(getByText(country)).toBeInTheDocument()
    })
  })

  describe('when the avatar has some links', () => {
    const twitterLink: Link = {
      title: 'Twitter',
      url: 'https://twitter.com/myTwitter'
    }
    beforeEach(() => {
      avatar = {
        links: [twitterLink]
      } as Avatar
    })

    it('should render the link', async () => {
      const { getByText } = renderAboutModal({ metadata: { avatar } })
      expect(getByText(twitterLink.title)).toBeInTheDocument()
    })
  })
})
