import React, {useState, useEffect} from 'react';
import {useLocation, useParams, useHistory} from 'react-router-dom';
import {Box, Button} from 'grommet';
import {SalteAuth} from '@salte-auth/salte-auth';
import Cookies from 'universal-cookie';

const callbackEndpoint = ' https://487781eeda0c.ngrok.io/authorize';
// const callbackEndpoint = 'http://localhost:3000/authorize';

import LazadaProvider from '../auth/LazadaProvider';
import LazadaHandler from '../auth/LazadaHandler';

const cookies = new Cookies();
// const code = cookies.get('myCat')); // Pacman

const auth = new SalteAuth({
    providers: [
        new LazadaProvider({
            redirectUrl: callbackEndpoint,
            // url: 'https://auth.lazada.com/oauth',
            clientID: '122309',
        })
    ],
    handlers: [
        // new Redirect({
        //     default: true
        // })
        new LazadaHandler({
            default: true
        })

    ]
});

export default function Authorize() {
    const location = useLocation();
    const history = useHistory();

    function authorize() {
        auth.login('lazada').then(response => console.log(response));
    }

    useEffect(() => {
    }, []);
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const authCode = params.get('code');
        if (authCode) {
            if (!window.location.hostname.includes('localhost')) {
               window.location.href = 'http://localhost:3000/authorize?code=' + authCode;
               return;
            }
            localStorage.setItem('authCode', authCode);
            history.replace({pathname: '/authorize', search: ''});
        }
    }, [location.search]);
    return (
        <Box>
            <Button onClick={authorize}>Authorize Lazada</Button>
        </Box>
    );
}
