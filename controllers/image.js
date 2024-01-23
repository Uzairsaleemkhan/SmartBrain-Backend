const nodefetch = require('node-fetch');
const handleImage=db=> (req,res)=>{

    const {id}= req.body;
    db('users').where('id','=',id).increment('entries',1).returning('entries').then(entries=>{
        console.log(entries)
        res.json(entries[0].entries);
    })
    .catch(err=>{
        res.status(400).json('unable to update entries!!')
    })
  
}


const detectImage= (req,res)=>{
    const PAT = '872ed8e7dbbd4d41b80ab5d188290ab6';
    const USER_ID = 'q4td8hkkwz66';
    const APP_ID = 'face-detection';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    const IMAGE_URL = req.body.input;
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL,
                    }
                }
            }
        ]
    });
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

     nodefetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response=>{
       return response.json()
    })
    .then(result=> {
        console.log(result)
        return res.json(result)
    })
    .catch( err=>{
        console.log('error retrieving the image info')
        return res.status(400).json('error retrieving image detection data');
    })
}


module.exports ={
    handleImage,
    detectImage
}