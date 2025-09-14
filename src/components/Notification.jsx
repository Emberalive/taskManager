export default function Notification (props) {
    return (
        <div className={props.notification === "" ? "notification " : "notification notification__active"}>
            <p>{props.notification}</p>
        </div>
    )
}