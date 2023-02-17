import React from 'react';
import { useYoutube } from '../context/YoutubeProvider';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';

type Props = {
    id: string;
};

export default function RelatedVideos({ id }: Props) {
    const { youtube } = useYoutube();
    const {
        isLoading,
        error,
        data: relatedVideos,
    } = useQuery(['relatedVideo', id], () => youtube.relatedVideo(id), {
        staleTime: 1000 * 60 * 60,
    });
    return (
        <>
            {isLoading && <p>is loading..</p>}
            {error && <p>network error...</p>}
            {relatedVideos && (
                <ul>
                    {relatedVideos.map((video) => (
                        <VideoCard key={video.id} video={video} type={'list'} />
                    ))}
                </ul>
            )}
        </>
    );
}
