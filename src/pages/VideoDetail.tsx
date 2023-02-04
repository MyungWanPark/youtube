import React from 'react';
import { useLocation } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import RelatedVideos from '../components/RelatedVideos';
import { VideoItem } from '../types/videoType';

export default function VideoDetail() {
    const {
        state: { video },
    }: {
        state: { video: VideoItem };
    } = useLocation();
    const { publishedAt, title, thumbnails, description, channelTitle, channelId } = video.snippet;
    return (
        <section>
            <article>
                <iframe
                    title={video.snippet.title}
                    id="player"
                    width="100%"
                    height="640"
                    src={`http://www.youtube.com/embed/${video.id}`}
                />
                <div>
                    <h2>{title}</h2>
                    <ChannelInfo info={{ id: channelId, title: channelTitle }} />
                    <pre>{description}</pre>
                </div>
            </article>
            <article>
                <RelatedVideos id={video.id} />
            </article>
        </section>
    );
}
