import { render, screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { videosData } from '../../test/videoData';
import RelatedVideos from '../RelatedVideos';
import { withAllContext, withRouter } from '../../test/util';
/**
 * Test 사항
 *
 * 1. Related Videos 렌더링 되는지?
 * 2. videos(with parameter) 와 함께 렌더링이 잘 되는지?
 * 3. render loading
 * 4. render error
 *
 */

describe('Related Videos', () => {
    const youtubeClient = {
        channelImageURL: jest.fn(),
        search: jest.fn(),
        popular: jest.fn(),
        relatedVideo: jest.fn(),
    };

    afterEach(() => {
        youtubeClient.relatedVideo.mockReset();
    });

    test('renders correctly', async () => {
        youtubeClient.relatedVideo.mockImplementation(() => videosData);

        const { asFragment } = renderRelatedVideos();
        await waitForElementToBeRemoved(screen.queryByText('is loading..'));
        expect(asFragment()).toMatchSnapshot();
    });

    test('render with related video', async () => {
        youtubeClient.relatedVideo.mockImplementation((id) => videosData);
        const { asFragment } = renderRelatedVideos();

        expect(youtubeClient.relatedVideo).toHaveBeenCalledWith('id');
        const listitems = await screen.findAllByRole('listitem');
        expect(listitems).toHaveLength(videosData.length);
        expect(asFragment()).toMatchSnapshot();
    });

    test('render loading status', () => {
        renderRelatedVideos();

        expect(screen.getByText('is loading..')).toBeInTheDocument();
    });

    test('render error status', async () => {
        youtubeClient.relatedVideo.mockImplementation(() => {
            throw new Error('network error');
        });

        renderRelatedVideos();

        const errMsg = await screen.findByText('network error...');
        expect(errMsg).toBeInTheDocument();
        /*         await waitFor(() => {
            expect(screen.getByText('network error...')).toBeInTheDocument();
        }); */
    });

    function renderRelatedVideos(prop: string = 'id') {
        return render(
            withAllContext(
                withRouter([
                    {
                        element: <RelatedVideos id={prop} />,
                        path: '/',
                    },
                ]),
                youtubeClient
            )
        );
    }
});
