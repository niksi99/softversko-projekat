import React from 'react'
import { Backdrop, LoaderContainer } from './Loader.styled'

const Loader = () => {
  return (
    <Backdrop>
        <LoaderContainer>
            <span>Loading...</span>
        </LoaderContainer>
    </Backdrop>

  )
}

export default Loader