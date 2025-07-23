import Header from './components/Header.jsx'
import TaskDetails from './components/TaskDetails.jsx'
import Menu from './components/Menu.jsx'
import { useState } from 'react'
import Profile from './components/Profile.jsx'
import CompletedTasks from "./components/CompletedTasks.jsx";
import Login from './components/Login.jsx'

export default function App () {
    const [tasks, setTasks] = useState([])

    const [loggedIn, setLogin] = useState(false)

    const [completedTasks, setCompletedTasks] = useState([])

    function AddCompletedTasks(id) {
        let taskToComplete = tasks.find((task) => task.id === id);
        if (!taskToComplete) return;

        setCompletedTasks((prevCompleted) => [...prevCompleted, taskToComplete]);

        setTimeout(() => {
            setTasks(prevTasks => prevTasks.filter((task) => task.id !== id));
        }, (400))
    }

    const [user, setUser] = useState({})

    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const [activeView, setActiveView] = useState('tasks'); // 'tasks', 'completed', or 'profile'

    function toggleMenu() {
        setMenuIsOpen(prev => {
            return !prev
        })
    }

    function toggleCompletedClicked() {
        setActiveView('completed');
    }

    function toggleTaksClicked() {
        setActiveView('tasks');
    }

    function deleteTask (id) {
        const updatedTask = tasks.filter(task => task.id !== id)
        setTasks(updatedTask)
    }

    function toggleProfile() {
        setActiveView('profile');
    }
    return (
    <>
        {!loggedIn &&<Login setLoggedIn={setLogin}
                            setUser={setUser}
                            user={user}
                            setTasks={setTasks}
                            setCompletedTasks={setCompletedTasks}
        />}

        {loggedIn && <div
        style={{
            display: 'grid',
            gridTemplateColumns: menuIsOpen ? '200px 1fr' : '50px 1fr',
            transition: 'grid-template-columns 0.5s ease',
            height: '100hv'
        }}
        >
            <Menu menuIsOpen={menuIsOpen} toggle={() => toggleMenu()}
                  completed={() => toggleCompletedClicked()}
                  toggleTasks={toggleTaksClicked}
                  toggleProfile={() => toggleProfile()}
            />
            <main>
                <Header activeView={activeView} />

                {!tasks && <p>There are no tasks to be found, please create some so that you can see them</p>}

                {activeView === 'tasks' &&<div>
                    <TaskDetails tasks={tasks}
                                 deleteTask={deleteTask}
                                 AddCompletedTasks={AddCompletedTasks}
                                 completedTasks={completedTasks}
                                 setTasks={setTasks}
                                 user={user}
                    />
                </div>}
                {activeView === 'profile' && <Profile user={user}/>}
                {activeView === 'completed' && <CompletedTasks tasks={completedTasks} deleteTask={deleteTask}/>}
            </main>
        </div>}
    </>
    )
}