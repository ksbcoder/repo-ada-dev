import React from 'react'

const ModalObj = ({id, titulo,objetivos}) => {

    return (
        <div>
        
        <div className="modal fade" id={id} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle" className='text-lg font-semibold'>{titulo}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                {objetivos && objetivos.map((u)=>{
                    return(
                        <div className='mb-3 bg-green-100 p-3 rounded-lg flex flex-col items-center justify-center shadow-sm'>
                            
                            <div className='text-lg font-semibold'>Tipo Objetivo:</div> 
                                <div>{u.tipo}</div>
                            <div className='text-lg font-semibold'>Descripcion: </div>
                                <div >{u.descripcion}</div>    
                            
                        </div>
                    )
                })}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
            </div>
            </div>
        </div>
        </div>
            
        </div>
    )
}

export default ModalObj;
