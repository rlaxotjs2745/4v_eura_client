import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css"
const React = require("react");
const {useState} = require("react");



const RoomUser = ({inv, roomInfo}) => {
        return inv.is_host ? null :
            <li className={roomInfo.mt_live ? 'user' : 'user is-disabled'}>
                    <>
                            <figure><img
                                src={inv.ui_pic ? inv.ui_pic : require('../../assets/image/image_profile.png')}
                                alt=""/></figure>
                            <span className="team__user">{inv.uname}<em>{inv.email}</em></span>
                            {!!inv.is_iam ? <span className="team__badge">나</span> : ''}
                    </>
            </li>
}


export default RoomUser;