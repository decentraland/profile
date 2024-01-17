const wearablesRegex = /^urn:decentraland:(.+):(collections-v[12]):(.+):(.+)(:([0-9]+))?$/

export const isEthereumWearable = (urn: string): boolean => {
  const result = wearablesRegex.exec(urn)
  if (!result || (result && result.length < 4)) {
    return false
  }
  return result[1] === 'ethereum' || result[1] === 'sepolia'
}

export const isMaticWearable = (urn: string): boolean => {
  const result = wearablesRegex.exec(urn)
  if (!result || (result && result.length < 4)) {
    return false
  }
  return result[1] === 'matic' || result[1] === 'mumbai'
}

export const getWearableUrnWithoutId = (urn: string): string | null => {
  const result = wearablesRegex.exec(urn)
  if (!result || (result && result.length < 4)) {
    return null
  }

  // Remove the ID from the URN
  if (result[2] === 'collections-v2') {
    return `urn:decentraland:${result[1]}:${result[2]}:${result[3]}`
  }

  return urn
}
