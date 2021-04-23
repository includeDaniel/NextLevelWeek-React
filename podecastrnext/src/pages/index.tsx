import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '../services/api'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '../utils/converDurationToTimeString'

import styles from './home.module.scss'

type Episode = {
    id: string;
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    description: string;
    publishedAt: Date;
    durationAsString: string;
    url: string;
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({latestEpisodes, allEpisodes} : HomeProps) {
  return (
    <div className={styles.homepage}>
        <section className={styles.latestEpisodes}>
          <h2>últimos Lançamentos</h2>

          <ul>
            {latestEpisodes .map(episode => {
              return (
                <li key={episode.id}>
                  <Image width={192} height={192} objectFit="cover" src={episode.thumbnail} alt={episode.title}/>
                
                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.publishedAt}</span>
                </div>

                  <button type="button">
                    <img src="/play-green.svg" alt="Tocar episódio"/>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        <section className={styles.allEpisodes}>
              <h2>Todos episódios</h2>

              <table cellSpacing={0}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Podcast</th>
                    <th>Integrantes</th>
                    <th>Data</th>
                    <th>Duração</th>
                    <th></th>
                  </tr>
                </thead> 
            <tbody>
              {allEpisodes.map(episode=> {
                return(
                  <tr key={episode.id}>
                    <td style={{ width: 72}}>
                      <Image width={120} height={120} src={episode.thumbnail} alt={episode.title} objectFit="cover" />
                    </td>
                    <td>
                      <Link href={`/episodes/${episode.id}`}>
                        <a>{episode.title}</a>
                      </Link>
                    </td>
                    <td>{episode.members}</td>
                    <td style={{ width: 100}}>{episode.publishedAt}</td>
                    <td>{episode.durationAsString}</td>

                    <button type="button">
                        <img src="/play-green.svg" alt="Tocar episódio"/>
                    </button>
                  </tr>
                )
              })}
            </tbody>
              </table>
        </section>
    </div>
  )
}

export const getStaticProps : GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {

    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    };
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.lenght)

return {
  props: {
      latestEpisodes,
      allEpisodes, 
  
    },
    revalidate : 60 * 60 * 8 ,
  }
}