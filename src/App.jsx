import Header from './components/Header.jsx'
import TaskDetails from './components/TaskDetails.jsx'
import Menu from './components/Menu.jsx'
import { useState } from 'react'
import Profile from './components/Profile.jsx'


export default function App () {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'meeting with client for a new job',
            date: '01-02-03',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ' +
                'fermentum, enim in facilisis viverra, lorem nisi malesuada leo, sed suscipit ' +
                'justo ipsum at libero. Pellentesque habitant morbi tristique senectus et netus ' +
                'et malesuada fames ac turpis egestas. Fusce eget velit nec nulla malesuada convallis.' +
                ' Vivamus nec nisi nec sapien pulvinar facilisis. Quisque at quam at velit iaculis ' +
                'posuere.'
        }
    ])

    const [user, setUser] = useState({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        bio: ' Enthusiastic developer who loves building cool stuff!'
    })

    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const [profileClicked, setProfileClicked] = useState(true)

    function toggleMenu() {
        setMenuIsOpen(prev => {
            return !prev
        })
    }

    function deleteTask(id) {
        const updatedTask = tasks.filter(task => task.id !== id)
        setTasks(updatedTask)
    }

    function toggleProfile() {
        setProfileClicked(prev => {
            console.log("profile Clicked")
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
        <Menu menuIsOpen={menuIsOpen} toggle={() => toggleMenu()} />
        <main>
            <Header profileClicked = {profileClicked} toggle={() => toggleProfile()}/>
            {!profileClicked &&
                <div>
                    <TaskDetails tasks={tasks} />
                </div>

            }
            {profileClicked && <Profile user={user} deleteTask={() => deleteTask()} />}
        </main>
    </div>
    )
}