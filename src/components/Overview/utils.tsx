export const getWearableIds = (wearables: string[]) => {
  return wearables
    .filter(w => !w.includes('off-chain'))
    .map(w => {
      const rightHyphenSplit = w.split('-')[1]
      const colonSplit = rightHyphenSplit.split(':')
      return `${colonSplit[1]}-${colonSplit[2]}`
    })
}
