import { createContext, useContext } from 'react';
import { VideoItem } from './../types/videoType';

export const YoutubeApiContext = createContext({
    youtube: {
        search: (keyword: string) => new Promise<VideoItem[]>((resolve, reject) => resolve([])),
        popular: () => new Promise<VideoItem[]>((resolve, reject) => resolve([])),
        channelImageURL: (id: string) => new Promise<string>((resolve, reject) => resolve('')),
        relatedVideo: (id: string) => new Promise<VideoItem[]>((resolve, reject) => resolve([])),
    },
});

export function useYoutubeApi() {
    return useContext(YoutubeApiContext);
}
