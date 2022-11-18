import RoomUser from "./RoomUser";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css"

const React = require("react");
const {useState} = require("react");




const RoomUserList = ({invites, idx}) =>

            <div className="user" id={'slide_' + idx}>
                <ul>
                    {
                        invites.map(inv => <RoomUser inv={inv} />)
                    }
                </ul>
            </div>


export default RoomUserList;