import React from "react";
import qnaDb from "../../Hooks/Data";
import List from "../../Component/List/List";
import "./qna.css"
const Qna = () => {
  return (
    <>
    
    <section className="qna-section">
    <h1 className="qna-title">Frequently <span>asked</span> question</h1>
    <p className="para">Below our FAQ, you will find a form to contact us if you do not find answers to your questions</p>
    <div className="qna-wrapper">
      {qnaDb.map((ele, index) => {
        return (<List ques={ele.question} ans={ele.answer} key={index} />);
      })}
    </div>
    </section>
    </>
  );
};

export default Qna;
