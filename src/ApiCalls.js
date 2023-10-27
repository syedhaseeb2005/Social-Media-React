import axios from 'axios'

 const logincall = async (userCredential,dispatch) =>{
    dispatch({type : 'LOGIN_START'});
    try {
        const res = await axios.post('http://localhost:5500/api/auth/login', userCredential);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: error });
    }
    
}
export default logincall