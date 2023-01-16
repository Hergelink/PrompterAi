const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const promptGenerator = async (req, res) => {
  const promptData = req.body.data;
  const description = promptData.description;
  const color = promptData.colorSelection;
  const style = promptData.styleSelection;

  console.log(description);
  console.log(color);
  console.log(style);

  const promt = `Color Selection: ${color}, Style Selection: ${style}, Description: ${description}. Use these ideas to create great resulting text to image prompts. The color must be highlited`;
  const promtt = `generate a dall-e prompt with ${color} for a fox cartoon character in a mystical dark forest`;
  console.log(promt);
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: promt,
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      best_of: 1,
    });

    const aiOutput = response.data.choices[0].text;

    res.status(200).json({
      success: true,
      data: aiOutput,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'Prompt cannot be generated',
    });
  }
};

module.exports = { promptGenerator };
