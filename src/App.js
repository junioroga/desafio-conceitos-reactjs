import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

import Header from "./components/Header";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((response) => {
      setProjects(response.data);
    });
  }, [projects]);

  async function handleAddProject() {
    const response = await api.post("projects", {
      title: `Novo projeto ${Date.now()}`,
      owner: "Vilson Oga Junior",
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  async function handleRemoveProject(id) {
    await api.delete(`projects/${id}`);
  }

  return (
    <>
      <Header title="Projects" />
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.title}

            <button
              type="button"
              onClick={() => handleRemoveProject(project.id)}
            >
              Remover projeto
            </button>
          </li>
        ))}
      </ul>
      <br />
      <button type="button" onClick={handleAddProject}>
        Adicionar projeto
      </button>
    </>
  );
}
