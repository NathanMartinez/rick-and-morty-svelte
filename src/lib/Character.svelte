<script lang="ts">
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

	export let character: Character
</script>

<div class="card" style="--image-url: url({character.image})">
	<div class="card__image {character.status === 'Dead' && 'deceased'}" />
	<div class="card__body">
		<h2 class="card__title">
			{character.name}
		</h2>
		<p>{character.species} - {character.gender}</p>
		<p>
			<strong>Last Seen:</strong>
			{character.location.name}
		</p>
	</div>
</div>

<style>
	.card {
		background-color: #293046;
		overflow: hidden;
		border-radius: 0.25rem;
	}
	.card__body {
		padding: 1rem;
	}
	.card__title {
		font-size: 1.25rem;
	}
	.card__image {
		width: 300px;
		height: 300px;
		background-image: var(--image-url);
	}
	.deceased {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: end;
		background-image: linear-gradient(
				to bottom,
				rgba(255, 255, 255, 0.25),
				rgba(0, 0, 0, 0.3),
				rgba(255, 0, 0, 0.8)
			),
			var(--image-url);
	}
	.deceased::after {
		content: 'TERMINATED';
		font-size: 2rem;
		font-weight: 700;
		color: #fff;
	}
</style>
