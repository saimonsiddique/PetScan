import React from "react";
import "../subcomponent/AnswerText/AnswerText.css";

const AnswerText = () => {
  return (
    <section className="answer-text-container">
      <div className="answer-text">
        <span>
          Answered by <strong>Vet Name</strong>
        </span>
        <p align="justify">
          Cats with kidney disease should be fed a diet that is low in protein.
          This is because the kidneys are responsible for removing waste
          products from the blood. If the kidneys are not working properly, the
          waste products build up in the blood and can cause illness.
        </p>
      </div>
    </section>
  );
};

export default AnswerText;
