import React from 'react';
import { VideoItem } from '../types/videoType';
import { formatAgo } from './../util/date';
import { useNavigate } from 'react-router-dom';

type Props = {
    video: VideoItem;
    type?: 'list';
};

export default function VideoCard({ video, type }: Props) {
    const { publishedAt, title, thumbnails, channelTitle } = video.snippet;
    const navigate = useNavigate();
    const isList = type === 'list';

    return (
        <li
            className={`${isList ? 'flex m-2' : ''} cursor-pointer`}
            onClick={() => navigate(`/videos/watch/${video.id}`, { state: { video } })}
        >
            <img className={isList ? 'w-60 mr-3' : 'w-full'} src={thumbnails.medium.url} alt={title} />
            <div>
                <p className="font-semibold my-2 line-clamp-2">{title}</p>
                <p className="text-sm opacity-80">{channelTitle}</p>
                <p className="text-sm opacity-80">{formatAgo(publishedAt)}</p>
            </div>
        </li>
    );
}
