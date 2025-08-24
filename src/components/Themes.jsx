export default function Themes (props){

    const themeList = props.themes.map(theme => {
        return (
            <div style={{maxWidth: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column'}}>
                <div key={theme.name} className={"theme-container"}>
                    <div className={"theme"} style={{
                        backgroundColor: theme.colour,

                    }}>

                    </div>
                </div>
                <p style={{
                    fontSize: "12px",
                    textAlign: "center",
                    width: "50px"
                }}>{theme.name}</p>
            </div>
    )
    })

    return (
            <div className="themes-container">
                {themeList}
            </div>
    )
}