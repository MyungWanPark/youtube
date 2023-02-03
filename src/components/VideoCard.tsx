import React from 'react';
import { VideoItem } from './../pages/Videos';

type Video = {
    video: VideoItem;
};

export default function VideoCard({ video }: Video) {
    return <div>{video.snippet.title}</div>;
}
