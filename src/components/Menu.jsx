
export default function Menu (props) {
    return (
        <div className="menu" style={{
            height: props.menuIsOpen ? '100vh' : '50px',
            borderBottom: props.menuIsOpen ? '' : '2px solid var(--tertiary)',
            transition: 'height 0.5s ease',
        }}>
            <a onClick={props.toggle}>
                <img src="../../public/assets/hamburger-menu.png" alt="menu button"/>
            </a>
            {props.menuIsOpen &&
                <div className="menu-items">
                    <h1>Menu</h1>
                    <a className="menu-item" onClick={props.completed}>
                        Completed tasks
                    </a>
                </div>

            }
        </div>
    )
}