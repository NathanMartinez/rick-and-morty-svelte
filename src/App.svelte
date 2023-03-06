<script lang="ts">
	import { onMount } from 'svelte'

	import Character from './lib/Character.svelte'
	import rickAndMorty from './assets/rick_and_morty.svg'

	import type { InfoType, CharacterType, FetchResultType } from './types'
	import { parseCharactersUnknown } from './utilities'

	let info_data: InfoType = {
		count: 826,
		pages: 42,
		next: 'https://rickandmortyapi.com/api/character/?page=2',
		prev: null,
	}
	let characters: CharacterType[] = []
	let page = 1
	let loading = false

	async function getCharacters() {
		const res = await fetch(
			`${import.meta.env.VITE_API_BASE_URL}character/?page=${page}`
		)
		const { info, results } = (await res.json()) as FetchResultType
		parseCharactersUnknown(results)
		characters = results
		info_data = info
	}

	onMount(async () => {
		loading = true
		getCharacters()
		loading = false
	})
</script>

<nav>
	<img src={rickAndMorty} alt="Rick and Morty" />
	<h1>Rick and Morty Client</h1>
</nav>

<main>
	{#if loading}
		<h1>Loading...</h1>
	{/if}
	{#each characters as character (character.id)}
		<Character {character} />
	{/each}
</main>

<footer>
	<button
		disabled={!info_data.prev}
		on:click={() => {
			window.scrollTo({ top: 0, behavior: 'smooth' })
			page--
			getCharacters()
		}}>prev</button
	>
	<p>{page}/{info_data.pages}</p>
	<button
		disabled={!info_data.next}
		on:click={() => {
			window.scrollTo({ top: 0, behavior: 'smooth' })
			page++
			getCharacters()
		}}>next</button
	>
	<!-- Created by: <a href="https://github.com/NathanMartinez">Nathan Martinez</a> -->
</footer>

<style>
	nav,
	main,
	footer {
		padding: 1rem;
	}

	nav,
	main {
		gap: 1rem;
	}

	nav {
		display: flex;
		align-items: center;
		background-color: #fff;
		color: var(--dark-gray);
	}

	nav > img {
		height: 3rem;
	}

	main {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-align: center;
	}
	button {
		padding: 0.5rem 1rem;
		background-color: var(--light-gray);
		border: none;
		color: #fff;
	}
	button:hover:not(:disabled) {
		cursor: pointer;
		filter: brightness(1.25);
	}
	button:disabled {
		filter: opacity(0.5);
	}
</style>
