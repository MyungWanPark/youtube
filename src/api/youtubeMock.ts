import axios from 'axios';
import { SearchVideoItem } from '../pages/Videos';
import { VideoItem } from './../pages/Videos';

export interface Youtube {
    search(keyword?: string): Promise<VideoItem[]>;
}

export class YoutubeMock implements Youtube {
    search(keyword?: string) {
        return keyword ? this.searchByKeyword() : this.mostPopular();
    }

    private async searchByKeyword(): Promise<VideoItem[]> {
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

    private async mostPopular(): Promise<VideoItem[]> {
        return axios
            .get(`/videos/mostPopularVideo.json`) //
            .then((res) => res.data.items);
    }
}
