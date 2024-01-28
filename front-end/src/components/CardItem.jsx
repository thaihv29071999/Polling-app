import { Link } from "react-router-dom";
import { formatDate } from "../util/helper";

const CardItem = ({ poll }) => {
  return (
    <Link to={"poll/" + poll.id}>
      <div className="m-3 shadow-md hover:shadow-xl transition bg-white max-w-sm mx-auto  items-center border-2 border-inherit  ">
        <div className="flex justify-center py-4 border-inherit border-b-2">
          <div className=" border-r-2 border-black px-4">
            <div className="text-xl font-medium text-black text-center">
              {poll?.title}
            </div>
            <div className="text-xs italic">{formatDate(poll?.createdAt)}</div>
          </div>
          <div className="px-4 flex items-center">
            <h2>{poll?.user?.fullName}</h2>
          </div>
        </div>
        <div>
          <ul className="grid grid-cols-2  gap-4">
            {poll?.pollingOptions?.map((option) => (
              <li
                key={option.id}
                className="col-span-2 grid grid-cols-2 text-center"
              >
                <span className="col-span-1">{option?.content}</span>
                <span className="col-span-1">{option.optionUsers.length}</span>
              </li>
            ))}
          </ul>
        </div>

        <div></div>
      </div>
    </Link>
  );
};
export default CardItem;
