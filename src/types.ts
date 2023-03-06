export type InfoType = {
	count: number // The length of the response
	pages: number // The amount of pages
	next: string | null // (url)	Link to the next page (if it exists)
	prev: string | null // (url)	Link to the previous page (if it exists)
}

export type LocationBasicType = {
	name: string
	url: string
}

export type CharacterType = {
	id: number // The id of the character.
	name: string // The name of the character.
	status: 'Alive' | 'Dead' | 'unknown' | 'Unknown' // The status of the character ('Alive', 'Dead' or 'unknown').
	species: string // The species of the character.
	type: string // The type or subspecies of the character.
	gender: 'Female' | 'Male' | 'Genderless' | 'unknown' | 'Unknown' // The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
	origin: LocationBasicType // Name and link to the character's origin location.
	location: LocationBasicType // Name and link to the character's last known location endpoint.
	image: string // (url)	Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
	episode: string[] // (urls)	List of episodes in which this character appeared.
	url: string // (url)	Link to the character's own URL endpoint.
	created: string // Time at which the character was created in the database.
}

export type FetchResultType = {
	info: InfoType
	results: CharacterType[]
}
