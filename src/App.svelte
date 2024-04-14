<script>
	import CosasForm from './components/CosasForm.svelte'
	import CosasList from './components/CosasList.svelte'
	import CosasMap from './components/CosasMap.svelte'
   import HeroFirst from "./components/HeroFirst.svelte"

   export let appName;
	document.title = appName;

   let cosas = []

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

   <HeroFirst />
	
	<div class="container mx-auto">
		<div class="grid md:grid-cols-2 md:gap-8">
			<div class="pb-4">
				<h2 class="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 ">Perdiste o encontraste algo</h2>
				<hr class="mt-2 mb-3">
				<CosasForm />
			</div>
			<!--div>
				<h2 class="text-2xl">Novedades</h2>
				<hr class="mt-2 mb-3">
				<CosasList />	
			</div-->
			<div class="pb-4">
				<h2 class="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 ">Listado por ubicación</h2>
				<hr class="mt-2 mb-3">
				<CosasMap cosas={cosas}/>
			</div>
		</div>


      <div class="py-5">
         {appName} - con mucho ❤️ por <a href="https://ivanfretes.com" target="_blank">Ivan F.</a>
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