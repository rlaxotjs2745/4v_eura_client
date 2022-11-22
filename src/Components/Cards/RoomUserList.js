import RoomUser from "./RoomUser";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css"

const React = require("react");
const {useState} = require("react");




const RoomUserList = ({invites, idx, roomInfo}) =>

            <div className="user" id={'slide_' + idx}>
                <ul>

                    {
                        invites.map(inv =>
                            inv.is_host ?
                                <li className={roomInfo.mt_live ? 'user' : 'user is-disabled'}>
                                    <>
                                    <figure><img
                                        src={inv.ui_pic ? inv.ui_pic : require('../../assets/image/image_profile.png')}
                                        alt=""/></figure>
                                    <span className="team__user">
                                        <img src={require('../../assets/image/ic_host.png')} alt=""/>
                                        {inv.uname}
                                        <em>{inv.email}</em>
                                    </span>
                                    {!!inv.is_iam ? <span className="team__badge">나</span> : ''}
                                    </>
                                </li> : null)
                    }
                    {
                        invites.map(inv => <RoomUser inv={inv} roomInfo={roomInfo} />)
                    }
                </ul>
            </div>


export default RoomUserList;