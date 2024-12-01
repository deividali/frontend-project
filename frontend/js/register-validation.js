function validForm(){

    const fields=["email", "password", "password2"]
    let empty=""
    let passcheck=0
    let pass=""
    let pass2=""
    
    for(field of fields){
        
        let entrada = document.getElementById(field);
        let valorEntrada = entrada.value;

        if(valorEntrada.trim().length==0){
            empty += field + ', ' 
        }
        if(field=="password" && valorEntrada.trim().length<8){
            passcheck = passcheck +1;
        }
        if(field=="password2" && valorEntrada.trim().length<8){
            passcheck = passcheck +1;
        }

        if(field=='password'){
            pass = valorEntrada.trim()
        }

        if(field=='password2'){
            pass2 = valorEntrada.trim()
        }
    }


    if(passcheck==2){
        alert("Los campos de contraseña deben ser mayor a 8 caracteres")
    }
    
    if(pass!=pass2){
        alert("Las contraseñas no son iguales")
    }


    if(empty.length>0){
        alert(`No has ingresado: ${empty}`)
    }
   
}

// defino una constante llamada botonNombre y la leo el id desde el HTML
const botonNombre = document.getElementById("boton_registro")


// Esucho esa constante hasta que se haga click, y realizo la siguient funcion
botonNombre.addEventListener("click",()=>{

    validForm();

})


