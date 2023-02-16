import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useLocation } from 'react-router-dom';
import VideoCard from '../VideoCard';
import { formatAgo } from '../../util/date';
import { video } from '../../test/videoData';
import { memoryRouter } from '../../test/memoryRouter';

describe('VideoCard', () => {
    const { publishedAt, title, thumbnails, channelTitle } = video.snippet;
    test('render video items', () => {
        //given
        render(
            memoryRouter(
                [
                    {
                        path: '/',
                        element: <VideoCard video={video} />,
                    },
                ],
                ['/']
            )
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

        render(
            memoryRouter(
                [
                    {
                        path: '/',
                        element: <VideoCard video={video} />,
                    },
                    {
                        path: `/videos/watch/${video.id}`,
                        element: <LocationStateDisplay />,
                    },
                ],
                ['/']
            )
        );

        userEvent.click(screen.getByRole('listitem'));
        expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
    });
});
