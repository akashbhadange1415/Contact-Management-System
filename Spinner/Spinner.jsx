import React from 'react'
import spinnerImg from '../../components/assest_img/img/Spiner.gif'

const Spinner = () => {
  return (
    <div>
        <React.Fragment>
           <div className='container' style={{width:"300px",height:"300px"}}> 
            <img src={spinnerImg} alt="" />
            </div>

        </React.Fragment>
    </div>
  )
}

export default Spinner