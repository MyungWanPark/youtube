import NotFound from '../NotFound';
import renderer from 'react-test-renderer';
import { withRouter } from '../../test/util';

describe('Not Found', () => {
    test('renders correctly', () => {
        const component = renderer.create(
            withRouter([
                {
                    element: <NotFound />,
                    path: '/',
                },
            ])
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});
