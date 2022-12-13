import React, {useEffect, useState} from "react";

const AnalysisUserList = ({lecture ,userList, clickUser, isHost}) => {
    return (
        <div className={isHost ? 'result__user' : 'result__user not_host'}>
            <h4 className="result__title">참석자 목록({!lecture || !lecture.mtInviteInfo ? '0' : lecture.mtInviteInfo.user_invite}/{!lecture || !lecture.mtInviteInfo ? '0' : lecture.mtInviteInfo.user_total})</h4>
            <div className="result__watch">
                <ul>
                    {
                        userList.length === 0 ?
                            <span className="file__name">참석자가 없습니다.</span>
                            :
                            userList.map(member => {
                                return (
                                    <li key={member.idx} className={member.join && member.join !== 2 ? 'analyse_join_person' : 'analyse_not_join_person'}>
                                        <button onClick={() => clickUser(member.idx)}>
                                            <div className="me_box">
                                                <figure><img src={member.upic?member.upic: require('../../assets/image/image_profile.png')} alt=""/></figure>
                                                {member.is_iam ? <img className="team__badge" src={require('../../assets/image/team__badge.png')} alt=""/> : null}
                                            </div>
                                            <div className="watch__td">
                                                <span className="flex">{member.uname}{member.is_host ? <img src={require('../../assets/image/ic_host.png')} alt=""/> : null}</span>
                                                <div>{member.uemail}</div>
                                            </div>
                                            {
                                                member.is_iam || member.value !== null && isHost ?
                                                    <div className="watch__percent is-good">{member.join ? Math.round(member.value) + '%' : '-'}</div>
                                                    : ""
                                            }
                                        </button>
                                    </li>
                                )
                            })
                    }
                </ul>
            </div>
        </div>
    )
}

export default AnalysisUserList