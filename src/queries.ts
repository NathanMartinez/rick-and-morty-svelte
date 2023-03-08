import { gql } from '@apollo/client/core'

export const CHARACTERS_BY_PAGE = gql`
	# name: String
	# status: String
	# species: String
	# type: String
	# gender: String
	query CharactersByPage(
		$page: Int!
		$name: String
		$gender: String
		$status: String
	) {
		characters(
			page: $page
			filter: { name: $name, gender: $gender, status: $status }
		) {
			info {
				count
				pages
				prev
				next
			}
			results {
				id
				name
				image
				species
				gender
				status
				location {
					name
				}
				episode {
					name
				}
			}
		}
	}
`
