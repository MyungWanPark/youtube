import React from 'react';
import { Video } from '../types/videoType';
import { formatAgo } from './../util/date';

export default function VideoCard({ video }: Video) {
    const { publishedAt, title, thumbnails, channelTitle } = video.snippet;
    return (
        <li>
            <img className="w-full" src={thumbnails.medium.url} alt={title} />
            <div>
                <p className="font-semibold my-2 line-clamp-2">{title}</p>
                <p className="text-sm opacity-80">{channelTitle}</p>
                <p className="text-sm opacity-80">{formatAgo(publishedAt)}</p>
            </div>
        </li>
    );
}
