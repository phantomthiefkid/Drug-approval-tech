import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navigation from './commponents/Navbar/Navigation';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/navigation' element={<Navigation></Navigation>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
