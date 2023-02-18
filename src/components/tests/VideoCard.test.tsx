import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { useLocation } from 'react-router-dom';
import VideoCard from '../VideoCard';
import { formatAgo } from '../../util/date';
import { videoData } from '../../test/videoData';
import { withRouter } from '../../test/util';

describe('VideoCard', () => {
    const { publishedAt, title, thumbnails, channelTitle } = videoData.snippet;

    test('render video items', () => {
        //arrange
        render(
            withRouter(
                [
                    {
                        path: '/',
                        element: <VideoCard video={videoData} />,
                    },
                ],
                ['/']
            )
        );

        //act
        const img = screen.getByRole('img') as HTMLImageElement;

        //assert
        expect(img.src).toBe(thumbnails.medium.url);
        expect(img.alt).toBe(title);
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(channelTitle)).toBeInTheDocument();
        expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
    });

    test('render video items with grid type', () => {
        const component = renderer.create(
            withRouter(
                [
                    {
                        path: '/',
                        element: <VideoCard video={videoData} />,
                    },
                ],
                ['/']
            )
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    test('render video items with list type', () => {
        const component = renderer.create(
            withRouter(
                [
                    {
                        path: '/',
                        element: <VideoCard video={videoData} type={'list'} />,
                    },
                ],
                ['/']
            )
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    test(`navigate to /videos/watch/${videoData.id} with state when list is clicked`, () => {
        function LocationStateDisplay() {
            return <pre>{JSON.stringify(useLocation().state)}</pre>;
        }
        // arrange
        render(
            withRouter(
                [
                    {
                        path: '/',
                        element: <VideoCard video={videoData} />,
                    },
                    {
                        path: `/videos/watch/${videoData.id}`,
                        element: <LocationStateDisplay />,
                    },
                ],
                ['/']
            )
        );
        //act
        userEvent.click(screen.getByRole('listitem'));

        //assert
        expect(screen.getByText(JSON.stringify({ video: videoData }))).toBeInTheDocument();
    });
});
