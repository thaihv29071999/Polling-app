import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callApi } from "../api/callApi";

const NewPoll = ({socket}) => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleOption = (e, index) => {
    const values = [...options];
    values[index] = e.target.value;
    setOptions(values);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await callApi(
      "polling/new-polly",
      "post",
      {
        title,
        options,
      }, 
      localStorage.getItem("token")
    );
    if (result && result.statusCode === 200) {
      socket.emit("new-polly", {pollId: result.data.id} );
      navigate("/");
    }
  };

  const handleAddOptions = () => {
    const newOptions = options.concat("");
    if (newOptions.length > 5) alert("The number of answers is limited");
    else setOptions(newOptions);
  };
  return (
    <>
      <div>
        <h1
          className="text-3xl font-bold mt-9 text-center mb-8"
          data-testid="login-heading"
        >
          Create a new poll
        </h1>
        <div className="flex justify-center ">
          <form onSubmit={handleSubmit} className="w-1/4">
            <div className="w-full">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  value={title}
                  onChange={handleTitle}
                  type="text"
                  name="title"
                  id="title"
                  data-testid="title"
                  className="px-3 py-2 bg-white border w-full"
                  required
                />
              </div>
            </div>
            <div className="mt-6 w-full">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Options
              </label>
              {options.map((option, index) => (
                <div className="mt-1" key={index}>
                  <input
                    value={option}
                    onChange={(e) => handleOption(e, index)}
                    type="text"
                    className="px-3 py-2 bg-white border w-full my-2"
                    required
                  />
                </div>
              ))}
              <button
                className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm w-2/4 text-white text-center rounded-lg"
                onClick={handleAddOptions}
              >
                Add Option
              </button>
            </div>
            <div className="mt-6 text-end">
              <button
                className="bg-red-500 hover:bg-red-700 px-5 py-2.5 text-sm w-1/4 text-white text-center rounded-lg mx-2"
                onClick={() => navigate("/")}
              >
                Close
              </button>
              <button
                type="submit"
                data-testid="submit"
                className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm w-1/4 text-white text-center rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default NewPoll;
