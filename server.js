const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { uploadToAWSWithURL, getUrlFromAwsWithKey } = require("./awsS3");

require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");


const config_1 = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

console.log(config_1);

const ai = new OpenAIApi(config_1)

const app = express();
app.use(cors());

app.get('/proxy-image', async (req, res) => {
  try {
    const imageUrl = req.query.url;

    const imageResponse = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: { 'Content-Type': 'image/png' }, // Set the appropriate content type for your image.
    });

    res.set('Content-Type', 'image/png'); // Set the appropriate content type for your image.
    res.send(imageResponse.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Error fetching image.');
  }
});

app.get('/image', async (req, res, next) => {
    try {

        const criteria = req.query.criteria;
        

      let prompt;
        prompt = `Generate an extremely professional movie poster for the following movie script summary. 
        
        ${criteria}`;

        const numberOfImages = 1;
        const imageSize = "1024x1024";

        ai
          .createImage({
            prompt: prompt,
            n: numberOfImages,
            size: imageSize,
          })
          .then(async (data) => {
            let imageKeys = [];

            // result.data.data[0].url
            let imageUrlPromise = uploadToAWSWithURL(data.data.data[0].url);

            const imageUrl = await imageUrlPromise;

  
            return res.json(imageUrl);
  
            // const returns = imageObjects.map((imageObj, idx) => {
            //   // // console.log(imageObj)
            //   const resObj = {...imageObj.toObject(),
            //     tempUrl: tempUrls[idx]
            //   };
  
            //   return resObj
            // })
  
            // // list.save();
  
            // return res.json({
            //   list: list,
            //   images: returns,
            // });
          });
  
    } catch (err) {
        // debugger
      return res.json(err + "12312312");
    }
})



const port = 3001; // Choose any available port you prefer.
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});