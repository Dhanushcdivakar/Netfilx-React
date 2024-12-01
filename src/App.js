import React from 'react';
import './App.css';
import {originals,actions } from './Url'
import Navbar from './Compoents/Navbar';
import Banner from './Compoents/Banner/Banner';
import RowPost from './Compoents/RowPost/RowPost';




function App() {
  
  return (
    <div className='App'>
      <Navbar/> 
      <Banner/>
      <RowPost url={originals} title='Netflix Originals'/>
      <RowPost url={actions} title='Action' isSmall/>
    </div>
  );
}

export default App;
