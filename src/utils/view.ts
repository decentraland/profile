export enum View {
  OWN = 'own',
  OTHER = 'other'
}

export const getView = (loggedInAddress?: string, currentAccountAddress?: string): View => {
  return currentAccountAddress === loggedInAddress || (currentAccountAddress === undefined && loggedInAddress !== undefined)
    ? View.OWN
    : View.OTHER
}
