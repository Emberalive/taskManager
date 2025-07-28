import {useEffect, useRef, useState} from 'react'


import Groups from './components/Groups.jsx'
import Header from './components/Header.jsx'
import TaskDetails from './components/TaskDetails.jsx'
import Menu from './components/Menu.jsx'
import Profile from './components/Profile.jsx'
import CompletedTasks from "./components/CompletedTasks.jsx";
import Login from './components/Login.jsx'
import AddGroupForm from "./components/addGroup-form.jsx";

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

    const [groups, setGroups] = useState([])

    useEffect(() => {
        const groupss = ['Hobbies', "Work", "Uni", "Home"]
        setGroups(() => {
            return groupss.map((group) => ({
                name: group,
                tasks: tasks.filter((task) => task.groups === group)  // See note below
            }));
        });
        setTimeout(() => {
            console.log(groups)
        }, 100)
    }, [loggedIn, tasks])


    const groupsRef = useRef(null);
    const newGroup = useRef(null);


    const [user, setUser] = useState({})

    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const [activeView, setActiveView] = useState('tasks'); // 'tasks', 'completed', or 'profile'

    const [addingGroup, setAddingGroup] = useState(false);

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
                  toggleView={toggleActiveView}
            />
            <main>
                <Header activeView={activeView} setGroups={setGroups} setAddingGroup={setAddingGroup} />

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
                {activeView === 'profile' && <Profile user={user} setUser={setUser} />}
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

                />}
                {addingGroup && activeView === "groups" && <AddGroupForm setGroups={setGroups}
                                                                         setAddingGroup={setAddingGroup}
                                                                         groupsRef={groupsRef}
                                                                         newGroup={newGroup}
                />}
            </main>
        </div>}
    </>
    )
}