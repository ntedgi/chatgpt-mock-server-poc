const { Configuration, OpenAIApi } = require("openai");
const spec = require("./spec.json");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function buildPrompt(spec,request,size) {
  return `
        your task is to be an api with this parameter definition: 
        ${JSON.stringify(spec)}
        that returns response with in json format
        the response format is json with data property
        you need to return json with realistic data for this GET request ${request}
        dont return more than ${size} items dont return code

    `;
}

async function runCompletion(prompt) {
  let out = "";
  try {
    const res = await openai.createCompletion(
      {
        model: "text-davinci-003",
        prompt,
        max_tokens: 300,
        temperature: 0,
        stream: true,
      },
      { responseType: "stream" }
    );
    res.data.on("finish", () => {
      console.log(out);
    });
    res.data.on("close", () => {
      console.log(out);
    });
    res.data.on("data", (data) => {
      const lines = data
        .toString()
        .split("\n")
        .filter((line) => line.trim() !== "");
      for (const line of lines) {
        const message = line.replace(/^data: /, "");
        if (message === "[DONE]") {
          return; // Stream finished
        }
        try {
          const parsed = JSON.parse(message);
          out += parsed.choices[0].text;
        } catch (error) {
          console.error("Could not JSON parse stream message", message, error);
        }
      }
    });
  } catch (error) {
    if (error.response?.status) {
      console.error(error.response.status, error.message);
      error.response.data.on("data", (data) => {
        const message = data.toString();
        try {
          const parsed = JSON.parse(message);
          console.error("An error occurred during OpenAI request: ", parsed);
        } catch (error) {
          console.error("An error occurred during OpenAI request: ", message);
        }
      });
    } else {
      console.error("An error occurred during OpenAI request", error);
    }
  }
}

const request =
  "advertisers/v2/reports?breakdowns=day,campaign,country,deviceType&metrics=impressions,clicks,completions,spend&count=100&startDate=2018-03-14&endDate=2018-04-07&country=US,CA,GB,FR&os=android&order=day&direction=desc";
runCompletion(buildPrompt(spec, request,2));
