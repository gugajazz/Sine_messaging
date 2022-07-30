import logo from './logo.svg';
import './app.css';
import settings from "./settings";
import {useRef, useState} from "react";
import Sender from "./Sender";
import Receiver from "./Receiver";
import Settings from "./settings";
import SetSettings from "./SetSettings";

// TODO when building minimize and ofuscate the code
// TODO on page itself modify the settings.js (and remove unused stuff)
// TODO change logo
// TODO add error warning and maybe bring back error checking
// TODO add support for firefox and ios

function App() {

    const [nextPage, setPage] = useState("receive");

    document.body.style = 'background: #383838;';

    if (nextPage === "receive") {
        return (
            <div>

                <button id="gearBtn" onClick={ () => {
                    setPage("settings")
                }}>⚙</button>

                <br/><br/><br/><br/>

                <button onClick={ () => {
                        setPage("send")
                }}>
                    Go To {nextPage}
                </button>

                <Sender/>

            </div>
        )
    }
    else if(nextPage === "send"){
        return (

            <div>
                <button id="gearBtn" onClick={ () => {
                    setPage("settings")
                }}>⚙</button>

                <br/><br/><br/><br/>

                <button onClick={ () => {
                    setPage("receive")
                }}>
                    Go To {nextPage}
                </button>

                <Receiver/>
            </div>

        )
    }
    else if(nextPage === "settings"){
        return (

            <div>
                <br/><br/>

                <button onClick={ () => {
                    setPage("send")
                }}>
                    Go To Receive
                </button>

                <button onClick={ () => {
                    setPage("receive")
                }}>
                    Go To Send
                </button>

                <SetSettings/>
            </div>

        )
    }




}

export default App;
