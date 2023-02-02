import React from 'react';
import { PopularVideoItem, SearchVideoItem } from './../pages/Videos';

type PopularVideo = {
    video: PopularVideoItem;
};

type SearchVideo = {
    video: SearchVideoItem;
};

export default function VideoCard({ video }: PopularVideo | SearchVideo) {
    return <div>{video.snippet.title}</div>;
}
