import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
/**
 * <APIS>
 *
 * / => <Videos> hot trending videos
 * /videos => <Videos> hot trending videos
 * /videos/query => <Videos> seached videos
 * /videos/id => <VideosDetail> detail video
 *
 */

function App(): JSX.Element {
    return (
        <>
            <SearchHeader />
            <Outlet />
        </>
    );
}

export default App;
