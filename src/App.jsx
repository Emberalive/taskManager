import {useEffect, useRef, useState} from 'react'


import Groups from './components/Groups.jsx'
import Header from './components/Header.jsx'
import TaskDetails from './components/TaskDetails.jsx'
import Menu from './components/Menu.jsx'
import Profile from './components/Profile.jsx'
import CompletedTasks from "./components/CompletedTasks.jsx";
import Login from './components/Login.jsx'
import AddGroupForm from "./components/AddGroup-form.jsx";
import GlobalError from "./components/GlobalError.jsx";
import AboutUs from "./components/AboutUs.jsx";

export default function App () {

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
        }, (400))
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

    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const [activeView, setActiveView] = useState('login'); // 'tasks', 'completed', or 'profile'

    const [addingGroup, setAddingGroup] = useState(false);

    const [groupDelete, setGroupDelete] = useState({});

    function toggleActiveView (view) {
        setActiveView(view)
    }

    function toggleMenu() {
        setMenuIsOpen(prev => {
            return !prev
        })
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

        <div
        style={
            loggedIn ? {
                    display: 'grid',
                    gridTemplateColumns: menuIsOpen ? '200px 1fr' : '50px 1fr',
                    transition: 'grid-template-columns 0.5s ease',
                } :
                    null
        }
        >
            {loggedIn && <Menu menuIsOpen={menuIsOpen} toggle={() => toggleMenu()}
                   toggleView={toggleActiveView}
                               loggedIn={loggedIn}
            />}
            <main>
                <Header activeView={activeView}
                        setGroups={setGroups}
                        setAddingGroup={setAddingGroup}
                        groupClicked={groupClicked}
                        setGroupDelete={setGroupDelete}
                        handleVisualError={handleVisualError}
                        user={user}
                        setGroupClicked={setGroupClicked}
                        groups={groups}
                        handleGlobalError={handleGlobalError}
                />
                {globalError !== "" && <GlobalError globalError={globalError} />}

                {!loggedIn && (activeView === "login") && <Login setLoggedIn={setLogin}
                                    setUser={setUser}
                                    user={user}
                                    setTasks={setTasks}
                                    setCompletedTasks={setCompletedTasks}
                                    setGroups={setGroups}
                                    handleGlobalError={handleGlobalError}
                />}

                {!tasks && <p>There are no tasks to be found, please create some so that you can see them</p>}

                {activeView === 'aboutUs' && <AboutUs />}

                {loggedIn && <>

                {activeView === 'tasks' &&
                    <TaskDetails tasks={tasks}
                                 deleteTask={deleteTask}
                                 AddCompletedTasks={AddCompletedTasks}
                                 completedTasks={completedTasks}
                                 setTasks={setTasks}
                                 user={user}
                                 taskErrorRef={taskErrorRef}
                                 handleVisualError={handleVisualError}
                                 taskError={taskError}
                                 handleGlobalError={handleGlobalError}
                    />}
                {activeView === 'profile' && <Profile user={user} setUser={setUser} handleGlobalError={handleGlobalError} />}
                {activeView === 'completed' && <CompletedTasks tasks={completedTasks} deleteTask={deleteTask}/>}
                {activeView === 'groups' && <Groups activeView={activeView}
                                                    groups={groups}
                                                    groupsRef={groupsRef}
                                                    newGroup={newGroup}
                                                    deleteTask={deleteTask}
                                                    AddCompletedTasks={AddCompletedTasks}
                                                    completedTasks={completedTasks}
                                                    user={user}
                                                    setTasks={setTasks}
                                                    groupClicked={groupClicked}
                                                    setGroupClicked={setGroupClicked}
                                                    taskErrorRef={taskErrorRef}
                                                    handleVisualError={handleVisualError}
                                                    taskError={taskError}
                                                    handleGlobalError={handleGlobalError}
                />}
                {addingGroup && activeView === "groups" && <AddGroupForm setGroups={setGroups}
                                                                         setAddingGroup={setAddingGroup}
                                                                         groupsRef={groupsRef}
                                                                         newGroup={newGroup}
                                                                         user={user}
                                                                         setAddingGrouop={setAddingGroup}
                                                                         handleGlobalError={handleGlobalError}
                />}
                </>}
            </main>
        </div>
    </>
    )
}