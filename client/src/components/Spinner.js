import { Spin } from 'antd';

import React from 'react'

function Spinner() {
  return (
    <div className='spinner'>
        <Spin color="grey" style={{color:'grey'}} size='large'/>
    </div>
  )
}

export default Spinner