import {useEffect, useRef, useState} from "react";
import settings from "./settings";

function Receiver() {

    //console.log("start");

    let output

    let consecutiveRunsWithoutSpikes;

    const [ledStatus, setLedStatus] = useState("led-off");
    const [ripplesStatus, setRipplesStatus] = useState({"visibility": "hidden"});

    /*const [audioCtx, setAudioCtx] = useState(new window.AudioContext());
    const [analyser, setAnalyser] = useState(audioCtx.createAnalyser());
    const [bufferLength, setBufferLength] = useState(0);
    const [dataArray, setDataArray] = useState(null);

    const [distortion, setDistortion] = useState(audioCtx.createWaveShaper());
    const [gainNode, setGainNode] = useState(audioCtx.createGain());
    const [biquadFilter, setBiquadFilter] = useState(audioCtx.createBiquadFilter());
    const [convolver, setConvolver] = useState(audioCtx.createConvolver());
    const [muted, setMuted] = useState(true);*/

    //const [audioCtx, setAudioCtx] = useState(window.AudioContext);
    /*const [analyser, setAnalyser] = useState(null);
    const [bufferLength, setBufferLength] = useState(0);
    const [dataArray, setDataArray] = useState(null);

    const [distortion, setDistortion] = useState(null);
    const [gainNode, setGainNode] = useState(null);
    const [biquadFilter, setBiquadFilter] = useState(null);
    const [convolver, setConvolver] = useState(null);
    const [muted, setMuted] = useState(true);*/

    const audioCtx = useRef()
    const analyser = useRef()
    const bufferLength = useRef()
    const dataArray = useRef()
    const distortion = useRef()
    const gainNode = useRef()
    const biquadFilter = useRef()
    const convolver = useRef()
    const muted = useRef(true)
    const source = useRef()

    const detectSpikesFuncHandler = useRef();


    /*useEffect(() => {

        console.log("start use effect");

        setAudioCtx( new window.AudioContext() )

        //set up the different audio nodes we will use for the app
        setAnalyser(audioCtx.createAnalyser() )
        //analyser.minDecibels = settings.minDecibels;
        //analyser.maxDecibels = settings.maxDecibels;
        analyser.smoothingTimeConstant = settings.smoothingTimeConstant;

        //analyser.fftSize = settings.fftSize; // directly related to amount of bars. (2^n)
        //console.log("analyser.fftSize"+analyser.fftSize/2)

        // fftSize -> A higher value will result in more details in the frequency domain but fewer details in the time domain.
        setBufferLength(state => (analyser.fftSize/2)); // somehow we need a bigger number here to visualize higher frequencies
        //setBufferLength(state => (69)); // somehow we need a bigger number here to visualize higher frequencies
        console.log("BufferLength:"+bufferLength)

        //setDataArray(state => ({ ...state, new Float32Array(bufferLength) }))

        //console.log("sample rate " + audioCtx.sampleRate);

        //setDistortion( state => ({ ...state, audioCtx.createWaveShaper() }) );
        //setGainNode( state => ({ ...state, audioCtx.createGain() }) );
        //setBiquadFilter( state => ({ ...state, audioCtx.createBiquadFilter() }) );
        //setConvolver( state => ({ ...state, audioCtx.createConvolver() }) );

        //audioCtx.suspend()
        //setupAudio()
    });*/

    /*useEffect(() => {
        muted.current = true
    }, []);*/


    async function setupAudio() {

        audioCtx.current = new window.AudioContext()

        console.log(audioCtx.current);

        //set up the different audio nodes we will use for the app
        analyser.current = audioCtx.current.createAnalyser()
        //analyser.minDecibels = settings.minDecibels;
        //analyser.maxDecibels = settings.maxDecibels;
        analyser.smoothingTimeConstant = settings.smoothingTimeConstant;

        analyser.fftSize = settings.fftSize; // directly related to amount of bars. (2^n)
        //console.log("analyser.fftSize"+analyser.fftSize/2)

        // fftSize -> A higher value will result in more details in the frequency domain but fewer details in the time domain.
        bufferLength.current = analyser.fftSize / 2; // somehow we need a bigger number here to visualize higher frequencies
        //setBufferLength(state => (69)); // somehow we need a bigger number here to visualize higher frequencies
        console.log("BufferLength:" + bufferLength)

        dataArray.current = new Float32Array(bufferLength)

        //console.log("sample rate " + audioCtx.sampleRate);

        distortion.current = audioCtx.current.createWaveShaper();
        gainNode.current = audioCtx.current.createGain();
        biquadFilter.current = audioCtx.current.createBiquadFilter();
        convolver.current = audioCtx.current.createConvolver();

        audioCtx.current.suspend()

        if (navigator.mediaDevices.getUserMedia) {
            //console.log('getUserMedia supported.');
            //console.log("navigator.mediaDevices"+navigator.mediaDevices)

            let stream;

            try {
                try {
                    stream = await navigator.mediaDevices.getUserMedia({
                        audio: {
                            echoCancellation: false,
                            mozAutoGainControl: false,
                            mozNoiseSuppression: false,
                            googEchoCancellation: false,
                            googAutoGainControl: false,
                            googNoiseSuppression: false,
                            googHighpassFilter: false
                        }
                    });
                } catch (err) {
                    console.log('Error with getUserMedia:' + err);
                }


                /* use the stream */
                source.current = audioCtx.current.createMediaStreamSource(stream);
                source.current.connect(analyser.current);
                analyser.current.connect(distortion.current);
                distortion.current.connect(biquadFilter.current);
                biquadFilter.current.connect(convolver.current);
                convolver.current.connect(gainNode.current);
                gainNode.current.connect(audioCtx.current.destination);
            } catch (err) {
                console.log('The following gUM error occured: ' + err);
            }

        } else {
            console.log('getUserMedia not supported on your browser!');
        }
    }

    function freq2index(freq){
        // i * ((audioCtx.sampleRate/2) / bufferLength) = f
        return (2*bufferLength*freq)/audioCtx.sampleRate
    }

    function index2freq(i){
        // i * ((audioCtx.sampleRate/2) / bufferLength) = f
        return Math.round((i*audioCtx.sampleRate)/(2*bufferLength))
    }

    function binary2text(binaryStr){
        let finalStr = ""
        for(let start=0, end=8; end<=binaryStr.length; start+=8, end+=8) {
            let tempStr = binaryStr.slice(start, end)
            //console.log(tempStr)
            //console.log(String.fromCharCode(parseInt(tempStr, 2)))
            finalStr = finalStr.concat(String.fromCharCode(parseInt(tempStr, 2)))
        }
        return finalStr
    }



    function voiceMute() {

        setupAudio()

        /*if (audioCtx.state === 'suspended') {*/
        if (muted.current === true) {
            console.log("mutedSetToFalse");
            //setMuted(false)
            //statusLED.className = 'led-on';
            setLedStatus('led-on')
            /*ripples.style.visibility = "visible";*/
            //setRipplesStatus({"visibility": "visible"})
            audioCtx.current.resume();
            detectSpikesFuncHandler.current = window.setInterval(detectSpikes_float_mfsk, settings.msBetweenDetectSpikes);
            //console.log(settings.msBetweenDetectSpikes);
        }
        else{
            console.log("mutedSetToTrue");
            //setMuted(true)
            //console.log("muted2: " + muted);
            setLedStatus('led-off')
            //setRipplesStatus({"visibility": "hidden"})
            audioCtx.current.suspend();
            clearInterval(detectSpikesFuncHandler.current);

        }

        muted.current = !(muted.current)

    }

    let frequencies = []

    function detectSpikes_float_mfsk() {
        /*if(muted===true){console.log("muted"); return} // does nothing when muted*/
        //console.log("pirililalau")

        console.log("audioCtx.state: " + audioCtx.current.state);

        //let indices = []
        let i
        analyser.current.getFloatFrequencyData(dataArray.current);
        console.log(dataArray.current[29])


        let maxIndex, maxValue=-9999;
        // find the biggest value in the range
        let myMinSpikeIndex=Math.round(freq2index(settings.Code00-100))
        let myMaxSpikeIndex=Math.round(freq2index(settings.Code11+100))
        for(let k=myMinSpikeIndex; k<myMaxSpikeIndex ; k++){
            //console.log(dataArray[k] + " -> " + k);
            if(dataArray[k]>=maxValue){
                maxValue=dataArray[k];
                maxIndex=k;
            }
        }
        //console.log("MAX ->>> " + maxValue + "->" + maxIndex + "->" + index2freq(maxIndex));

        // get avg of everything but the max index and the two surrounding it
        let avgDB=0
        for(i = myMinSpikeIndex-Math.round(freq2index(settings.hzBuffer)); i < myMaxSpikeIndex+Math.round(freq2index(settings.hzBuffer)); i++) {
            if(i!==maxIndex-1 && i!==maxIndex && i!==maxIndex+1){
                avgDB += dataArray[i]
            }
        }
        avgDB /= ((myMaxSpikeIndex+Math.round(freq2index(settings.hzBuffer)))-(myMinSpikeIndex-Math.round(freq2index(settings.hzBuffer)))-3)

        let detectDBaddedToAvg_float = parseFloat(settings.detectDBaddedToAvg_float)
        let dbToBeat = (avgDB+detectDBaddedToAvg_float)
        //console.log("->"+detectDBaddedToAvg_float);

        //console.log(avgDB+settings.detectDBaddedToAvg_float)
        //console.log("dataArray[maxIndex]:"+dataArray[maxIndex] + " detectDBaddedToAvg_float:" + dbToBeat)

        /*console.log(typeof puta);
        console.log(puta);
        console.log(typeof dataArray[maxIndex]);
        console.log(dataArray[maxIndex]);*/
        //console.log(dataArray[maxIndex] > dbToBeat)

        if(dataArray[maxIndex]>dbToBeat){
            setRipplesStatus({"visibility": "visible"})
            /*console.log("Frequencies:" + frequencies.toString()+";")
            console.log("Indices:" + indices.toString()+";")*/
            consecutiveRunsWithoutSpikes=0 // reset because its consecutive runs and we got a spike

            //indices[indices.length] = maxIndex;
            frequencies[frequencies.length] = index2freq(maxIndex);
        }
        else if(frequencies.length !== 0){
            consecutiveRunsWithoutSpikes++;
        }
        else {
            //console.log("clean")
        }

        /*if(frequencies.length!==0){
            ripples.style.visibility = "visible";
            /!*console.log("Frequencies:" + frequencies.toString()+";")
            console.log("Indices:" + indices.toString()+";")*!/
            consecutiveRunsWithoutSpikes=0 // reset because its consecutive runs and we got a spike
        }
        else if(messageFreq.length!==0){ // if no spikes and already started reciving a msg
            consecutiveRunsWithoutSpikes++;
        }*/

        if(consecutiveRunsWithoutSpikes>settings.maxConsecutiveRunsWithoutSpikes){
            console.log("Stopedd");
            consecutiveRunsWithoutSpikes=0 // reset value
            setRipplesStatus({"visibility": "hidden"})
            voiceMute()
            //decode()
            decodeMFSK()

        }
        //console.log("------")

        // console.log("frequencies->" + frequencies)

        // console.log("messageFreq->" + messageFreq)
        //numberOfRuns++
    }

    function decodeMFSK(){

        let messageFreq = []

        console.log("frequencies:"+frequencies);

        // Round frequencies and append to messafeFreq
        while(frequencies.length!==0){
            messageFreq[messageFreq.length] = Math.round(frequencies.shift()/settings.spikesRoundTo)*settings.spikesRoundTo
        }

        frequencies = []

        // middle -> middle-offset = 0
        // middle -> middle+offset = 1
        let msgDecoded = ""

        console.log(messageFreq)
        //let cleanedMessageFreq = cleanDuplicates(messageFreq)
        //console.log("cleanedMessageFreq lenght=" + cleanedMessageFreq.length)

        let Code00 = settings.Code00
        let Code01 = settings.Code01
        let Code10 = settings.Code10
        let Code11 = settings.Code11

        let inicial=0
        let repetitionsArray = []
        let i
        let freqA
        for(i=0; i<messageFreq.length;){
            freqA = messageFreq[inicial]
            if(messageFreq[i]!==freqA){
                repetitionsArray.push([freqA,i-inicial])
                inicial=i
            }
            i++
        }
        repetitionsArray.push([freqA,i-inicial])

        //console.log(repetitionsArray[0][1])

        for(let arr of repetitionsArray){
            console.log(arr + "\n")
        }
        //console.log(repetitionsArray)
        let minimumValue
        let numberOfSignals
        for(let i=0; i<repetitionsArray.length;i++){

            minimumValue=999
            numberOfSignals=undefined
            let d

            for(d=1; d<11 ; d++){ // todo change this because its possible fpr there to be more then 10 repetitions of the same 2 bits
                //console.log("abs:"+Math.abs(((repetitionsArray[i][1] / d) / 20) - 1)
                //+"minimum:"+minimumValue);
                let a = (settings.msgBitDelay / 10) // how many signals we should capture for each 2 bits
                let b = (settings.msgBitDelay / 20) // the half-way point ( ex: if we should capture 10 signals for each 2 bits this should be 5 )
                //console.log("a"+a+" b"+b);
                if(Math.abs(repetitionsArray[i][1]-a*d)<=b){
                    //minimumValue=Math.abs(((repetitionsArray[i][1]/d)/20)-1)
                    numberOfSignals=d
                    break
                }
            }

            console.log("numberOfSignals:" + numberOfSignals);

            if(repetitionsArray[i][0]===Code00){

                for(let j=1; j<=numberOfSignals; j++) {
                    msgDecoded = msgDecoded.concat("00")
                }

            }
            else if(repetitionsArray[i][0]===Code01){

                for(let j=1; j<=numberOfSignals; j++) {
                    msgDecoded = msgDecoded.concat("01")
                }

            }
            else if(repetitionsArray[i][0]===Code10){

                for(let j=1; j<=numberOfSignals; j++) {
                    msgDecoded = msgDecoded.concat("10")
                }

            }
            else if(repetitionsArray[i][0]===Code11){

                for(let j=1; j<=numberOfSignals; j++) {
                    msgDecoded = msgDecoded.concat("11")
                }

            }
            else{
                console.log("Error decoding")
                return
            }
        }

        // without the error checking

        console.log(msgDecoded)

        messageFreq = [] // clear it for new msg
        //return binary2text(msgDecoded.slice(0,msgDecoded.length))
        console.log(binary2text(msgDecoded.slice(0,msgDecoded.length)))

        output.className = "outputCorrect"
        output.value = binary2text(msgDecoded.slice(0,msgDecoded.length))
    }

    return (
        <div className="controls">

            <div className="outerbox">
                <div className={ledStatus} id="statusLED"></div>
                <div style={ripplesStatus} className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>

            <input disabled="disabled" id="outputForMsg" placeholder="recieved text here"/>

            <p>muted is {muted.current.toString()}</p>
            <p>bufferLenght is {bufferLength.current}</p>

            <button onClick={voiceMute}>
                Toggle Mute
            </button>



        </div>
    );

}

export default Receiver;