import React, { useState, useCallback } from 'react'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import ClaimRewardModal from './ClaimRewardModal'
import {
  REFERRAL_REWARD_CARD_TEST_ID,
  REFERRAL_REWARD_IMAGE_TEST_ID,
  REFERRAL_REWARD_RARITY_TEST_ID,
  REFERRAL_REWARD_CLAIM_BUTTON_TEST_ID,
  REFERRAL_REWARD_CHECK_ICON_TEST_ID,
  REFERRAL_REWARD_LOCK_ICON_TEST_ID
} from './constants'
import {
  GradientBorder,
  CardContainer,
  ClaimButton,
  RewardRarity,
  RewardImage,
  RewardImageContainer,
  ReferralRewardCardContainer,
  ReferralRewardCardHeader,
  ReferralRewardCardTitle,
  HeaderContainer,
  CompletedIcon
} from './ReferralRewardCard.styled'
import { ReferralRewardCardProps } from './ReferralRewardCard.types'

// eslint-disable-next-line import/no-named-as-default-member
const ReferralRewardCard = React.memo((props: ReferralRewardCardProps) => {
  const { invitesAccepted, rarity, completed, image, onSetReferralEmail } = props
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClaimClick = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleConfirmClaim = useCallback(
    (email: string) => {
      if (onSetReferralEmail) {
        onSetReferralEmail(email)
      }
      setIsModalOpen(false)
    },
    [onSetReferralEmail]
  )

  return (
    <>
      <ReferralRewardCardContainer>
        <ReferralRewardCardHeader>
          <ReferralRewardCardTitle>{invitesAccepted}</ReferralRewardCardTitle>
        </ReferralRewardCardHeader>
        <GradientBorder completed={completed} data-testid={REFERRAL_REWARD_CARD_TEST_ID}>
          <CardContainer completed={completed} rarity={rarity}>
            <HeaderContainer>
              {rarity && (
                <RewardRarity rarity={rarity} data-testid={REFERRAL_REWARD_RARITY_TEST_ID}>
                  {rarity === 'SWAG' ? t('referral_reward_card.swag') : rarity.toUpperCase()}
                </RewardRarity>
              )}
              <CompletedIcon>
                {completed ? (
                  <CheckRoundedIcon fontSize="small" data-testid={REFERRAL_REWARD_CHECK_ICON_TEST_ID} />
                ) : (
                  <LockRoundedIcon fontSize="small" data-testid={REFERRAL_REWARD_LOCK_ICON_TEST_ID} />
                )}
              </CompletedIcon>
            </HeaderContainer>
            <RewardImageContainer>
              <RewardImage
                completed={completed}
                src={image}
                alt={t('referral_reward_card.image_alt')}
                data-testid={REFERRAL_REWARD_IMAGE_TEST_ID}
              />
            </RewardImageContainer>
            {completed && rarity === 'SWAG' && (
              <ClaimButton variant="text" data-testid={REFERRAL_REWARD_CLAIM_BUTTON_TEST_ID} onClick={handleClaimClick}>
                {t('referral_reward_card.claim')}
              </ClaimButton>
            )}
          </CardContainer>
        </GradientBorder>
      </ReferralRewardCardContainer>

      <ClaimRewardModal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmClaim} />
    </>
  )
})

export { ReferralRewardCard }
