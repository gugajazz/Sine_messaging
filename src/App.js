import logo from './logo.svg';
import './app.css';
import settings from "./settings";
import {useRef, useState} from "react";
import Sender from "./Sender";
import Receiver from "./Receiver";

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
                <br/><br/>

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
                <br/><br/>

                <button onClick={ () => {
                    setPage("receive")
                }}>
                    Go To {nextPage}
                </button>

                <Receiver/>
            </div>

        )
    }

    return (

        <div>
            <br/><br/>

            <button onClick={ () => {
                if (nextPage === "receive") {
                    setPage("send")
                } else {
                    setPage("receive")
                }
            }}>
                Go To {nextPage}
            </button>


            <Sender/>
        </div>

    );


}

export default App;
