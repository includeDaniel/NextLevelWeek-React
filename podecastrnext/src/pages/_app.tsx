import { Header } from '../components/Header'
import { Player } from '../components/Player'

import '../styles/global.scss'

import styles from '../styles/app.module.scss'

import {PlayerContext} from '../contexts/PlayerContexts'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContext.Provider value={'Diego'}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
