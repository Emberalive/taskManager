import {useEffect, useRef, useState} from 'react'

import Groups from './components/Groups.jsx'
import Header from './components/Header.jsx'
import TaskDetails from './components/TaskDetails.jsx'
import Profile from './components/Profile.jsx'
import Login from './components/Login.jsx'
import AddGroupForm from "./components/AddGroup-form.jsx";
import GlobalError from "./components/GlobalError.jsx";
import AboutUs from "./components/AboutUs.jsx";

export default function App () {

    const api_ip = "https://sparkr-api.emberalive.com";

    const [viewPort, setViewPort] = useState(window.innerWidth)

    let windowWidth = window.innerWidth

    useEffect(() => {
        const handleResize = () => {
            setViewPort(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [windowWidth])

    const [isDarkMode, setDarkMode] = useState(false);

    function toggleView(){
        document.documentElement.classList.toggle('dark-mode');
    }

    useEffect(() => {
        const onPageReload = () => {
            //use localStorage when you have researched it, to load local storage back into the
            //app when a user reloads the app.

            //this will mean restructuring the fetch functions i the Login component
            console.log("Page has been reloaded")
        }

        window.addEventListener("beforeunload", onPageReload);

        return () => {
            window.removeEventListener("beforeunload", onPageReload);
        };
    }, []);

    const [tasks, setTasks] = useState([])

    const [loggedIn, setLogin] = useState(false)

    const [completedTasks, setCompletedTasks] = useState([])

    const [globalError, setGlobalError] = useState("")

    const [taskError, setTaskError] = useState({})

    function AddCompletedTasks(id) {
        let taskToComplete = tasks.find((task) => task.id === id);

        if (!taskToComplete) return;

        setCompletedTasks((prevCompleted) => [...prevCompleted, taskToComplete]);

        setTimeout(() => {
            setTasks(prevTasks => prevTasks.filter((task) => task.id !== id));
        }, 400)
    }

    const [groups, setGroups] = useState([])

    const [groupClicked, setGroupClicked] = useState("");


    // Update each group with tasks that belong to it whenever tasks change
    useEffect(() => {
        setGroups((prevGroups) => {
            return prevGroups.map((group) => {
                return {
                    name: group.name,
                    tasks: tasks.filter((task) => task.groups === group.name),
                }
            })
        })
    }, [loggedIn, tasks, groupClicked])

    const taskErrorRef = useRef(null);

    function handleVisualError (error, taskId) {
        console.log("setting the error message in state")
        setTaskError(prevState => ({
            ...prevState,
            [taskId]: error
        }));
        // Find the specific task's error element by ID
        const errorElement = document.getElementById(`task-error-${taskId}`);
        if (errorElement) {
            console.log("making the error message visible")
            errorElement.classList.add('task-error__show');
            setTimeout(() => {
                errorElement.classList.remove('task-error__show');
                setTaskError(prevState => {
                    const newErrors = {...prevState};
                    delete newErrors[taskId];
                    return newErrors;
                })
            }, 2000)
        }
    }

    const groupsRef = useRef(null);

    const newGroup = useRef(null);

    const [user, setUser] = useState({})

    const [activeView, setActiveView] = useState('login'); // 'tasks', 'completed', or 'profile'

    const [addingGroup, setAddingGroup] = useState(false);

    const [groupDelete, setGroupDelete] = useState({});

    function toggleActiveView (view) {
        setActiveView(view)
    }

    function deleteTask (id) {
        const updatedTask = tasks.filter(task => task.id !== id)
        setTasks(updatedTask)
    }

    function handleGlobalError (errorMessage) {
        setGlobalError(errorMessage)
        setTimeout(() => {
            setGlobalError("")
        }, 2000)
    }

    useEffect(() => {
        loggedIn ? setActiveView('tasks') : 'login'
    }, [loggedIn])

    return (
    <>
        {globalError !== "" && <GlobalError globalError={globalError} />}

            <main>
                <Header activeView={activeView}
                        setGroupDelete={setGroupDelete}
                        handleVisualError={handleVisualError}
                        user={user}
                        setGroupClicked={setGroupClicked}
                        groups={groups}
                        handleGlobalError={handleGlobalError}
                        api={api_ip}
                        toggleView={toggleActiveView}
                        loggedIn={loggedIn}
                        viewPort={viewPort}
                />
                {globalError !== "" && <GlobalError globalError={globalError} />}

                {!loggedIn && (activeView === "login") && <Login setLoggedIn={setLogin}
                                    setUser={setUser}
                                    user={user}
                                    setTasks={setTasks}
                                    setCompletedTasks={setCompletedTasks}
                                    setGroups={setGroups}
                                    handleGlobalError={handleGlobalError}
                                    api={api_ip}
                                    setActiveView={setActiveView}
                />}

                {!tasks && <p>There are no tasks to be found, please create some so that you can see them</p>}

                {activeView === 'aboutUs' && <AboutUs
                                                viewPort={viewPort}
                                                setActiveView={setActiveView}
                                            />}

                {loggedIn && <>

                {activeView === 'tasks' &&
                    <TaskDetails tasks={tasks}
                                 deleteTask={deleteTask}
                                 AddCompletedTasks={AddCompletedTasks}
                                 completedTasks={completedTasks}
                                 setTasks={setTasks}
                                 setCompletedTasks={setCompletedTasks}
                                 user={user}
                                 taskErrorRef={taskErrorRef}
                                 handleVisualError={handleVisualError}
                                 taskError={taskError}
                                 handleGlobalError={handleGlobalError}
                                 api={api_ip}
                                 activeView={activeView}
                                 isDarkMode={isDarkMode}
                                 viewPort={viewPort}
                    />}
                {activeView === 'profile' && <Profile user={user}
                                                      setUser={setUser}
                                                      handleGlobalError={handleGlobalError}
                                                      toggleView={toggleView}
                                                      isDarkMode={isDarkMode}
                                                      setDarkMode={setDarkMode}
                                                      api={api_ip}
                />}
                {activeView === 'completed' && <TaskDetails tasks={completedTasks}
                                                            deleteTask={deleteTask}
                                                            AddCompletedTasks={AddCompletedTasks}
                                                            completedTasks={completedTasks}
                                                            setTasks={setTasks}
                                                            setCompletedTasks={setCompletedTasks}
                                                            user={user}
                                                            taskErrorRef={taskErrorRef}
                                                            handleVisualError={handleVisualError}
                                                            taskError={taskError}
                                                            handleGlobalError={handleGlobalError}
                                                            api={api_ip}
                                                            activeView={activeView}
                                                            isDarkMode={isDarkMode}
                                                            viewPort={viewPort}
                />}
                {activeView === 'groups' && <Groups activeView={activeView}
                                                    groups={groups}
                                                    groupsRef={groupsRef}
                                                    newGroup={newGroup}
                                                    deleteTask={deleteTask}
                                                    AddCompletedTasks={AddCompletedTasks}
                                                    completedTasks={completedTasks}
                                                    setCompletedTasks={setCompletedTasks}
                                                    user={user}
                                                    setTasks={setTasks}
                                                    groupClicked={groupClicked}
                                                    setGroupClicked={setGroupClicked}
                                                    taskErrorRef={taskErrorRef}
                                                    handleVisualError={handleVisualError}
                                                    taskError={taskError}
                                                    handleGlobalError={handleGlobalError}
                                                    api={api_ip}
                                                    isDarkMode={isDarkMode}
                                                    setAddingGroup={setAddingGroup}
                                                    viewPort={viewPort}
                                                    setGroups={setGroups}

                />}
                {addingGroup && activeView === "groups" && <AddGroupForm setGroups={setGroups}
                                                                         setAddingGroup={setAddingGroup}
                                                                         groupsRef={groupsRef}
                                                                         newGroup={newGroup}
                                                                         user={user}
                                                                         setAddingGrouop={setAddingGroup}
                                                                         handleGlobalError={handleGlobalError}
                                                                         api={api_ip}
                />}
                </>}
            </main>
    </>
    )
}