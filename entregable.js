class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    const codeExists = this.products.some((product) => product.code === code);
    if (codeExists) {
      console.error("El código de producto ya existe");
      return;
    }

    const product = {
      id: this.#getMaxId() + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);
  }

  #getMaxId() {
    let maxId = 0;
    this.products.map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      return console.log("Not found");
    }
  }
}

const productManager = new ProductManager();

productManager.addProduct(
  "Remera",
  "Remera de algodon color blanca",
  9500,
  "https://acdn.mitiendanube.com/stores/805/809/products/411-aa3b928ffbecef336216915904717888-640-0.png",
  500,
  15
);
productManager.addProduct(
  "Pantalon",
  "Pantalon de jean color azul",
  27500,
  "https://amigosafety.com/images/productos/1680213793_PANTALON%20FRENTE.png",
  501,
  5
);
productManager.addProduct(
  "Buzo",
  "Buzo de algodon color negro",
  15500,
  "https://dcdn.mitiendanube.com/stores/002/031/572/products/buzo-canguro-liso-0ba81b4d9582ad355b16483057940923-640-0.png",
  502,
  10
);
console.log(productManager.getProducts());
