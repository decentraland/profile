import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react'
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
import { ANIMATION_DURATION, getTiersCompletedCount } from './utils'
import { AnimationPhase as AnimationPhase, ReferralJourneyProps } from './ReferralJourney.types'

// eslint-disable-next-line import/no-named-as-default-member
const ReferralJourney = React.memo((props: ReferralJourneyProps) => {
  const { invitedUsersAccepted, invitedUsersAcceptedViewed, onSetReferralEmail, rewardImages } = props

  const [animatedStep, setAnimatedStep] = useState(getTiersCompletedCount(invitedUsersAccepted))
  const [open, setOpen] = useState(false)
  const [journeyTiers, setJourneyTiers] = useState(
    TIERS.map(tier => ({ ...tier, completed: tier.invitesAccepted <= invitedUsersAccepted }))
  )
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>(AnimationPhase.WAITING_NEXT_TIER)
  const [currentTierIndex, setCurrentTierIndex] = useState<number>(-1)
  const totalSteps = TIERS.length
  const journeyStepRefs = useRef<(Element | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  const getNextTierIndex = useCallback((): number => {
    return TIERS.findIndex((tier, index) => {
      const isCurrentlyCompleted = tier.invitesAccepted <= invitedUsersAccepted
      const wasCompletedWhenViewed = tier.invitesAccepted <= invitedUsersAcceptedViewed
      const isNewlyCompleted = isCurrentlyCompleted && !wasCompletedWhenViewed

      return isNewlyCompleted && index > currentTierIndex
    })
  }, [invitedUsersAccepted, invitedUsersAcceptedViewed, currentTierIndex])

  const getNewTiersToAnimate = useCallback((): number => {
    const tiersCompletedWhenViewed = getTiersCompletedCount(invitedUsersAcceptedViewed)
    const tiersCompletedNow = getTiersCompletedCount(invitedUsersAccepted)
    return tiersCompletedNow - tiersCompletedWhenViewed
  }, [invitedUsersAccepted, invitedUsersAcceptedViewed])

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
    const currentAnimatedStep = getTiersCompletedCount(invitedUsersAccepted)
    setAnimatedStep(currentAnimatedStep)
  }, [])

  useEffect(() => {
    const newTiersToAnimate = getNewTiersToAnimate()

    if (newTiersToAnimate <= 0) {
      return
    }

    const nextTierIndex = getNextTierIndex()

    if (animationPhase === AnimationPhase.WAITING_NEXT_TIER && !open && nextTierIndex !== -1) {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      setAnimationPhase(AnimationPhase.TIER_REACHED)
      setAnimatedStep(nextTierIndex + 1)
      setCurrentTierIndex(nextTierIndex)
    }
  }, [
    animatedStep,
    totalSteps,
    animationPhase,
    open,
    invitedUsersAccepted,
    invitedUsersAcceptedViewed,
    currentTierIndex,
    getNewTiersToAnimate,
    getNextTierIndex
  ])

  useEffect(() => {
    if (animationPhase !== AnimationPhase.TIER_REACHED) return

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

    setJourneyTiers(
      TIERS.map(tier => ({
        ...tier,
        completed: tier.invitesAccepted <= invitedUsersAccepted
      }))
    )
  }, [animatedStep, invitedUsersAccepted])

  const handleClose = useCallback(() => {
    setOpen(false)

    setTimeout(() => {
      setAnimationPhase(AnimationPhase.WAITING_NEXT_TIER)

      const newTiersToAnimate = getNewTiersToAnimate()

      if (newTiersToAnimate > 0) {
        const nextTierIndex = getNextTierIndex()

        if (nextTierIndex !== -1) {
          setAnimatedStep(nextTierIndex + 1)
          setCurrentTierIndex(nextTierIndex)
          setAnimationPhase(AnimationPhase.TIER_REACHED)
        }
      }
    }, 10)
  }, [getNewTiersToAnimate, getNextTierIndex])

  const shouldShowAnimation = useCallback(
    (tierIndex: number): boolean => {
      const tier = TIERS[tierIndex]
      const isNewlyCompleted = tier.invitesAccepted <= invitedUsersAccepted && tier.invitesAccepted > invitedUsersAcceptedViewed
      const isCurrentlyAnimating = animationPhase === AnimationPhase.TIER_REACHED && animatedStep === tierIndex + 1

      return isNewlyCompleted && isCurrentlyAnimating
    },
    [invitedUsersAccepted, invitedUsersAcceptedViewed, animationPhase, animatedStep]
  )

  const shouldShowIcon = useCallback(
    (tierIndex: number): boolean => {
      const tier = TIERS[tierIndex]
      const isCompleted = tier.invitesAccepted <= invitedUsersAccepted
      const isCurrentlyAnimating = animationPhase === AnimationPhase.TIER_REACHED && animatedStep === tierIndex + 1

      return isCompleted || isCurrentlyAnimating
    },
    [invitedUsersAccepted, animationPhase, animatedStep]
  )

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
                invitedUsersAccepted={
                  animationPhase === AnimationPhase.TIER_REACHED
                    ? (TIERS[animatedStep - 1]?.invitesAccepted ?? invitedUsersAccepted)
                    : invitedUsersAccepted
                }
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
                    {shouldShowIcon(i) && <CheckRoundedIcon fontSize="medium" data-testid={REFERRAL_JOURNEY_TEST_ID.checkRoundedIcon} />}
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
          ...journeyTiers[Math.max(animatedStep - 1, 0)],
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
