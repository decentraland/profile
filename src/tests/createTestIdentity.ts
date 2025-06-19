import { Authenticator, AuthIdentity, IdentityType } from '@dcl/crypto'
import { createUnsafeIdentity } from '@dcl/crypto/dist/crypto'

export type Identity = {
  authChain: AuthIdentity
  realAccount: IdentityType
  ephemeralIdentity: IdentityType
}

export async function createTestIdentity(): Promise<Identity> {
  const ephemeralIdentity = createUnsafeIdentity()
  const realAccount = createUnsafeIdentity()

  const authChain = await Authenticator.initializeAuthChain(realAccount.address, ephemeralIdentity, 10, async message =>
    Authenticator.createSignature(realAccount, message)
  )

  return { authChain, realAccount, ephemeralIdentity }
}
