const btnCarrito = document.querySelectorAll('.btn-outline-dark');
const carritoModal = document.querySelector('#carritoModal');
let carrito = [];

btnCarrito.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem);
});

function addToCarritoItem(e) {
    const button = e.target;
    const item = button.closest('.card');
    const itemTitle = item.querySelector('.fw-bolder').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    };

    addItemCarrito(newItem);
}

function addItemCarrito(newItem) {
    const existingItem = carrito.find(item => item.title === newItem.title);
    if (existingItem) {
        existingItem.cantidad++;
    } else {
        carrito.push(newItem);
    }
    renderCarrito();
}

function renderCarrito() {
    const carritoItems = document.querySelector('#carritoItems');
    carritoItems.innerHTML = '';

    carrito.forEach(item => {
        const carritoItem = document.createElement('li');
        carritoItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        carritoItem.innerHTML = `
            <img src="${item.img}" alt="${item.title}" class="img-fluid" style="width: 50px; height: 50px; object-fit: cover;">
            <span class="fw-bolder">${item.title}</span>
            <span>${item.precio}</span>
            <div>
                <button class="btn btn-sm btn-outline-secondary disminuir-cantidad" data-title="${item.title}">-</button>
                <span class="mx-2">${item.cantidad}</span>
                <button class="btn btn-sm btn-outline-secondary aumentar-cantidad" data-title="${item.title}">+</button>
            </div>
            <button class="btn btn-sm btn-danger eliminar-item" data-title="${item.title}">Eliminar</button>
        `;

        carritoItems.appendChild(carritoItem);
    });

    const total = carrito.reduce((acc, item) => acc + parseFloat(item.precio.replace('$', '').replace(/\./g, '')) * item.cantidad, 0);
    document.querySelector('#carritoTotal').textContent = total.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    actualizarContadorCarrito();
    agregarEventosCantidadYEliminar();
}

function actualizarContadorCarrito() {
    const contadorCarrito = document.querySelector('#carritoContador');
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contadorCarrito.textContent = totalItems;
}

function agregarEventosCantidadYEliminar() {
    const botonesAumentarCantidad = document.querySelectorAll('.aumentar-cantidad');
    const botonesDisminuirCantidad = document.querySelectorAll('.disminuir-cantidad');
    const botonesEliminarItem = document.querySelectorAll('.eliminar-item');

    botonesAumentarCantidad.forEach(btn => {
        btn.addEventListener('click', aumentarCantidad);
    });

    botonesDisminuirCantidad.forEach(btn => {
        btn.addEventListener('click', disminuirCantidad);
    });

    botonesEliminarItem.forEach(btn => {
        btn.addEventListener('click', eliminarItem);
    });
}

function aumentarCantidad(e) {
    const title = e.target.getAttribute('data-title');
    const item = carrito.find(item => item.title === title);
    if (item) {
        item.cantidad++;
        renderCarrito();
    }
}

function disminuirCantidad(e) {
    const title = e.target.getAttribute('data-title');
    const item = carrito.find(item => item.title === title);
    if (item && item.cantidad > 1) {
        item.cantidad--;
    } else {
        carrito = carrito.filter(item => item.title !== title);
    }
    renderCarrito();
}

function eliminarItem(e) {
    const title = e.target.getAttribute('data-title');
    carrito = carrito.filter(item => item.title !== title);
    renderCarrito();
}