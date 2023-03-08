import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/rick-and-morty-svelte/',
	plugins: [svelte()],
})
