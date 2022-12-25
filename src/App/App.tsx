import React from 'react';
import cnBind from 'classnames/bind';

import { KeyboardLayout } from 'components/KeyboardLayout';
import { keymappingsStore } from 'components/KeyboardLayout/KeyboardLayout.store';

import styles from './App.module.scss';
import { observable } from 'mobx';

const cx = cnBind.bind(styles);

export const App = observable(() => {
    return (
        <div className={cx('App')}>
            <header>
            </header>
            <aside>
                <header>{keymappingsStore.keys}</header>
                <div>
                    Info about keymappings.
                </div>
                <footer />
            </aside>
            <body>
                <KeyboardLayout title="NeoVim" />
                <KeyboardLayout title="WezTerm" />
            </body>
        </div>
    );
});
