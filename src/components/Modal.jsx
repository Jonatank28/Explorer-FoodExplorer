const Modal = ({ title, message, onConfirm, onCancel, isOpen }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-dark-300 opacity-40"></div>{' '}
                    {/* Overlay de fundo */}
                    <div className="bg-dark-300 p-8 rounded-lg shadow-lg relative z-10">
                        <h2 className="text-2xl font-bold mb-4 text-light-100">
                            {title}
                        </h2>
                        <p className="text-xl mb-4 text-light-300">{message}</p>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={onConfirm}
                                className="bg-green-500 hover:bg-green-700 transition-colors text-light-200 font-bold py-2 px-4 rounded mr-2"
                            >
                                Confirmar
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="bg-red-500 hover:bg-red-700 transition-colors text-light-200 font-bold py-2 px-4 rounded"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal
