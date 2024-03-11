import { useEffect, useState } from "react";
import Image from "./Image";
import { useDispatch, useSelector } from "react-redux";
import { onChange, setData } from "../modules/reducer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TextInput({ message, choicePokemon, type }) {
  const [inputTxt, setInputTxt] = useState("");
  const [date, setDate] = useState(new Date());
  // 최소 날짜를 내일로 설정
  const aDayLater = new Date(new Date().setDate(new Date().getDate() + 1));
  const dispatch = useDispatch();
  let state = useSelector((state) => {
    return state.data;
  });
  useEffect(() => {
    setInputTxt("");
  }, [state.name]);

  const handleChoice = () => {
    if (type !== "todo") {
      localStorage.setItem("myPokemon", JSON.stringify(state));
      choicePokemon(false);
    } else if (type == "todo" && date && inputTxt) {
      var currentDate = new Date();
      var targetDate = new Date(date);

      // 날짜만 비교하기 위해 시, 분, 초, 밀리초를 모두 0으로 설정
      currentDate.setHours(0, 0, 0, 0);
      targetDate.setHours(0, 0, 0, 0);
      // 타겟 날짜가 오늘보다 전날이면 true를 반환, 그렇지 않으면 false를 반환
      setInputTxt("");
      let myPet = JSON.parse(localStorage.getItem("myPokemon"));
      myPet.list.push({
        targetDate: targetDate.toISOString(),
        todo: inputTxt,
        check: false,
      });
      localStorage.setItem("myPokemon", JSON.stringify(myPet));
      dispatch(setData(myPet));
    } else {
      alert("날짜와 할일을 모두 적어주세요!");
    }
  };

  const handleChange = (e) => {
    setInputTxt(e.target.value);
    if (type !== "todo") {
      //return dispatch({ type: 'onChange', myName: e.target.value })
      return dispatch(onChange(e.target.value));
    }
  };
  return (
    <div className="txtBox">
      <Image url="./img/textBox.png" text="text" />
      <p>
        <span>{message}</span>
        <input
          type="text"
          value={inputTxt}
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="텍스트를 입력해주세요!"
        />
        {type && (
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            minDate={aDayLater} // 최소 날짜를 내일로 설정
          />
        )}
      </p>
      <button type="button" onClick={() => handleChoice()}>
        click!
      </button>
    </div>
  );
}
