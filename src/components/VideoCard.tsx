import React from 'react';
import { Video } from '../types/videoType';
import { formatAgo } from './../util/date';

export default function VideoCard({ video }: Video) {
    const { publishedAt, title, thumbnails, channelTitle } = video.snippet;
    return (
        <li>
            <img src={thumbnails.medium.url} alt={title} />
            <div>
                <p>{title}</p>
                <p>{channelTitle}</p>
                <p>{formatAgo(publishedAt)}</p>
            </div>
        </li>
    );
}
