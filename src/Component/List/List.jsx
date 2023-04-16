import React, { useState } from 'react'
import {IoIosArrowDown,IoIosArrowUp} from "react-icons/io";
import "./list.css"
const List = ({ques,ans}) => {

  const [showAns, setShowAns] = useState(false);
  return (
    <li className='qna'>
        <div className="ques" onClick={()=>setShowAns(!showAns)}>
            <p>{ques}</p>
            <span> {showAns? <IoIosArrowUp/> : <IoIosArrowDown/>} </span>
        </div>
        {showAns? <div className="ans">
            <p>{ans}</p>
        </div>:""}
        
    </li>
  )
}

export default List