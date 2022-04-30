import { createAction, handleActions } from 'redux-actions';
import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios'
import {SERVER, headers} from "@/modules/auth/server"

// 상태 초기값
export const initialState = {
    loginUser: {},
    loginError: null,
    isLoggined: false,
    token: ''
}
// 액션타입
const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
const LOGIN_CANCELLED = 'auth/LOGIN_CANCELLED';
const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST';
const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
const LOGOUT_FAILURE = "auth/LOGOUT_FAILURE";
const SAVE_TOKEN = 'auth/SAVE_TOKEN';
const DELETE_TOKEN = 'auth/DELETE_TOKEN';

// 액션생성함수

export const loginRequest = createAction(LOGIN_REQUEST, data => data)
export const loginCancelled = createAction(LOGIN_CANCELLED, e => e)
export const logoutRequest = createAction(LOGOUT_REQUEST, e => e)

// 사가 와쳐

export function* loginSaga(){
    yield takeLatest(LOGIN_REQUEST, signin)
  
    yield takeLatest(LOGOUT_REQUEST, logout)
}

// 사가 로직

function* signin(action){
    try{
        const response = yield call(loginAPI, action.payload)
        const result = response.data
        yield put({type: LOGIN_SUCCESS, payload: result})
        yield put({type: SAVE_TOKEN, payload: result.token})
        yield put(window.location.href = "/user/profile")
    }catch(error){
        yield put({type: LOGIN_FAILURE, payload: error.message})
    }
}

function* logout(){
    try{
        const response = yield call(logoutAPI);
        yield put({type: LOGOUT_SUCCESS});
        yield put({type: DELETE_TOKEN});
        yield put(window.location.href = "/")
    }catch(error){
        yield put({type: LOGOUT_FAILURE});
    }
}

// API

const logoutAPI = () => axios.post(`${SERVER}/user/logout`, {}, {headers})

// 리듀서
/** 
const login = (state=initialState, action) => {
    switch(action.type){
        default:
            return state
    }
}
*/
const login = handleActions({
    
    [LOGIN_SUCCESS]: (state, action) => ({
        ...state,
        loginUser: action.payload,
        isLoggined: true
    }),
    [LOGIN_FAILURE]: (state, action) => ({
        ...state,
        loginError: action.payload // result
    }),
    [LOGOUT_SUCCESS]: (state, _action) => ({
        ...state,
        loginUser: null,
        isLoggined: false
    }),
    [LOGOUT_FAILURE]: (state, action) => ({
        ...state,
        loginError: action.payload // result
    }),
    [SAVE_TOKEN]: (state, action) => ({
        ...state,
        token: action.payload // result.token
    }),
    [DELETE_TOKEN]: (state, action) => ({
        ...state,
        token: ''
    })
}, initialState)
export default login