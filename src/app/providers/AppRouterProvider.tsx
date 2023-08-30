import {createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "layouts/app/AppLayout";
import { LoginPage} from "pages/login/LoginPage";
import { RegistrationPage } from "pages/registration/RegistrationPage";
import { RegistrationLetterSentPage } from 'pages/registration-letter-sent/RegistrationLetterSentPage'
import { RootPage } from 'pages/root/RootPage';
import { ErrorPage } from 'pages/error/ErrorPage';
import { ModulesPage } from 'pages/modules/ModulesPage';
import { ModuleEditPage } from 'pages/module-edit/ModuleEditPage';
import { ProfileHeader } from "widgets/profile-header/ProfileHeader";
import { ModulePage } from "pages/module/ModulePage";
import { CardsModePage } from "pages/cards-mode/CardsModePage";

const AppRouterProvider = () => {
    const appRouter = createBrowserRouter([
        {
            element: <AppLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/login',
                    element: <LoginPage/>,
                },
                {
                    path: '/register',
                    element: <RegistrationPage />
                },
                {
                    path: '/registration-letter-sent',
                    element: <RegistrationLetterSentPage />
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
                            element: <ModulePage />,
                            path: ':moduleId',
                        },
                        {
                            element: <ModuleEditPage />,
                            path: ':moduleId/edit',
                        },
                        {
                            element: <CardsModePage />,
                            path: ':moduleId/cards-mode'
                        }
                    ]
                },
            ]
        }

    ]);
    return <RouterProvider router={appRouter}/>
}

export { AppRouterProvider };






