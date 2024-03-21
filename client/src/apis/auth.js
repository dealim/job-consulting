import api from './api';

// 회원 확인
export const checkDuplicateUsername = (username) => api.post(`/api/user/check-duplicate-username?username=${username}`)

// 로그인
export const login = (username, password) => api.post(`/login?username=${username}&password=${password}`)

// 로그인 사용자 정보
export const info = () => api.get('/api/user/info')

// 회원 가입
export const join = (data) => api.post(`/api/user/join`, data)

// 회원 정보 수정
export const update = (data) => api.put(`/api/user/update`, data)

// 회원 탈퇴
export const remove = (userId) => api.delete(`/api/user/delete/${userId}`)

// 로그아웃
export const logout = () => api.get('/api/logout')

// 기업 가입
export const companyJoin = (data) => api.post(`/api/user/company-join`, {
    member:{
        username : data.username,
        password : data.password,
        name : data.name,
        email : data.email,
        phone : data.phone
    },
    company : {
        comName : data.comName,
        comCeoName : data.b_ceoName,
        comAddress : data.b_address + " " + data.b_detailAddr,
        comZipcode : data.b_zipCode,
        comLicenseNum : data.b_no,
        comOpeningDate : data.b_openingDate
    }

})
