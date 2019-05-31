import axios from 'axios'


export function loginUser(credentials, history) {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://localhost:8080/Admin/login',credentials);
      dispatch({ type: 'USER_LOGIN'});
      localStorage.setItem('accesstoken',res.data.accesstoken);
      localStorage.setItem('c_Id',res.data.companyId);
      history.push('/DashBoard');
    } catch(error) {
      dispatch({
        type: 'USER_LOGIN_FAIL',
        payload: 'Invalid email or password'
      });   
    }   
  };
}