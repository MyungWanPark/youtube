import { withAllContext, withRouter } from '../../test/util';
import ChannelInfo from '../ChannelInfo';
import { render, screen } from '@testing-library/react';
/**
 * Test 할 요소
 * 1. useQuery를 통한 youtube.channelImageURL을 잘 받아오는지?
 */

describe('ChannelInfo', () => {
    const youtubeClient = {
        channelImageURL: jest.fn(),
        search: jest.fn(),
        popular: jest.fn(),
        relatedVideo: jest.fn(),
    };

    const testProps = {
        id: '1',
        title: 'title1',
    };

    afterEach(() => {
        youtubeClient.channelImageURL.mockReset();
    });

    test('renders correctly with imageURL', async () => {
        youtubeClient.channelImageURL.mockImplementation(() => new Promise((resolve, reject) => resolve('/imageURL')));

        const { asFragment } = renderChannelInfo(testProps);

        const image = (await screen.findByRole('img')) as HTMLImageElement;
        expect(image.src.includes('imageURL')).toBe(true);
        expect(image.alt).toBe('title1');
        expect(asFragment()).toMatchSnapshot();
    });

    test('render without URL', async () => {
        youtubeClient.channelImageURL.mockImplementation(() => {
            throw new Error('image not found');
        });

        renderChannelInfo(testProps);

        expect(screen.queryByRole('img')).toBeNull();
    });

    function renderChannelInfo(Props: { id: string; title: string }) {
        return render(
            withAllContext(
                withRouter([
                    {
                        path: '/',
                        element: <ChannelInfo info={Props} />,
                    },
                ]),
                youtubeClient
            )
        );
    }
});
