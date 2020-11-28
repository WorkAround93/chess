import React, { useEffect, useReducer, useState } from "react";
import InformationProvider from "./components/chessComponents/game/InformationProvider";
import { savedState } from "./datastructure/state/savedStates/savedState";
import State from "./datastructure/state/state";
import { stateReducer } from "./reducer/StateReducer";
import Caption from "./components/caption/Caption";
import styled, { ThemeProvider } from "styled-components";
import * as theme from "./components/styles/GlobalStyles";

function App() {
    const [cgs, setCgs] = useReducer(
        stateReducer,
        new State(savedState, false)
    );

    useEffect(() => {}, [cgs]);

    return (
        <ThemeProvider theme={theme.globalTheme}>
            <MainWrapper>
                <Caption />
                <InformationProvider state={cgs} dispatch={setCgs} />
            </MainWrapper>
        </ThemeProvider>
    );
}

const MainWrapper = styled.div`
    position: fixed;
    min-width: 100%;
    min-height: 100%;
    background-color: ${(props) => props.theme.dark.background};
    foreground-color: ${(props) => props.theme.dark.foreground};
`;

export default App;
