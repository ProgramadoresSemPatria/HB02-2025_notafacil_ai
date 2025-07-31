import dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();

const API_KEY = process.env.OPENROUTER_API_KEY;
const YOUR_SITE_URL = process.env.YOUR_SITE_URL || '';
const YOUR_SITE_NAME = process.env.YOUR_SITE_NAME || '';
const MAX_RETRIES = 1;

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: API_KEY,
  defaultHeaders: {
    'HTTP-Referer': YOUR_SITE_URL,
    'X-Title': YOUR_SITE_NAME,
  },
});

export class OpenRouterService {
  async createInvoice(invoiceData: any): Promise<string | null> {
    if (!API_KEY) {
      throw new Error('OpenAI API key is not set in environment variables.');
    }

    let attempt = 0;

    while (attempt < MAX_RETRIES) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: JSON.stringify(invoiceData),
            },
          ],
        });

        const answer = completion.choices[0]?.message?.content;
        console.log('resposta:', answer);
        return answer || null;
      } catch (error: any) {
        attempt++;

        const isRetriable =
          error.status && [429, 500, 502, 503, 504].includes(error.status);

        if (attempt >= MAX_RETRIES || !isRetriable) {
          console.error(
            `Erro ao tentar se comunicar com a API:`,
            error.message
          );
          throw error;
        }

        const backoffTime = Math.pow(2, attempt) * 100 + Math.random() * 100;
        console.warn(
          `Tentativa ${attempt} falhou. Tentando novamente em ${Math.round(
            backoffTime
          )}ms...`
        );
        await wait(backoffTime);
      }
    }

    return null;
  }
}
