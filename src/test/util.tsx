import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/query-core';
import { YoutubeApiContext } from '../context/YoutubeApiContext';
export function withRouter(routesArr: RouteObject[], initialEntries: string[] = ['/']) {
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
