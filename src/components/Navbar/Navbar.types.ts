import { AuthIdentity } from '@dcl/crypto'

type Props = {
  identity?: AuthIdentity
}

type MapStateProps = Pick<Props, 'identity'>

export type { Props, MapStateProps }
