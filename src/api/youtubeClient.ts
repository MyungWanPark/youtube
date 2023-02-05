import axios, { AxiosInstance } from 'axios';
import { SearchVideoItem, VideoItem } from './../types/videoType';

export interface YoutubeFindData {
    search(params?: {}): Promise<VideoItem[]>;
    mostPopular(params?: {}): Promise<VideoItem[]>;
    channelImageURL(params?: {}): Promise<string>;
    relatedVideo(params?: {}): Promise<VideoItem[]>;
}

export default class YoutubeClient implements YoutubeFindData {
    private httpClient: AxiosInstance;

    constructor() {
        this.httpClient = axios.create({
            baseURL: 'https://youtube.googleapis.com/youtube/v3/',
            params: {
                key: process.env.REACT_APP_YOUTUBE_API_KEY,
            },
        });
    }
    // GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=bts&key=[YOUR_API_KEY] HTTP/1.1

    async search(params: {}): Promise<VideoItem[]> {
        return this.httpClient
            .get('/search', params) //
            .then((res) => res.data.items)
            .then((items) =>
                items.map((item: SearchVideoItem) => ({
                    ...item,
                    id: item.id.videoId,
                }))
            );
    }

    // GET https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=channelID&maxResults=25&key=[YOUR_API_KEY] HTTP/1.1

    async channelImageURL(params: {}): Promise<string> {
        return this.httpClient
            .get('/channels', params) //
            .then((res) => res.data.items[0].snippet.thumbnails.default.url);
    }

    // GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&relatedToVideoId=abc&key=[YOUR_API_KEY] HTTP/1.1

    async relatedVideo(params: {}): Promise<VideoItem[]> {
        return this.httpClient
            .get('/search', params) //
            .then((res) => res.data.items)
            .then((items) =>
                items.map((item: SearchVideoItem) => ({
                    ...item,
                    id: item.id.videoId,
                }))
            );
    }

    // GET https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=[YOUR_API_KEY] HTTP/1.1

    async mostPopular(params: {}): Promise<VideoItem[]> {
        return this.httpClient
            .get('/videos', params) //
            .then((res) => res.data.items);
    }
}
