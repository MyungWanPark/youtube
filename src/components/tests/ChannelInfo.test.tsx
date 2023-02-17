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
    };
    afterEach(() => {
        youtubeClient.channelImageURL.mockReset();
    });

    test('renders correctly', async () => {
        const testProps = {
            id: '1',
            title: 'title1',
        };

        youtubeClient.channelImageURL.mockImplementation(() => '/imageURL');

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

        const image = (await screen.findByRole('img')) as HTMLImageElement;
        expect(image.src.includes('imageURL')).toBe(true);
        expect(image.alt).toBe('title1');
    });
});
