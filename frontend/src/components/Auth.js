import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {Box, Button} from 'grommet';
import {SalteAuth} from '@salte-auth/salte-auth';
import axios from 'axios';

import LazadaProvider from '../auth/LazadaProvider';
import LazadaHandler from '../auth/LazadaHandler';
import useCookie from "../hooks/useCookie";

const callbackEndpoint = 'https://e392e339903a.ngrok.io/authorize';

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
    const [authorized, setAuthorized] = useState(false);
    const [data, setData] = useState(null);

    function authorize() {
        auth.login('lazada').then(response => console.log(response));
    }

    function getData() {
// Fetch promotions
        axios.post('/auth/lazada', {code: authCode})
            .then(function (response) {
                // handle success
                setData(response.data.data);
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
            setAuthorized(true);
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
        <Box margin="medium" pad="medium" gap="medium">
            {!authorized ?
                <Button primary alignSelf="center" fill={false}
                        margin="large" size="large" label="Authozie Lazada"
                        onClick={authorize}/>
                : (
                    data && data.brands && data.categories && <>
                        <h2>Brands</h2>
                        <ul>{data.brands.map(brand =>
                            <li key={brand.name}>{brand.name}</li>)}
                        </ul>
                        <h2>Beauty Product Categories</h2>
                        <table>
                            <tbody>
                            {data.categories.find(c => c.name === 'Beauty')
                                .children.map(cat =>
                                    <tr key={cat.category_id}>
                                        <th>{cat.name}</th>
                                        {cat.children.map(c =>
                                            <td key={c.category_id}>{c.name}</td>)
                                        }
                                    </tr>)}
                            </tbody>
                        </table>
                    </>
                )
            }
        </Box>
    );
}
