import { createContext, useContext } from 'react';

export const YoutubeApiContext = createContext({
    youtube: {
        channelImageURL: (id: string) => new Promise<string>((resolve, reject) => resolve('')),
    },
});

export function useYoutubeApi() {
    return useContext(YoutubeApiContext);
}
