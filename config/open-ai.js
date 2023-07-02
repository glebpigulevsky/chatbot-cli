import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from 'env';


const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);
 
export default openai;