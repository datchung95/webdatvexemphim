import React, { Fragment } from 'react'
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom'
import moment from 'moment'

const { TabPane } = Tabs;

export default function HomeMenu(props) {

    const tabPosition = "top"

    const { heThongRapChieu } = props;

    const renderTabRapPhim = () => {
        return heThongRapChieu.map((item, index) => {
            return <TabPane tab={<img src={item.logo} alt={item.maHeThongRap} style={{ width: "50px", height: "50px" }} />} key={index}>
                <Tabs tabPosition={tabPosition}>
                    {item.lstCumRap?.map((cumRap, index) => {
                        return <TabPane tab={<div>
                            <div className="flex w-80">
                                <img src={cumRap.hinhAnh} alt={cumRap.maCumPap} style={{ width: "50px", height: "50px" }} />
                                <div className="ml-3 text-left w-full" style={{ whiteSpace: "initial" }}>
                                    <p className="mb-1 font-bold">{cumRap.tenCumRap}</p>
                                    <p className="text-gray-400 mb-1">{cumRap.diaChi}</p>
                                </div>
                            </div>
                        </div>} key={index}>
                            {cumRap.danhSachPhim?.map((phim, index) => {
                                return <Fragment key={index}>
                                    <div className="flex my-3">
                                        <img src={phim.hinhAnh} alt={phim.maPhim} style={{ width: "100px", height: "150px" }} onError={(e) => { e.target.onError = null; e.target.src = "https://picsum.photos/100/150" }} />
                                        <div className="ml-3">
                                            <p className="font-bold">{phim.tenPhim}</p>
                                            <div className="grid lg:grid-cols-8 sm:grid-cols-8 xs:grid-cols-3 w-max gap-3">
                                                {phim.lstLichChieuTheoPhim?.slice(0, 8).map((lich, index) => {
                                                    return <NavLink key={index} to={`/datve/${lich.maLichChieu}`} className="border p-1 bg-orange-400 text-white">
                                                        {moment(lich.ngayChieuGioChieu).format("HH:mm")}
                                                    </NavLink>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane>
        })
    }

    return (
        <div className="container">
            <Tabs tabPosition="top">
                {renderTabRapPhim()}
            </Tabs>
        </div>
    )
}
