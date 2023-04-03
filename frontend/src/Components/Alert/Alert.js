import React from 'react'

function Alert(props) {

    return (
        <div style={{position: 'fixed', width: '100%', top: '10px' , zIndex: '10', display: 'flex', justifyContent: 'center' }}>
            <div style={{width: '40%', textAlign: 'center'}}>
                {props.alert && <div style={{ padding: '4px', borderRadius: '0' }} className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                    {props.alert.msg}
                </div>}
            </div>
        </div>
    )
}

export default Alert