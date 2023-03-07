<script lang="ts">
	import { onMount } from 'svelte'

	import Character from './lib/Character.svelte'
	import rickAndMorty from './assets/rick_and_morty.svg'

	import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core'
	import { setClient, query } from 'svelte-apollo'

	const client = new ApolloClient({
		uri: import.meta.env.VITE_API_BASE_URL,
		cache: new InMemoryCache(),
	})
	setClient(client)

	const CHARACTERS = gql`
		query Characters($page: Int) {
			characters(page: $page) {
				info {
					pages
					prev
					next
				}
				results {
					id
					name
				}
			}
		}
	`
	let page = 1
	const characters = query(CHARACTERS, { variables: { page } })

	$: characters.refetch({ page })

	console.log($characters)
</script>

<nav>
	<img src={rickAndMorty} alt="Rick and Morty" />
	<h1>Rick and Morty Client</h1>
</nav>

<main>
	<ul>
		{#if $characters.loading}
			<li>Loading...</li>
		{:else if $characters.error}
			<li>ERROR: {$characters.error.message}</li>
		{:else}
			{#each $characters.data?.characters?.results as character (character.id)}
				<li>{character.name}</li>
			{/each}
		{/if}
	</ul>
</main>

<footer>
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
