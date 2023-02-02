import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
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
      {/* search header place here! */}
      <Outlet />
    </>
  );
}

export default App;
