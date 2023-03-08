<script lang="ts">
	import type { CharacterType } from '../types'
	export let character: CharacterType
</script>

<div class="card">
	<div class="card__image" style="--image-url: url({character.image})">
		<code
			>Status: <em class={character.status.toLowerCase()}>{character.status}</em
			>
		</code>
	</div>
	<div class="card__body">
		<a class="card__title" href={character.url}>
			{character.name}
		</a>
		<code
			>{character.species} -
			<em class={character.gender.toLocaleLowerCase()}>{character.gender}</em
			></code
		>
		<p>
			<strong>Last known location:</strong>
			{character.location.name}
		</p>
		<p>
			<strong>First seen in:</strong>
			{character.episode[0].name}
		</p>
	</div>
</div>

<style>
	.card {
		background-color: var(--light-gray);
		overflow: hidden;
		border-radius: 0.25rem;
		width: clamp(200px, 300px, 400px);
	}

	.card__body {
		padding: 1rem;
	}

	.card__title {
		display: block;
		font-weight: 700;
		font-size: 1.25rem;
	}

	.card__image {
		display: flex;
		align-items: flex-end;
		padding: 0.5rem;
		height: 300px;
		background-image: linear-gradient(
				to top,
				rgba(0, 0, 0, 1),
				rgba(0, 0, 0, 0.5),
				rgba(0, 0, 0, 0),
				rgba(0, 0, 0, 0)
			),
			var(--image-url);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
</style>
