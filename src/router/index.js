import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import FeedContainer from '../containers/feed';
import OptionsContainer from '../containers/options';

const AppRoutes = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path='/' element={ <FeedContainer/> }/>
        <Route path='/options' element={ <OptionsContainer/> }/>
        <Route path='*' element={ <FeedContainer/> }/>
      </Routes>
    </MemoryRouter>
  );
};

export default AppRoutes;
