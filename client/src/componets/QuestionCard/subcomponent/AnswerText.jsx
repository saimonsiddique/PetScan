import { useContext } from "react";
import "../subcomponent/AnswerText/AnswerText.css";

const AnswerText = (props) => {
  const { answerText } = props;
  return (
    <section className="answer-text-container">
      <div className="answer-text">
        <span>
          <h4>
            Answered by <strong>{answerText.vetName}</strong>
          </h4>
        </span>
        <p align="justify">{answerText.answer}</p>
      </div>
    </section>
  );
};

export default AnswerText;
