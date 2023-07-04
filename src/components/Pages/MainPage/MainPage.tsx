import { useState } from 'react'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import reactLogo from '../../../assets/react.svg'
import { PageLayout } from '../../PageLayout'
import styles from './MainPage.module.css'

function MainPage() {
  const [count, setCount] = useState(0)

  return (
    <PageLayout>
      <>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={reactLogo} className={styles.logo + ' ' + styles.react} alt="React logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className={styles.logo + ' ' + styles.react} alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <Button primary>This is a button</Button>
        <div className="card">
          <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </>
    </PageLayout>
  )
}

export default MainPage
