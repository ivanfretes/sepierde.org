<script>
    
    import { db } from "../firebase.js"
    import { addDoc, collection } from 'firebase/firestore';
    import CosasFormMap from "./CosasFormMap.svelte"
    import { onMount } from "svelte";
    import { generateCodigoEnvio, isEmptyOneAttr } from "../utils/utils.js";

    let cosaForm = {
      estado: "",
      nombre: "",
      telefono: "",
      cosas: [],
      fecha: "",
      ubicacion: null
    }

    // only for forms
    let cssClass = {
        inputText: "bg-gray-50 w-100 rounded-lg p-2 w-full"
    }

    function setCosaFormDefault() {
      cosaForm = {
         estado: "",
         nombre: "",
         telefono: "",
         cosas: [],
         fecha: "",
         ubicacion: null
      }
    }
	

	async function guardar() {
      try {
         const codigo = generateCodigoEnvio().toString().toUpperCase();
         const fechaCreacion = new Date();
         
         const payload = {
            ...cosaForm,
            codigo,
            fechaCreacion,
            id: codigo
         };

         if (isEmptyOneAttr(payload))
            throw "Verifique que todos los campos hayan sido completados"
        
         addDoc(collection(db, "cosas"), payload).then(res => {
            setCosaFormDefault()
         });

         alert("Por favor guarde el nro o quitele una foto al código")

      } catch (error) {
         alert(error)   
      }
	}

    function setUbicacion(event){
        cosaForm.ubicacion = JSON.stringify(event.detail);
    }

    onMount(() => {
      setCosaFormDefault()
    })
</script>



    <div class="my-5">
        <label>¿Qué pasó con el objeto?</label>
        <label><input type="radio" bind:group={cosaForm.estado} value="encontre"> Encontré</label>
        <label><input type="radio" bind:group={cosaForm.estado} value="perdi"> Perdí</label>
    </div>

    <div class="my-5">
        <label >Nombre/s:</label>
        <input type="text" class={cssClass.inputText}  bind:value={cosaForm.nombre}>
    </div>

    <div class="my-5">
        <label >Fecha { cosaForm.estado == '' ? '' : `en que ${cosaForm.estado}` }:</label>
        <input type="text" class={cssClass.inputText}  bind:value={cosaForm.fecha}>
    </div>

    <div class="my-5">
        <label class="mt-3">Teléfono:</label>
        <input type="tel" bind:value={cosaForm.telefono} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            class={cssClass.inputText}><br>
        <small>Formato: 0991123456 (sin espacios)</small>
    </div>

    <div class="my-5">
        <label>Descripción:</label>
        <input type="text" bind:value={cosaForm.descripcion}
            class={cssClass.inputText}>
    </div>
    

    <div class="my-5">
        <label class="mt-3">¿Qué cosas perdiste?</label>
        <label><input type="checkbox" bind:group={cosaForm.cosas} value="Llaves"> Llaves</label>
        <label><input type="checkbox" bind:group={cosaForm.cosas} value="Billetera"> Billetera</label>
        <label><input type="checkbox" bind:group={cosaForm.cosas} value ="Teléfono"> Teléfono</label>
        <label><input type="checkbox" bind:group={cosaForm.cosas} value="Cartera"> Cartera</label>
    </div>

    <div class="my-5">
        {JSON.stringify(cosaForm)}
        <label class="mt-3">Indicar donde</label>
        <CosasFormMap on:set-ubicacion={setUbicacion} />
    </div>


    <div class="my-3 ">
        <button on:click={guardar} class="w-full bg-blue-500 text-white p-2 rounded-lg border-o w-100">Enviar</button>
    </div>