export interface LivepeerImage {
	seed: number
	url: string
}
export interface StateType {
	streaming_audio: boolean
	streaming_text: boolean
	waiting_for_images: boolean
	current_request_id: string
}

export interface ErrorType {
	error: string
}

export interface TextType {
	delta: string
}

export interface ImageType {
	urls: string[]
}

export interface RequestPayload {
	prompt: string
	genre: Genre
}

export interface Prompt {
	prompt: string
	caveat?: string
}

export type Genre =
	| "magic"
	| "scifi"
	| "swords"
	| "romance"
	| "drama"
	| "apocalypse"
	| "hollywood"
	| "singularity"
