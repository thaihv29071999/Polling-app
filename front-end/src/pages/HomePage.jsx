import { useEffect, useState } from "react";
import { callApi } from "../api/callApi";
import CardItem from "../components/CardItem";

const HomePage = ({ socket }) => {
  const [polls, setPoll] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await callApi(
        `polling/list`,
        "post",
        {},
        localStorage.getItem("token")
      );
      if (result) {
        setPoll(result.data.pollings);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    socket.on(`new-polly-create`, (data) => {
      polls.unshift(data);
      const newData = polls.map((e) => e);

      setPoll(newData);
    });
  }, [socket, polls]);

  useEffect(() => {
    socket.on(`update`, (data) => {
      const newData = polls.map((e) => {
        if (e.id === data.id) e = data;
        return e;
      });
      setPoll(newData);
    });
  }, [socket, polls]);

  return (
    <>
      <div className="">
        <ul className="grid grid-cols-6  gap-4">
          {polls.map((poll) => (
            <li key={poll.id} className="col-span-2">
              <CardItem poll={poll} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default HomePage;
