// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import path from 'path'
import { TextEncoder, TextDecoder } from 'util'
import { config } from 'dotenv'
import flatten from 'flat'
import fetch, { Request, Response } from 'node-fetch'
import { en as dappsEn } from 'decentraland-dapps/dist/modules/translation/defaults'
import { mergeTranslations, setCurrentLocale } from 'decentraland-dapps/dist/modules/translation/utils'
import * as locales from '../modules/translation/locales'

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

// Mock HTMLCanvasElement.getContext for lottie-web
HTMLCanvasElement.prototype.getContext = jest.fn().mockImplementation((contextType: string) => {
  if (contextType === '2d') {
    return {
      canvas: document.createElement('canvas'),
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 1,
      lineCap: 'butt',
      lineJoin: 'miter',
      miterLimit: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
      shadowColor: 'rgba(0, 0, 0, 0)',
      globalAlpha: 1,
      globalCompositeOperation: 'source-over',
      save: jest.fn(),
      restore: jest.fn(),
      scale: jest.fn(),
      rotate: jest.fn(),
      translate: jest.fn(),
      transform: jest.fn(),
      setTransform: jest.fn(),
      resetTransform: jest.fn(),
      createLinearGradient: jest.fn(),
      createRadialGradient: jest.fn(),
      createPattern: jest.fn(),
      clearRect: jest.fn(),
      fillRect: jest.fn(),
      strokeRect: jest.fn(),
      beginPath: jest.fn(),
      closePath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      bezierCurveTo: jest.fn(),
      quadraticCurveTo: jest.fn(),
      arc: jest.fn(),
      arcTo: jest.fn(),
      rect: jest.fn(),
      fill: jest.fn(),
      stroke: jest.fn(),
      drawFocusIfNeeded: jest.fn(),
      clip: jest.fn(),
      isPointInPath: jest.fn(),
      isPointInStroke: jest.fn(),
      measureText: jest.fn(() => ({ width: 0 })),
      setLineDash: jest.fn(),
      getLineDash: jest.fn(() => []),
      createImageData: jest.fn(),
      getImageData: jest.fn(),
      putImageData: jest.fn(),
      createImageBitmap: jest.fn(),
      drawImage: jest.fn(),
      getContextAttributes: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }
  }
  return null
})

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

if (!globalThis.fetch) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globalThis.fetch = fetch as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globalThis.Request = Request as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globalThis.Response = Response as any
}
