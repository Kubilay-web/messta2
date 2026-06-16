import  { Fragment } from 'react'

const SpkBadge = ({variant, children, customClass, Id, onclickfun}:any) => {
  return (
    <Fragment>
         <span className={`badge bg-${variant} ${customClass}`} id={Id} onClick={onclickfun} >{children}</span>
    </Fragment>
  )
}

export default SpkBadge