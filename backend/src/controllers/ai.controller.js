const aiService = require('../services/ai.services')

const aiReview = async (req, res) => {
    const code = req.body.code;

    if(!code){
        res.status(400).send("Prompt is required")
    }

    //send the prompt to GEMINI
    const response = await aiService(code);
    
    //send the AI Response to user
    res.status(201).send(response);
}

module.exports = aiReview;