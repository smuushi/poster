import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { s3 } from './awsConfig';
import axios from 'axios';
import { FileType } from "aws-sdk/clients/iot";


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
    const [apiResponse, setApiResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [setImageObjectURL, imageObjectURL] = useState("")

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let promptt = `summarize the following movie script into 200 characters.. ${prompt}`
        try {
            debugger
            const result = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: promptt,
                temperature: 0.5,
                max_tokens: 4000,
              });
            //console.log("response", result.data.choices[0].text);
            debugger
            setApiResponse(result.data.choices[0].text);

            let res = await fetch("http://localhost:3001/image?criteria=" + result.data.choices[0].text)
            debugger;
            // setApiResponse("")

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


    async function uploadImageToS3(url) {
        // Fetch the image from the provided URL.
        // debugger

        // const response = await axios.get(url, { responseType: 'arraybuffer' });
        // const imageBuffer = Buffer.from(response.data, 'binary');

        // debugger

        // const res = await fetch(url, {
        //     mode: "no-cors"
        // });

        // const response = await fetch(url);

        // if (!response.ok) {
        //     throw new Error('Failed to fetch image from the URL');
        // }

        // const imageBlob = await response.blob();

        // return axios.get(url, {
        //     responseType: 'arraybuffer'
        //   })
        //   .then(response => {
        //     const buffer = Buffer.from(response.data, 'base64');
        //     return (async () => {
        //       let type = (await FileType.fromBuffer(buffer)).mime
        //     //   return uploadAttachmentToS3(type, buffer)
        //     })();
        //   })
        //   .catch(err => {
        //     return {type: 'error', err: err}
        //   }); 

        // debugger;

        // const blob = await res.blob();


        // const arrayBuffer = await blob.arrayBuffer();

        // const buffer = Buffer.from(arrayBuffer)

        // debugger


        // axios.get("http://localhost:3001/cors-proxy?url=" + url, { responseType: 'arraybuffer' }).then((response) => {
        //         debugger
        //         console.log(response)
        //         const imageBuffer = Buffer.from(response.data, 'binary');
        //         debugger;
        //         // Upload the image to AWS S3.
        //         const params = {
        //         Bucket: 'postergenbucket-public', // Replace with your AWS S3 bucket name.
        //         Key: prompt.slice(0, 30), // The name of the image file on S3.
        //         Body: imageBuffer,
        //         ContentType: 'img/png', // Adjust this based on the actual image type.
        //         };
      
        //         s3.upload(params, (err, data) => {
        //         if (err) {
        //             console.error('Error uploading image to S3:', err);
        //         } else {
        //             console.log('Image uploaded successfully:', data.Location);
        //             // You can do further processing or handle success here.
        //         }
        //         });
        //     })
        //   .catch((error) => {
        //     console.error('Error fetching image:', error);
        // });
    }
      

    // function imageToBlob(imgElement) {
    //     return new Promise((resolve) => {
    //       const canvas = document.createElement('canvas');
    //       canvas.width = imgElement.width;
    //       canvas.height = imgElement.height;
      
    //       const ctx = canvas.getContext('2d');
    //       ctx.drawImage(imgElement, 0, 0);
      
    //         debugger
    //       canvas.toBlob((blob) => {
    //         resolve(blob);
    //       });
    //     });
    //   }
      
      // Usage example
    //   const imgElement = document.querySelector('img'); // Replace this with your reference to the <img> tag
    //   if (imgElement) {
    //     imageToBlob(imgElement).then((blob) => {
    //       // Now you can use the Blob for further processing or upload it to AWS S3.
    //       console.log(blob);
    //     });
    //   }


    const savePoster = () => {
        debugger
        // const imgEle = document.querySelector('img')
        // imageToBlob(imgEle).then((blob) => {
        //         debugger
        //           // Now you can use the Blob for further processing or upload it to AWS S3.
        //           const objectURL = URL.createObjectURL(blob);
        //           setImageObjectURL(objectURL);
        //         });



        uploadImageToS3(apiResponse);

    }

    return (
        <>
            
            Paste your moviescript below
            <br />
            {apiResponse? 
                <>
                    Want to save?
                    <section>
                        <button onClick={submit}>Regenerate</button>
                        <button onClick={() => {
                            setPrompt("");
                            setApiResponse("");
                        }}>Start Over</button>
                        <button onClick={savePoster}>Save Poster</button>
                    </section>
                </>

                :

                <form onSubmit={submit}>
                    <textarea placeholder="Script here" onChange={changeHandler}>
                    </textarea>

                    <button type="submit">
                        Submit for generation
                    </button>
                </form>

            }


            <br />

                {/* {apiResponse} */}

            <br />
            {/* {prompt} */}

            {loading? <span> loading image... </span> : <></>  }
            {/* {apiResponse? <img crossOrigin="anonymous" src={apiResponse} alt="poster" /> : <></>} */}

            {apiResponse? <img src={apiResponse} alt="poster" /> : <></>}

        </>


    )
    
}

export default Generator;