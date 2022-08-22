import React, { useEffect } from 'react'
import HomeCarousel from './HomeCarousel/HomeCarousel'
import HomeMenu from './HomeMenu/HomeMenu'
import { useDispatch, useSelector } from 'react-redux'
import { getDanhSachPhim } from '../../redux/actions/QuanLyPhimActions';
import MultipleRowSlick from '../../components/ReactSlick/MultipleRowSlick';
import { getLichChieuHeThongRap } from '../../redux/actions/QuanLyRapActions';


export default function Home(props) {

    const { arrMovie } = useSelector(state => state.QuanLyPhimReducers);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducers)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDanhSachPhim());
        dispatch(getLichChieuHeThongRap());
    }, [])

    return (
        <div>
            <HomeCarousel />
            <div className="container">
                <div className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <MultipleRowSlick arrMovie={arrMovie} />
                    </div>
                </div>
            </div>
            <HomeMenu heThongRapChieu={heThongRapChieu} />
        </div>
    )
}
