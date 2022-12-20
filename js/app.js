//Variables
const carrito = document.querySelector ('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners()
function cargarEventListeners(){
    //Cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso)
    //Elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Muestra los cursos de local storage

    document.addEventListener('DOMContentLoaded', ()=>{
        articulosCarrito = JSON.parse (localStorage.getItem('carrito'))||[];
        carritoHTML();
    })

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito=[];
        limpiarHTML(); //ELIMINAMOS HTML
    })
}


// Funciones
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    
    }
}
//Elimina un curso del carrito 
function eliminarCurso (e){
    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //Elimina del arreglo de articulo de carrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso=> curso.id !== cursoId);
        
        carritoHTML();
    }
}


// Lee el contenido del HMTL al que le demos click y extra la info
function leerDatosCurso(curso){
    //console.log(curso);
    //crear un objeto
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
// Revisa si un elemente ya existe en el carrito

    const existe = articulosCarrito.some (curso=>curso.id === infoCurso.id);
    if(existe){ 
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        } );
        articulosCarrito = [...cursos]
    } else {//agrega elementos al arreglo de carrito

        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    

    console.log(articulosCarrito)
    carritoHTML();
}

//muestra el carrito en el HTML

function carritoHTML(){
    //Limpiar el HTML

    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach (curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
        `;

        //agregar HTML del carrito en el tbody

        contenedorCarrito.appendChild(row);
    });

    //Agregar el carro al storage

    sincronizarStorage();
    
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}


//ELIMINA LOS CURSOS DEL TBODY

function limpiarHTML (){
    // FORMA LENTA
    //     contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}

