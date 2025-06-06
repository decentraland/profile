import { Rarity } from '@dcl/schemas'
import { Box, Typography, emotionStyled as styled, Button } from 'decentraland-ui2'

const GradientBorder = styled(Box)<{ completed: boolean }>(({ completed }) => ({
  borderRadius: '12px',
  padding: '1px',
  background: completed ? 'linear-gradient(243.96deg, #FF2D55 -11.67%, #FFBC5B 88.23%)' : 'rgba(255,255,255,0.1)',
  display: 'inline-block'
}))

const CardContainer = styled(Box)<{ completed: boolean }>(({ completed }) => ({
  width: '163.67px',
  height: '232.46px',
  borderRadius: '12px',
  background: '#351444',
  backgroundImage: completed ? 'linear-gradient(243.96deg, rgba(255, 45, 85, 0.1) -11.67%, rgba(255, 188, 91, 0.1) 88.23%)' : 'none',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  boxShadow: 'none',
  position: 'relative',
  overflow: 'hidden'
}))

const RewardLabel = styled(Typography)({
  color: '#fff',
  fontWeight: 700,
  fontSize: '16px',
  marginTop: '12px'
})

const RewardImageContainer = styled(Box)({
  width: '100%',
  height: '127px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const RewardImage = styled('img')({
  width: '90px',
  height: '90px',
  objectFit: 'contain',
  marginBottom: '12px'
})

const RewardRarity = styled(Typography)<{ rarity: Rarity | 'SWAG' }>(({ rarity }) => {
  let background = 'transparent'
  switch (rarity) {
    case Rarity.EXOTIC:
      background = 'rgba(228, 255, 184, 0.2)'
      break
    case Rarity.EPIC:
      background = 'rgba(67, 143, 255, 0.2)'
      break
    case Rarity.MYTHIC:
      background = 'rgba(255, 75, 237, 0.2)'
      break
    case Rarity.LEGENDARY:
      background = 'rgba(161, 75, 243, 0.2)'
      break
  }

  let color = Rarity.getColor(rarity as Rarity)

  switch (rarity) {
    case 'SWAG':
      color = '#fff'
      break
    case Rarity.EPIC:
      // TODO: we should expose light colors into @dcl/schemas
      color = Rarity.getGradient(rarity as Rarity)[0]
      break
    case Rarity.LEGENDARY:
      // TODO: we need to add this as light color into @dcl/schemas
      color = '#E8B9FF'
      break
  }

  return {
    color,
    borderRadius: '8px',
    padding: '2px 8px',
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '18px',
    marginBottom: '16px',
    position: 'relative',
    ['&:before']: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background,
      borderRadius: '8px'
    }
  }
})

const SwagRarityContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '2px'
})

const Description = styled(Typography)({
  color: '#fff',
  fontSize: '14px',
  marginBottom: '8px'
})

const ClaimButton = styled(Button)({
  background: 'linear-gradient(90deg, #ff5ace 0%, #ffb4d8 100%)',
  color: '#fff',
  fontWeight: 700,
  borderRadius: '8px',
  marginTop: '8px',
  width: '100%'
})

export {
  GradientBorder,
  CardContainer,
  RewardLabel,
  RewardImageContainer,
  RewardImage,
  RewardRarity,
  SwagRarityContainer,
  Description,
  ClaimButton
}
