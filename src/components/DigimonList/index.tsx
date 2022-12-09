import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { digimon } from "../../services/api";
import "./styles.scss";
import "animate.css";

interface Digimons {
    name: string;
    level: string;
    img: string;
}

export function DigimonList() {
    const selectedName = JSON.parse(localStorage.getItem('Name') || '');
    const selectedLevel = JSON.parse(localStorage.getItem('Level') || '');

    const [digimonName, setDigimonName] = useState<Digimons[]>([]);
    const [digimonLevel, setDigimonLevel] = useState<Digimons[]>([]);
    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    function handleBackPage() {
        navigate("/");
    }

    async function handleDigimonName() {
        const { data } = await digimon.get('/digimon/name/' + selectedName);
        setDigimonName(data);
    }

    async function handleDigimonLevel() {
        const { data } = await digimon.get('/digimon/level/' + selectedLevel);
        setDigimonLevel(data);
    }

    useEffect(() => {
        handleDigimonName();
        handleDigimonLevel();
    }, []);


    return (
        <div className="container-digimon">
            <input
                type="text"
                placeholder="Pesquise por um Digimon"
                onChange={(event: any) => setSearch(event.target.value)}
                value={search}
            />

            <div className="content-digimon-form-level">
                <div className="content-digimon-list">
                    <h2 className="title">Level Selecionado</h2>
                    {
                        digimonLevel.filter(digimon => {
                            return !search.trim() || digimon.name.toLowerCase().includes(search.toLowerCase());
                        })
                            .map(digimon => {
                                return (
                                    <div className="digimon-card-level" key={digimon.name}>
                                        <img src={digimon.img} alt="" />
                                        <h1>Nome: {digimon.name}</h1>
                                        <span>Level: {digimon.level}</span>
                                    </div>
                                );
                            })
                    }
                </div>
            </div>

            <div className="content-digimon-form">
                <div className="content-digimon-list">
                    <h2 className="title">Digimon Selecionado</h2>
                    {
                        digimonName.map(digimon => {
                            return (
                                <div className="digimon-card" key={digimon.name}>
                                    <img src={digimon.img} alt="" />
                                    <h1>Nome: {digimon.name}</h1>
                                    <span>Level: {digimon.level}</span>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <button className="voltar" onClick={handleBackPage}>
                <h1>Voltar</h1>
            </button>
        </div>
    );
}
