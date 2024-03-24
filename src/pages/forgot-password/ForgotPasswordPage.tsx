import { useState } from "react"

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [resultText, setResultText] = useState('')

    async function handleClick() {
        setResultText('')
        const body  = JSON.stringify({
            email: email
        })

        await fetch('https://back.pictionary.space/api/user/password_forgot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body })
            .then(result => result.text())
            .then(json => setResultText(json))
            .catch((error) => setResultText(JSON.stringify(error)))
    }

    return (
        <>
            <div className="flex flex-col gap-2 max-w-[50%]">
                <div className="bg-blue-200 p-2 mb-4">
                    <div>Email</div>
                    <input className="mb-2" type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <div className="bg-red-50 p-2 mb-2">{resultText}</div>
                </div>
                <button onClick={handleClick}>Отправить</button>

            </div>
        </>

    )
}