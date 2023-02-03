import axios, { AxiosInstance } from 'axios';
import { SearchVideoItem } from '../pages/Videos';
import { VideoItem } from './../pages/Videos';
import { Youtube } from './youtubeMock';

export default class YoutubeImpl implements Youtube {
    private httpClient: AxiosInstance;

    constructor() {
        this.httpClient = axios.create({
            baseURL: 'https://youtube.googleapis.com/youtube/v3/',
            params: {
                key: process.env.REACT_APP_YOUTUBE_API_KEY,
            },
        });
    }
    search(keyword?: string) {
        return keyword ? this.searchByKeyword(keyword) : this.mostPopular();
    }
    // GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=bts&key=[YOUR_API_KEY] HTTP/1.1

    private async searchByKeyword(keyword: string): Promise<VideoItem[]> {
        return this.httpClient
            .get('/search', {
                params: {
                    part: 'snippet',
                    maxResults: 25,
                    q: keyword,
                },
            }) //
            .then((res) => res.data.items)
            .then((items) =>
                items.map((item: SearchVideoItem) => ({
                    ...item,
                    id: item.id.videoId,
                }))
            );
    }
    // GET https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=[YOUR_API_KEY] HTTP/1.1

    private async mostPopular(): Promise<VideoItem[]> {
        return this.httpClient
            .get('/videos', {
                params: {
                    part: 'snippet',
                    maxResults: 25,
                    chart: 'mostPopular',
                },
            }) //
            .then((res) => res.data.items);
    }
}
