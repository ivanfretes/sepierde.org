<script>
	import CosasForm from './components/CosasForm.svelte'
	import CosasList from './components/CosasList.svelte'
	import CosasMap from './components/CosasMap.svelte'

	export let appName;
	document.title = appName;

</script>

<main>
	<div class="mt-3 mb-5 flex justify-start">
      <div class="mx-2 mt-1">
         <!-- svelte-ignore a11y-missing-attribute -->
         <img src="/icon.png"  class="icon"/>
      </div>
      <div>
         <h1 class="text-3xl font-bold">{appName}</h1>
      </div>
	</div>
	
	<div class="container mx-auto">
		<div class="grid grid-cols-3 gap-4">
			<div>
				<h2 class="text-2xl">Perdiste o encontraste algo</h2>
				<hr class="mt-2 mb-3">
				<CosasForm />
			</div>
			<div>
				<h2 class="text-2xl">Novedades</h2>
				<hr class="mt-2 mb-3">
				<CosasList />	
			</div>
			<div>
				<h2 class="text-2xl">Listado por ubicación</h2>
				<hr class="mt-2 mb-3">
				<CosasMap />
			</div>
		</div>
	</div>
</main>

<style>
	@tailwind base;
   @tailwind components;
   @tailwind utilities;

   .icon {
      width: 32px;
   }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>