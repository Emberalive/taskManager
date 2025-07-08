export default function Data (props) {
    return (
        <div className="data-container">
            <p className="date">{props.date}</p>
            <h3 >Details</h3>
            <p>{props.details}</p>
        </div>
    )
}