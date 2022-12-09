import "./styles.scss";
import { digimon } from "../../services/api";
import Select from "react-select";
import { FormEvent, useEffect, useState, useContext } from "react";
import { Context } from "../../Context/CheckButton";
import { useNavigate } from "react-router-dom";
import "animate.css";

interface Digimons {
    name: string;
    level: string;
}

export function Home() {
    const [digimons, setDigimons] = useState<Digimons[]>([]);
    const [filterName, setFilterName] = useState<String>('');
    const [filterLevel, setFilterLevel] = useState<String>('');
    const [checkName, setCheckName] = useState(false);
    const [checkLevel, setCheckLevel] = useState(false);
    const [digimonsLevelsList, setDigimonsLevelsList] = useState([]);

    const navigate = useNavigate();
    const digimonsLevels: any = []
    const { setBoolean } = useContext(Context);

    let setMessageName = false
    let setMessageLevel = false

    const optionsDigimonsNames = digimons.map(digimon => {
        return {
            value: digimon.name,
            label: digimon.name,
        }
    })

    let digimonsLevelList: any;

    async function handleGetDigimonsNames() {
        const { data } = await digimon.get('/digimon');
        setDigimons(data);
    }

    async function handleGetDigimonsLevels() {
        const { data } = await digimon.get('/digimon');
        setDigimons(data);
        const setDigimon = new Set();
        data.filter((item: any) => {
            const duplicatedDigimons = setDigimon.has(item.level)
            setDigimon.add(item.level)
            return !duplicatedDigimons
        })

        digimonsLevels.push(Array.from(setDigimon))

        digimonsLevelList = digimonsLevels[0].map((level: any) => {
            return {
                value: level,
                label: level
            }
        })
        setDigimonsLevelsList(digimonsLevelList)
    }

    async function handleDigimons(event: FormEvent) {
        event.preventDefault();

        let checkButton;

        if (filterName == '') {
            setMessageName = true
            setCheckName(true)
        } else {
            setMessageName = false;
            setCheckName(false)
        }

        if (filterLevel == '') {
            setMessageLevel = true
            setCheckLevel(true)
        } else {
            setMessageLevel = false
            setCheckLevel(false)
        }


        if (setMessageName == false && setMessageLevel == false) {
            const data = { input: true }
            const checked = await setBoolean(data);
            checkButton = checked;
        }

        if (checkButton) {
            localStorage.setItem('Name', JSON.stringify(filterName));
            localStorage.setItem('Level', JSON.stringify(filterLevel));
            navigate("/digimons", { replace: true });
        }
    }

    useEffect(() => {
        handleGetDigimonsNames();
        handleGetDigimonsLevels();
    }, [])

    return (
        <div className='container-home'>
            <form onSubmit={handleDigimons}>
                <div className="content-form">
                    <div className="content-digimon">
                        <h2 className='name'>DIGIMONS</h2>

                        <label>Nome {checkName ? <span id='warning'>Esse campo é obrigatório!</span> : ''}</label>
                        <Select
                            options={optionsDigimonsNames}
                            onChange={(item: any) => setFilterName(item.value)}
                            placeholder="Selecione um nome"
                            required
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 5,
                                controlHeight: 50,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'lightblue',
                                    primary: 'orange',
                                },
                            })}
                        />

                        <label>Level {checkLevel ? <span id='warning'>Esse campo é obrigatório!</span> : ''}</label>
                        <Select
                            options={digimonsLevelsList}
                            onChange={(item: any) => setFilterLevel(item.value)}
                            placeholder="Selecione um level"
                            required
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 5,
                                controlHeight: 50,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'lightblue',
                                    primary: 'orange',
                                },
                            })}
                        />

                        <button>
                            <h1>Encontrar Digimon</h1>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}