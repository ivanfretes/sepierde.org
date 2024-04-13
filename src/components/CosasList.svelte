<script>
import {
    setDoc,
    collection,
    onSnapshot,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../firebase.js"
import { onMount } from "svelte";

let cosas;

onMount(() => {
    onSnapshot(collection(db, "cosas"), (snapshot) => {
      cosas = snapshot.docs;
    });
  });

</script>


<ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
    {#if cosas}
      {#each cosas as snapshot (snapshot.data().id)}
        <li class="pb-3 sm:pb-4">
          <div class="flex items-center space-x-4 rtl:space-x-reverse">
            <div class="flex-shrink-0">
              <div></div>
           </div>
           <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                {snapshot.data().estado.toUpperCase()}
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                {snapshot.data().cosas.join(", ")}
              </p>
           </div>
           <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              ver en el mapa
           </div>
          </div>
         <!--span on:click={() => handleClick(snapshot.data().Id)}>X</span-->
        </li>
      {/each}
    {/if}
</ul>