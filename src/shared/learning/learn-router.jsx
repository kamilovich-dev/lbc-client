// import { createBrowserRouter } from 'react-router-dom';
// import ErrorPage from 'client/src/pages/error/components/ErrorPage/ErrorPage';
// import Teams from 'client/src/shared/learning/TestCommon/Teams';
// import Team from 'client/src/shared/learning/TestCommon/Team';
// import Computer from 'client/src/shared/learning/TestCommon/Computer';
// import TestKeyFrames from 'client/src/shared/learning/TestKeyFrames/TestKeyFrames';
// import TestReactSpring from '../../shared/learning/TestReactSpring/TestReactSpring';
//
// const router = createBrowserRouter([
//     {
//         element: <TestReactSpring />,
//         path: '/',
//         errorElement: <ErrorPage />
//     }
//     // {
//     //     element: <Teams />,
//     //     path: "/",
//     //     errorElement: <ErrorPage />,
//     //     loader: async () => {
//     //         return 2;
//     //     },
//     //     children: [
//     //         {
//     //             element: <Team />,
//     //             path: ':teamId',
//     //             loader: async ( { params }) => {
//     //                 return params.teamId;
//     //             }
//     //         },
//     //         {
//     //             element: <Computer />,
//     //             path: 'computer',
//     //             action: async ( { request } ) => {
//     //                 let formData = await request.formData();
//     //                 return formData;
//     //             }
//     //         }
//     //     ]
//     // },
// ]);
//
// export default router;