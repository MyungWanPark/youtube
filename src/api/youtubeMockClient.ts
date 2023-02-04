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

    async mostPopular(): Promise<VideoItem[]> {
        return axios
            .get(`/videos/mostPopularVideo.json`) //
            .then((res) => res.data.items);
    }
}
