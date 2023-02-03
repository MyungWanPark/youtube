import { createContext, useContext } from 'react';
import YoutubeImpl from './../api/youtube';

type Children = {
    children: JSX.Element;
};

const youtube = new YoutubeImpl();
export const YoutubeApiContext = createContext({ youtube });

export function YoutubeApiProvider({ children }: Children) {
    <YoutubeApiContext.Provider value={{ youtube }}>{children}</YoutubeApiContext.Provider>;
}

export function useYoutube() {
    return useContext(YoutubeApiContext);
}
