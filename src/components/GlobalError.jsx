export default function GlobalError(props) {
    return (
        <div className="global-error">
            <h3>Error</h3>
            <p>"{props.globalError}"</p>
        </div>
    )
}