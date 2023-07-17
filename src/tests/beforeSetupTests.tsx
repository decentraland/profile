// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import path from 'path'
import { TextEncoder, TextDecoder } from 'util'
import { config } from 'dotenv'
import flatten from 'flat'
import { en as dappsEn } from 'decentraland-dapps/dist/modules/translation/defaults'
import { mergeTranslations, setCurrentLocale } from 'decentraland-dapps/dist/modules/translation/utils'
import * as locales from '../modules/translation/locales'

jest.mock('decentraland-dapps/dist/modules/translation/utils', () => {
  const module = jest.requireActual('decentraland-dapps/dist/modules/translation/utils')
  return {
    ...module,
    T: ({ id, values }: (typeof module)['T']) => module.t(id, values)
  }
})

config({ path: path.resolve(process.cwd(), '.env.example') })
// eslint-disable-next-line @typescript-eslint/naming-convention
Object.assign(globalThis, { TextDecoder, TextEncoder })

setCurrentLocale('en', mergeTranslations(flatten(dappsEn), flatten(locales.en)))
