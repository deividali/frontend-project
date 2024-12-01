
const API_URL = "https://ab62-191-106-210-114.ngrok-free.app/rutas"


document.getElementById("searchButton").addEventListener('click',async(e)=>{
    e.preventDefault();
    const searchWord=document.getElementById('searchField').value;
    const radios = document.getElementsByName('radioOption');
    
    let filterOption; 
    for (const radio of radios) { 
        if (radio.checked) { 
            filterOption = radio.value; 
            break; 
        }}

    try {
        // Envio una peticion tipo GET al servidor para obtener los valores de rutas en pantalla acorde a la búsqueda

        const response = await fetch(`${API_URL}/${searchWord}/${filterOption}`);
        const routes = await response.json();
        renderRoutes(routes);

    } catch (error) {
        console.log(error)
    }
    })


function renderRoutes(routes){
    const routeList = document.querySelector('#routeList')
    routeList.innerHTML = "";

    routes.forEach((route) => {
        const routeItem = document.createElement("div");
        routeItem.innerHTML = `
            <span class = "route-Class" data-id = "${route.id}">
                
                ${route.routeName}<br>
                ${route.motoName}
                ${route.terrainType}
                ${route.startPoint}
                ${route.endPoint}
                ${route.routeTime}
                ${route.routeDistance}
                ${route.userScore}${route.userName}
            </span><br>
            <button data-id = "${route.id}" class = "update-btn">Edit</button>
            <button data-id = "${route.id}" class = "delete-btn">Delete</button>
            <button data-id = "${route.id}" class = "view-btn">View</button>
        `;

        routeList.appendChild(routeItem)
    });
}


// Agregar datos al fomulario

// document.querySelector("#todo-form").addEventListener("submit",async(e)=>{
//     e.preventDefault();

//     const tarea = document.querySelector("#todo-input").value.trim();
//     if(tarea==="") return;

//     try {
//         const response = await fetch(API_URL,{
//             method: "POST",
//             headers: {"content-type": "application/json"},
//             body: JSON.stringify({tarea})
//         })
//         await response.json();
//         fetchTodos();
//         document.querySelector("#todo-input").value="";
//     } catch (error) {
//         console.log("Error al agregar datos al formulario: ",error)
//     }

// });


// Actualizar los estados y el texto de la tarea

// e = evento
// document.querySelector("#todo-list").addEventListener("click",(e)=>{
//     const id = e.target.dataset.id;
//     console.log(id)
//     if(e.target.classList.contains("update-btn")){
//         const todoText = document.querySelector(`.todo-tarea[data-id="${id}"]`)
//         const newText = prompt("editar tarea:",todoText.textContent)
//         console.log(newText)
//         if(newText&&newText.trim()!==""){
//             console.log("condicion valida")
//             updateTodoText(id,newText.trim())
//         }
//     }
//     else if(e.target.classList.contains("view-btn")){
//         printroute();
//     }

//     else if(e.target.type==='checkbox'){
//         //updateTodoStatus(id,e.target.checked);

//     }
//     else if(e.target.classList.contains("delete-btn")){
//         //deletetodo(id);
//     }
// });



// async function updateTodoText(id,newText) {
//     console.log("Se ingresa a funcion updateTodoText",id,newText)
//     try {
//         const response = await fetch(`${API_URL}/${id}`,{            
//             method: "PUT",
//             headers: {"content-type":"application/json"},
//             body: JSON.stringify({"tarea":newText})
//         })
//         await response.json();
//         console.log(response)
//         fetchTodos();
//     } catch (error) {
//         console.log("Error al actualizar el texto: ", error)
//     }
// }


// // Actualizar el estado (completado)

// async function updateTodoStatus(id,completed){
//     try {
//         await fetch(`${API_URL}/${id}`,{
//             method: "PUT",
//             headers: {"content-type":"application/json"},
//             body: JSON.stringify({completed})
//         })
//         fetchTodos();
//     } catch (error) {
//         console.log("Se ha presentado un error al actualizar el estado: ",error)
//     }
// }

// async function deletetodo(id) {
//     try {
//         await fetch(`${API_URL}/${id}`,{
//             method: "DELETE",
//         });
//         fetchTodos();
//     } catch (error) {
//         console.log("Error al borrar tarea: ", error)
//     }
// }