import { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import Footer from "./HomeLayout/Footer/Footer";
import Header from "./HomeLayout/Header/Header";

export const HomeTemplate = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    const { Component, ...restProps } = props;
    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            <Header />
            <Component {...propsRoute} />
            <Footer />
        </Fragment>
    }} />
}