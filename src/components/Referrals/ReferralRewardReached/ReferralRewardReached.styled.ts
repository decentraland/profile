import { Rarity } from '@dcl/schemas'
import { Box, Button, keyframes, Modal, styled, TextField, Typography } from 'decentraland-ui2'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const RewardReachedModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ['& .MuiBackdrop-root']: {
    background: 'rgba(0, 0, 0, 0.8)'
  }
})

const RewardContainer = styled(Box)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  overflow: 'hidden'
})

const AnimatedBackground = styled(Box)<{ backgroundImg: string }>(({ theme, backgroundImg }) => ({
  position: 'absolute',
  width: '100%',
  height: '0',
  paddingBottom: '100%',
  animation: `${rotate} 20s linear infinite`,
  opacity: 0.3,
  borderRadius: '50%',
  backgroundImage: `url(${backgroundImg})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.down('sm')]: {
    width: '200%',
    height: '100%',
    paddingBottom: '0'
  }
}))

const RewardWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  position: 'absolute',
  top: '10%'
})

const PreTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '133%',
  letterSpacing: '0px',
  marginBottom: '16px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    lineHeight: '160%'
  }
}))

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '48px',
  lineHeight: '117%',
  letterSpacing: '0px',
  marginBottom: '16px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
    lineHeight: '133%'
  }
}))

const Subtitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '133%',
  letterSpacing: '0px',
  marginBottom: '157px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    lineHeight: '160%',
    textAlign: 'center'
  }
}))

const GradientBorder = styled(Box)<{ rarity: Rarity | 'SWAG' }>(({ rarity }) => ({
  borderRadius: '16px',
  padding: '3px',
  background: rarity === 'SWAG' ? 'linear-gradient(243.96deg, #FF2D55 -11.67%, #FFBC5B 88.23%)' : Rarity.getColor(rarity),
  display: 'inline-block'
}))

const RewardImageContainer = styled(Box)<{ rarity: Rarity | 'SWAG' }>(({ rarity }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '223px',
  height: '223px',
  borderRadius: '16px',
  backgroundColor: rarity === 'SWAG' ? 'rgba(36, 36, 36, 1)' : Rarity.getColor(rarity),
  backgroundImage:
    'linear-gradient(44deg, rgba(85, 26, 136, 0.60) 3.8%, rgba(95, 29, 153, 0.40) 17.76%, rgba(105, 31, 169, 0.00) 36.37%, rgba(105, 31, 169, 0.00) 68.35%, rgba(95, 29, 153, 0.40) 85.31%, rgba(85, 26, 136, 0.60) 96.85%);'
}))

const RewardImage = styled('img')<{ open: boolean }>(({ theme, open }) => ({
  width: '75%',
  objectFit: 'contain',
  transformOrigin: 'center',
  zIndex: theme.zIndex.modal,
  transform: open ? 'scale(1)' : 'scale(0)',
  opacity: open ? 1 : 0,
  transition: theme.transitions.create(['transform', 'opacity'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut
  })
}))

const RewardImageLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '133%',
  letterSpacing: '0px',
  textAlign: 'center',
  marginTop: '21px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    lineHeight: '160%',
    textAlign: 'center'
  }
}))

const SwagRewardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '656px',
  marginTop: '44px'
})

const SwagRewardTitle = styled(Typography)({
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '100%',
  letterSpacing: '0px',
  marginBottom: '12px'
})

const SwagRewardInputContainer = styled(Box)({
  display: 'flex',
  width: '100%'
})

const SwagRewardInput = styled(TextField)({
  width: '100%',
  borderRadius: '8px',
  fontSize: '16px',
  marginRight: '8px',
  height: '40px',
  ['& .MuiInputBase-root']: {
    background: 'rgba(252, 252, 252, 1)',
    color: 'rgba(0, 0, 0, 1)',
    height: '40px'
  }
})

const SwagRewardButton = styled(Button)({
  width: '158px',
  height: '42px'
})

export {
  RewardReachedModal,
  AnimatedBackground,
  RewardContainer,
  RewardWrapper,
  PreTitle,
  Title,
  Subtitle,
  GradientBorder,
  RewardImageContainer,
  RewardImage,
  RewardImageLabel,
  SwagRewardContainer,
  SwagRewardTitle,
  SwagRewardInputContainer,
  SwagRewardInput,
  SwagRewardButton
}
