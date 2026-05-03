let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;

carrito.forEach(item => total += item.precio);
window.onload = mostrar;

function agregar(nombre, precio) {
    carrito.push({nombre, precio});
    total += precio;

    guardar();
    mostrar();
    noti("Producto agregado");
}

function mostrar() {
    let lista = document.getElementById("lista");
    if (!lista) return;

    lista.innerHTML = "";

    carrito.forEach((item, i) => {
        lista.innerHTML += `
        <li>${item.nombre} - $${item.precio}
        <button onclick="eliminar(${i})">Eliminar</button></li>`;
    });

    document.getElementById("total").innerText = "Total: $" + total;
}

function eliminar(i) {
    total -= carrito[i].precio;
    carrito.splice(i,1);
    guardar();
    mostrar();
}

function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function noti(texto) {
    let n = document.createElement("div");
    n.innerText = texto;
    n.className = "noti";
    document.body.appendChild(n);
    setTimeout(()=>n.remove(),2000);
}

function generarFactura() {
    let f = document.getElementById("factura");

    let html = "<h3>Orden</h3><ul>";
    carrito.forEach(i=>{
        html += `<li>${i.nombre} - $${i.precio}</li>`;
    });

    html += `</ul><p>Total: $${total}</p>`;
    f.innerHTML = html;
}