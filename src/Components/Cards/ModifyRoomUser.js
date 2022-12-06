import React from "react"

const ModifyRoomUser = ({user, excludeUser, isSearch}) => {



    return (
        <li>
            {
                user.unknownUser ?
                    <div>
                        <figure>
                            <img src={require('../../assets/image/image_profile_unknown.png')} alt=""/>
                        </figure>
                        <span className="team__user">
                            <em>{user}</em>
                                    </span>
                        <div className="btn btn__delete" onClick={() => excludeUser(user, isSearch)}>
                            <img src={require('../../assets/image/ic_cancle-circle_18.png')} alt="삭제"/>
                        </div>
                    </div>
                    :
                    <div>
                        <figure>
                            <img src={user.ui_pic ? user.ui_pic : require('../../assets/image/image_profile.png')} alt=""/>
                        </figure>
                        <span className="team__user">
                                                {user.uname}
                                                <em>{user && user.email  && user.email.length > 19 ? user.email.slice(0,19) + '..' : user.email}</em>
                                            </span>
                        <div className="btn btn__delete" onClick={() => excludeUser(user, isSearch)}>
                            <img src={require('../../assets/image/ic_cancle-circle_18.png')} alt="삭제"/>
                        </div>
                    </div>
            }
        </li>
    )
}

export default ModifyRoomUser;