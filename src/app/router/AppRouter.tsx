import {createBrowserRouter, RouterProvider } from "react-router-dom";

import { routePaths } from "shared/config";

import { AppRoot } from "pages/root/AppRoot";

import { LoginPage} from "pages/auth/LoginPage";
import { RegistrationPage } from "pages/auth/RegistrationPage";
import { RegistrationLetterSentPage } from 'pages/auth/RegistrationLetterSentPage'
import { ResetPasswordPage } from "pages/auth/ResetPasswordPage";
import { ForgotPasswordPage } from "pages/auth/ForgotPasswordPage";

import { ProtectedRoot } from 'pages/root/ProtectedRoot';
import { ErrorPage } from 'pages/error/ErrorPage';
import { ModulesPage } from 'pages/modules/ModulesPage';
import { ModuleEditPage } from 'pages/module-edit/ModuleEditPage';
import { ModulePage } from "pages/module/ModulePage";
import { CardsModePage } from "pages/cards-mode/CardsModePage";
import { LandingPage } from "pages/landing/LandingPage";
import { ProfilePage } from "pages/profile/ProfilePage";
import { FoldersPage } from "pages/folders/FoldersPage";
import { FolderPage } from "pages/folder/FolderPage";


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
                    path: routePaths.FORGOT_PASSWORD,
                    element: <ForgotPasswordPage/>
                },
                {
                    path: routePaths.RESET_PASSWORD,
                    element: <ResetPasswordPage/>
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
                        {
                            element: <FoldersPage/>,
                            path: routePaths.FOLDERS,
                        },
                        {
                            element: <FolderPage/>,
                            path: routePaths.FOLDER,
                        },
                        {
                            element: <ProfilePage />,
                            path: routePaths.PROFILE,
                        }
                    ]
                },
            ]
        }

    ]);

    return <RouterProvider router={appRouter}/>
}





