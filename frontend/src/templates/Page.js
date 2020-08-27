import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {Grommet, Box} from 'grommet';

import Outlet from './Outlet';

// const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT | 'http://localhost:5000/auth'
const apiEndpoint = 'http://localhost:4000/auth';

const theme = {
    global: {
        colors: {
            brand: '#228BE6',
        },
        font: {
            family: 'Nunito',
            size: '18px',
            height: '20px',
        },
    },
};

export default function Page() {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    function NavBar(props) {
        return (
            <Box tag='header'
                 direction='row'
                 align='center'
                 justify='between'
                 background='brand'
                 pad={{left: 'medium', right: 'small', vertical: 'small'}}
                 elevation='medium'
                 style={{zIndex: '1'}}
                 {...props}
            />
        );
    }

    return (
        <Grommet theme={theme}>
            <Box fill>
            <NavBar>AHC Chatbot Admin</NavBar>
            <Outlet/>
            </Box>
        </Grommet>
    );
}
