// Variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listarCursos = document.querySelector('#lista-cursos')
let articulosCarrito = [];

cargarEventListeners()
function cargarEventListeners() {
    // Agregar curso al carrito
    listarCursos.addEventListener('click', agregarCurso)

    // Eliminar curso del carrito
    carrito.addEventListener('click', borrarCurso )

    // charge cart from localStorage 
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito') )|| [];
        carritoHTML();
    })

    //Vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML(); //Eliminamos todo el HTML
    })
}

// Eliminar curso del carrito
function borrarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Eliminar del arreglo el articulo del carrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        carritoHTML()

    }
    // articulosCarrito = []
}

function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosDelCurso( cursoSeleccionado );
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosDelCurso(curso) {
    console.log(curso)

    //Crear un object con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    sumarCursos( infoCurso )

    console.log(articulosCarrito)

    carritoHTML();
}

// Sumar elemento del producto si se agrega 2 veces
function sumarCursos( infoCurso ) {
    // Agregar elementos al arreglo de carrito
    const courseIndex = articulosCarrito.findIndex(curso => curso.id === infoCurso.id);

    console.log(courseIndex)

    if( courseIndex < 0 ) {
        articulosCarrito.push( infoCurso )
    } else {
        articulosCarrito[courseIndex].cantidad++
    }
}

// Muestra el carrito de compras en el html

function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML()
    
    
    //Recorre el carrito y genera un HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id} = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${ imagen}" width="100">
            </td>
            <td>${ titulo }</td>
            <td>${ precio }</td>
            <td>${ cantidad }</td>

            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })

    // add car to storage
    syncStorage();
}


function syncStorage() {
    localStorage.setItem('carrito', JSON.stringify( articulosCarrito ))
}



// Elimina los cursos del tbody
function limpiarHTML() {
    //Forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
    
}