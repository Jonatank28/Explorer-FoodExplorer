const Teste = ({ setTeste }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="digite um valor"
                onChange={(e) => setTeste(e.target.value)}
            />
        </div>
    )
}

export default Teste
