import { createContext, useContext } from 'react';
import YoutubeImpl from '../api/youtube';
import YoutubeClient from '../api/youtubeClient';

type Children = {
    children: JSX.Element;
};
const client = new YoutubeClient();
const youtube = new YoutubeImpl(client);
export const YoutubeApiContext = createContext({ youtube });

export function YoutubeApiProvider({ children }: Children) {
    <YoutubeApiContext.Provider value={{ youtube }}>{children}</YoutubeApiContext.Provider>;
}

export function useYoutube() {
    return useContext(YoutubeApiContext);
}
