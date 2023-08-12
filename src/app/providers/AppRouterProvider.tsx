import {createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "layouts/app/AppLayout";
import { AuthPage} from "pages/auth/AuthPage";
import { RootPage } from 'pages/root/RootPage';
import { ErrorPage } from 'pages/error/ErrorPage';
import { ModulesPage } from 'pages/modules/ModulesPage';
import { ModuleEditPage } from 'pages/module-edit/ModuleEditPage';
import { ProfileHeader } from "widgets/profile-header/ProfileHeader";

const AppRouterProvider = () => {
    const appRouter = createBrowserRouter([
        {
            element: <AppLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/auth',
                    element: <AuthPage/>,
                },
                {
                    path: "/",
                    element: <RootPage />,
                    children: [
                        {
                            element: <ProfileHeader />,
                            children: [
                                {
                                    element: <ModulesPage />,
                                    path: 'modules',
                                }
                            ]
                        },
                        {
                            element: <ModuleEditPage />,
                            path: ':moduleId/edit',
                        }
                    ]
                },
            ]
        }

    ]);
    return <RouterProvider router={appRouter}/>
}

export { AppRouterProvider };






