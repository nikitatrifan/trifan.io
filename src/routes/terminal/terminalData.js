export const INPUT_TITLE   = 'title';
export const PROJECT_INPUT = 'project_input';
export const MAIN_INPUT = 'main_input';
export const PROJECTS_LIST = 'projects_list';
export const PROJECT_INFO = 'project_info';
export const TERMINAL_HELP = 'terminal_help';
export const CONTACTS = 'contacts';
export const ABOUT = 'about';
export const RESET = 'reset';

export const mainCommands = [
    {
        title: 'Projects🤩',
        slugs: ['projects', 'works'],
        type: PROJECTS_LIST,
        about: 'See the projects lists.'
    },
    {
        title: 'Contacts✌',
        slugs: ['contacts', 'contact'],
        type: CONTACTS,
        about: 'See some ways you can contact with Nikita Trifan.'
    },
    {
        title: 'About😉',
        slugs: ['about', 'info'],
        type: ABOUT,
        about: 'About Nikita Trifan.'
    },
    // {
    //     title: 'Approach🏄',
    //     slugs: ['approach'],
    //     type: 'approach'
    // },
    {
        title: 'Help🤓',
        slugs: ['help', 'support'],
        type: TERMINAL_HELP
    },
    {
        title: '',
        slugs: ['clear', 'reset'],
        type: RESET,
        about: 'Reset the terminal.'
    }
];

export const projectsList = [
    {
        title: 'Gym Assistant iOS App',
        slug: 'gym assistant',
        placeholder: 'Gym Assistant💪',
        content: {
            title: 'About the app',
            text: 'The app is designed to make user’s trainings at a gym\n' +
            'easier and help to improve his body by the right way.',
            link: '/gym-assistant'
        },
    },
    {
        title: 'Yoap Real-Estate Web App',
        slug: 'yoap',
        placeholder: 'Yoap🏦',
        content: {
            title: 'About the app',
            text: 'This SPA Web App is created to help locals to find a new\n' +
            'apartment for a long-term rent.',
            gradient: ['#ff899b', '#ff4d66'],
            link: '/yoap'
        },
    },
    {
        title: 'Ultrastore High-End Ecommerce Web App',
        slug: 'ultrastore',
        placeholder: 'Ultrastore⌚',
        content: {
            title: 'About the app',
            text: 'This SPA Web App is created to help locals to find a new\n' +
            'apartment for a long-term rent.',
            gradient: ['#525252', '#121212'],
            link: '/ultrastore'
        },
    }
];