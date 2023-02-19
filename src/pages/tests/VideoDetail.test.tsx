import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withRouter } from '../../test/util';
import VideoDetail from '../VideoDetail';
import { videoData } from './../../test/videoData';
import ChannelInfo from './../../components/ChannelInfo';
import RelatedVideos from '../../components/RelatedVideos';

jest.mock('../../components/ChannelInfo');
jest.mock('../../components/RelatedVideos');

describe('VideoDetail', () => {
    afterEach(() => {
        (ChannelInfo as jest.Mock).mockReset();
        (RelatedVideos as jest.Mock).mockReset();
    });

    test('renders video item', () => {
        render(
            withRouter(
                [
                    {
                        path: '/',
                        element: <VideoDetail />,
                    },
                ],
                [{ pathname: '/', state: { video: videoData } }]
            )
        );

        const { title, description, channelTitle, channelId } = videoData.snippet;
        expect(screen.getByTitle(title)).toBeInTheDocument();
        expect((ChannelInfo as jest.Mock).mock.calls[0][0]).toStrictEqual({
            info: { id: channelId, title: channelTitle },
        });
        expect((RelatedVideos as jest.Mock).mock.calls[0][0]).toStrictEqual({ id: videoData.id });
        expect(screen.getByText(description)).toBeInTheDocument();
    });
});
