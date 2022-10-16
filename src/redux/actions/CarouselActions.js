import { quanLyPhimServices } from "../../services/QuanLyPhimServices";
import { GET_CAROUSEL } from "../types/CarouselTypes";

export const getCarouselAction = () => {
    return async (dispatch) => {
        try {
            const {data} = await quanLyPhimServices.layDanhSachBanner();
            dispatch({
                type: GET_CAROUSEL,
                arrCarousel: data.content
            })
        } catch(err) {
            
        }
    }
}