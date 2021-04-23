import { useContext } from 'react'
import { PlayerContext } from '../../contexts/PlayerContexts'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'


import styles from './styles.module.scss'
import Image from 'next/image'

export function Player() {
    const { episodeList, currentEpisodeIndex } = useContext(PlayerContext)

    const episode = episodeList[currentEpisodeIndex]
  
    return(
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando agora"/>
                <strong>Tocando agora</strong>
            </header>

                 { episode ? (
                    <div className={styles.currentEpisode}>
                        <Image width={592} height={592} src={episode.thumbnail} objectFit="cover"/>
                        <strong>{episode.title}</strong>
                        <strong>{episode.members}</strong>
                    </div>
                 ) : (
                    <div className={styles.emptyPlayer}>
                        <strong>Selecione um podcast para ouvir</strong>
                    </div>
                 )}

            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        { episode ? (
                            <Slider  
                            trackStyle={{backgroundColor: '#04d361' }}
                            railStyle={{backgroundColor: '#9f75ff' }} 
                            handleStyle={{borderColor: '#04d361', borderWidth: 4}} />
                        ) : (
                            <div className={styles.emptySlider} /> 
                        )}
                    </div>
                    <span>00:00</span>
                </div>   
 
                    <div className={styles.buttons}>
                        <button type="button" >
                            <img src="/shuffle.svg" alt="Embaralhar"/>
                        </button>
                        <button type="button">
                            <img src="/play-previous.svg" alt="Tocar anterior"/>
                        </button>
                        <button type="button" className={styles.playButton}>
                            <img src="/play.svg" alt="Tocar"/>
                        </button>
                        <button type="button">
                            <img src="/play-next.svg" alt="Tocar próxima"/>
                        </button>
                        <button type="button" className={styles.playButton}>
                            <img src="/repeat.svg" alt="Repetir"/>
                        </button>
                    </div>
            </footer>
        </div>
    )
}