const buttons = document.querySelectorAll(".btn");
let cantidad = 0;
let carrito = getData().carrito || [];
let total = getData().total || 0;

//Agregar al carrito

buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const producto = btn.getAttribute("data-name");
    const precio = parseFloat(btn.getAttribute("data-price"));
    const productoEnLista = carrito.find((item) => item.nombre === producto);

    if (productoEnLista) {
      productoEnLista.cantidad++;
    } else {
      carrito.push({ nombre: producto, precio: precio, cantidad: 1 });
    }

    saveData();
  });
});

const pagarBtn = document.querySelector(".pagar");

//Ir a pagar

function pagar() {
  let inputs = document.querySelectorAll(".form-control");
  let camposVacios = false;

  inputs.forEach(function (input) {
    if (input.value === "") {
      camposVacios = true;
    }
  });

  if (camposVacios) {
    alert("No campos vacíos.");
  } else {
    alert(
      `Total a pagar: $${total}. Tu orden ha sido procesada correctamente!`
    );
    deleteAll();
  }
  document.querySelector(".form").reset();
}

pagarBtn.addEventListener("click", pagar);

//Eliminar producto

function deleteProduct(e) {
  if (e.target.tagName == "SPAN") {
    let item_name = e.target.getAttribute("item_nombre");
    deleteProductFromLocalStorage(item_name);
    e.target.remove();
    mostrarProductos();
  }
}

//Mostrar productos en el carrito

function mostrarProductos() {
  const productos = document.querySelector(".productos");
  productos.innerHTML = "";

  let data = getData();

  data.carrito.forEach((item) => {
    const li = document.createElement("li");
    //let cantidades = document.createElement("input");

    //cantidades.type = "number";
    //cantidades.id = "cantidades";
    li.id = "carrito-producto";
    li.textContent = `${item.cantidad} ${item.nombre} $${item.precio}`;
    //productos.appendChild(cantidades);
    productos.appendChild(li);

    let span = document.createElement("span");

    span.setAttribute("item_nombre", item.nombre);
    span.textContent = "x";
    li.appendChild(span);
  });

  productos.addEventListener("click", deleteProduct);

  total = 0;
  data.carrito.forEach((item) => {
    total += item.precio * item.cantidad;
  });

  const totalFinal = document.querySelector(".total-final");
  totalFinal.textContent = `Total: $${total.toFixed(2)}`;

  saveData();
}

//LocalStorage Functions

function getData() {
  //retorna un objeto con el carrito y el total juntos .carrito, .total
  let carrito = localStorage.getItem("carrito");
  let total = localStorage.getItem("total");
  return {
    carrito: JSON.parse(carrito),
    total: JSON.parse(total),
  };
}

function deleteProductFromLocalStorage(item_name) {
  console.clear();
  let data = getData();
  console.log(item_name);
  let productIndex = data.carrito.findIndex(
    (product) => product.name == item_name
  );
  data.carrito.splice(productIndex, 1);
  localStorage.setItem("carrito", JSON.stringify(data.carrito));
}

function saveData() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("total", total);
}

function deleteAll() {
  localStorage.setItem("carrito", JSON.stringify([]));
  localStorage.setItem("total", 0);
}
