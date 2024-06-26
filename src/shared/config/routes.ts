export enum routePaths {
    LOGIN = '/login',
    REGISTRATION = '/register',
    REGISTRATION_LETTER_SENT = '/registration-letter-sent',
    FORGOT_PASSWORD = '/password-forgot',
    RESET_PASSWORD = '/password-reset',

    MAIN = '/',

    MODULES = '/modules',
    MODULE = '/modules/:moduleId',
    MODULE_EDIT = '/modules/:moduleId/edit',

    CARDS_MODE = '/modules/:moduleId/cards-mode',
    SELECTION_MODE = '/modules/:moduleId/selection-mode',
    MEMORY_MODE = '/modules/:moduleId/memory-mode',
    TEST_MODE = '/modules/:moduleId/test-mode',

    FOLDERS = '/folders',
    FOLDER = '/folders/:folderId',
    FOLDER_EDIT = '/folders/:folderId/edit',

    FOLDERS_ADD_MODULE = '/folders/add-module/:moduleId',
    MODULES_ADD_TO_FOLDER = '/modules/add-to-folder/:folderId',

    PROFILE = '/profile',
    PROFILE_EDIT = '/profile/edit',

    GLOBAL_SEARCH = '/global-search'
}