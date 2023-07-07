import { Icon } from 'semantic-ui-react'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { Profile } from 'decentraland-ui/dist/components/Profile/Profile'
import wallet from '../../assets/icons/Wallet.svg'
import styles from './ProfileInformation.module.css'

const ProfileInformation = () => {
  return (
    <div className={styles.ProfileInformation}>
      {/* TODO: what to do with this size */}
      <div className={styles.basicRow}>
        <Profile size="massive" imageOnly address="0xd4fEC88A49EB514e9347eC655D0481D8483a9AE0" />
        <div className={styles.profileData}>
          <span className={styles.userNumber}>
            <span className={styles.userName}>Florencia</span>&nbsp; #222
          </span>
          <div className={styles.wallet}>
            <img src={wallet} />
            <Profile textOnly address="0xd4fEC88A49EB514e9347eC655D0481D8483a9AE0" />
            <Icon name="copy" color="grey" />
          </div>
          <div>
            <Icon name="users" />
            714 friends
          </div>
          <span className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>
        </div>
      </div>
      <div className={styles.actions}>
        <Button secondary>GET A UNIQUE NAME</Button>
        <Button secondary className={styles.smallButton}>
          <Icon name="share alternate"></Icon>
        </Button>
        <Button inverted className={styles.smallButton}>
          <Icon name="ellipsis horizontal"></Icon>
        </Button>
      </div>
    </div>
  )
}

export default ProfileInformation
