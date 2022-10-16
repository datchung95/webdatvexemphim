import React, { useEffect, useState } from 'react'
import './Detail.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getChiTietPhim } from '../../redux/actions/QuanLyRapActions';
import moment from 'moment';
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom';
import useIsMobile from '../../components/Resize/ResizeMd/ResizeMd';

const { TabPane } = Tabs;

export default function Detail(props) {

    const dispatch = useDispatch();
    const { filmDetail } = useSelector(state => state.QuanLyRapReducers);

    const [tabPosition, setTabPosition] = useState('left');

    useEffect(() => {
        dispatch(getChiTietPhim(props.match.params.id))
    }, [])

    const resize = useIsMobile();

    useEffect(() => {
        if (resize) {
            setTabPosition("top")
        } else {
            setTabPosition("left")
        }
    }, [resize])

    const renderRapFilmDetail = () => {
        return filmDetail.heThongRapChieu?.map((item, index) => {
            return <TabPane tab={<img src={item.logo} style={{ width: "50px", height: "50px" }} alt={item.tenHeThongRap} />} key={index}>
                {item.cumRapChieu?.map((rap, index) => {
                    return <div key={index} className="mt-5">
                        <div className="flex">
                            <img src={rap.hinhAnh} style={{ width: "50px", height: "50px" }} alt={rap.tenCumRap} />
                            <div className="ml-3 text-left">
                                <p className="mb-1 sm:font-bold xs:font-normal xs:text-xs sm:text-base">{rap.tenCumRap}</p>
                                <p className="mb-1 text-gray-400 xs:hidden sm:block">{rap.diaChi}</p>
                            </div>
                        </div>
                        <div className="text-left mt-5 grid lg:grid-cols-8 sm:grid-cols-4 xs:grid-cols-2 w-max gap-3">
                            {rap.lichChieuPhim?.slice(0, 8).map((lich, index) => {
                                return <NavLink key={index} to={`/datve/${lich.maLichChieu}`} className="border p-1 bg-orange-400 text-white">
                                    {moment(lich.ngayChieuGioChieu).format("HH:mm")}
                                </NavLink>
                            })}
                        </div>
                    </div>
                })}
            </TabPane>
        })
    }

    return (
        <div className="detail-background mb-0" style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, minHeight: "100vh" }}>
            <div className="detail__film-background" style={{ minHeight: "100vh" }}>
                <div className="grid grid-cols-12 mt-40 container">
                    <div className="lg:col-span-6 lg:col-start-3 xs:col-span-12">
                        <div className="flex xs:flex-col md:flex-row xs:items-center">
                            <div className="contents detail-popupImg">
                                <img src={filmDetail.hinhAnh} style={{ width: "168px", height: "250px" }} alt="img" />
                            </div>
                            <div className="flex items-center">
                                <div className="md:text-left xs:text-center text-white xs:mt-5 md:mt-0 xs:mr-5 ml-5 md:mr-20">
                                    <p className="mb-3">Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}</p>
                                    <p className="text-4xl mb-3">{filmDetail.tenPhim}</p>
                                    <p>Nội dung: {filmDetail.moTa}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 xs:col-span-12 flex lg:justify-end xs:justify-center xs:mt-10 lg:mt-0">
                        <div style={{ width: "200px" }}>
                            <div style={{ width: 200, height: 200, backgroundColor: "rgba(0, 0, 0, 0.7)" }} className="rounded-full">
                                <CircularProgressbar maxValue='10' value={filmDetail.danhGia} text={filmDetail.danhGia} styles={buildStyles({
                                    pathColor: 'rgb(52 211 153)',
                                    trailColor: 'rgba(0, 0, 0, 0.7)',
                                    textColor: 'white'
                                })} />
                            </div>
                            <div className="text-center mt-5">
                                <Rate allowHalf value={filmDetail.danhGia / 2} style={{ color: "rgb(52 211 153)" }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-20 detail__film-tab container detail__tab">
                    <Tabs tabPosition={"top"} centered>
                        <TabPane tab={<div className="text-white detail__film-info text-xl">Lịch chiếu</div>} key="1">
                            <div className="flex justify-center my-5">
                                <div className="w-2/3 bg-white p-3">
                                    <Tabs tabPosition={tabPosition}>
                                        {renderRapFilmDetail()}
                                    </Tabs>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab={<div className="text-white detail__film-info text-xl">Thông tin</div>} key="2">
                            <div className="grid grid-cols-12 my-5">
                                <div className="lg:col-span-4 lg:col-start-3 xs:col-span-12">
                                    <div className="text-left">
                                        <table className="grid grid-cols-3">
                                            <thead>
                                                <tr className="text-white font-bold grid grid-flow-row">
                                                    <td className="p-3">Ngày công chiếu: </td>
                                                    <td className="p-3">Diễn viên: </td>
                                                    <td className="p-3">Thể loại: </td>
                                                    <td className="p-3">Định dạng: </td>
                                                    <td className="p-3">Quốc gia: </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="text-white grid grid-flow-row">
                                                    <td className="p-3">{moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}</td>
                                                    <td className="p-3"></td>
                                                    <td className="p-3"></td>
                                                    <td className="p-3">Hành Động</td>
                                                    <td className="p-3"></td>
                                                    <td className="p-3"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="lg:col-span-4 xs:col-span-12 xs:mt-5 lg:mt-0">
                                    <div className="lg:text-left xs:text-center">
                                        <p className="text-white font-bold">Nội dung</p>
                                        <p className="text-white">{filmDetail.moTa}</p>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
