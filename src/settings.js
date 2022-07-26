const settings={

    "Code00" : 13200,
    "Code01" : 13400,
    "Code10" : 13600,
    "Code11" : 13800,

    /*"Code00" : 18200,*/
    /*"Code01" : 18400,*/
    /*"Code10" : 18600,*/
    /*"Code11" : 18800,*/
    "msBetweenDetectSpikes" : 10,

    // both
    "middleFrequency": 5000,
    "msgLowHighHzOffset": 100, // less than this seems to decrease reliability
    "fftSize": 4096,

    // reciver
    "hzBuffer": 200,
    "spikesRoundTo": 100, // should be same as msgLowHighHzOffset but might be useful in the future
    "smoothingTimeConstant": 0,
    "minDecibels": -100, // dont afect getFloatFrequencyData, only getByteFrequencyData
    "maxDecibels": -30,
    "floatORbyte": "float",
    // "floatORbyte": "float",

    "barWidthMultiplier": 1,
    "barHeightOffset_float": 125,
    "barHeightOffset_byte": 0,
    "barHeightMultiplier": 2,
    "labels": "true",
    "labelsFont": "10px Arial",
    "labelsColor": "green",
    "labelsDistance": 50,
    "multiplierCanvasWidth": 0.84,

    "detectDBaddedToAvg_float": 15,
    "detectDBaddedToAvg_byte": 80,
    "maxConsecutiveRunsWithoutSpikes": 50,

    // sender
    "msgBitDelay": 200, // 50 is lowest possible with Float
    "waveType": "sine"
}

export default settings
