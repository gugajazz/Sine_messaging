// TODO MAKE IT RUN THE CAPTURE ONLY ON A GIVEN RANGE OF FREQUENCIES TO BE FASTER\
// noinspection DuplicatedCode

import {useEffect, useRef, useState} from "react";
import settings from "./settings";

function SetSettings() {

    const [Code00, setCode00] = useState(settings.Code00);
    const [Code01, setCode01] = useState(settings.Code01);
    const [Code10, setCode10] = useState(settings.Code10);
    const [Code11, setCode11] = useState(settings.Code11);
    const [msgBaudDelay, setMsgBaudDelay] = useState(settings.msgBaudDelay);
    const [fftSize, setFftSize] = useState(settings.fftSize);
    const [msBetweenDetectSpikes, setMsBetweenDetectSpikes] = useState(settings.msBetweenDetectSpikes);
    const [maxRunsNoSpikes, setMaxRunsNoSpikes] = useState(settings.maxRunsNoSpikes);
    const [detectDBaddedToAvg, setDetectDBaddedToAvg] = useState(settings.detectDBaddedToAvg);
    const [hzBuffer, setHzBuffer] = useState(settings.hzBuffer);
    const [spikesRoundTo, setSpikesRoundTo] = useState(settings.spikesRoundTo);

    useEffect(() => {
        setCode00("");
        setCode01("");
        setCode10("");
        setCode11("");
        setMsgBaudDelay("");
        setFftSize("");
        setMsBetweenDetectSpikes("");
        setMaxRunsNoSpikes("");
        setDetectDBaddedToAvg("");
        setHzBuffer("");
        setSpikesRoundTo("");
    }, []);

    const handleSubmit = event => {
        console.log('handleSubmit ran');
        event.preventDefault(); // prevent page refresh

        if(typeof Code00==="number"){ settings.Code00 = Code00 }
        if(typeof Code01==="number"){ settings.Code01 = Code01 }
        if(typeof Code10==="number"){ settings.Code10 = Code10 }
        if(typeof Code11==="number"){ settings.Code11 = Code11 }

        if(typeof msgBaudDelay==="number"){ settings.msgBaudDelay = msgBaudDelay }
        if(typeof fftSize==="number"){ settings.fftSize = fftSize }
        if(typeof msBetweenDetectSpikes==="number"){ settings.msBetweenDetectSpikes = msBetweenDetectSpikes }
        if(typeof maxRunsNoSpikes==="number"){ settings.maxRunsNoSpikes = maxRunsNoSpikes }
        if(typeof detectDBaddedToAvg==="number"){ settings.detectDBaddedToAvg = detectDBaddedToAvg }
        if(typeof hzBuffer==="number"){ settings.hzBuffer = hzBuffer }
        if(typeof spikesRoundTo==="number"){ settings.spikesRoundTo = spikesRoundTo }


        // clear all input values in the form
        setCode00("");
        setCode01("");
        setCode10("");
        setCode11("");
        setMsgBaudDelay("");
        setFftSize("");
        setMsBetweenDetectSpikes("");
        setMaxRunsNoSpikes("");
        setDetectDBaddedToAvg("");
        setHzBuffer("");
        setSpikesRoundTo("");

    };


    return (
        <div className="controls">


            <form id="settingsForm" onSubmit={handleSubmit}>

                <label>Code00</label>
                <input
                    type="text"
                    value={Code00}
                    onChange={event => {
                        if(event.target.value===""){setCode00("")}
                        else if(!isNaN(event.target.value)){
                            setCode00(parseInt(event.target.value))
                        }
                    }}
                    placeholder={settings.Code00.toString()}
                />

                <label>Code01</label>
                <input
                    type="text"
                    value={Code01}
                    onChange={event => {
                        if(event.target.value===""){setCode01("")}
                        else if(!isNaN(event.target.value)){
                            setCode01(parseInt(event.target.value))
                        }
                    }}
                    placeholder={settings.Code01.toString()}
                />

                <label>Code10</label>
                <input
                    type="text"
                    value={Code10}
                    onChange={event => {
                        if(event.target.value===""){setCode10("")}
                        else if(!isNaN(event.target.value)){
                            setCode10(parseInt(event.target.value))
                        }
                    }}
                    placeholder={settings.Code10.toString()}
                />

                <label>Code11</label>
                <input
                    type="text"
                    value={Code11}
                    onChange={event => {
                        if(event.target.value===""){setCode11("")}
                        else if(!isNaN(event.target.value)){
                            setCode11(parseInt(event.target.value))
                        }
                    }}
                    placeholder={settings.Code11.toString()}
                />

                <label>msgBaudDelay</label>
                <input
                    type="text"
                    value={msgBaudDelay}
                    onChange={event => {
                        if(event.target.value===""){setMsgBaudDelay("")}
                        else if(!isNaN(event.target.value)){
                            setMsgBaudDelay(parseInt(event.target.value))
                        }
                    }}
                    placeholder={settings.msgBaudDelay.toString()}
                />

                <label>fftSize</label>
                <input
                    type="text"
                    value={fftSize}
                    onChange={event => {
                        if(event.target.value===""){setFftSize("")}
                        else if(!isNaN(event.target.value)){
                            setFftSize(parseInt(event.target.value))
                        }
                    }}
                    placeholder={settings.fftSize.toString()}
                />

                <label>msBetweenDetectSpikes</label>
                <input
                    type="text"
                    value={msBetweenDetectSpikes}
                    onChange={event => {
                        if(event.target.value===""){setMsBetweenDetectSpikes("")}
                        else if(!isNaN(event.target.value)){
                            setMsBetweenDetectSpikes(parseInt(event.target.value))
                        }
                    }}
                    placeholder={settings.msBetweenDetectSpikes.toString()}
                />

                <label>setMaxRunsNoSpikes</label>
                <input
                    type="text"
                    value={maxRunsNoSpikes}
                    onChange={event => {
                        if(event.target.value===""){setMaxRunsNoSpikes("")}
                        else if(!isNaN(event.target.value)){
                            setMaxRunsNoSpikes(parseInt(event.target.value))
                        }
                    }}
                    placeholder={settings.maxRunsNoSpikes.toString()}
                />

                <label>detectDBaddedToAvg</label>
                <input
                    type="text"
                    value={detectDBaddedToAvg}
                    onChange={event => {
                        if(event.target.value===""){setDetectDBaddedToAvg("")}
                        else if(!isNaN(event.target.value)){
                            setDetectDBaddedToAvg(parseInt(event.target.value))
                        }
                    }}
                    placeholder={settings.detectDBaddedToAvg.toString()}
                />


                <label>hzBuffer</label>
                <input
                    type="text"
                    value={hzBuffer}
                    onChange={event => {
                        if(event.target.value===""){setHzBuffer("")}
                        else if(!isNaN(event.target.value)){
                            setHzBuffer(parseInt(event.target.value))
                        }
                    }}
                    placeholder={settings.hzBuffer.toString()}
                />

                <label>spikesRoundTo</label>
                <input
                    type="text"
                    value={spikesRoundTo}
                    onChange={event => {
                        if(event.target.value===""){setSpikesRoundTo("")}
                        else if(!isNaN(event.target.value)){
                            setSpikesRoundTo(parseInt(event.target.value))
                        }
                    }}
                    placeholder={settings.spikesRoundTo.toString()}
                />

            </form>

            <br/><br/>

            <button id="submitFormBtn" type="submit" form="settingsForm" value="Update">Submit form</button>

        </div>
    );

}

export default SetSettings;