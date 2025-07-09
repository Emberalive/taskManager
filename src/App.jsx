import Header from './components/Header.jsx'
import TaskDetails from './components/TaskDetails.jsx'
import Menu from './components/Menu.jsx'
import { useState, useEffect } from 'react'
import Profile from './components/Profile.jsx'
import CompletedTasks from "./components/CompletedTasks.jsx";


export default function App () {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Task 1',
            date: '01-02-03',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ' +
                'fermentum, enim in facilisis viverra, lorem nisi malesuada leo, sed suscipit ' +
                'justo ipsum at libero. Pellentesque habitant morbi tristique senectus et netus ' +
                'et malesuada fames ac turpis egestas. Fusce eget velit nec nulla malesuada convallis.' +
                ' Vivamus nec nisi nec sapien pulvinar facilisis. Quisque at quam at velit iaculis ' +
                'posuere.'
        },
        {
            id: 2,
            title: 'Task 2',
            date: '01-02-03',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ' +
                'fermentum, enim in facilisis viverra, lorem nisi malesuada leo, sed suscipit ' +
                'justo ipsum at libero. Pellentesque habitant morbi tristique senectus et netus ' +
                'et malesuada fames ac turpis egestas. Fusce eget velit nec nulla malesuada convallis.' +
                ' Vivamus nec nisi nec sapien pulvinar facilisis. Quisque at quam at velit iaculis ' +
                'posuere.'
        },
        {
            id: 3,
            title: 'Task 3',
            date: '01-02-03',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ' +
                'fermentum, enim in facilisis viverra, lorem nisi malesuada leo, sed suscipit ' +
                'justo ipsum at libero. Pellentesque habitant morbi tristique senectus et netus ' +
                'et malesuada fames ac turpis egestas. Fusce eget velit nec nulla malesuada convallis.' +
                ' Vivamus nec nisi nec sapien pulvinar facilisis. Quisque at quam at velit iaculis ' +
                'posuere.'
        }
    ])

    const [completedTasks, setCompletedTasks] = useState([])

    function AddCompletedTasks(id) {
        console.log("adding to completed state " + id)
        let taskToComplete = tasks.find((task) => task.id === id);
        if (!taskToComplete) return;

        setCompletedTasks((prevCompleted) => [...prevCompleted, taskToComplete]);

        setTimeout(() => {
            setTasks(prevTasks => prevTasks.filter((task) => task.id !== id));
        }, (400))
    }

    const [user, setUser] = useState({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        bio: ' Enthusiastic developer who loves building cool stuff!'
    })

    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const [profileClicked, setProfileClicked] = useState(false)

    const [completedClicked, setCompletedClicked] = useState(false)

    function toggleMenu() {
        setMenuIsOpen(prev => {
            return !prev
        })
    }

    function toggleCompletedClicked() {
        setCompletedClicked(prev => {
            console.log("completed Clicked")
            console.log(!prev)
            return !prev
        })
    }

    function deleteTask (id) {
        const updatedTask = tasks.filter(task => task.id !== id)
        setTasks(updatedTask)
    }

    function toggleProfile() {
        setProfileClicked(prev => {
            console.log("profile Clicked")
            console.log(!prev)
            return !prev
        })
    }
    return (
    <div
    style={{
        display: 'grid',
        gridTemplateColumns: menuIsOpen ? '200px 1fr' : '50px 1fr',
        transition: 'grid-template-columns 0.5s ease',
        height: '100hv'
    }}
    >
        <Menu menuIsOpen={menuIsOpen} toggle={() => toggleMenu()} completed={() => toggleCompletedClicked()}/>
        <main>
            <Header profileClicked = {profileClicked} toggle={() => toggleProfile()}/>
            {(!profileClicked && !completedClicked) &&
                (<div>
                    <TaskDetails tasks={tasks} deleteTask={deleteTask} AddCompletedTasks={AddCompletedTasks} completedTasks={completedTasks}/>
                </div>
            )}
            {profileClicked && <Profile user={user}/>}
            {completedClicked && <CompletedTasks tasks={completedTasks} deleteTask={deleteTask}/>}
        </main>
    </div>
    )
}