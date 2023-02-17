import YoutubeImpl from '../api/youtube';
import YoutubeClient from '../api/youtubeClient';
import { YoutubeApiContext } from './YoutubeApiContext';
// import { YoutubeMockClient } from '../api/youtubeMockClient';

type Children = {
    children: JSX.Element;
};
const client = new YoutubeClient();
// const client = new YoutubeMockClient();
const youtube = new YoutubeImpl(client);

export function YoutubeApiProvider({ children }: Children) {
    return <YoutubeApiContext.Provider value={{ youtube }}>{children}</YoutubeApiContext.Provider>;
}
