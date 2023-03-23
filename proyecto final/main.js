class Club {
    constructor(id, nombre, precio, puesto, jugadores, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.puesto = puesto;
        this.jugadores = jugadores;
        this.img = img;
        this.cantidad = 1;
    }
}

const talleres = new Club( "tal", "Talleres de Cordoba",42.65, 1, 29, "multimedia/clubes/talleres.png");
const boca = new Club("bj", "Boca Juniors", 85.18, 7, 32, "multimedia/clubes/boca.png");
const river = new Club("riv","River Plate", 97.65, 4, 31, "multimedia/clubes/river.png");
const independiente = new Club("ind","Independiente", 17.45, 14, 26, "multimedia/clubes/independiente.png");
const racing = new Club("rac","Racing Club", 42.95, 10, 26, "multimedia/clubes/racing.png");
const dyj = new Club("def","Defensa y Justicia", 27.73, 2, 28, "multimedia/clubes/dyj.png");
const lanus = new Club("lan","Lanus", 33.13, 3, 28, "multimedia/clubes/lanus.png");
const sanlorenzo = new Club("san","San Lorenzo", 38.30, 5, 30, "multimedia/clubes/sanlorenzo.png");
const huracan = new Club("hur","Huracan", 30.95, 6, 28, "multimedia/clubes/huracan.png");
const newells = new Club("new","Newells", 27.48, 8, 30, "multimedia/clubes/newells.png");
const rosario = new Club("ros","Rosario Central", 24.03, 9, 30, "multimedia/clubes/rosario.png");
const sarmiento = new Club("sar","Sarmiento", 10.78, 11, 29, "multimedia/clubes/sarmiento.png");
const tigre = new Club("tig","Tigre", 38.08, 12, 27, "multimedia/clubes/tigre.png");
const instituto = new Club("ins","Instituto", 9.80, 13, 29, "multimedia/clubes/instituto.png");
const barracas = new Club("bar","Barracas Central", 9.03, 15, 27, "multimedia/clubes/barracas.png");
const belgrano = new Club("bel","Belgrano", 12.63, 16, 28, "multimedia/clubes/belgrano.png");
const argentinos = new Club("arg","Argentinos Juniors", 23.65, 17, 29, "multimedia/clubes/argentinos.png");
const union = new Club("uni","Union", 13.00, 18, 22, "multimedia/clubes/union.png");
const godoy = new Club("god","Godoy Cruz", 14.18, 19, 23, "multimedia/clubes/godoy.png");
const platense = new Club("pla","Platense", 11.45, 20, 26, "multimedia/clubes/platense.png");
const velez = new Club("vel","Velez Sarfield", 49.85, 21, 23, "multimedia/clubes/velez.png");
const gimnasia = new Club("gim","Gimnasia LP", 12.88, 22, 25, "multimedia/clubes/gimnasia.png");
const estudiantes = new Club("est","Estudiantes LP", 28.63, 23, 24, "multimedia/clubes/estudiantes.png");
const centralcba = new Club("cen","Central Cordoba", 10.75, 24, 28, "multimedia/clubes/centralcba.png");
const tucuman = new Club("atl","Atletico de Tucuman", 17.03, 25, 24, "multimedia/clubes/tucuman.png");
const arsenal = new Club("ars","Arsenal de Sarandi", 5.63, 26, 27, "multimedia/clubes/arsenal.png");
const colon = new Club("col","Colon", 27.65, 27, 24, "multimedia/clubes/colon.png");
const banfield = new Club("ban","Banfield", 21.68, 28, 28, "multimedia/clubes/banfield.png");

const clubes = [talleres, boca, river, independiente, racing, dyj, lanus, sanlorenzo, huracan, newells, rosario, sarmiento,
tigre, instituto, barracas, belgrano, argentinos, union, godoy, platense, velez, gimnasia, estudiantes, centralcba,
tucuman, arsenal, colon, banfield];
console.log(clubes);

let carrito = [];
if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const catalogoClubes = document.getElementById("catalogoClubes");
const mostrarClubes = () => {
    clubes.forEach(club => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class = "card cls${club.id}" >
                <img src = "${club.img}">
                <div>
                    <h2>${club.nombre}</h2>    
                    <p> ${club.precio} Millones </p>
                    <p>Puesto ${club.puesto}</p>
                    <button class="boton" id = "btn${club.id}">Agregar al carrito</button>
                </div>    
            </div>`
        catalogoClubes.appendChild(card);

        const boton = document.getElementById(`btn${club.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(club.id);
        })
    })
}
mostrarClubes();

const agregarAlCarrito = (id) =>{
    const clubEnCarrito = carrito.find(club => club.id === id);
    if(clubEnCarrito){
        clubEnCarrito.cantidad++;
    }else{
        const club = clubes.find(club => club.id === id);
        carrito.push(club);
    }
    calcularTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
console.log(carrito);

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () =>{
    mostrarCarrito();
})

mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(club => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class = "card cls${club.id}" >
                <img src = "${club.img}" width="300px">
                <hr>
                <div >
                    <h2>${club.nombre}</h2>    
                    <p> ${club.precio} Millones</p>
                    <p> ${club.cantidad}</p>
                    <button class="boton" id = "eliminar${club.id}">Eliminar del carrito</button>
                </div>    
            </div>`
        contenedorCarrito.appendChild(card);    
        const boton = document.getElementById(`eliminar${club.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(club.id);
        })
    })
    calcularTotal();
}

const eliminarDelCarrito = (id) => {
    const club = carrito.find(club => club.id === id);
    const indice = carrito.indexOf(club);
    carrito.splice(indice,1);
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})
const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();
}

const total = document.getElementById("total");
const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach( club => {
        totalCompra += club.precio * club.cantidad;
    })
    total.innerHTML = `Total $${totalCompra.toFixed(2)}M`;
}

const apiDolar = "https://criptoya.com/api/dolar";
const headUsd = document.getElementById("headUsd");

setInterval( () => {
    fetch(apiDolar)
        .then(respuesta => respuesta.json())
        .then(({blue, oficial}) => {
            headUsd.innerHTML = `
            <p>Todos los precios que se encuentran aqui estan en Dolares, asi que aqui tiene la cotizacion del momento para 
            que pueda realizar los respectivos cambios!<p/>
            <p>Dolar Blue = $${blue} - Dolar Oficial = $${oficial} <p/>
            `;
        })
        .catch(error => console.log(error))
}, 5000)

const miBoton = document.getElementById("miBoton");
miBoton.addEventListener("click", function() {
    swal({
        title: `¡Gracias por tu compra!`,
        icon: `success`,
    });
    eliminarTodoElCarrito();
});

