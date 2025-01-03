import React from 'react';
import Allroutes from './Allroutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <Allroutes />
      <Footer />
    </div>
  )
}

export default App