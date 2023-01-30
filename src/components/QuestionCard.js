import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectQuestionById } from "../features/questionsSlice";
import formatDate from "../lib/formatDate";

const QuestionCard = ({ questionId }) => {
  const question = useSelector((state) =>
    selectQuestionById(state, questionId)
  );

  return (
    <Link to={`/questions/${question.id}`}>
      <div className="group cursor-pointer border-2 border-gray-200 p-4 rounded-[4px] flex flex-col space-y-2 hover:border-gray-400 hover:bg-gray-50/70 transition-all duration-150 ease-out">
        <header className="text-center mb-2">
          <h1 className="text-sm font-semibold tracking-wider">
            {question.author}
          </h1>
          <p className="text-gray-400 text-sm">
            {formatDate(question.timestamp)}
          </p>
        </header>
        <button className="border-green-400 border-2 rounded-[4px] py-1 text-sm font-semibold group-hover:bg-green-500 group-hover:text-white transtion-all duration-150 ease-out">
          Show
        </button>
      </div>
    </Link>
  );
};

export default QuestionCard;
