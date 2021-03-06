import { createContext, useState,  ReactNode, useContext } from 'react'
import Episode from '../pages/episodes/[slug]'

type Episode = {
    title: string;
    members: string;
    thumbnail:  string;
    duration: number;
    url: string;
} 

type PlayerContextData = {
    episodeList: Episode[],
    currentEpisodeIndex: number;
    hasNext: boolean
    hasPrevious: boolean
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean
    toggleShuffle: () => void
    playList: (list: Episode[], index: number) => void
    play:(episode: Episode) => void
    togglePlay: () => void
    toggleLoop: () => void
    playNext: () => void
    playPrevious: () => void
    clearPlayerState:  () => void
    setPlayingState: (state: boolean) => void
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
    children: ReactNode
}

export function PlayerContextProvider( {children } : PlayerContextProviderProps ) {

  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setisShuffling] = useState(false)
 
  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number) {
      setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true)

  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function toggleLoop() {
      setIsLooping(!isLooping)
  }
  function toggleShuffle() {
      setisShuffling(!isShuffling)
  }

  function clearPlayerState() {
      setEpisodeList([])
      setCurrentEpisodeIndex(0)
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length

  function playNext() {
      if(isShuffling) {
        const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
        setCurrentEpisodeIndex(nextRandomEpisodeIndex)
      }else if (hasNext) {
        setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }
    function playPrevious() {
      if(hasPrevious) {
        setCurrentEpisodeIndex(currentEpisodeIndex - 1)
      }
      
  }

  return (
    <PlayerContext.Provider 
    value={{ 
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        hasNext,
        hasPrevious,
        isLooping,
        isShuffling,
        toggleShuffle,
        clearPlayerState,
        play, 
        togglePlay,
        setPlayingState,
        playList,
        playNext,
        toggleLoop,
        playPrevious,

        }}>
            {children}
       </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}
