// TODO MAKE IT RUN THE CAPTURE ONLY ON A GIVEN RANGE OF FREQUENCIES TO BE FASTER\

import {useEffect, useRef, useState} from "react";
import settings from "./settings";

function SetSettings() {

    const [Code00, setCode00] = useState(settings.Code00);
    const [Code01, setCode01] = useState(settings.Code01);
    const [Code10, setCode10] = useState(settings.Code10);
    const [Code11, setCode11] = useState(settings.Code11);

    useEffect(() => {
        setCode00("");
        setCode01("");
        setCode10("");
        setCode11("");
    }, []);

    const handleSubmit = event => {
        console.log('handleSubmit ran');
        event.preventDefault(); // prevent page refresh

        if(typeof Code00==="number"){ settings.Code00 = Code00 }
        if(typeof Code01==="number"){ settings.Code01 = Code01 }
        if(typeof Code10==="number"){ settings.Code10 = Code10 }
        if(typeof Code11==="number"){ settings.Code11 = Code11 }

        console.log(typeof Code00);
        console.log(typeof Code01);


        console.log(settings.Code11);

        // clear all input values in the form
        setCode00("");
        setCode01("");
        setCode10("");
        setCode11("");
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

                <button type="submit">Submit form</button>
            </form>


        </div>
    );

}

export default SetSettings;