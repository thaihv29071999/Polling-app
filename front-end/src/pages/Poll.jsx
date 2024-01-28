import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callApi } from "../api/callApi";

const Poll = () => {
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [idSelectedOption, setIdSelectedOption] = useState("");
  const [isVote, setIsVote] = useState(false);

  const { pollId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await callApi(
      "polling/vote",
      "put",
      {
        pollingId: +pollId,
        optionId: +idSelectedOption,
      },
      localStorage.getItem("token")
    );
    if (result && result.statusCode === 200) {
      // socket.emit("new-vote", { pollyId });
      alert("You voted successfully!!");
    }
  };
  const handleOption = (e) => {
    setIdSelectedOption(e.target.value);
  };

  const resultVoting = (currentNumberVote, options) => {
    const totalVote = options.reduce((accumulator, item) => {
      if (Array.isArray(item.optionUsers)) {
        accumulator += item.optionUsers.length;
      }
      return accumulator;
    }, 0);
    return `${
      totalVote ? (currentNumberVote / totalVote).toFixed(2) * 100 : 0
    }%`;
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await callApi(
        "polling/" + pollId,
        "get",
        {},
        localStorage.getItem("token")
      );
      if (result && result.statusCode === 200) {
        if (result.data.user.id === currentUser.id) setIsCurrentUser(true);
        result.data.pollingOptions.forEach((option) => {
          if (
            option.optionUsers
              .map((optionUser) => optionUser.user.id)
              .includes(currentUser.id)
          )
            setIsVote(true);
        });
        setPoll(result.data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1
          className="text-3xl font-bold mt-9 text-center mb-8"
          data-testid="login-heading"
        >
          {poll?.title}
        </h1>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="w-2/4  ">
            <div className="w-full">
              <ul className="grid grid-cols-2  gap-4 ">
                {poll?.pollingOptions?.map((option, index) => (
                  <li
                    key={index}
                    className={
                      "flex justify-start col-span-2 border-inherit border-2 p-4 " +
                      (option.optionUsers
                        .map((optionUser) => optionUser.user.id)
                        .includes(currentUser.id)
                        ? " bg-lime-400 "
                        : "")
                    }
                  >
                    <input
                      value={option.id}
                      onChange={handleOption}
                      type="radio"
                      name="option"
                      id="option"
                      data-testid="option"
                      className=" bg-white border "
                      disabled={isCurrentUser}
                    />
                    <label className="block font-medium text-slate-700 px-2">
                      {option.content}
                    </label>
                    <label>
                      Votes: {option.optionUsers.length}(
                      {resultVoting(
                        option.optionUsers.length,
                        poll?.pollingOptions
                      )}
                      )
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {!isVote && !isCurrentUser && (
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
                  Vote
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
export default Poll;
