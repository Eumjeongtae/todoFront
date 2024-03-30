// import { useSelector } from "react-redux";
import { formatDate } from "../util/formatDate";

import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import useStateStore from "../store/stateStore";

export default function TextList(props) {
  const [detailBool, setDetailBool] = useState(false);
  const [detail, setDetail] = useState({
    num: 0,
    targetDate: "",
    todo: "",
  });
  // const state = useSelector((state) => state.data);
  const { list, setData } = useStateStore();

  const handleListDetail = (num) => {
    setDetailBool(true);
    setDetail({
      num,
      targetDate: list[num].targetDate,
      todo: list[num].todo,
    });
  };

  const handleDelete = () => {
    let myPet = localStorage.getItem("myPokemon");
    myPet = JSON.parse(myPet);
    myPet.list = myPet.list.filter((v, i) => i !== detail.num);
    localStorage.setItem("myPokemon", JSON.stringify(myPet));
    setData(myPet);
    setDetailBool(false)
  };

  return (
    <div className="listBox">
      {!detailBool ? (
        <ul>
          {list &&
            list.map((v, i) => (
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
            <button onClick={() => handleDelete()}>success</button>
            <button onClick={() => handleDelete()}>delete</button>
          </div>

          <p className="backBtn" onClick={() => setDetailBool(false)}>
            <IoMdArrowRoundBack />
          </p>
        </div>
      )}
    </div>
  );
}
