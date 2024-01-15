import {createBrowserRouter, RouterProvider } from "react-router-dom";

import { routePaths } from "shared/config";

import { AppRoot } from "pages/root/AppRoot";
import { LoginPage} from "pages/login/LoginPage";
import { RegistrationPage } from "pages/registration/RegistrationPage";
import { RegistrationLetterSentPage } from 'pages/registration-letter-sent/RegistrationLetterSentPage'
import { ProtectedRoot } from 'pages/root/ProtectedRoot';
import { ErrorPage } from 'pages/error/ErrorPage';
import { ModulesPage } from 'pages/modules/ModulesPage';
import { ModuleEditPage } from 'pages/module-edit/ModuleEditPage';
import { ModulePage } from "pages/module/ModulePage";
import { CardsModePage } from "pages/cards-mode/CardsModePage";
import { LandingPage } from "pages/landing/LandingPage";

export const AppRouter = () => {

    const appRouter = createBrowserRouter([
        {
            element: <AppRoot />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: routePaths.LOGIN,
                    element: <LoginPage/>,
                },
                {
                    path: routePaths.REGISTRATION,
                    element: <RegistrationPage />
                },
                {
                    path: routePaths.REGISTRATION_LETTER_SENT,
                    element: <RegistrationLetterSentPage />
                },
                {
                    path: routePaths.MAIN,
                    element: <LandingPage/>
                },
                {
                    path: routePaths.PROTECTED_ROOT,
                    element: <ProtectedRoot />,
                    children: [
                        {
                            element: <ModulesPage />,
                            path: routePaths.MODULES,
                        },
                        {
                            element: <ModulePage />,
                            path: routePaths.MODULE,
                        },
                        {
                            element: <ModuleEditPage />,
                            path: routePaths.MODULE_EDIT,
                        },
                        {
                            element: <CardsModePage />,
                            path: routePaths.CARDS_MODE
                        },
                    ]
                },
            ]
        }

    ]);

    return <RouterProvider router={appRouter}/>
}





