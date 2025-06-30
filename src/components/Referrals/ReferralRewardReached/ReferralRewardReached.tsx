/* eslint-disable import/no-named-as-default-member */
import React, { useState, useCallback } from 'react'
import { Email } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { REFERRAL_REWARD_REACHED_TEST_ID } from './constants'
import {
  AnimatedBackground,
  PreTitle,
  RewardContainer,
  RewardImage,
  RewardImageLabel,
  RewardReachedModal,
  RewardWrapper,
  Subtitle,
  RewardImageContainer,
  Title,
  GradientBorder,
  SwagRewardInputContainer,
  SwagRewardTitle,
  SwagRewardContainer,
  SwagRewardInput,
  SwagRewardButton
} from './ReferralRewardReached.styled'
import { getBackgroundImage } from './utils'
import { ReferralRewardReachedProps } from './ReferralRewardReached.types'

const ReferralRewardReached = React.memo((props: ReferralRewardReachedProps) => {
  const { reward, open, onClick, onSetReferralEmail } = props
  const { image, rarity, description, invitesAccepted } = reward
  const backgroundImg = getBackgroundImage(rarity)
  const [email, setEmail] = useState('')
  const [hasError, setHasError] = useState(false)

  const handleInputClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation()
  }, [])

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value)
      if (hasError) {
        setHasError(false)
      }
    },
    [hasError]
  )

  const handleButtonClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()

      if (Email.validate(email)) {
        setHasError(false)
        if (onSetReferralEmail) {
          onSetReferralEmail(email)
        }
      } else {
        setHasError(true)
      }
    },
    [email, onSetReferralEmail]
  )

  return (
    <RewardReachedModal open={open} onClose={onClick} onClick={onClick} data-testid={REFERRAL_REWARD_REACHED_TEST_ID.modal}>
      <RewardContainer data-testid={REFERRAL_REWARD_REACHED_TEST_ID.container}>
        <AnimatedBackground backgroundImg={backgroundImg} data-testid={REFERRAL_REWARD_REACHED_TEST_ID.animatedBackground} />
        <RewardWrapper data-testid={REFERRAL_REWARD_REACHED_TEST_ID.wrapper}>
          <PreTitle data-testid={REFERRAL_REWARD_REACHED_TEST_ID.preTitle}>{t('referral_reward_reached.reward')}</PreTitle>
          <Title data-testid={REFERRAL_REWARD_REACHED_TEST_ID.title}>{t('referral_reward_reached.new_item_unlocked')}</Title>
          <Subtitle data-testid={REFERRAL_REWARD_REACHED_TEST_ID.subtitle}>
            {t('referral_reward_reached.invites_accepted', { count: invitesAccepted })}
          </Subtitle>
        </RewardWrapper>
        <GradientBorder rarity={rarity} data-testid={REFERRAL_REWARD_REACHED_TEST_ID.gradientBorder}>
          <RewardImageContainer rarity={rarity} data-testid={REFERRAL_REWARD_REACHED_TEST_ID.imageContainer}>
            <RewardImage src={image} alt={`${rarity}-reward`} open={open} data-testid={REFERRAL_REWARD_REACHED_TEST_ID.image} />
          </RewardImageContainer>
        </GradientBorder>
        <RewardImageLabel data-testid={REFERRAL_REWARD_REACHED_TEST_ID.description}>{description}</RewardImageLabel>
        {rarity === 'SWAG' && (
          <SwagRewardContainer data-testid={REFERRAL_REWARD_REACHED_TEST_ID.swagRewardContainer}>
            <SwagRewardTitle data-testid={REFERRAL_REWARD_REACHED_TEST_ID.swagRewardTitle}>
              {t('referral_reward_reached.swag_reward_title')}
            </SwagRewardTitle>
            <SwagRewardInputContainer>
              <SwagRewardInput
                variant="outlined"
                placeholder={t('referral_reward_reached.swag_reward_input_placeholder')}
                value={email}
                onChange={handleInputChange}
                onClick={handleInputClick}
                error={hasError}
                helperText={hasError ? t('referral_reward_reached.swag_reward_error_message') : ''}
                inputProps={{
                  ['data-testid']: REFERRAL_REWARD_REACHED_TEST_ID.swagRewardInput
                }}
              />
              <SwagRewardButton
                variant="contained"
                onClick={handleButtonClick}
                data-testid={REFERRAL_REWARD_REACHED_TEST_ID.swagRewardButton}
              >
                {t('referral_reward_reached.swag_reward_button')}
              </SwagRewardButton>
            </SwagRewardInputContainer>
          </SwagRewardContainer>
        )}
      </RewardContainer>
    </RewardReachedModal>
  )
})

export { ReferralRewardReached }
