import Header from './components/Header.jsx'
import TaskDetails from './components/TaskDetails.jsx'
import Menu from './components/Menu.jsx'
import { useState } from 'react'
import Profile from './components/Profile.jsx'


export default function App () {
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const [profileClicked, setProfileClicked] = useState(true)

    function toggleMenu() {
        setMenuIsOpen(prev => {
            return !prev
        })
    }

    function toggleProfile() {
        setProfileClicked(prev => {
            console.log("profile Clicked")
            return !prev
        })
    }

    function deleteTask (id) {

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
                    <TaskDetails/>
                    <TaskDetails/>
                    <TaskDetails/>
                    <TaskDetails/>
                    <TaskDetails/>
                </div>

            }
            {profileClicked && <Profile />}
        </main>
    </div>
    )
}