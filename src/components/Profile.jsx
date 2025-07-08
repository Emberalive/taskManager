export default function Profile() {
    return (
        <div className="profile">
            <h1>Welcome - User Name</h1>
            <div className="user-info">
                <img
                    src="../../public/assets/boy.png"
                    alt="User Avatar"
                    className="avatar"
                />
                <div className="details">
                    <h2>User Name</h2>
                    <p>Email: user@example.com</p>
                    <p>Bio: Enthusiastic developer who loves building cool stuff!</p>
                </div>
            </div>
        </div>
    );
}
