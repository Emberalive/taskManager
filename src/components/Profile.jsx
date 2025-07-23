import { useState } from "react";

export default function Profile(props) {
    const [editProfile, setEditProfile] = useState(false);
    const [newProfile, setNewProfile] = useState({});

    function startEditProfile() {
        setNewProfile(props.user);
        setEditProfile(prevState => !prevState);
    }

    function endEditProfile() {
        props.setUser((prevState) => {
            return {
                ...prevState,
                email: newProfile.email,
                username: newProfile.username,
                bio: newProfile.bio,
            };
        })
        setEditProfile((prevState) => !prevState);
    }

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
                                          defaultValue={props.user.username}
                                          placeholder={"username"}
                                          onChange={(e) => {
                                              setNewProfile((prevState) => {
                                                  return {
                                                      ...prevState,
                                                      username: e.target.value,
                                                  }
                                              });
                                          }}
                                          /> :
                        <h2>{props.user.username}</h2>}

                    {editProfile? <input type={"text"}
                                         name={"email"}
                                         defaultValue={props.user.email}
                                         placeholder={"Email"}
                                         onChange={(e) => {
                                             setNewProfile((prevState) => {
                                                 return {
                                                     ...prevState,
                                                     email: e.target.value,
                                                 }
                                             });
                                         }}
                        /> :
                        <p>Email: {props.user.email}</p>}

                    {editProfile? <textarea name={"bio"}
                                            defaultValue={props.user.bio}
                                            placeholder={"Bio"}
                                            onChange={(e) => {
                                                setNewProfile((prevState) => {
                                                    return {
                                                        ...prevState,
                                                        bio: e.target.value,
                                                    }
                                                });
                                            }}
                        /> :
                        <p>Bio: {props.user.bio}</p>}
                </div>
                <button onClick={() => {
                    editProfile ? endEditProfile() : startEditProfile()
                }}>{editProfile? "Save" : "Edit"}</button>
            </div>
        </div>
    );
}
