import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './../components/VideoCard';

export interface PopularVideoItem {
    id: string;
    snippet: {
        title: string;
    };
}

export interface SearchVideoItem {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
    };
}

export default function Videos() {
    const { keyword } = useParams();
    const {
        isLoading,
        error,
        data: videos,
    } = useQuery(
        ['videos', keyword],
        async () => {
            console.log('fetching data...');
            return fetch(`/videos/${keyword ? 'searchResult' : 'mostPopularVideo'}.json`)
                .then((res) => res.json())
                .then((data) => data.items);
        },
        {
            staleTime: 1000 * 60 * 60 * 24,
        }
    );
    return (
        <>
            <div>Videos {keyword ? `🔎${keyword}` : '🔥 trending'}</div>
            {isLoading && <p>isLoading...</p>}
            {error && <p>Network Error...</p>}
            {videos && (
                <ul>
                    {keyword
                        ? videos.map((video: SearchVideoItem) => <VideoCard key={video.id.videoId} video={video} />)
                        : videos.map((video: PopularVideoItem) => <VideoCard key={video.id} video={video} />)}
                </ul>
            )}
        </>
    );
}
