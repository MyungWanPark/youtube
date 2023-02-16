import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';

export function memoryRouter(routesArr: RouteObject[], initialEntries: string[] = ['/']) {
    const routes = routesArr;

    const router = createMemoryRouter(routes, {
        initialEntries: ['/'],
    });

    return <RouterProvider router={router} />;
}
