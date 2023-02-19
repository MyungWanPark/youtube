import '@testing-library/jest-dom';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { withAllContext, withRouter } from '../../test/util';
import { videosData } from '../../test/videoData';
import Videos from '../Videos';
import VideoCard from './../../components/VideoCard';
jest.mock('../../components/VideoCard');

describe('Videos', () => {
    afterEach(() => {
        (VideoCard as jest.Mock).mockReset();
        youtubeClient.search.mockReset();
        youtubeClient.popular.mockReset();
    });

    const youtubeClient = {
        channelImageURL: jest.fn(),
        search: jest.fn(),
        popular: jest.fn(),
        relatedVideo: jest.fn(),
    };

    test('renders with search keyword', async () => {
        const searchKeyword = 'helloWorld';
        youtubeClient.search.mockImplementation((keyword) => videosData);

        renderVideosWithPath(`/${searchKeyword}`);

        await waitForElementToBeRemoved(screen.queryByText('isLoading...'));
        expect(youtubeClient.search).toHaveBeenCalledWith(searchKeyword);
        expect((VideoCard as jest.Mock).mock.calls[0][0]).toStrictEqual({ video: videosData[0] });
    });

    test('renders with popular videos', () => {
        youtubeClient.popular.mockImplementation(() => videosData);

        renderVideosWithPath('/');

        expect(youtubeClient.popular).toHaveBeenCalledTimes(1);
    });

    test('renders with loading status', () => {
        renderVideosWithPath('/');

        expect(screen.getByText('isLoading...')).toBeInTheDocument();
    });

    test('render with error status', async () => {
        youtubeClient.popular.mockImplementation(() => {
            throw new Error("can't find popular videos");
        });

        renderVideosWithPath('/');

        expect(await screen.findByText('Network Error...')).toBeInTheDocument();
    });

    function renderVideosWithPath(initialEntry: string) {
        return render(
            withAllContext(
                withRouter(
                    [
                        {
                            path: '/',
                            element: <Videos />,
                        },
                        {
                            path: '/:keyword',
                            element: <Videos />,
                        },
                    ],
                    [{ pathname: initialEntry }]
                ),
                youtubeClient
            )
        );
    }
});
