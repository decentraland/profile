/* eslint-disable */
import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    verbose: true,
    testEnvironment: 'jsdom',
    transform: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/tests/config/fileTransformer.js'
    },
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy'
    }
  }
}
