import { withRouter } from '../../test/util';
import VideoDetail from '../VideoDetail';
import { render } from '@testing-library/react';
import { videoData } from './../../test/videoData';
import ChannelInfo from './../../components/ChannelInfo';
import RelatedVideos from '../../components/RelatedVideos';
import renderer from 'react-test-renderer';

jest.mock('../../components/ChannelInfo');
jest.mock('../../components/RelatedVideos');

describe('VideoDetail', () => {
    /* afterEach(() => {
        (ChannelInfo as jest.Mock).mockReset();
        (RelatedVideos as jest.Mock).mockReset();
    }); */

    test('renders video item', () => {
        const componet = renderer.create(
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

        expect(componet.toJSON()).toMatchSnapshot();
        const { title, description, channelTitle, channelId } = videoData.snippet;
    });
});
