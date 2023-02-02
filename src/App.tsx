import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/query-core';
/**
 * <APIS>
 *
 * / => <Videos> hot trending videos
 * /videos => <Videos> hot trending videos
 * /videos/query => <Videos> seached videos
 * /videos/id => <VideosDetail> detail video
 *
 */

const queryClient = new QueryClient();

function App(): JSX.Element {
    return (
        <>
            <SearchHeader />
            <QueryClientProvider client={queryClient}>
                <Outlet />
            </QueryClientProvider>
        </>
    );
}

export default App;
