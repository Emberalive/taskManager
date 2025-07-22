export default function Profile(props) {
    return (
        <div className="profile">
            <h1>Welcome - {props.user.username}</h1>
            <div className="user-info">
                <img
                    src="../../public/assets/boy.png"
                    alt="User Avatar"
                    className="avatar"
                />
                <div className="details">
                    <h2>{props.user.username}</h2>
                    <p>Email: {props.user.email}</p>
                    <p>Bio: {props.user.bio}</p>
                </div>
            </div>
        </div>
    );
}
