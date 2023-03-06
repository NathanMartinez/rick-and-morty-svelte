<script lang="ts">
	import { onMount } from 'svelte'

	import Character from './lib/Character.svelte'

	type Info = {
		count: number // The length of the response
		pages: number // The amount of pages
		next: string // (url)	Link to the next page (if it exists)
		prev: string // (url)	Link to the previous page (if it exists)
	}

	type Character = {
		id: number // The id of the character.
		name: string // The name of the character.
		status: 'Alive' | 'Dead' | 'unknown' | 'Unknown' // The status of the character ('Alive', 'Dead' or 'unknown').
		species: string // The species of the character.
		type: string // The type or subspecies of the character.
		gender: 'Female' | 'Male' | 'Genderless' | 'unknown' | 'Unknown' // The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
		origin: {
			name: string
			url: string
		} // Name and link to the character's origin location.
		location: {
			name: string
			url: string
		} // Name and link to the character's last known location endpoint.
		image: string // (url)	Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
		episode: string[] // (urls)	List of episodes in which this character appeared.
		url: string // (url)	Link to the character's own URL endpoint.
		created: string // Time at which the character was created in the database.
	}

	let info_data: Info
	let characters: Character[] = []

	async function getCharacters() {
		const res = await fetch(import.meta.env.VITE_API_BASE_URL + 'character')
		const json = await res.json()
		return json
	}

	function parseCharacters(charactersArray: Character[]) {
		return charactersArray.map((character) => {
			if (character.status === 'unknown') {
				character.status = 'Unknown'
			}
			if (character.gender === 'unknown') {
				character.gender = 'Unknown'
			}
			return character
		})
	}

	onMount(async () => {
		const { info, results } = await getCharacters()
		characters = parseCharacters(results)
		info_data = info
	})
</script>

<nav>
	<h1>Rick and Morty Client</h1>
</nav>

<main>
	{#each characters as character (character.id)}
		<Character {character} />
	{/each}
</main>

<footer>
	Created by: <a href="https://github.com/NathanMartinez">Nathan Martinez</a>
</footer>

<style>
	nav,
	footer {
		padding: 1rem;
	}
	nav {
		background-color: #fff;
		color: var(--dark-gray);
	}
	main {
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(auto-fit, 300px);
		gap: 1rem;
	}
	footer {
		text-align: center;
	}
	footer a {
		text-decoration: none;
		color: #fff;
	}
</style>
