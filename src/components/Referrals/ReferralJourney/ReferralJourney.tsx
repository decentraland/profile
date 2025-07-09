import React, { useEffect, useState, useRef, useMemo } from 'react'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Tooltip, Typography } from 'decentraland-ui2'
import { ReferralRewardCard } from '../ReferralRewardCard'
import { ReferralRewardReached } from '../ReferralRewardReached'
import { TIERS, REFERRAL_JOURNEY_TEST_ID } from './constants'
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
import { AnimationPhase as AnimationPhase, ReferralJourneyProps } from './ReferralJourney.types'

// eslint-disable-next-line import/no-named-as-default-member
const ReferralJourney = React.memo((props: ReferralJourneyProps) => {
  const { invitedUsersAccepted, invitedUsersAcceptedViewed, onSetReferralEmail, rewardImages } = props

  const [animatedStep, setAnimatedStep] = useState(TIERS.filter(tier => tier.invitesAccepted <= invitedUsersAcceptedViewed).length)
  const [open, setOpen] = useState(false)
  const [journeyTiers, setJourneyTiers] = useState(
    TIERS.map(tier => ({ ...tier, completed: tier.invitesAccepted <= invitedUsersAccepted }))
  )
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>(AnimationPhase.WAITING_NEXT_TIER)
  const animatedTierKeyRef = useRef<string>('')
  const hasOpenedModalRef = useRef(false)
  const totalSteps = TIERS.length
  const journeyStepRefs = useRef<(Element | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  const tooltipTitle = useMemo(() => {
    const nextTier = TIERS.find(tier => invitedUsersAccepted < tier.invitesAccepted) ?? null

    if (!nextTier) {
      return <Typography>{t('referral_journey.tooltip_title', { count: invitedUsersAccepted })}</Typography>
    }

    const friendsNeeded = nextTier.invitesAccepted - invitedUsersAccepted
    return (
      <Typography>
        {t('referral_journey.tooltip_title', { count: invitedUsersAccepted })}
        <br />
        {t('referral_journey.tooltip_subtitle', { count: friendsNeeded })}
      </Typography>
    )
  }, [invitedUsersAccepted])

  useEffect(() => {
    const tiersViewed = TIERS.filter(tier => tier.invitesAccepted <= invitedUsersAcceptedViewed).length
    const tiersCompleted = TIERS.filter(tier => tier.invitesAccepted <= invitedUsersAccepted).length
    const newTiersToAnimate = tiersCompleted - tiersViewed

    if (newTiersToAnimate <= 0 || animatedTierKeyRef.current !== '') {
      return
    }

    const newlyReachedTierIndex = TIERS.findIndex(
      tier => tier.invitesAccepted <= invitedUsersAccepted && tier.invitesAccepted > invitedUsersAcceptedViewed
    )

    if (animationPhase === AnimationPhase.WAITING_NEXT_TIER && !open && newlyReachedTierIndex !== -1) {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      setAnimationPhase(AnimationPhase.TIER_REACHED)
      setAnimatedStep(newlyReachedTierIndex + 1)
      animatedTierKeyRef.current = `tier-${newlyReachedTierIndex}`
    }
  }, [animatedStep, totalSteps, animationPhase, open, invitedUsersAccepted, invitedUsersAcceptedViewed])

  useEffect(() => {
    animatedTierKeyRef.current = ''
    hasOpenedModalRef.current = false
  }, [invitedUsersAccepted, invitedUsersAcceptedViewed])

  useEffect(() => {
    if (animationPhase !== AnimationPhase.TIER_REACHED || hasOpenedModalRef.current) return

    hasOpenedModalRef.current = true // Marcar que ya abrimos el modal
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
    if (animatedStep > 1 && journeyStepRefs.current[animatedStep - 1]) {
      journeyStepRefs.current[animatedStep - 1]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      })
    }

    // Actualizar journeyTiers basado en invitedUsersAccepted, no en animatedStep
    setJourneyTiers(
      TIERS.map(tier => ({
        ...tier,
        completed: tier.invitesAccepted <= invitedUsersAccepted
      }))
    )
  }, [animatedStep, invitedUsersAccepted])

  const handleClose = () => {
    setOpen(false)
    // NO resetear hasOpenedModalRef aquí, solo cuando cambien los valores
    setTimeout(() => {
      setAnimationPhase(AnimationPhase.WAITING_NEXT_TIER)
    }, 10)
  }

  const shouldShowAnimation = (tierIndex: number): boolean => {
    const tier = TIERS[tierIndex]
    const isNewlyCompleted = tier.invitesAccepted <= invitedUsersAccepted && tier.invitesAccepted > invitedUsersAcceptedViewed
    const isCurrentlyAnimating = animationPhase === AnimationPhase.TIER_REACHED && animatedStep === tierIndex + 1

    return isNewlyCompleted && isCurrentlyAnimating
  }

  return (
    <SectionContainer ref={sectionRef} data-testid={REFERRAL_JOURNEY_TEST_ID.sectionContainer}>
      <TitleContainer data-testid={REFERRAL_JOURNEY_TEST_ID.titleContainer}>
        <Typography variant="h4" data-testid={REFERRAL_JOURNEY_TEST_ID.title}>
          {t('referral_journey.title')}
        </Typography>
        <SubtitleContainer data-testid={REFERRAL_JOURNEY_TEST_ID.subtitleContainer}>
          <Subtitle variant="h6" data-testid={REFERRAL_JOURNEY_TEST_ID.subtitle}>
            🤍 {t('referral_journey.invites_accepted', { count: invitedUsersAccepted })}
          </Subtitle>
        </SubtitleContainer>
      </TitleContainer>
      <JourneyContainer data-testid={REFERRAL_JOURNEY_TEST_ID.journeyContainer}>
        <JourneyWrapper data-testid={REFERRAL_JOURNEY_TEST_ID.journeyWrapper}>
          <JourneyStepper data-testid={REFERRAL_JOURNEY_TEST_ID.journeyStepper}>
            <Tooltip title={tooltipTitle} followCursor arrow>
              <JourneyStepLine
                activeStep={animatedStep}
                totalSteps={totalSteps}
                phase={animationPhase}
                invitedUsersAccepted={invitedUsersAccepted}
                data-testid={REFERRAL_JOURNEY_TEST_ID.journeyStepLine}
              />
            </Tooltip>
            {journeyTiers.map((tier, i) => (
              <JourneyStep
                key={i}
                ref={(el: Element | null) => (journeyStepRefs.current[i] = el)}
                data-testid={`${REFERRAL_JOURNEY_TEST_ID.journeyStep}-${i}`}
              >
                <GradientBorder
                  completed={tier.completed}
                  showAnimation={shouldShowAnimation(i)}
                  data-testid={`${REFERRAL_JOURNEY_TEST_ID.gradientBorder}-${i}`}
                >
                  <JourneyStepIcon data-testid={`${REFERRAL_JOURNEY_TEST_ID.journeyStepIcon}-${i}`}>
                    {tier.completed && <CheckRoundedIcon fontSize="medium" data-testid={REFERRAL_JOURNEY_TEST_ID.checkRoundedIcon} />}
                  </JourneyStepIcon>
                </GradientBorder>
                <ReferralRewardCard
                  {...tier}
                  image={rewardImages?.find(reward => reward.tier === tier.invitesAccepted)?.url || tier.image}
                  onSetReferralEmail={onSetReferralEmail}
                  data-testid={`${REFERRAL_JOURNEY_TEST_ID.referralRewardCard}-${i}`}
                />
              </JourneyStep>
            ))}
          </JourneyStepper>
        </JourneyWrapper>
      </JourneyContainer>
      <ReferralRewardReached
        reward={{
          ...journeyTiers[Math.max(animatedStep - 1, 0)], // Usar Math.max para evitar índices negativos
          image:
            rewardImages?.find(reward => reward.tier === journeyTiers[Math.max(animatedStep - 1, 0)].invitesAccepted)?.url ||
            journeyTiers[Math.max(animatedStep - 1, 0)].image
        }}
        open={open}
        onClick={handleClose}
        onSetReferralEmail={onSetReferralEmail}
        data-testid={REFERRAL_JOURNEY_TEST_ID.rewardModal}
      />
    </SectionContainer>
  )
})

export { ReferralJourney }
