import React, { useEffect, useState, useRef } from 'react'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Typography } from 'decentraland-ui2'
import { ReferralRewardCard } from '../ReferralRewardCard'
import { ReferralRewardReached } from '../ReferralRewardReached'
import { tiers } from './constants'
import {
  SectionContainer,
  JourneyStep,
  JourneyStepper,
  JourneyStepIcon,
  JourneyStepLine,
  GradientBorder,
  TitleContainer,
  SubtitleContainer,
  Subtitle,
  JourneyContainer,
  JourneyWrapper
} from './ReferralJourney.styled'
import { ANIMATION_DURATION } from './utils'
import { AnimationPhaseType, ReferralJourneyProps } from './ReferralJourney.types'

// eslint-disable-next-line import/no-named-as-default-member
const ReferralJourney = React.memo(({ invitedUsersAccepted }: ReferralJourneyProps) => {
  const [animatedStep, setAnimatedStep] = useState(tiers.filter(tier => tier.completed).length)
  const [open, setOpen] = useState(false)
  const [journeyTiers, setJourneyTiers] = useState(tiers)
  const [animationPhase, setAnimationPhase] = useState<AnimationPhaseType>(AnimationPhaseType.WAITING_NEXT_TIER)
  const totalSteps = tiers.length
  const journeyStepRefs = useRef<(Element | null)[]>([])

  useEffect(() => {
    const currentTierIndex = tiers.findIndex(tier => invitedUsersAccepted < tier.invitesAccepted)
    const maxTierIndex = currentTierIndex === -1 ? totalSteps : currentTierIndex

    if (animatedStep >= maxTierIndex) return

    const isTierReached = animationPhase === AnimationPhaseType.TIER_REACHED && !open
    const isWaitingNextTier = animationPhase === AnimationPhaseType.WAITING_NEXT_TIER && !open

    if (!isTierReached && !isWaitingNextTier) return

    if (animatedStep !== maxTierIndex && !isTierReached) {
      setAnimationPhase(AnimationPhaseType.TIER_REACHED)
      setAnimatedStep(prev => prev + 1)
    }
  }, [animatedStep, totalSteps, animationPhase, open, invitedUsersAccepted])

  useEffect(() => {
    if (animationPhase !== AnimationPhaseType.TIER_REACHED) return

    const timeout = setTimeout(() => {
      setOpen(true)
    }, ANIMATION_DURATION)

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [animationPhase])

  useEffect(() => {
    if (animatedStep > 2 && journeyStepRefs.current[animatedStep - 1]) {
      journeyStepRefs.current[animatedStep - 1]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      })
    }

    setJourneyTiers(
      tiers.map((tier, i) => ({
        ...tier,
        completed: i < animatedStep
      }))
    )
  }, [animatedStep])

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      setAnimationPhase(AnimationPhaseType.WAITING_NEXT_TIER)
    }, 10)
  }

  return (
    <SectionContainer>
      <TitleContainer>
        <Typography variant="h4">{t('referral_journey.title')}</Typography>
      </TitleContainer>
      <SubtitleContainer>
        <Subtitle variant="h6">🤍 {t('referral_journey.invites_accepted', { count: invitedUsersAccepted })}</Subtitle>
      </SubtitleContainer>
      <JourneyContainer>
        <JourneyWrapper>
          <JourneyStepper>
            <JourneyStepLine
              activeStep={animatedStep}
              totalSteps={totalSteps}
              phase={animationPhase}
              invitedUsersAccepted={invitedUsersAccepted}
            />
            {journeyTiers.map((tier, i) => (
              <JourneyStep key={i} ref={(el: Element | null) => (journeyStepRefs.current[i] = el)}>
                <GradientBorder
                  completed={tier.completed}
                  showAnimation={animationPhase === AnimationPhaseType.TIER_REACHED && animatedStep === i + 1}
                >
                  <JourneyStepIcon>{tier.completed && <CheckRoundedIcon fontSize="medium" />}</JourneyStepIcon>
                </GradientBorder>
                <ReferralRewardCard {...tier} />
              </JourneyStep>
            ))}
          </JourneyStepper>
        </JourneyWrapper>
      </JourneyContainer>
      <ReferralRewardReached reward={journeyTiers[Math.max(animatedStep - 1, 0)]} open={open} onClick={handleClose} />
    </SectionContainer>
  )
})

export { ReferralJourney }
