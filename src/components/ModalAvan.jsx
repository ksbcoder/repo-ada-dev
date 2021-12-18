import React from "react";

const ModalAvan = ({ id, titulo, avances }) => {
  return (
    <div>
      <div
        className="modal fade"
        id={id}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
<<<<<<< HEAD
              <h5 className="modal-title" id="exampleModalLongTitle">
                {titulo}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
=======
                <h5 className="modal-title" id="exampleModalLongTitle"  className='text-lg font-semibold'>{titulo}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
>>>>>>> 398f88a312d37a898fadc2736a061499015a14c3
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
<<<<<<< HEAD
              {avances.length !== 0 ? (
                <>
                  {avances &&
                    avances.map((u) => {
                      return (
                        <div className="mb-2 bg-green-100 p-1 rounded-lg flex flex-col items-center justify-center shadow-sm">
                          <div>{u.descripcion}</div>
                        </div>
                      );
=======
                {avances.length!==0 ? <>
                    {avances && avances.map((u)=>{
                        return(
                            <div className='mb-2 bg-green-100 p-1 rounded-lg flex flex-col items-center justify-center shadow-sm'>
                                   <div  className='text-lg font-semibold'>Descripcion de los avances</div>
                                   <div>{u.descripcion}</div> 
                                   
                            </div>
                        )
>>>>>>> 398f88a312d37a898fadc2736a061499015a14c3
                    })}
                </>
              ) : (
                <div data-testid="sin-avances"> No hay avances que mostrar</div>
              )}
            </div>
            <div className="modal-footer">
<<<<<<< HEAD
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              {
                <a
                  href={"/avances"}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Registrar Avance
                </a>
              }
=======
                <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                {<a href={'/avances'} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Gestionar Avance
                </a>}
            </div>
>>>>>>> 398f88a312d37a898fadc2736a061499015a14c3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAvan;
