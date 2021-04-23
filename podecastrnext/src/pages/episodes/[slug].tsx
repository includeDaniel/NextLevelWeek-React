import { format, parseISO } from "date-fns"
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString }from '../../utils/converDurationToTimeString'
import Image from 'next/image'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { api } from '../../services/api';

import styles from './episode.module.scss'

type Episode = {
    id: string;
    title: string;
    members: string;
    thumbnail: string;
    description: string;
    duration: number;
    publishedAt: Date;
    durationAsString: string;
    url: string;
    
}

type EpisodeProps = {
    episode: Episode;
}

export default function Episode({ episode } : EpisodeProps) {

    return(
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}> 
            <Link href='/'>
                <button type="button">
                    <img src="/arrow-left.svg" alt="Voltar"/>
                </button>
             </Link>
                <Image 
                    width={720} 
                    height={160} 
                    src={episode.thumbnail} 
                    objectFit="cover" />
                <button>
                    <img src="/play.svg" alt="Tocar episódio"/>
                </button>
            </div>
            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>

            <div className={styles.description} dangerouslySetInnerHTML={{__html: episode.description}} />
                                
            </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get('episodes', {
        params: {
          _limit: 12,
          _sort: 'published_at',
          _order: 'desc'
        }
      })

      const paths = data.map(episode => {
          return {
              params: {
                  slug: episode.id
              }
          }
      })
    return{
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const {slug} = ctx = ctx.params;

    const { data } = await api.get(`/episodes/${slug}`)

    const episode = {
        id: data.id,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', {locale: ptBR}),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        url: data.file.url,
      };

    return{
        props: {episode},
        revalidate: 60 * 60 * 24, //24 hours
    }
}