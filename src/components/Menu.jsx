
export default function Menu (props) {
    return (
        <div className="menu" style={{
            height: props.menuIsOpen ? '100vh' : '45px',
            borderBottom: props.menuIsOpen ? '' : '2px solid var(--tertiary)',
            transition: 'height 0.5s ease, width 0.5s ease',
            width: props.menuIsOpen ? '150px' : '25px',
            padding: props.menuIsOpen ? '0 2%' : '0 9px',
        }}>
            <a onClick={props.toggle}>
                <img src="../../public/hamburger-menu.png" alt="menu button"/>
            </a>
            {props.menuIsOpen &&
                <div className="menu-items">
                    <h1>Menu</h1>
                        <a className="menu-item" onClick={() => {
                            props.toggleView("profile")
                            props.toggle()
                        }}>
                            My Profile
                        </a>
                        <a className="menu-item" onClick={() => {
                            props.toggleView("tasks")
                            props.toggle()
                        }}>
                            My Tasks
                        </a>
                        <a className="menu-item" onClick={() => {
                            props.toggleView("completed")
                            props.toggle()
                        }}>
                            Completed tasks
                        </a>
                        <a className="menu-item" onClick={() => {
                            props.toggleView("groups")
                            props.toggle()
                        }}>
                            Groups
                        </a>
                </div>
            }
        </div>
    )
}