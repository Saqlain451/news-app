import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../../Component/Title/Title'
import { useGlobalHook } from '../../Hooks/Context'
import SearchBar from '../searchbar/SearchBar'
import "./news.css"
import Buttons from '../Buttons/Buttons'
const News = () => {

    const { titleChange,loadAllData } = useGlobalHook();

    const Navigate = useNavigate();
    const titleText = {
        text: "Home Page",
        title: "Search in",
        spanTitle: "SNews",
        title2: "App",
        click: () => { Navigate("/") },
    }

    useState(()=>{titleChange("News Page")},[])
    return (
        <>
        
        <section className='news'>
            <Title {...titleText} />
            <SearchBar />

            <Buttons/>

            {
                loadAllData
            }

        </section>
        </>
    )
}

export default News