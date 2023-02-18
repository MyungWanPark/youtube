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
    afterEach(() => {
        youtubeClient.channelImageURL.mockReset();
    });

    test('renders correctly with imageURL', async () => {
        const testProps = {
            id: '1',
            title: 'title1',
        };

        youtubeClient.channelImageURL.mockImplementation(() => new Promise((resolve, reject) => resolve('/imageURL')));

        const { asFragment } = render(
            withAllContext(
                withRouter([
                    {
                        path: '/',
                        element: <ChannelInfo info={testProps} />,
                    },
                ]),
                youtubeClient
            )
        );

        const image = (await screen.findByRole('img')) as HTMLImageElement;
        expect(image.src.includes('imageURL')).toBe(true);
        expect(image.alt).toBe('title1');
        expect(asFragment()).toMatchSnapshot();
    });

    test('render without URL', async () => {
        youtubeClient.channelImageURL.mockImplementation(() => {
            throw new Error('image not found');
        });
        const testProps = {
            id: '1',
            title: 'title1',
        };

        render(
            withAllContext(
                withRouter([
                    {
                        path: '/',
                        element: <ChannelInfo info={testProps} />,
                    },
                ]),
                youtubeClient
            )
        );

        expect(screen.queryByRole('img')).toBeNull();
    });
});
