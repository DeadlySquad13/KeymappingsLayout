import React from 'react';
import cnBind from 'classnames/bind';

import { KeyboardLayout } from 'components/KeyboardLayout';

import styles from './App.module.scss';

const cx = cnBind.bind(styles);

export const App: React.FC = () => {
    return (
        <div className={cx('App')}>
            <header>
            </header>
            <body className={cx('App__Body')}>
                <KeyboardLayout title="NeoVim" />
                <KeyboardLayout title="WezTerm" />
            </body>
        </div>
    );
};
