import IconCheckCircle from '@/icon/IconCheckCircle'

const CheckdPayment = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-9">
            <IconCheckCircle />
            <h1 className="font-roboto font-bold text-2xl text-[#666C6F]">
                Pagamento aprovado!
            </h1>
        </div>
    )
}

export default CheckdPayment
