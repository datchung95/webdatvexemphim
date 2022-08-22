import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getCarouselAction } from '../../../redux/actions/CarouselActions';
import './HomeCarousel.css'

const contentStyle = {
    height: '700px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    margin: 0
};

export default function HomeCarousel(props) {

    const { arrCarousel } = useSelector(state => state.CarouselReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarouselAction());
    }, [])

    const renderCarousel = () => {
        return arrCarousel.map((item, index) => {
            return <div key={index}>
                <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
                    <img src={item.hinhAnh} className="w-full opacity-0" alt={item.maBanner} />
                </div>
            </div>
        })
    }

    return (
        <Carousel effect="fade" autoplay>
            {renderCarousel()}
        </Carousel>
    )
}
