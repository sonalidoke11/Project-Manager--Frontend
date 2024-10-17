import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage";
import "./App.css";
import NavBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectDetails from "./pages/ProjectDetails";

function App() {
  const [projects, setProjects] = useState(null);

  // fetch all project when component first render
  useEffect(() => {
    // fetch all projects
    const fetchProjects = async () => {
      const res = await fetch("http://localhost:4002/api/projects/");
      const projectsData = await res.json();
      //console.log(projectsData);
      setProjects(projectsData.projects);
    };

    fetchProjects();
  }, []);

  return (
    <>
      <h1>Project Manager</h1>
      <NavBar/>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/projects"
          element={
            <ProjectsPage projects={projects} setProjects={setProjects} />
          }
        />
        <Route
          path="/projects/:id"
          element={
            <ProjectDetails projects={projects} setProjects={setProjects}/>
          }
        />
      </Routes>
    </>
  );
}

export default App;