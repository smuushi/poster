import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";


const Generator = () => {


    

    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    
    console.log(process.env);
    console.log(process.env.REACT_APP_OPENAI_API_KEY);
    // console.log("asdfasdfasdf")
    
    const openai = new OpenAIApi(configuration);
    console.log(openai)
    const [prompt, setPrompt] = useState("");
    const [apiResponse, setApiResponse] = useState("greate");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const result = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024"
        });
        //console.log("response", result.data.choices[0].text);
        setApiResponse(result.data.data[0].url);
    } catch (e) {

        console.log(e);
        setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
    }

    console.log(apiResponse);

    const changeHandler = (e) => {
        // debugger
        setPrompt(() => e.target.value)
    }

    return (
        <>
            
            Paste your moviescript below
            <br />
            <form onSubmit={submit}>

            <textarea placeholder="Script here" onChange={changeHandler}>
            </textarea>

            <button type="submit">
                Submit for generation
            </button>

            </form>
            {apiResponse}
            <br />
            {prompt}

        </>


    )
    
}

export default Generator;