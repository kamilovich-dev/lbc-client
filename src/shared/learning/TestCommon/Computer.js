import React from 'react';
import { useLoaderData, useParams, useActionData } from 'react-router-dom';

export default function Computer() {

    const formData = useActionData();
    console.log(formData.get('songTitle'));

    return (
        <>
            <div>
                Это уже компьютер
            </div>
        </>
    )
}