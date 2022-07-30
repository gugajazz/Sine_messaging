import {useRef, useState} from "react";
import settings from "./settings";

function Sender() {

    const inputValue = useRef(null);
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function text2Binary(string) {
        let final = ""
        for (let start = 0, end = 1; end <= string.length; start++, end++) {
            let tempStr = string.slice(start, end)
            //console.log(tempStr)

            let returnStr = ""
            returnStr = tempStr.split('').map(function (char) {
                return char.charCodeAt(0).toString(2);
            }).join(' ');

            while (returnStr.length < 8) {
                returnStr = "0".concat(returnStr)
            }

            //console.log(returnStr.toString())
            final = final.concat(returnStr.toString())

        }
        return final
    }

    function sendMFSK() {

        //console.log(inputValue.current.value)

        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }

        delay(2000).then(() => {

            let Code00 = settings.Code00
            let Code01 = settings.Code01
            let Code10 = settings.Code10
            let Code11 = settings.Code11

            // Get text to send from input field
            /*let text = document.querySelector('#msgToSend').value*/
            let text = inputValue.current.value

            let binaryStr = text2Binary(text)
            console.log(binaryStr)

            let arrayOfFrequenciesSent = []

            let oscillator = audioCtx.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(0, audioCtx.currentTime); // value in hertz
            oscillator.connect(audioCtx.destination);
            oscillator.start()

            //audioCtx.resume()
            let timeDelay = settings.msgBaudDelay
            //timeDelay = 0
            let bursts = 0

            let delayToSet = 0
            let delayToRemoveOnLast = 50

            for (let i = 0; i < binaryStr.length; i = i + 2) {
                if (binaryStr[i] === "0" && binaryStr[i + 1] === "0") {
                    delayToSet += settings.msgBaudDelay
                    //console.log(delayToSet);
                    delay(delayToSet).then(() => {
                        oscillator.frequency.setValueAtTime(Code00, audioCtx.currentTime); // value in hertz
                        //console.log(Code00)
                        arrayOfFrequenciesSent[arrayOfFrequenciesSent.length] = Code00
                    });
                    if (i === binaryStr.length - 2) {
                        //console.log("fim");
                        delayToSet += (settings.msgBaudDelay - delayToRemoveOnLast)
                        delay(delayToSet).then(() => {
                            oscillator.stop()
                            console.log(arrayOfFrequenciesSent)
                            //console.log("bursts " + bursts)
                        });
                    }
                } else if (binaryStr[i] === "0" && binaryStr[i + 1] === "1") {
                    delayToSet += settings.msgBaudDelay
                    //console.log(delayToSet);
                    delay(delayToSet).then(() => {
                        oscillator.frequency.setValueAtTime(Code01, audioCtx.currentTime); // value in hertz
                        //console.log(Code01)
                        arrayOfFrequenciesSent[arrayOfFrequenciesSent.length] = Code01
                    });
                    if (i === binaryStr.length - 2) {
                        //console.log("fim");
                        delayToSet += (settings.msgBaudDelay - delayToRemoveOnLast)
                        delay(delayToSet).then(() => {
                            oscillator.stop()
                            console.log(arrayOfFrequenciesSent)
                            //console.log("bursts " + bursts)
                        });
                    }
                } else if (binaryStr[i] === "1" && binaryStr[i + 1] === "0") {
                    delayToSet += settings.msgBaudDelay
                    //console.log(delayToSet);
                    delay(delayToSet).then(() => {
                        oscillator.frequency.setValueAtTime(Code10, audioCtx.currentTime); // value in hertz
                        //console.log(Code10)
                        arrayOfFrequenciesSent[arrayOfFrequenciesSent.length] = Code10

                    });
                    if (i === binaryStr.length - 2) {
                        //console.log("fim");
                        delayToSet += (settings.msgBaudDelay - delayToRemoveOnLast)
                        delay(delayToSet).then(() => {
                            oscillator.stop()
                            console.log(arrayOfFrequenciesSent)
                            //console.log("bursts " + bursts)
                        });
                    }
                } else if (binaryStr[i] === "1" && binaryStr[i + 1] === "1") {
                    delayToSet += settings.msgBaudDelay
                    //console.log(delayToSet);
                    delay(delayToSet).then(() => {
                        oscillator.frequency.setValueAtTime(Code11, audioCtx.currentTime); // value in hertz
                        //console.log(Code11)
                        arrayOfFrequenciesSent[arrayOfFrequenciesSent.length] = Code11
                    });
                    if (i === binaryStr.length - 2) {
                        //console.log("fim");
                        delayToSet += (settings.msgBaudDelay - delayToRemoveOnLast)
                        delay(delayToSet).then(() => {
                            oscillator.stop()
                            console.log(arrayOfFrequenciesSent)
                            //console.log("bursts " + bursts)
                        });
                    }
                } else {
                    console.log("Error (not good)")
                }
            }
        });
    }

    document.body.style = 'background: #383838;';


    return (

        <div>


            <br/><br/>

            <input type="text" ref={inputValue} autoComplete="off" id="msgToSend" placeholder="Text to send here"/>

            <br/><br/>

            <button onClick={sendMFSK}>
                Send
            </button>

        </div>


    );

}

export default Sender;