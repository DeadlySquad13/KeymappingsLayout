import React, { useEffect, useRef, useState } from "react";
import Keyboard, { SimpleKeyboard } from "react-simple-keyboard";
import cnBind from 'classnames/bind';
import { SimpleKeyboardLayouts } from 'simple-keyboard-layouts';

import "react-simple-keyboard/build/css/index.css";
import styles from "./KeyboardLayout.module.scss";

const cx = cnBind.bind(styles);

export type KeyboardLayoutProps = React.HTMLAttributes<HTMLDivElement> & {
    title?: string
}

enum LayoutType {
    Big,
    Small,
    MacOs,
}
const getLayout = (layoutType: LayoutType = LayoutType.Big) => {
    const { layout } = keyboard.layouts.english;

    switch (layoutType) {
        case LayoutType.Big: {
            return {
                default: [
                    "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
                    "{tab} q w e r t y u i o p [ ] {enter}",
                    "{lock} a s d f g h j k l ; ' \\ {enter}",
                    "{shift} \\ z x c v b n m , . / {shift}",
                    "{controlleft} {winleft} {altleft} {space} {altright} {winright} {app} {controlright}",
                ],
                shift: [
                    "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
                    "{tab} Q W E R T Y U I O P { } {enter}",
                    "{lock} A S D F G H J K L : \" | {enter}",
                    "{shift} | Z X C V B N M < > ? {shift}",
                    "{controlleft} {winleft} {altleft} {space} {altright} {winright} {app} {controlright}",
                ]
            }
        }
        // TODO:
        case LayoutType.MacOs: {
            layout.default[4] = '{controlleft} {altleft} {metaleft} {space} {metaright} {altright} {app} {controlright}'

            return layout;
        }

        default: {
            return layout;
        }
    }

}

const keyboard = new SimpleKeyboardLayouts();

const display = {
    '{escape}': 'esc ⎋',
    '{tab}': 'tab ⇥',
    '{backspace}': 'backspace ⌫',
    '{bksp}': 'backspace ⌫',
    '{enter}': 'enter ↵',
    '{capslock}': 'caps lock ⇪',
    '{lock}': 'caps lock ⇪',
    '{shift}': 'shift ⇧',
    '{shiftleft}': 'shift ⇧',
    '{shiftright}': 'shift ⇧',
    '{controlleft}': 'ctrl ⌃',
    '{controlright}': 'ctrl ⌃',
    '{altleft}': 'alt ⌥',
    '{altright}': 'alt ⌥',
    '{metaleft}': 'cmd ⌘',
    '{winleft}': 'win ⊞',
    '{winright}': 'win ⊞',
    '{metaright}': 'cmd ⌘',
    '{space}': ' ',
    '{app}': 'app ≣',
}

const layoutType = LayoutType.Big;
const layout = getLayout(layoutType)

export const KeyboardLayout: React.VFC<KeyboardLayoutProps> = (props) => {
    const [input, setInput] = useState("");
    const [layoutName, setLayoutName] = useState("default");
    const keyboard = useRef<SimpleKeyboard>();

    const onChange = (input: string) => {
        setInput(input);
        console.log("Input changed", input);
    };

    const handleShift = () => {
        const newLayoutName = layoutName === "default" ? "shift" : "default";
        setLayoutName(newLayoutName);
    };

    const onKeyPress = (button: unknown) => {
        console.log("Button pressed", button);

        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}") handleShift();
    };

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setInput(input);
        keyboard.current?.setInput(input);
    };

    useEffect(() => {
        console.log({ layout })
    }, [])

    return (
        <div className={cx('KeyboardLayout', props.className)}>
            <span className={cx('KeyboardLayout__Title')}>{props.title ?? 'Title'}</span>
            <input
                value={input}
                placeholder={"Tap on the virtual keyboard to start"}
                onChange={onChangeInput}
                className={cx('KeyboardLayout__Input')}
            />
            <Keyboard
                keyboardRef={(r: SimpleKeyboard) => (keyboard.current = r)}
                theme={"hg-theme-default hg-layout-default myTheme"}
                layoutName={layoutName}
                layout={layout}
                display={display}
                onChange={onChange}
                onKeyPress={onKeyPress}
                buttonTheme={[
                    {
                        class: cx("hg-red"),
                        buttons: "W E R T Y q w e r t y"
                    },
                    {
                        class: cx("hg-highlight"),
                        buttons: "Q q"
                    }
                ]}
            />
        </div>
    );
}
