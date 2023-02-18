import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/query-core';
import { YoutubeApiContext } from '../context/YoutubeApiContext';
import { VideoItem } from './../types/videoType';
import type { InitialEntry } from '@remix-run/router';

export function withRouter(routesArr: RouteObject[], initialEntries: InitialEntry[] = ['/']) {
    const routes = routesArr;

    const router = createMemoryRouter(routes, {
        initialEntries,
    });

    return <RouterProvider router={router} />;
}

export function withAllContext(
    children: JSX.Element,
    youtube: {
        channelImageURL: (id: string) => Promise<string>;
        search: (keyword: string) => Promise<VideoItem[]>;
        popular: () => Promise<VideoItem[]>;
        relatedVideo: (id: string) => Promise<VideoItem[]>;
    }
) {
    const testQueryClient = createTestQueryClient();

    return (
        <YoutubeApiContext.Provider value={{ youtube }}>
            <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
        </YoutubeApiContext.Provider>
    );
}

function createTestQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
        logger: {
            log: console.log,
            warn: console.warn,
            error: () => {},
        },
    });
}
