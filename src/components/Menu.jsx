
export default function Menu (props) {
    return (
        <div className="menu" style={{
            height: props.menuIsOpen ? '100%' : '50px',
            borderBottom: props.menuIsOpen ? '' : '2px solid var(--tertiary)',
            transition: 'height 0.5s ease',
        }}>
            <a onClick={props.toggle}>
                <img src="../../public/assets/hamburger-menu.png" alt="menu button"/>
            </a>
            {props.menuIsOpen && <div>
                <h1>Menu</h1>
            </div>}
        </div>
    )
}