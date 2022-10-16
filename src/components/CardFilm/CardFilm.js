import React from 'react'
import './CardFilm.css'
import { PlayCircleOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { OPEN_TRAILER_POPUP } from '../../redux/types/CarouselTypes';

export default function CardFilm(props) {

    const { item } = props;

    const dispatch = useDispatch();

    return (
        <div>
            <div className="flip-card mt-5">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <div style={{ backgroundImage: `url(${item.hinhAnh}), url(https://picsum.photos/1000/350)`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                            <img src={item.hinhAnh} alt={item.maPhim} style={{ width: "100%", height: "300px", opacity: "0" }} />
                        </div>
                    </div>
                    <div className="flip-card-back">
                        <div style={{ backgroundImage: `url(${item.hinhAnh}), url(https://picsum.photos/1000/350)`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", position: "relative" }}>
                            <img src={item.hinhAnh} alt={item.maPhim} style={{ width: "100%", height: "300px", opacity: "0" }} />
                        </div>
                        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", width: "300px", height: "300px", position: "absolute", top: "0", left: "0" }}>
                            <div className="flex items-center justify-center h-full">
                                <div>
                                    <PlayCircleOutlined className="text-5xl cursor-pointer" onClick={() => { dispatch({
                                        type: OPEN_TRAILER_POPUP
                                    }) }} />
                                    <h2 className="text-xl text-white mt-3">{item.tenPhim}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <NavLink to={`/phim/${item.maPhim}`} className="p-2 block bg-blue-300 text-white rounded-md w-full my-2">Đặt vé</NavLink>
                </div>
            </div>
        </div>
    )
}
