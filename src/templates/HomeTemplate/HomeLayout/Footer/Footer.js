import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { NavLink } from 'react-router-dom'
import { AndroidFilled, AppleFilled, TwitterOutlined, MessageFilled, FacebookFilled } from '@ant-design/icons'
import { getHeThongRap } from '../../../../redux/actions/QuanLyRapActions'

export default function Footer(props) {

    // const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducers);

    // const arrHeThongRap = _.map(heThongRapChieu, (item) => _.pick(item, ["maHeThongRap", "logo"]));

    const dispatch = useDispatch();
    const { heThongRap } = useSelector(state => state.QuanLyRapReducers);

    useEffect(() => {
        dispatch(getHeThongRap())
    }, [])

    const renderLogo = () => {
        return heThongRap?.map((item, index) => {
            return <div key={index}>
                <NavLink className="hover:dark:text-violet-400" to="/trangchu">
                    <img src={item.logo} style={{ width: "50px", height: "50px" }} alt={item.tenHeThongRap} />
                </NavLink>
            </div>
        })
    }

    return (
        <footer className="py-6 bg-gray-800 container">
            <div className="px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
                <div className="grid grid-cols-12">
                    <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
                        <NavLink to="/trangchu">
                            <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="logo" />
                        </NavLink>
                    </div>
                    <div className="col-span-6 text-center md:text-left md:col-span-3">
                        <p className="pb-1 text-lg font-medium text-white">Đối tác</p>
                        <div className="grid grid-cols-2 gap-3">
                            {renderLogo()}
                        </div>
                    </div>
                    <div className="col-span-6 text-center md:text-left md:col-span-3">
                        <p className="pb-1 text-lg font-medium text-white">Mobile App</p>
                        <div>
                            <span className="text-4xl text-white mr-5"><AndroidFilled /></span>
                            <span className="text-4xl text-white"><AppleFilled /></span>
                        </div>
                    </div>
                </div>
                <div className="grid justify-center pt-6 lg:justify-between">
                    <div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
                        <span className="text-white">©2022 All rights reserved</span>
                        <NavLink to="/trangchu">
                            <span className="text-white">Privacy policy</span>
                        </NavLink>
                        <NavLink to="/trangchu">
                            <span className="text-white">Terms of service</span>
                        </NavLink>
                    </div>
                    <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
                        <span className="text-2xl text-white"><MessageFilled className="ml-6" /></span>
                        <span className="text-2xl text-white"><TwitterOutlined className="ml-6" /></span>
                        <span className="text-2xl text-white"><FacebookFilled className="ml-6" /></span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
