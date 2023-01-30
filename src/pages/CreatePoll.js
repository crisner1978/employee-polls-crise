import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { selectAuthUser } from "../features/authSlice";
import { addQuestion } from "../features/questionsSlice";

export default function CreatePoll() {
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  async function postQuestion(data) {
    const { optionOneText, optionTwoText } = data;

    const question = {
      author: user.username,
      optionOne: {
        text: optionOneText,
        votes: [],
      },
      timestamp: Date.now(),
      optionTwo: {
        text: optionTwoText,
        votes: [],
      },
    };
    await dispatch(addQuestion(question)).unwrap();
  }

  async function onSubmit(data) {
    if (!data.optionOneText || !data.optionTwoText) {
      return "Please provide optionOneText, optionTwoText, and author";
    }

    await postQuestion(data);
    reset();
    navigate("/");
  }

  return (
    <div className="mx-auto max-w-2xl px-8 sm:px-16">
      <header className="space-y-2 py-16 text-center">
        <h1 className="text-3xl font-semibold">Would You Rather</h1>
        <p className="text-lg font-medium">Create Your Own Poll</p>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col  space-y-8">
        <Input
          data-testid='option-one'
          {...register("optionOneText", { required: "Required" })}
          errors={errors}
          name="optionOneText"
          label="First Option"
          type="text"
          placeholder="Enter Option One"
        />
        <Input
          data-testid='option-two'
          {...register("optionTwoText", { required: "Required" })}
          errors={errors}
          name="optionTwoText"
          label="Second Option"
          type="text"
          placeholder="Enter Option Two"
        />
        <button data-testid='submit-question' className="formSubmitBtn">Submit Question</button>
      </form>
    </div>
  );
}
