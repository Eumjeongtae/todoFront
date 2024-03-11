import { useEffect, useState } from 'react';
import Image from '../components/Image';
import '../style/main/main.css';
import TextInput from '../components/TextInput';

import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../modules/reducer';
import TextList from '../components/TextList';

export default function Todo() {
    const [backImg, setBackImg] = useState(false);

    const dispatch = useDispatch();
    const state = useSelector((state) => state.data);

    useEffect(() => {
        const myPet = localStorage.getItem('myPokemon');
        if (myPet) {
            dispatch(setData(JSON.parse(myPet)));
        }
    }, [dispatch]);

    useEffect(() => {
        let now = new Date();
        state.list.forEach((v) => {
            let date = new Date(v.targetDate);
            if (date > now) {
                setBackImg(true);
            }
        });
    }, [state.list]); // state.list의 변화를 감지하여 실행

    return (
        <>
            <div className="status">
                <div className="pocketImg">
                    {backImg ? <Image url={state.imgBack} /> : <Image url={state.img} />}
                    <p className="name">{state.myName}</p>
                </div>
                <TextInput message="plane :" type="todo" />
            </div>
            <TextList />
        </>
    );
}
