import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, MemoryRouter, RouterProvider, useLocation } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import VideoCard from '../VideoCard';
import { formatAgo } from './../../util/date';

describe('VideoCard', () => {
    const video = {
        id: '8zIf0XvoL9Y',
        snippet: {
            publishedAt: '2022-12-16T14:00:08Z',
            channelId: 'UCjmJDM5pRKbUlVIzDYYWb6g',
            title: 'Barbie | Teaser Trailer',
            description: '#BarbieTheMovie, from director Greta Gerwig, only in theatres Summer 2023',
            thumbnails: {
                default: {
                    url: 'https://i.ytimg.com/vi/8zIf0XvoL9Y/default.jpg',
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: 'https://i.ytimg.com/vi/8zIf0XvoL9Y/mqdefault.jpg',
                    width: 320,
                    height: 180,
                },
            },
            channelTitle: 'Warner Bros. Pictures',
        },
    };
    const { publishedAt, title, thumbnails, channelTitle } = video.snippet;
    test('render video items', () => {
        //given
        render(
            <MemoryRouter>
                <VideoCard video={video} />
            </MemoryRouter>
        );

        const img = screen.getByRole('img') as HTMLImageElement;
        expect(img.src).toBe(thumbnails.medium.url);
        expect(img.alt).toBe(title);
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(channelTitle)).toBeInTheDocument();
        expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
    });

    test(`navigate to /videos/watch/${video.id} with state when list is clicked`, () => {
        function LocationStateDisplay() {
            return <pre>{JSON.stringify(useLocation().state)}</pre>;
        }
        const routes = [
            {
                path: '/',
                element: <VideoCard video={video} />,
            },
            {
                path: `/videos/watch/${video.id}`,
                element: <LocationStateDisplay />,
            },
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ['/'],
        });
        render(<RouterProvider router={router} />);

        userEvent.click(screen.getByRole('listitem'));
        expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
    });
});
