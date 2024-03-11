import axios from "axios";
import { useEffect, useState } from "react";
import Image from "../components/Image";
import '../style/main/main.css';
import Text from './../components/Text';
import TextInput from './../components/TextInput';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { select } from "../modules/reducer";

export default function Home() {
    // 포켓몬 ID 변경: 피츄(172), 파이리(4), 미뇽(147)
    const pokemonIds = [172, 4, 147];
    const [data, setData] = useState(new Set([])); // Set을 사용하여 중복 방지
    const [inputName, setInputName] = useState(false);
    const [message, setMessage] = useState('원하시는 포켓몬을 선택해 주세요..!')
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                for (const pokemonId of pokemonIds) {
                    let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
                    const newData = {
                        name: pokemon.data.name,
                        img: pokemon.data.sprites.front_default,
                        imgBack: pokemon.data.sprites.back_default
                    };
                    setData((prevData) => {
                        const isAlreadyAdded = Array.from(prevData).some(
                            (existingData) => existingData.name === newData.name
                        );

                        return isAlreadyAdded ? prevData : new Set([...prevData, newData]);
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);
    
    const dispatch = useDispatch();
    const handleClick = (pokemon) => {
        let { img, imgBack, name } = pokemon
        console.log(img, imgBack, name);
        setInputName(true)
        dispatch(select({img,imgBack,name} ))
    }
    const choicePokemon = (e) => {
        setInputName(e)
        let myPet = localStorage.getItem('myPokemon')
        myPet = JSON.parse(myPet)
        setMessage(`${myPet.myName} 넌 내꺼야!!`)

        setTimeout(() => {
            navigate('/toDo')
        }, 2000);
    }

    return (
        <div className="choiceContainer">
            <ul className="pockectList">
                {Array.from(data).map((pokemon, index) => (
                    <li key={index} onClick={() => handleClick(pokemon)} className="pocketImg">
                        <Image key={index} url={pokemon.img} />
                    </li>
                ))}
            </ul>
            {inputName ? <TextInput choicePokemon={choicePokemon} message='이름은 : ' /> : <Text message={message} />}


        </div>
    );
}
