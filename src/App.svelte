<script lang="ts">
	import { setClient, query, type ReadableQuery } from 'svelte-apollo'
	import { CHARACTERS_BY_PAGE } from './queries'
	import type { FetchResultType } from './types'
	import rickAndMorty from './assets/rick_and_morty.svg'
	import Character from './lib/Character.svelte'
	import client from './client'

	setClient(client)

	const variables = {
		page: 1,
		name: '',
		gender: '',
		status: '',
	}

	let showFilters = false

	const result: ReadableQuery<FetchResultType> = query(CHARACTERS_BY_PAGE, {
		variables,
	})

	$: result.refetch(variables)
</script>

<nav>
	<div class="title__section">
		<img src={rickAndMorty} alt="Rick and Morty" />
		<h1>Rick and Morty Client</h1>
	</div>
	<div class="search__filter">
		<input
			type="text"
			placeholder="Rick Sanchez"
			bind:value={variables.name}
			on:change={() => (variables.page = 1)}
		/>
		<button
			on:click={() => {
				showFilters = !showFilters
			}}>Filters</button
		>
	</div>
	<code class="count">
		Characters: {$result.data?.characters.info.count || '0'}
	</code>
	{#if showFilters}
		<div class="filters" on:mouseleave={() => (showFilters = false)}>
			<select
				name="gender"
				id="gender"
				bind:value={variables.gender}
				on:change={() => (variables.page = 1)}
			>
				<option value="">Gender</option>
				<option value="male">Male</option>
				<option value="female">Female</option>
			</select>
			<select
				name="status"
				id="status"
				bind:value={variables.status}
				on:change={() => (variables.page = 1)}
			>
				<option value="">Status</option>
				<option value="alive">Alive</option>
				<option value="dead">Dead</option>
				<option value="unknown">Unknown</option>
			</select>
		</div>
	{/if}
</nav>
<main>
	{#if $result.loading}
		<h2>Loading...</h2>
	{:else if $result.error}
		<h2>ERROR: {$result.error.message}</h2>
	{:else if $result.data?.characters.results.length <= 0}
		<h2>No Results</h2>
	{:else}
		{#each $result.data?.characters.results as character (character.id)}
			<Character {character} />
		{/each}
	{/if}
</main>

<footer>
	<div class="pagination">
		<button
			disabled={!$result.data?.characters.info.prev}
			on:click={() => {
				variables.page -= 1
				window.scrollTo({ top: 0, behavior: 'smooth' })
			}}>Prev</button
		>
		{#if $result.data?.characters.info.pages}
			<p>{variables.page}/{$result.data?.characters.info.pages}</p>
		{/if}
		<button
			disabled={!$result.data?.characters.info.next}
			on:click={() => {
				variables.page += 1
				window.scrollTo({ top: 0, behavior: 'smooth' })
			}}>Next</button
		>
	</div>
	<div class="footer__info">
		Created by: <a
			href="https://github.com/NathanMartinez"
			target="_blank"
			rel="noreferrer">Nathan Martinez</a
		>
	</div>
</footer>

<style>
	nav,
	main {
		padding: 1rem;
	}

	nav,
	main {
		gap: 1rem;
	}

	nav {
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		color: var(--dark-gray);
		background-image: var(--nav-image);
		text-align: center;
	}

	.title__section,
	.search__filter {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.search__filter {
		flex-wrap: wrap;
	}
	.title__section > img {
		height: 3rem;
	}

	.search__filter > input {
		flex: 1;
		background: transparent;
		border: 2px solid var(--dark-gray);
		border-radius: 0.25rem;
		color: inherit;
		font-size: 1rem;
		font-weight: 500;
		padding: 0.5rem 1rem;
	}

	nav .filters {
		position: absolute;
		right: 1rem;
		top: calc(100% - 1rem);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: var(--light-gray);
		padding: 1rem;
		border-radius: 0.25rem;
	}

	main {
		flex: 1;
		display: grid;
		justify-content: center;
		align-content: center;
		grid-template-columns: repeat(auto-fit, minmax(275px, 300px));
	}

	footer {
		text-align: center;
		background-color: #fff;
		color: var(--dark-gray);
	}

	.pagination,
	.footer__info {
		padding: 1rem;
	}

	.pagination {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.footer__info {
		background-color: var(--light-gray);
		color: #fff;
	}
	.footer__info > a {
		color: var(--male);
	}

	button {
		padding: 0.5rem 1rem;
		background-color: var(--dark-gray);
		border: none;
		color: #fff;
		border-radius: 0.25rem;
	}

	button:hover:not(:disabled) {
		cursor: pointer;
		background-color: var(--light-gray);
	}

	button:disabled {
		filter: opacity(0.5);
	}

	@media (min-width: 50em) {
		nav {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: 3rem;
		}
		.search__filter {
			flex: 1;
			min-width: 18rem;
			max-width: 50rem;
		}
	}
</style>
