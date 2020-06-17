import React, {useEffect, useState} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('/repositories').then(response => {
            setRepositories(response.data);
        })
    }, [])

    async function handleAddRepository() {
        const repository = await api.post('repositories', {
            "title": "Desafio Node.js do app",
            "url": "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
            "techs": [
                "Node.js", "React", "React Native"
            ]
        });
        setRepositories([...repositories, repository.data])
    }

    async function handleRemoveRepository(id) {
        await api.delete(`/repositories/${id}`);
        const arr = [...repositories];
        arr.splice(repositories.findIndex(repo => id === repo.id), 1);
        setRepositories(arr);
    }

    return (
        <div>
            <ul data-testid="repository-list">
                {repositories.map(repository => (
                    <li key={repository.id}>
                        {repository.title}

                        <button onClick={() => handleRemoveRepository(repository.id)}>
                            Remover
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
