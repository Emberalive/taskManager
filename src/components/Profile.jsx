import "../profile.css"

import {useState} from "react";
import boyImg from "../../public/boy.png"

export default function Profile(props) {
    const [editProfile, setEditProfile] = useState(false);
    const [newProfile, setNewProfile] = useState({});

    function startEditProfile() {
        setNewProfile(props.user);
        setEditProfile(prevState => !prevState);
    }

    async function endEditProfile() {
        if (!editProfile) {
            props.handleGlobalError("No changes to save.");
            console.log("No NewProfile available to send");
            return;
        }
        try {
            const result = await saveUserDetails(newProfile, props.user.username);

            if (result.success) {
                props.setUser((prevState) => {
                    return {
                        ...prevState,
                        email: newProfile.email,
                        username: newProfile.username,
                        bio: newProfile.bio,
                    };
                })
            }else {
                props.handleGlobalError("Failed to save changes.");
                console.log("Unable to save user details");
            }
        } catch (error) {
            props.handleGlobalError("There was an issue with the server, sorry");
            console.log("Error updating user details" + error.message);
        } finally {
            setEditProfile((prevState) => !prevState);
            setNewProfile({});
        }
    }

    async function saveUserDetails(newUserData, oldUsername) {

        try {
            const response = await fetch(`${props.api}/users`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        newUserData: newUserData,
                        username: oldUsername,
                    })
                })

            if (!response.ok) {
                if (response.status === 400) {
                    console.warn("Validation error: user data was not updated");
                } else {
                    console.error("Unexpected error from server");
                }
                return {success: false};

            }
            const resData = await response.json();
            console.log("Successfully updated the user's data");
            return resData;
        } catch (error) {
            console.error("Error updating user details" + error.message);
            return {success: false};
        }
    }

    return (
        <div className={"profile_container"}>
            <div className="profile">
                <h1>Welcome - {props.user.username}</h1>
                <div className="user-info">
                    <img
                        src={boyImg}
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
                            <div>
                                <p className={"label"}>Email:</p>
                                <p className={"email"}>{props.user.email}</p>
                            </div>
                        }

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
                            <div>
                                <p className={"label"} >Bio:</p>
                                <p className={"bio"}>{props.user.bio}</p>
                            </div>
                        }
                    </div>
                    <button onClick={() => {
                        editProfile ? endEditProfile() : startEditProfile()
                    }}>{editProfile? "Save" : "Edit"}</button>
                    <button onClick={() => {
                        props.toggleView()
                        props.setDarkMode(prev => !prev)
                    }}>{props.isDarkMode ? "Light Mode" : "Dark Mode"}</button>
                </div>
            </div>
        </div>
    );
}
