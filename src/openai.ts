import OpenAI from "openai"
import type { Genre, Prompt } from "./system/prompts"
import { createSystemPrompt, genreList } from "./system/prompts"
import { ChatCompletionMessageParam } from "openai/resources"

const oai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

// Typescript will complain if we don't cast these:
const top_p = Number(process.env.OPENAI_TOP_P || 0.5)
const max_tokens = Number(process.env.OPENAI_MAX_TOKENS || 150)
const temperature = Number(process.env.OPENAI_TEMPERATURE || 0.5)
const presence_penalty = Number(process.env.OPENAI_PRESENCE_PENALTY || 0.5)
const frequency_penalty = Number(process.env.OPENAI_FREQUENCY_PENALTY || 0.5)

const model = process.env.OPENAI_MODEL || "gpt-3.5-turbo"

async function chatCompletionStream(systemPrompt: string, userPrompt: string) {
	console.log(
		`Creating chat completion stream with system prompt: ${systemPrompt}`,
	)
	console.log(`User prompt: ${userPrompt}`)
	const messages = [
		{
			role: "system",
			content: systemPrompt,
		},
		{
			role: "user",
			content: userPrompt,
		},
	] as ChatCompletionMessageParam[]
	return oai.chat.completions.create({
		model,
		messages,
		frequency_penalty,
		presence_penalty,
		stream: true,
		temperature,
		max_tokens,
		top_p,
	})
}

export async function isFlagged(input: string) {
	const response = await oai.moderations.create({ input })
	const [results] = response.results // we only need the first result
	return results?.flagged === true ?? false
}

export async function generateStory(userPrompt: string, genre: Genre) {
	console.log(
		`OpenAI settings: top_p=${top_p}, max_tokens=${max_tokens}, temperature=${temperature}, presence_penalty=${presence_penalty}, frequency_penalty=${frequency_penalty}`,
	)
	const genrePrompt = genreList[genre]
	const systemPrompt = createSystemPrompt(
		genrePrompt.prompt,
		genrePrompt.caveat || "",
	)
	return chatCompletionStream(systemPrompt, userPrompt)
}
