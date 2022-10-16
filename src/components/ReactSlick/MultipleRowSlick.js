import React, { useState } from 'react'
import Slider from 'react-slick'
import CardFilm from '../CardFilm/CardFilm';
import styleCss from './MultipleRowSlick.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { GET_LIST_MOVIE_DANG_CHIEU, GET_LIST_MOVIE_SAP_CHIEU } from '../../redux/types/QuanLyPhimTypes';
import { displayLoaidng, hiddenLoading } from '../../redux/actions/LoadingAction';

const SampleNextArrow = (propsSlick) => {
    const { className, style, onClick } = propsSlick;
    return (
        <div
            className={`${className} ${styleCss["slick-next"]}`}
            style={{ ...style, display: "block", background: "transparent" }}
            onClick={onClick}
        />
    );
}

const SamplePrevArrow = (propsSlick) => {
    const { className, style, onClick } = propsSlick;
    return (
        <div
            className={`${className} ${styleCss["slick-prev"]}`}
            style={{ ...style, display: "block", background: "transparent", left: "-50px" }}
            onClick={onClick}
        />
    );
}

const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 3,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
            breakpoint: 1350,
            settings: {
                className: "center variable-width",
                centerMode: true,
                infinite: true,
                centerPadding: "50px",
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 1200,
            settings: {
                className: "center variable-width",
                centerMode: true,
                infinite: true,
                centerPadding: "100px",
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 900,
            settings: {
                className: "center variable-width",
                centerMode: true,
                infinite: true,
                centerPadding: "20px",
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 768,
            settings: {
                className: "center variable-width",
                centerMode: true,
                infinite: true,
                centerPadding: "150px",
                slidesToShow: 1,
                nextArrow: false,
                prevArrow: false,
            }
        },
        {
            breakpoint: 735,
            settings: {
                className: "center variable-width",
                centerMode: true,
                infinite: true,
                centerPadding: "80px",
                slidesToShow: 1,
                nextArrow: false,
                prevArrow: false,
            }
        },
        {
            breakpoint: 560,
            settings: {
                className: "center variable-width",
                centerMode: true,
                infinite: true,
                centerPadding: "20px",
                slidesToShow: 1,
                nextArrow: false,
                prevArrow: false,
            }
        },
        {
            breakpoint: 400,
            settings: {
                className: "center variable-width",
                centerMode: true,
                infinite: true,
                centerPadding: "0.5px",
                slidesToShow: 1,
                nextArrow: false,
                prevArrow: false,
            }
        },
    ]
};

export default function MultipleRowSlick(props) {

    const { arrMovie } = props;

    const dispatch = useDispatch();
    const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducers);

    const activeDangChieu = dangChieu === true ? "activeClassListFilm" : "";
    const activeSapChieu = sapChieu === true ? "activeClassListFilm" : "";

    const renderListMovie = () => {
        return arrMovie.map((item, index) => {
            return <div key={index} className={`${styleCss["width-items"]}`}>
                <CardFilm item={item} />
            </div>
        })
    }

    return (
        <div>
            <button onClick={() => {
                dispatch(displayLoaidng);
                dispatch({ type: GET_LIST_MOVIE_DANG_CHIEU });
                setTimeout(() => {
                    dispatch(hiddenLoading);
                }, 500)
            }} type="button" className={`${styleCss[activeDangChieu]} px-8 py-3 font-semibold rounded-lg bg-gray-100 text-gray-800 mr-2`}>Phim đang chiếu</button>
            <button onClick={() => {
                dispatch(displayLoaidng);
                dispatch({ type: GET_LIST_MOVIE_SAP_CHIEU });
                setTimeout(() => {
                    dispatch(hiddenLoading);
                }, 500)
            }} type="button" className={`${styleCss[activeSapChieu]} px-8 py-3 font-semibold rounded-lg bg-gray-100 text-gray-800 mr-2`}>Phim sắp chiếu</button>
            <Slider {...settings}>
                {renderListMovie()}
            </Slider>
        </div>
    )
}
