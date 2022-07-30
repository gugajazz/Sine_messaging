const settings={


    // Receiver && Sender
    "Code00" : 18200,   // 13200
    "Code01" : 18400,   // 13400
    "Code10" : 18600,   // 13600
    "Code11" : 18800,   // 13800
    "msgBaudDelay": 200, // 50 is the lowest possible with Float

    // Receiver
    "fftSize": 4096,
    "msBetweenDetectSpikes" : 10,
    "maxRunsNoSpikes": 50,
    "detectDBaddedToAvg": 15,
    "hzBuffer": 200,
    "spikesRoundTo": 100, // should be same as msgLowHighHzOffset but might be useful in the future
    "smoothingTimeConstant": 0,

    // Optimization todo
    /*"minDecibels": -100, // dont afect getFloatFrequencyData, only getByteFrequencyData
    "maxDecibels": -30,*/

    // Canvas visualizer todo
    /*"barWidthMultiplier": 1,
    "barHeightOffset_float": 125,
    "barHeightOffset_byte": 0,
    "barHeightMultiplier": 2,
    "labels": "true",
    "labelsFont": "10px Arial",
    "labelsColor": "green",
    "labelsDistance": 50,
    "multiplierCanvasWidth": 0.84,*/
}

export default settings
