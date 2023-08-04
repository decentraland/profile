import React from 'react'
import { Link } from '@dcl/schemas'
import { renderWithProviders } from '../../tests/tests'
import AvatarLink from './AvatarLink'

describe('AvatarLink', () => {
  let link: Link

  describe('when rendering a collapsed link', () => {
    describe('and the domain of the url has a well known icon', () => {
      beforeEach(() => {
        link = {
          title: 'Twitter',
          url: 'https://twitter.com'
        }
      })

      it('should render only the known icon', () => {
        const { getByTestId, queryByText } = renderWithProviders(<AvatarLink link={link} collapsed />)
        expect(queryByText(link.title)).toBeNull()
        expect(getByTestId('twitter')).toBeInTheDocument()
      })
    })

    describe('and we do not know the icon associated with the domain', () => {
      beforeEach(() => {
        link = {
          title: 'Website',
          url: 'https://my-website.com'
        }
      })

      it('should render only the default icon', () => {
        const { getByTestId, queryByText } = renderWithProviders(<AvatarLink link={link} collapsed />)
        expect(queryByText(link.title)).toBeNull()
        expect(getByTestId('linkify')).toBeInTheDocument()
      })
    })
  })

  describe('when rendering an expanded link', () => {
    describe('and the domain of the url has a well known icon', () => {
      beforeEach(() => {
        link = {
          title: 'Twitter',
          url: 'https://twitter.com'
        }
      })

      it('should render the known icon and the title of the link', () => {
        const { getByText, getByTestId } = renderWithProviders(<AvatarLink link={link} />)
        expect(getByText(link.title)).toBeInTheDocument()
        expect(getByTestId('twitter')).toBeInTheDocument()
      })
    })

    describe('and we do not know the icon associated with the domain', () => {
      beforeEach(() => {
        link = {
          title: 'Website',
          url: 'https://my-website.com'
        }
      })

      it('should render the default icon and the title of the link', () => {
        const { getByText, getByTestId } = renderWithProviders(<AvatarLink link={link} />)
        expect(getByText(link.title)).toBeInTheDocument()
        expect(getByTestId('linkify')).toBeInTheDocument()
      })
    })
  })
})
