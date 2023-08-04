import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { AvatarFacts } from '../../../../modules/profile/types'
import { renderWithProviders } from '../../../../tests/tests'
import AvatarFact from './AvatarFact'
import { camelToSnakeCase, getFactIcon } from './utils'

describe('AvatarFact', () => {
  describe('when rendering the description', () => {
    it('should render the description with the correct title and text and without the icon', () => {
      const { getByText } = renderWithProviders(<AvatarFact title="description" value="A description" />)
      expect(getByText(t('about_modal.description_label'))).toBeInTheDocument()
      expect(getByText('A description')).toBeInTheDocument()
    })
  })

  describe.each([
    ['gender', 'aGender'],
    ['country', 'aCountry'],
    ['birthdate', new Date('01/01/1990').getTime(), new Date('01/01/1990').toLocaleDateString()],
    ['pronouns', 'some/pronouns'],
    ['relationshipStatus', 'aStatus'],
    ['sexualOrientation', 'oriented'],
    ['language', 'aLanguage'],
    ['profession', 'aProfession'],
    ['hobbies', 'some'],
    ['realName', 'John Doe']
  ])('when rendering the %s', (title: string, value: string | number, expectedValue?: string) => {
    it(`should render the ${title} with the correct title, text (formatted if needed), and icon`, () => {
      const { getByTestId, getByText } = renderWithProviders(<AvatarFact title={title as keyof AvatarFacts} value={value} />)
      expect(getByText(t(`about_modal.${camelToSnakeCase(title)}_label`))).toBeInTheDocument()
      expect(getByText(expectedValue || value)).toBeInTheDocument()
      expect(getByTestId(getFactIcon(title as keyof AvatarFacts))).toBeInTheDocument()
    })
  })
})
