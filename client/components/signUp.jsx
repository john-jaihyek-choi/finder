import React from 'react';

export default class SignUp extends React.Component {
    render() {
        return (
        <>
            <div className='w-100 h-100 my-3'></div>
            <div className='w-100 h-100 mb-3'>
                <form className="d-flex flex-wrap justify-content-center w-100 h-50">
                    <label htmlFor="signUpUserName" className="text-white font-weight-bold w-75 mt-4 ml-4">CREATE USERNAME</label>
                    <input id="signUpUserName" type="text" className="text-white w-75 h-50 text-center"/>
                </form>
            </div>
            <div className='w-100 h-100 mb-3 d-flex flex-wrap justify-content-center'>
                <button type="submit" className="w-75 h-25 mt-4 font-weight-bold">SUBMIT</button>
                <button type="reset" className="w-75 h-25 mb-4 font-weight-bold">CANCEL</button>
            </div>
        </>
        )
    }
}