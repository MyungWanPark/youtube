import axios from 'axios';
import { YoutubeFindData } from './youtubeClient';
import { SearchVideoItem, VideoItem } from './../types/videoType';

export class YoutubeMockClient implements YoutubeFindData {
    async search(): Promise<VideoItem[]> {
        return axios
            .get(`/videos/searchResult.json`) //
            .then((res) => res.data.items)
            .then((items) =>
                items.map((item: SearchVideoItem) => ({
                    ...item,
                    id: item.id.videoId,
                }))
            );
    }

    async channelImageURL(): Promise<string> {
        return axios
            .get('/videos/channelInfo.json') //
            .then((res) => res.data.items[0].snippet.thumbnails.default.url);
    }

    async mostPopular(): Promise<VideoItem[]> {
        return axios
            .get(`/videos/mostPopularVideo.json`) //
            .then((res) => res.data.items);
    }
}
