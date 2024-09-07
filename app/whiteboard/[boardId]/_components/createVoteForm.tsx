import { useBroadcastEvent } from "@/liveblocks.config";
import { X } from "lucide-react";
import React, { useState } from "react";

interface CreateVoteFormProps {
  onSubmit: (question: string, choices: string[], time: number) => void;
}

const CreateVoteForm: React.FC<CreateVoteFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");
  const [choice, setChoice] = useState("");
  const [time, setTime] = useState<number>(0);

  const [choices, setChoices] = useState<string[]>([]);
  const broadcast = useBroadcastEvent();

  const handleAddChoice = () => {
    if (choice.trim() !== "") {
      setChoices([...choices, choice]);
      setChoice("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (question.trim() === "") return;
    onSubmit(question, choices, time);
    broadcast({ type: "vote", data: { question, choices, time } });
  };

  return (
    <div className="absolute top-24 mb-10 right-2  max-h-screen overflow-x-hidden overflow-y-scroll rounded-md px-1.5  flex items-center  card bg-base-100 shadow-xl">
      <form
        onSubmit={handleSubmit}
        className=" p-4 rounded-md card w-96 bg-base-100 "
      >
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text"> Question?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text"> time?</span>
          </div>
          <input
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            required
          />
        </label>

        <div className="mb-4">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text"> choice?</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
            />
          </label>
          
          <button
            type="button"
            onClick={handleAddChoice}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add Choice
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Choices:</h3>
          <ul>
            {choices.map((c, index) => (
              <li key={index}>
                {" "}
                <div className="w-full flex justify-between card flex-row  shadow-md rounded-md p-2 my-2 items-center">
                  <p>{c}</p>
                  <X
                    className="hover:cursor-pointer"
                    onClick={() => {
                      const newChoices = choices.filter((_, i) => i !== index);
                      setChoices(newChoices);
                    }}
                  />
                </div>{" "}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVoteForm;
