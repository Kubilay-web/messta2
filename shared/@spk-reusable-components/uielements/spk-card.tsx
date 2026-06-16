import  { Fragment } from 'react'

const SpkCard = ({customClass, children,  }:any) => {
  return (
    <Fragment>
        <div className={`box ${customClass}`} >
             {children}
        </div>
    </Fragment>
  )
}

export default SpkCard