import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Listing from './pages/Listing';
import Details from './pages/Details';
import ErrorBoundary from './ErrorBoundary';


const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Listing />} />
          <Route path="/details/:name" element={<Details />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
