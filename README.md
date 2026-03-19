# Decentraland Profile UI

[![Coverage Status](https://coveralls.io/repos/github/decentraland/profile/badge.svg?branch=main)](https://coveralls.io/github/decentraland/profile?branch=main)

Public profile viewer for Decentraland users at profile.decentraland.org. Displays avatar, owned NFTs and wearables, creations, social connections, and referral info for any Decentraland wallet address.

## Table of Contents

- [Features](#features)
- [Dependencies & Related Services](#dependencies--related-services)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [AI Agent Context](#ai-agent-context)

## Features

- **Avatar Display**: Full 3D avatar preview with equipped wearables
- **Profile Overview**: Name, bio, and wallet address display
- **NFT Showcase**: Owned wearables, emotes, and collectibles with filtering
- **Creations**: Items created and published by the user
- **Social Connections**: Friends list, mutual friends count, send/cancel friend request, block user
- **World Preview**: Worlds owned and deployed by the user
- **Referral Program**: View referral progress and status
- **Items For Sale**: NFTs the user has listed on the marketplace

## Dependencies & Related Services

- **Catalyst / Peer API** ([github.com/decentraland/catalyst](https://github.com/decentraland/catalyst)): profile data, avatar snapshots, wearable/emote ownership
- **Social Service EA** (`@dcl/social-rpc-client`, [github.com/decentraland/social-service-ea](https://github.com/decentraland/social-service-ea)): friend requests, blocks, social status
- **Marketplace Server** ([github.com/decentraland/marketplace-server](https://github.com/decentraland/marketplace-server)): NFT listings and items for sale
- **Auth UI**: sign-in flow for social actions (add friend, block)

### What This UI Does NOT Handle

- Profile editing and avatar customization (account site handles email/notifications; avatar editing is done in the Explorer)
- Wallet management (account site)
- Social feed and communities (social site)
- Marketplace trading (marketplace)

## Getting Started

### Prerequisites

- Node >=20
- npm

### Installation

```bash
npm install
```

### Configuration

Create a copy of `.env.example` and name it `.env.development`:

```bash
cp .env.example .env.development
```

### Running the UI

```bash
npm run start
```

## Testing

### Running Tests

```bash
npm test
```

### Test Structure

Test files are located in `src/tests/`, using the `*.test.ts` / `*.spec.ts` naming convention.

## AI Agent Context

For detailed AI Agent context, see [docs/ai-agent-context.md](docs/ai-agent-context.md).

---
