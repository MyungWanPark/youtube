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
    const { title, description, channelTitle, channelId } = video.snippet;
    return (
        <section className="flex flex-col lg:flex-row">
            <article className="basis-2/3">
                <iframe
                    title={video.snippet.title}
                    id="player"
                    width="100%"
                    height="640"
                    src={`http://www.youtube.com/embed/${video.id}`}
                />
                <div className="p-8">
                    <h2 className="font-bold text-lg">{title}</h2>
                    <ChannelInfo info={{ id: channelId, title: channelTitle }} />
                    <pre className="whitespace-pre-wrap">{description}</pre>
                </div>
            </article>
            <article className="basis-1/3">
                <RelatedVideos id={video.id} />
            </article>
        </section>
    );
}
