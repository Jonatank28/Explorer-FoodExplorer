import IconReceipt from '@/icon/IconReceipt'

const CreditCard = ({ setSelected }) => {
    return (
        <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-2">
                <label className="font-roboto font-normal text-base text-light-400">
                    Número do Cartão
                </label>
                <input
                    className=" px-[14px] py-3 text-light-100 rounded-md bg-transparent border border-light-100 w-[300px] md:w-auto"
                    type="text"
                    placeholder="0000 0000 0000 0000"
                />
            </div>
            <div className="flex items-center gap-4 w-[142px] md:w-auto">
                <div className="flex flex-col gap-2 w-full">
                    <label className="font-roboto font-normal text-base text-light-400">
                        Validade
                    </label>
                    <input
                        className="px-[14px] py-3 text-light-100 rounded-md bg-transparent border border-light-100"
                        type="text"
                        placeholder="04/25"
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label className="font-roboto font-normal text-base text-light-400">
                        CVC
                    </label>
                    <input
                        className="px-[14px] py-3 text-light-100 rounded-md bg-transparent border border-light-100"
                        type="text"
                        placeholder="000"
                    />
                </div>
            </div>
            <div
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-md bg-tints-Tomato100 cursor-pointer"
                onClick={() => setSelected('receipt')}
            >
                <IconReceipt className="hidden md:block" />
                <span className="font-poppins text-light-100 font-medium text-sm">
                    Finalizar pagamento
                </span>
            </div>
        </div>
    )
}

export default CreditCard
