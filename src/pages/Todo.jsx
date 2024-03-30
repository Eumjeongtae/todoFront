import { useEffect, useState } from "react";
import Image from "../components/Image";
import "../style/main/main.css";
import TextInput from "../components/TextInput";

// import { useDispatch, useSelector } from "react-redux";
// import { setData } from "../modules/reducer";
import TextList from "../components/TextList";
import useStateStore from "../store/stateStore";

export default function Todo() {
  const [backImg, setBackImg] = useState(false);

//   const dispatch = useDispatch();
//   const state = useSelector((state) => state.data);
  const { img, imgBack,myName, setData,list } = useStateStore();
    console.log(img, imgBack,myName,list);
  useEffect(() => {
    const myPet = localStorage.getItem("myPokemon");
    if (myPet) {
      setData(JSON.parse(myPet));
    }
  }, []);

  useEffect(() => {
    let now = new Date();
    list && list.forEach((v) => {
      let date = new Date(v.targetDate);
      if (date < now) {
        setBackImg(true);
      }
    });
  }, [list]); // state.list의 변화를 감지하여 실행

  return (
    <>
      <div className="status">
        <div className="pocketImg">
          {backImg ? <Image url={imgBack} /> : <Image url={img} />}
          <p className="name">{myName}</p>
        </div>
        <TextInput message="plan :" type="todo" />
      </div>
      <TextList />
    </>
  );
}
