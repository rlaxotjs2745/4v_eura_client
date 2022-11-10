import React from "react"

const AddMeetingUser = ({user, addUser}) => {

    return (
        <li>
            <div>
                <figure>
                    <img src={user.ui_pic ? user.ui_pic : require('../../assets/image/image_profile.png')} alt=""/>
                </figure>
                <span className="team__user">
                    {user.uname}
                    <em>{user.email}</em>
                </span>
                <div className="checkbox type__square">
                    <input type="checkbox" className="checkbox" name="user" onInput={() => addUser(user)}/>
                    <label></label>
                </div>
            </div>
        </li>
    )
}

export default AddMeetingUser;