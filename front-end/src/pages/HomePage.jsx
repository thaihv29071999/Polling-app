import { useEffect, useState } from "react";
import { callApi } from "../api/callApi";
import CardItem from "../components/CardItem";

const HomePage = () => {
  const [polls, setPoll] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await callApi(
        `polling/list`,
        "post",
        { page: 1, pageSize: 10 },
        localStorage.getItem("token")
      );
      if (result) {
        setPoll(result.data.pollings);
      }
    };

    fetchData();
  }, []);
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
