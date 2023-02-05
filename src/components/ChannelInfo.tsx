import React from 'react';
import { ChannelProps } from '../types/videoType';
import { useQuery } from '@tanstack/react-query';
import { useYoutube } from './../context/YoutubeApiContext';

type Props = {
    info: ChannelProps;
};

export default function ChannelInfo({ info }: Props) {
    const { youtube } = useYoutube();
    const { isLoading, error, data } = useQuery(['channelInfo', info.id], () => youtube.channelImageURL(info.id));
    return <div>{data && <img src={data} alt={info.title} />}</div>;
}
