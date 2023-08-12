import React from 'react';
import { useLoaderData, useParams, Form } from 'react-router-dom';

export default function Team() {

    const teamId = useLoaderData();
    let params = useParams();

    return (
        <>
            <div>
                Определенная команда
            </div>
            <Form method="post" action='/client/src/shared/learning/TestCommon/Computer'>
                <input name="songTitle" />
                <textarea name="lyrics" />
                <button type="submit">Save</button>
            </Form>;
        </>
    )
}