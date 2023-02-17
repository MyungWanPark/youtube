import SearchHeader from '../SearchHeader';
import renderer from 'react-test-renderer';
import { withRouter } from '../../test/util';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
/**
 *  Test로 검증할 요소.
 *
 *  1. static snapshot for checking it renders correctly
 *  2. useParams 로 전달받은 값이 input 창에 존재하는지?
 *  3. button 을 눌렀을 때, 해당하는 route로 이동하는지?
 */

describe('SearchHeader', () => {
    test('Search Header render correctly', () => {
        const component = renderer.create(
            withRouter(
                [
                    {
                        path: '/',
                        element: <SearchHeader />,
                    },
                ],
                ['/']
            )
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('show keyword in input', () => {
        const fakeKeyword = 'fakeKeyword';
        render(
            withRouter(
                [
                    {
                        path: '/:keyword',
                        element: <SearchHeader />,
                    },
                ],
                [`/${fakeKeyword}`]
            )
        );

        expect(screen.getByDisplayValue(fakeKeyword)).toBeInTheDocument();
    });

    test('navigate to keyword url when button clicked', () => {
        const keyword = 'fakeKeyword';
        render(
            withRouter([
                {
                    path: '/',
                    element: <SearchHeader />,
                },
                {
                    path: `/videos/${keyword}`,
                    element: <p>search result is {`${keyword}`}</p>,
                },
            ])
        );

        const searchInput = screen.getByRole('textbox');
        const searchButton = screen.getByRole('button');

        userEvent.type(searchInput, keyword);
        userEvent.click(searchButton);

        expect(screen.getByText(`search result is ${keyword}`)).toBeInTheDocument();
    });
});
