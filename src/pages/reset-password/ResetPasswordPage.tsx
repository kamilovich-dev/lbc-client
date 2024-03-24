import { useState } from "react"

export const AAA = () => {
    const [passwordOne, setPasswordOne] = useState('')
    const [passwordTwo, setPAsswordTwo] = useState('')

    function handleClick() {

    }

    return (
        <>
            <input type='email' value={passwordOne} onChange={(e) => setPasswordOne(e.target.value)}>
                Email
            </input>
            <input type='email' value={passwordTwo} onChange={(e) => setPAsswordTwo(e.target.value)}>
                Email
            </input>
            <button onClick={handleClick}>Подтвердить</button>
        </>

    )
}

export const ResetPasswordPage = () => {
    const [passwordOne, setPasswordOne] = useState('')
    const [passwordTwo, setPAsswordTwo] = useState('')
    const [resultText, setResultText] = useState('')

    async function handleClick() {
        setResultText('')

        const params = new URLSearchParams(document.location.search);
        const token = params.get('token')
        const email = params.get('email')

        const body  = JSON.stringify({
            email, token, password: passwordOne
        })

        await fetch('https://back.pictionary.space/api/user/password_reset', {
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
                    <div>Введите пароль</div>
                    <input className="mb-2" type='email' value={passwordOne} onChange={(e) => setPasswordOne(e.target.value)}/>
                </div>
                <div className="bg-blue-200 p-2 mb-4">
                    <div>Повторите пароль</div>
                    <input className="mb-2" type='email' value={passwordTwo} onChange={(e) => setPAsswordTwo(e.target.value)}/>
                </div>

                <div className="bg-red-50 p-2 mb-2">{resultText}</div>
                <button onClick={handleClick}>Отправить</button>
            </div>
        </>

    )
}