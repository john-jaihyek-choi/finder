import React from 'react';

export default class SignUp extends React.Component {
    render() {
        return (
        <>
            <div className='w-100 h-100 my-3'></div>
            <div className='w-100 h-100 mb-3'>
                <form className="d-flex flex-wrap justify-content-center w-100 h-75">
                    <label htmlFor="signUpUserName" className="text-white font-weight-bold w-75 mt-4 ml-4">CREATE USERNAME</label>
                    <input id="signUpUserName" type="text" className="w-75 h-50 text-center text-white font-weight-bold text-"/>
                </form>
            </div>
            <div className='w-100 h-100 mb-3 d-flex flex-wrap align-items-center justify-content-center align-content-end'>
                <button type="submit" className="w-75 py-3 btn btn-outline-light button-outline font-weight-bold">SUBMIT</button>
            </div>
            <div className="w-100 h-100 mb-3 d-flex flex-wrap align-items-center justify-content-center align-content-start">
                <button type="reset" className="w-75 py-3 my-3 btn btn-outline-light button-outline font-weight-bold">CANCEL</button>
            </div>
        </>
        )
    }
}