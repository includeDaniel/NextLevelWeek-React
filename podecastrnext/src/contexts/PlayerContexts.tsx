import { createContext, useState,  ReactNode } from 'react'

type Episode = {
    title: string;
    members: string;
    thumbnail:  string;
    duration: Number;
    url: string;
} 

type PlayerContextData = {
    episodeList: Episode[],
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play:(episode: Episode) => void
    togglePlay: () => void
    setPlayingState: (state: boolean) => void
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
    children: ReactNode
}

export function PlayerContextProvider( {children } : PlayerContextProviderProps ) {

  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlatying] = useState(false)

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlatying(true)
  }

  function togglePlay() {
    setIsPlatying(!isPlaying)
  }

  function setPlayingState(state: boolean) {
    setIsPlatying(state);
  }

  return (
    <PlayerContext.Provider 
    value={{ 
        episodeList,
        currentEpisodeIndex,
        play, isPlaying,
        togglePlay,
        setPlayingState
        }}>
            {children}
       </PlayerContext.Provider>
  )
}
