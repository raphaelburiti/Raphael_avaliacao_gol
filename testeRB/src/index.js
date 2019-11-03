import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';

export default function App() {
    return (
        <>
            <StatusBar barStyle="light-content" translucent backgroundColor="#1f74ff" />
            <Routes />
        </>
    );
};