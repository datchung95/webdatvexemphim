import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import CarouselReducer from './reducers/CarouselReducer'
import QuanLyPhimReducers from './reducers/QuanLyPhimReducers'
import QuanLyRapReducers from './reducers/QuanLyRapReducers'
import QuanLyNguoiDungReducers from './reducers/QuanLyNguoiDungReducers'
import QuanLyDatVeReducers from './reducers/QuanLyDatVeReducers'
import LoadingReducer from './reducers/LoadingReducer'

const rootReducer = combineReducers({
    CarouselReducer,
    QuanLyPhimReducers,
    QuanLyRapReducers,
    QuanLyNguoiDungReducers,
    QuanLyDatVeReducers,
    LoadingReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store;