import { useSelector } from "react-redux";
import { formatDate } from "../util/formatDate";

import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function TextList(props) {
  const [detailBool, setDetailBool] = useState(false);
  const [detail, setDetail] = useState({
    targetDate: "",
    todo: "",
  });
  const state = useSelector((state) => state.data);


  const handleListDetail = (num) => {
    setDetailBool(true);
    setDetail({
      targetDate: state.list[num].targetDate,
      todo: state.list[num].todo,
    });
  };

  return (
    <div className="listBox">
      {!detailBool ? (
        <ul>
          {state.list.map((v, i) => (
            <li onClick={() => handleListDetail(i)}>
              <span>{i + 1}.</span>
              <p className="todoTxt">{v.todo}</p>
              <span className="date">{formatDate(v.targetDate)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="listDetailBox">
          <div>
            <p className="todoDetail">{detail.todo}</p>
            <p className="targetDate">{formatDate(detail.targetDate)}</p>
          </div>
          <div className="btnDiv">
            <button>success</button>
            <button>delete</button>
          </div>

          <p className="backBtn" onClick={() => setDetailBool(false)}>
            <IoMdArrowRoundBack />
          </p>
        </div>
      )}
    </div>
  );
}
