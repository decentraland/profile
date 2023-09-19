export type Props = {
  page: number
  hasMorePages: boolean
  isLoading?: boolean
  className?: string
  maxScrollPages?: number
  onLoadMore: (page: number) => void
}
