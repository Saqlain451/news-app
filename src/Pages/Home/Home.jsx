import React from 'react'
import Hero from '../../Component/Hero/Hero'
import { useGlobalHook } from '../../Hooks/Context'
import SearchResult from '../searchResult/SearchResult'
import Qna from '../qna/Qna'

const Home = () => {
  const { heroData,titleChange } = useGlobalHook()
  titleChange("Home");
  return (
    <>
      <Hero {...heroData} />
      <SearchResult />
      <hr />
      <Qna/>
    </>
  )
}

export default Home