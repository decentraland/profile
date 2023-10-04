export type Props<T extends string> = {
  isLoading?: boolean
  className?: string
  count?: number
  hasFiltersEnabled?: boolean
  sortBy: T
  sortByOptions: { value: T; text: string }[]
  getCountText: (count: number) => string
  onSortByChange: (sortBy: T) => void
  onOpenFiltersModal: () => void
}
