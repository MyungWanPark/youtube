import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './../components/VideoCard';
import YoutubeMock from '../api/youtubeMock';

export interface VideoItem {
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
        () => {
            const youtubeMock = new YoutubeMock();
            return youtubeMock.search(keyword);
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
                    {videos.map((video: VideoItem) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </ul>
            )}
        </>
    );
}
