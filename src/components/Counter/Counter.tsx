import React, { useState } from 'react';
import cnBind, { Argument } from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'store';
import {
    decrement,
    increment,
    incrementAsync,
    incrementByAmount,
    incrementIfOdd,
    selectCount,
} from 'store/counter.slice';

import { ICounterProps } from './Counter.types';

import styles from './Counter.module.css';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const Counter: React.FC<ICounterProps> = ({ title }) => {
    const dispatch = useAppDispatch();
    const count = useAppSelector(selectCount);
    const [incrementAmount, setIncrementAmount] = useState('2');

    const incrementValue = Number(incrementAmount) || 0;

    return (
        <div>
            <h1>{title}</h1>
            <div className={cx('row')}>
                <button className={cx('button')} aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    -
                </button>
                <span className={cx('value')}>{count}</span>
                <button className={cx('button')} aria-label="Increment value" onClick={() => dispatch(increment())}>
                    +
                </button>
            </div>
            <div className={cx('row')}>
                <input
                    className={cx('textbox')}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <button className={cx('button')} onClick={() => dispatch(incrementByAmount(incrementValue))}>
                    Add Amount
                </button>
                <button
                    className={cx('button', 'async-button')}
                    onClick={() => dispatch(incrementAsync(incrementValue))}
                >
                    Add Async
                </button>
                <button className={cx('button')} onClick={() => dispatch(incrementIfOdd(incrementValue))}>
                    Add If Odd
                </button>
            </div>
        </div>
    );
};
