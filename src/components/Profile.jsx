import { useState } from "react";

export default function Profile(props) {
    const [editProfile, setEditProfile] = useState(false);


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
                    {editProfile ? <input type={"text"}
                                          name={"Username"}
                                          value={props.user.username}
                                          placeholder={"username"}
                                          /> :
                        <h2>{props.user.username}</h2>}

                    {editProfile? <input type={"text"} name={"email"} placeholder={"Email"}/> :
                        <p>Email: {props.user.email}</p>}

                    {editProfile? <textarea name={"bio"} placeholder={"Bio"}/> :
                        <p>Bio: {props.user.bio}</p>}
                </div>
                <button onClick={() => {
                    setEditProfile(prevState => !prevState);
                }}>{editProfile? "Save" : "Edit"}</button>
            </div>
        </div>
    );
}
