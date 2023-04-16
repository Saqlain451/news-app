
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useGlobalHook } from './Hooks/Context';
import ScrollToTop from './Component/ScrollToTop'
import Home from './Pages/Home/Home'
import News from './Pages/News/News'
import Navbar from './Pages/Navbar/Navbar'
import Qna from './Pages/qna/Qna';
import Contact from './Pages/Contact/Contact';
import Footer from './Pages/Footer/Footer';
const App = () => {
  const { isDark } = useGlobalHook();
  return (
    <div className={isDark ? "dark" : "light"}>
      <BrowserRouter>
      <ScrollToTop/>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/news" element={<News/>} />
          <Route path='/faq' element={<Qna/>}/>
          <Route path='/search' element={<News/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App