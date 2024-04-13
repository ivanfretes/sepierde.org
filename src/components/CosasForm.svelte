<script>
    
    import { db } from "../firebase.js"
    import { addDoc, collection } from 'firebase/firestore';
    import CosasFormMap from "./CosasFormMap.svelte"

    let estado = '';
	let nombre = '';
	let telefono = '';
	let descripcion = '';
    let cosas = [];
    let fecha = '';
    //let cosasLocal = localStorage.getItem("cosasLocal") || []
    
    // only for forms
    let cssClass = {
        inputText: "bg-gray-50 w-100 rounded-lg p-2 w-full"
    }

	let ubicacion = {
		lat: null,
		lng: null
	}

    function generateCodigoEnvio(){
        const min = 10000;
        const max = 20000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

	async function guardar() {
        let codigo = generateCodigoEnvio();
        const fechaCreacion = new Date();
		const datos = {
			estado,
			nombre,
			telefono,
			descripcion,
            cosas,
            ubicacion,
            codigo,
            fecha,
            fechaCreacion
		};

        //cosasLocal.push(datos)
        //localStorage.setItem("cosasLocal", cosasLocal);

        addDoc(collection(db, "cosas"), {
            ...datos,
            Id: crypto.randomUUID(),
        }).then(res => {
            estado = '';
	        nombre = '';
	        telefono = '';
	        descripcion = '';
            cosas = [];
            ubicacion = {
                lat: null,
                lng: null
            };
            //codigo = null;
        });
	}

    function setUbicacion(event){
        ubicacion = event.detail;
    }
</script>



    <div class="my-5">
        <label>¿Qué pasó con el objeto?</label>
        <label><input type="radio" bind:group={estado} value="encontre"> Encontré</label>
        <label><input type="radio" bind:group={estado} value="perdi"> Perdí</label>
    </div>

    <div class="my-5">
        <label >Nombre/s:</label>
        <input type="text" class={cssClass.inputText}  bind:value={nombre}>
    </div>

    <div class="my-5">
        <label >Fecha { estado == '' ? '' : `en que ${estado}` }:</label>
        <input type="text" class={cssClass.inputText}  bind:value={fecha}>
    </div>

    <div class="my-5">
        <label class="mt-3">Teléfono:</label>
        <input type="tel" bind:value={telefono} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            class={cssClass.inputText}><br>
        <small>Formato: 0991123456 (sin espacios)</small>
    </div>

    <div class="my-5">
        <label>Descripción:</label>
        <input type="text" bind:value={descripcion}
            class={cssClass.inputText}>
    </div>
    

    <div class="my-5">
        <label class="mt-3">¿Qué cosas perdiste?</label>
        <label><input type="checkbox" bind:group={cosas} value="Llaves"> Llaves</label>
        <label><input type="checkbox" bind:group={cosas} value="Billetera"> Billetera</label>
        <label><input type="checkbox" bind:group={cosas} value="Teléfono"> Teléfono</label>
        <label><input type="checkbox" bind:group={cosas} value="Cartera"> Cartera</label>
    </div>

    <div class="my-5">
        {JSON.stringify(ubicacion)}
        <label class="mt-3">Indicar donde</label>
        <CosasFormMap on:set-ubicacion={setUbicacion} />
    </div>


    <div class="my-3 ">
        <button on:click={guardar} class="w-full bg-blue-500 text-white p-2 rounded-lg border-o w-100">Enviar</button>
    </div>