import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

// E2E mode swaps the Firebase SDKs for in-repo mocks so Playwright can run the
// real components against deterministic data (no live Firebase / emulator).
// Enabled ONLY when VITE_E2E=true — production dev/build is untouched.
const e2e = process.env.VITE_E2E === 'true';
const mock = (p) => fileURLToPath(new URL(`./e2e/firebase-mock/${p}`, import.meta.url));

const e2eAliases = e2e
	? [
			{ find: /^@firebase\/app$/, replacement: mock('app.js') },
			{ find: /^@firebase\/auth$/, replacement: mock('auth-core.js') },
			{ find: /^@firebase\/firestore$/, replacement: mock('firestore-core.js') },
			{ find: /^firebase\/app$/, replacement: mock('app.js') },
			{ find: /^firebase\/firestore$/, replacement: mock('firestore.js') },
			{ find: /^firebase\/auth$/, replacement: mock('auth.js') },
			{ find: /^firebase\/storage$/, replacement: mock('storage.js') },
			{ find: /^firebase\/compat\/app$/, replacement: mock('compat-app.js') },
			{ find: /^firebase\/compat\/storage$/, replacement: mock('empty.js') }
	  ]
	: [];

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: e2eAliases
	},
	server: e2e
		? { fs: { allow: [fileURLToPath(new URL('./e2e', import.meta.url))] } }
		: {},
	// Without this, SvelteKit externalizes firebase for SSR and Node loads the
	// real SDK (bypassing the aliases). Bundling it through Vite lets the mocks win.
	ssr: e2e
		? { noExternal: ['firebase', '@firebase/app', '@firebase/auth', '@firebase/firestore'] }
		: {},
	optimizeDeps: e2e
		? {
				exclude: [
					'firebase',
					'firebase/app',
					'firebase/firestore',
					'firebase/auth',
					'firebase/storage',
					'firebase/compat/app',
					'firebase/compat/storage',
					'@firebase/app',
					'@firebase/auth',
					'@firebase/firestore'
				]
		  }
		: {}
});
