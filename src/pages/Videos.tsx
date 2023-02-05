import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './../components/VideoCard';
// import { YoutubeMock } from '../api/youtubeMock';
import { useYoutube } from './../context/YoutubeApiContext';
import { VideoItem } from './../types/videoType';

export default function Videos() {
    const { keyword } = useParams();
    const { youtube } = useYoutube();
    const {
        isLoading,
        error,
        data: videos,
    } = useQuery(
        ['videos', keyword],
        () => {
            return keyword ? youtube.search(keyword) : youtube.popular();
        },
        {
            staleTime: 1000 * 60 * 5,
        }
    );
    return (
        <>
            <div>Videos {keyword ? `🔎${keyword}` : '🔥 trending'}</div>
            {isLoading && <p>isLoading...</p>}
            {error && <p>Network Error...</p>}
            {videos && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
                    {videos.map((video: VideoItem) => {
                        // console.log(video.id);
                        return <VideoCard key={video.id} video={video} />;
                    })}
                </ul>
            )}
        </>
    );
}
