import React, { useEffect } from 'react'
import './Detail.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getChiTietPhim } from '../../redux/actions/QuanLyRapActions';
import moment from 'moment';
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom';
import { PlayCircleOutlined } from '@ant-design/icons';
import { OPEN_TRAILER_POPUP } from '../../redux/types/CarouselTypes';

const { TabPane } = Tabs;

export default function Detail(props) {

    const dispatch = useDispatch();
    const { filmDetail } = useSelector(state => state.QuanLyRapReducers);

    useEffect(() => {
        dispatch(getChiTietPhim(props.match.params.id))
    }, [])

    const renderRapFilmDetail = () => {
        return filmDetail.heThongRapChieu?.map((item, index) => {
            return <TabPane tab={<img src={item.logo} style={{ width: "50px", height: "50px" }} alt={item.tenHeThongRap} />} key={index}>
                {item.cumRapChieu?.map((rap, index) => {
                    return <div key={index} className="mt-5">
                        <div className="flex">
                            <img src={rap.hinhAnh} style={{ width: "50px", height: "50px" }} alt={rap.tenCumRap} />
                            <div className="ml-3 text-left">
                                <p className="mb-1 font-bold">{rap.tenCumRap}</p>
                                <p className="mb-1 text-gray-400">{rap.diaChi}</p>
                            </div>
                        </div>
                        <div className="text-left mt-5">
                            {rap.lichChieuPhim?.slice(0, 12).map((lich, index) => {
                                return <NavLink key={index} to={`/datve/${lich.maLichChieu}`} className="border p-1 bg-orange-400 text-white">
                                    {moment(lich.ngayChieuGioChieu).format("hh:mm A")}
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
                <div className="grid grid-cols-12 mt-40">
                    <div className="col-span-6 col-start-3">
                        <div className="flex relative">
                            <div className="contents detail-popupImg">
                                <img src={filmDetail.hinhAnh} style={{ width: "200px", height: "250px" }} alt="img" />
                                <button onClick={() => {
                                    dispatch({
                                        type: OPEN_TRAILER_POPUP
                                    })
                                }} className="detail-popup" style={{ width: "168.71px", height: "250px", position: "absolute" }}><PlayCircleOutlined /></button>
                            </div>
                            <div className="flex items-center">
                                <div className="text-left text-white ml-5 mr-20">
                                    <p className="mb-3">Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}</p>
                                    <p className="text-4xl mb-3">{filmDetail.tenPhim}</p>
                                    <p>Nội dung: {filmDetail.moTa}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex justify-end">
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
                <div className="mt-20 detail__film-tab">
                    <Tabs tabPosition={"top"} centered>
                        <TabPane tab={<div className="text-white detail__film-info text-xl">Lịch chiếu</div>} key="1">
                            <div className="flex justify-center my-5">
                                <div className="w-2/3 bg-white p-3">
                                    <Tabs tabPosition={"left"}>
                                        {renderRapFilmDetail()}
                                    </Tabs>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab={<div className="text-white detail__film-info text-xl">Thông tin</div>} key="2">
                            <div className="grid grid-cols-12 my-5">
                                <div className="col-span-4 col-start-3">
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
                                <div className="col-span-4">
                                    <div className="text-left">
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
