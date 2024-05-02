import { SubscriptionDetails } from '@dcl/schemas'
import { SubscriptionDetailsCamelCase } from './types'

export function toCamelCase(str: string): string {
  return str.replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''))
}

function transformKeysToCamelCase<T extends Record<string, unknown>>(inputObject: T): Record<string, unknown> {
  if (typeof inputObject !== 'object' || inputObject === null) {
    return inputObject
  }

  if (Array.isArray(inputObject)) {
    return inputObject.map(item => transformKeysToCamelCase(item as Record<string, unknown>)) as unknown as Record<string, unknown>
  }

  return Object.keys(inputObject).reduce((result, key) => {
    const camelCaseKey = toCamelCase(key)
    const value = inputObject[key]
    if (typeof value === 'object' && value !== null) {
      result[camelCaseKey] = transformKeysToCamelCase(value as Record<string, unknown>)
    } else {
      result[camelCaseKey] = value
    }
    return result
  }, {} as Record<string, unknown>)
}

export function transformSubscriptionDetailsToCamelCase(subscriptionDetails: SubscriptionDetails): SubscriptionDetailsCamelCase {
  return transformKeysToCamelCase(subscriptionDetails) as unknown as SubscriptionDetailsCamelCase
}

export function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

function transformKeysToSnakeCase<T extends Record<string, unknown>>(inputObject: T): Record<string, unknown> {
  if (typeof inputObject !== 'object' || inputObject === null) {
    return inputObject
  }

  if (Array.isArray(inputObject)) {
    return inputObject.map(item => transformKeysToSnakeCase(item as Record<string, unknown>)) as unknown as Record<string, unknown>
  }

  return Object.keys(inputObject).reduce((result, key) => {
    const snakeCaseKey = toSnakeCase(key)
    const value = inputObject[key]
    if (typeof value === 'object' && value !== null) {
      result[snakeCaseKey] = transformKeysToSnakeCase(value as Record<string, unknown>)
    } else {
      result[snakeCaseKey] = value
    }
    return result
  }, {} as Record<string, unknown>)
}

export function transformSubscriptionDetailsToSnakeCase(subscriptionDetailsCamelCase: SubscriptionDetailsCamelCase): SubscriptionDetails {
  return transformKeysToSnakeCase(subscriptionDetailsCamelCase) as unknown as SubscriptionDetails
}
