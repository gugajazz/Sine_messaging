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
    const [maxConsecutiveRunsWithoutSpikes, setMaxConsecutiveRunsWithoutSpikes] = useState(settings.maxConsecutiveRunsWithoutSpikes);
    const [detectDBaddedToAvg_float, setDetectDBaddedToAvg_float] = useState(settings.detectDBaddedToAvg_float);
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
        setMaxConsecutiveRunsWithoutSpikes("");
        setDetectDBaddedToAvg_float("");
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
        if(typeof maxConsecutiveRunsWithoutSpikes==="number"){ settings.maxConsecutiveRunsWithoutSpikes = maxConsecutiveRunsWithoutSpikes }
        if(typeof detectDBaddedToAvg_float==="number"){ settings.detectDBaddedToAvg_float = detectDBaddedToAvg_float }
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
        setMaxConsecutiveRunsWithoutSpikes("");
        setDetectDBaddedToAvg_float("");
        setHzBuffer("");
        setSpikesRoundTo("");

    };


    return (
        <div className="controls">


            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    value={Code00}
                    onChange={event => setCode00(parseInt(event.target.value))}
                    placeholder={settings.Code00.toString()}
                />

                <input
                    type="text"
                    value={Code01}
                    onChange={event => setCode01(parseInt(event.target.value))}
                    placeholder={settings.Code01.toString()}
                />

                <input
                    type="text"
                    value={Code10}
                    onChange={event => setCode10(parseInt(event.target.value))}
                    placeholder={settings.Code10.toString()}
                />

                <input
                    type="text"
                    value={Code11}
                    onChange={event => setCode11(parseInt(event.target.value))}
                    placeholder={settings.Code11.toString()}
                />

                <input
                    type="text"
                    value={msgBaudDelay}
                    onChange={event => setMsgBaudDelay(parseInt(event.target.value))}
                    placeholder={settings.msgBaudDelay.toString()}
                />

                <input
                    type="text"
                    value={fftSize}
                    onChange={event => setFftSize(parseInt(event.target.value))}
                    placeholder={settings.fftSize.toString()}
                />

                <input
                    type="text"
                    value={msBetweenDetectSpikes}
                    onChange={event => setMsBetweenDetectSpikes(parseInt(event.target.value))}
                    placeholder={settings.msBetweenDetectSpikes.toString()}
                />

                <input
                    type="text"
                    value={maxConsecutiveRunsWithoutSpikes}
                    onChange={event => setMaxConsecutiveRunsWithoutSpikes(parseInt(event.target.value))}
                    placeholder={settings.maxConsecutiveRunsWithoutSpikes.toString()}
                />

                <input
                    type="text"
                    value={detectDBaddedToAvg_float}
                    onChange={event => setDetectDBaddedToAvg_float(parseInt(event.target.value))}
                    placeholder={settings.detectDBaddedToAvg_float.toString()}
                />

                <input
                    type="text"
                    value={hzBuffer}
                    onChange={event => setHzBuffer(parseInt(event.target.value))}
                    placeholder={settings.hzBuffer.toString()}
                />

                <input
                    type="text"
                    value={spikesRoundTo}
                    onChange={event => setSpikesRoundTo(parseInt(event.target.value))}
                    placeholder={settings.spikesRoundTo.toString()}
                />


                <button type="submit">Submit form</button>
            </form>


        </div>
    );

}

export default SetSettings;