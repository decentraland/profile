import { NFTOptions } from '../../modules/nfts/types'

export type Props = {
  filters: Pick<NFTOptions, 'category' | 'itemRarities' | 'isWearableSmart'>
  className?: string
  onChange: (filters: NFTOptions) => void
}
