import { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import openNotificationWithIcon from "../../Notification/Notification";
import history from "../../util/libs/history";
import { USER_LOGIN_LOCAL } from "../../util/setting/config";


export const ChectoutTemplate = (props) => {

    if (!localStorage.getItem(USER_LOGIN_LOCAL)) {
        history.push('/dangnhap')
        openNotificationWithIcon("warning", "Bạn chưa đăng nhập");
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    const { Component, ...restProps } = props;

    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            <Component {...propsRoute} />
        </Fragment>
    }} />
}