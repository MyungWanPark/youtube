import { YoutubeFindData } from './youtubeClient';
import { VideoItem } from './../types/videoType';

export interface Youtube {
    search(keyword: string): Promise<VideoItem[]>;
    channelImageURL(id: string): Promise<string>;
    popular(): Promise<VideoItem[]>;
    relatedVideo(id: string): Promise<VideoItem[]>;
}

export default class YoutubeImpl implements Youtube {
    constructor(private readonly apiClient: YoutubeFindData) {}

    search(keyword: string) {
        return this.apiClient.search({
            params: {
                part: 'snippet',
                maxResults: 25,
                q: keyword,
            },
        });
    }

    channelImageURL(id: string) {
        return this.apiClient.channelImageURL({
            params: {
                part: 'snippet',
                maxResults: 25,
                id,
            },
        });
    }

    relatedVideo(id: string) {
        return this.apiClient.relatedVideo({
            params: {
                part: 'snippet',
                maxResults: 25,
                relatedToVideoId: id,
            },
        });
    }

    popular() {
        return this.apiClient.mostPopular({
            params: {
                part: 'snippet',
                maxResults: 25,
                chart: 'mostPopular',
            },
        });
    }
}
