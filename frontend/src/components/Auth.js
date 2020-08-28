import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {Box, Button} from 'grommet';
import {SalteAuth} from '@salte-auth/salte-auth';
import axios from 'axios';

import LazadaProvider from '../auth/LazadaProvider';
import LazadaHandler from '../auth/LazadaHandler';
import useCookie from "../hooks/useCookie";

const callbackEndpoint = 'https://000c3ab9014a.ngrok.io/authorize';

const auth = new SalteAuth({
    providers: [
        new LazadaProvider({
            redirectUrl: callbackEndpoint,
            clientID: '122309',
        })
    ],
    handlers: [
        new LazadaHandler({
            default: true
        })
    ]
});

export default function Authorize() {
    const location = useLocation();
    const history = useHistory();
    const [authCode, setAuthCode] = useCookie('authCode');
    const [accessToken, setAccessToken] = useCookie('accessToken');

    function authorize() {
        auth.login('lazada').then(response => console.log(response));
    }

    function getData() {
// Fetch promotions
        axios.post('/auth/lazada', { code: authCode })
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    useEffect(() => {
    }, []);
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        if (code) {
            if (!window.location.hostname.includes('localhost')) {
                window.location.href = 'http://localhost:3000/authorize?code=' + code;
                return;
            }
            history.replace({pathname: '/authorize'});
            setAuthCode(code);
            localStorage.setItem('authCode', code);
            getData();
        }
    }, [location.search]);
    useEffect(() => {
        if (!accessToken) {

        } else {
            console.log(accessToken);
        }
    }, [accessToken]);
    return (
        <Box>
            <Button onClick={authorize}>Authorize Lazada</Button>
        </Box>
    );
}
