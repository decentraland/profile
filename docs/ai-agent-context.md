# AI Agent Context

**Service Purpose:**

The Profile site is a Vite+React SPA served at profile.decentraland.org that displays public user profiles within the Decentraland ecosystem. It shows a player's avatar, owned wearables and NFTs, creations (items they've published), Decentraland Worlds they own, referral rewards, and social relationships (friends, mutual friends, blocked users). It acts as the public-facing identity page for any Decentraland wallet address.

**Key Capabilities:**

- Avatar rendering: display a player's 3D avatar with equipped wearables
- Wearables and NFTs: paginated, filterable inventory of owned items from the Decentraland Marketplace
- Creations: list of wearable/emote items the user has published as a creator
- Worlds: display Decentraland Worlds owned or deployed by the user
- Friendship actions: send/cancel/accept friend requests and block/unblock users via `@dcl/social-rpc-client`
- Friends counter and mutual friends counter
- Referral system: show the user's referral tier, progress toward rewards, and claimed reward images
- Identity: resolve wallet address to display name, has-claimed-name status, and linked accounts
- Feature flags: runtime feature toggling via the `features` module
- Analytics: page and event tracking via Segment
- Internationalization: react-intl for UI strings

**Communication Pattern:**

- HTTP REST for Marketplace API, Worlds Content Server, Catalyst lambdas, and the referral/social APIs
- WebSocket (wss://) via `@dcl/social-rpc-client` for real-time friendship and block operations against the Social RPC service
- No GraphQL — marketplace data is fetched via the Decentraland Marketplace server REST API
- Redux + redux-saga for all async state management; each module has its own actions, reducer, sagas, and selectors

**Technology Stack:**

- Runtime: Node.js >=20
- Language: TypeScript 5.x
- Frontend Framework: React 18 + Vite 6
- State Management: Redux 4 + Redux Toolkit + redux-saga
- UI Libraries: decentraland-ui, decentraland-ui2, decentraland-dapps
- Wallet: decentraland-connect, @dcl/single-sign-on-client
- Virtualization: react-window + react-virtualized-auto-sizer (for large item grids)
- Testing: Jest 29 + @testing-library/react + redux-saga-test-plan
- Code Quality: ESLint + Prettier, Husky pre-commit hooks

**External Dependencies:**

- Marketplace server (`MARKETPLACE_SERVER_URL`): REST API for NFTs, wearable catalog, orders, rentals
- Marketplace subgraph (`MARKETPLACE_GRAPH_URL`): The Graph for on-chain collection data
- Catalyst / Peer (`PEER_URL`): profile data and avatar snapshots via lambdas
- Worlds Content Server (`WORLDS_CONTENT_SERVER_URL`): list of Worlds owned by a wallet
- Social RPC service (`SOCIAL_RPC_URL`): WebSocket endpoint for friendship/block operations
- Referral server (`REFERRAL_SERVER_URL`): referral progress and reward tiers
- Auth service (`AUTH_URL`): Decentraland wallet-based SSO
- Wearable Preview (`WEARABLE_PREVIEW_URL`): 3D avatar/item preview renderer
- Sentry: error tracking

**Key Concepts:**

- **Profile address**: The URL param `:profileAddress` (Ethereum address) identifying whose profile is shown. Resolved via `WithProfile` HOC in `src/components/HOC/WithProfile`.
- **Tab navigation**: The main page supports an optional `:tab?` route param (e.g., `overview`, `wearables`, `nfts`, `creations`, `worlds`). Defined in `src/Routes.tsx` and `src/components/Pages/MainPage/`.
- **FriendshipStatus**: Enum in `src/modules/social/types.ts` — `FRIEND`, `PENDING_REQUEST`, `PENDING_RESPONSE`, `NOT_FRIEND`, `BLOCKED`. Drives the `FriendshipButton` component behavior.
- **SocialClient**: Typed client from `@dcl/social-rpc-client`, created once and stored in the `social` module. Used for all friendship and block mutations.
- **ItemSaleStatus / ItemCategory**: Enums in `src/modules/items/types.ts` controlling catalog filter state shown in `AssetsFiltersModal` and `CreationsFiltersModal`.
- **NFTCategory**: Extended category type in `src/modules/nfts/types.ts` covering wearables, emotes, LAND, estates, and accessories.
- **ReferralTier**: Type in `src/modules/referrals/types.ts` describing the reward tier system (invites accepted → rarity reward).
- **World**: Type in `src/modules/world/types.ts` — a domain, deploy time, owner address, and active flag from the Worlds Content Server.
- **ConnectAndRedirect**: HOC that redirects unauthenticated root-path visits to the signed-in user's own profile page.

**Out of Scope:**

- Event management — handled by the Events service (events.decentraland.org)
- Community creation or moderation — handled by the Social service (social.decentraland.org)
- Reward distribution and campaign management — handled by the Referral/Rewards service (rewards.decentraland.org)
- Marketplace trading (buying, selling, bidding) — handled by the Marketplace app
- In-world avatar customization — handled by the Decentraland Explorer

**Project Structure:**

```
src/
  Routes.tsx               # Route definitions: /accounts/:profileAddress/:tab?, /sign-in
  main.tsx                 # App entry point, Redux store, router setup
  modules/
    profile/               # Profile fetch, reducer, sagas, selectors
    social/                # Friendship/block state, SocialClient, FriendshipStatus
    items/                 # Wearable catalog (creations) fetch and filter state
    nfts/                  # NFT inventory fetch and filter state
    world/                 # Worlds owned by the profile
    referrals/             # Referral progress and tier data
    identity/              # Wallet identity resolution (has-claimed-name, linked accounts)
    features/              # Feature flag selectors
    modal/                 # Modal open/close state
    analytics/             # Segment event tracking helpers
    translation/           # react-intl locale setup
    routing/               # Navigation helpers
    config/                # @dcl/ui-env config per environment (dev/stg/prd)
    store.ts               # Redux store setup
    reducer.ts             # Root reducer
    saga.ts                # Root saga
  components/
    Pages/
      MainPage/            # Top-level profile page with tab rendering
      SignInPage/          # Auth redirect page
      LoadingPage/
      NotFoundPage/
    Avatar/                # Avatar 3D preview component
    Overview/              # Profile summary tab
    Creations/             # Creator items tab
    NFTFilters/            # NFT filter sidebar
    FriendshipButton/      # Send/accept/cancel friend request button
    BlockedUser/           # Blocked user banner/action
    FriendsCounter/        # Friends count display
    MutualFriendsCounter/  # Mutual friends count
    Modals/                # AboutModal, FriendsModal, AssetsFiltersModal, etc.
    Referrals/             # Referral tier progress display
    WorldsButton/          # Worlds tab entry point
    HOC/                   # ConnectAndRedirect, WithProfile
  tests/                   # Jest setup, test utilities, store factory
```

**Configuration:**

Key environment variables (set per-env in `src/modules/config/env/`):

| Variable | Purpose |
|---|---|
| `PEER_URL` | Catalyst peer for profile/avatar data |
| `MARKETPLACE_SERVER_URL` | Marketplace REST API base URL |
| `MARKETPLACE_GRAPH_URL` | The Graph subgraph URL for collections |
| `WORLDS_CONTENT_SERVER_URL` | Worlds Content Server API |
| `SOCIAL_RPC_URL` | WebSocket URL for Social RPC service |
| `REFERRAL_SERVER_URL` | Referral progress API base URL |
| `AUTH_URL` | SSO auth endpoint |
| `WEARABLE_PREVIEW_URL` | Wearable/avatar 3D preview service |
| `SEGMENT_API_KEY` | Segment analytics write key |
| `SENTRY_DSN` | Sentry error reporting DSN |

**Testing:**

- Test runner: Jest 29 with `jest-environment-jsdom`
- Per-module test files co-located alongside source (e.g., `src/modules/profile/reducer.spec.ts`, `src/modules/social/sagas.spec.ts`)
- Component tests in `src/components/*/*.spec.tsx` using `@testing-library/react`
- Saga tests use `redux-saga-test-plan` for effect-level assertions
- Global test setup in `src/tests/beforeSetupTests.tsx` and `src/tests/afterSetupTest.ts`
- Run with `npm test`; coverage with `npm run test:coverage`
