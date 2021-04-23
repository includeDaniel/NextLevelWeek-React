import {createContext} from 'react'

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
    play:(episode: Episode) => void
}

export const PlayerContext = createContext({} as PlayerContextData)