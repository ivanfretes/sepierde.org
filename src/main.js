import App from './App.svelte';


const app = new App({
	target: document.body,
	props: {
		appName: 'sepierde.org'
	}
});

export default app;