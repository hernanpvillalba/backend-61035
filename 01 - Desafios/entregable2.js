const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProductsFromFile();
    const newProduct = {
      id: this.generateNextId(products),
      ...product,
    };
    products.push(newProduct);
    this.saveProductsToFile(products);
  }

  getProduct() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const products = this.getProductsFromFile();
    const product = products.find((p) => p.id === id);
    return product ? product : null;
  }

  updateProduct(id, updatedFields) {
    const products = this.getProductsFromFile();
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        ...updatedFields,
        id,
      };
      this.saveProductsToFile(products);
      return true;
    }
    return false;
  }

  deleteProduct(id) {
    let products = this.getProductsFromFile();
    products = products.filter((p) => p.id !== id);
    this.saveProductsToFile(products);
  }

  generateNextId(products) {
    const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
    return maxId + 1;
  }

  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProductsToFile(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
  }
}

const productManager = new ProductManager("products.json");

productManager.addProduct({
  title: "Remera",
  description: "Remera de algodon color blanca",
  price: 9500,
  thumbnail:
    "https://acdn.mitiendanube.com/stores/805/809/products/411-aa3b928ffbecef336216915904717888-640-0.png",
  code: 500,
  stock: 15,
});

productManager.addProduct({
  title: "Pantalon",
  description: "Pantalon de jean color azul",
  price: 27500,
  thumbnail:
    "https://amigosafety.com/images/productos/1680213793_PANTALON%20FRENTE.png",
  code: 501,
  stock: 5,
});

productManager.addProduct({
  title: "Buzo",
  description: "Buzo de algodon color negro",
  price: 15500,
  thumbnail:
    "https://dcdn.mitiendanube.com/stores/002/031/572/products/buzo-canguro-liso-0ba81b4d9582ad355b16483057940923-640-0.png",
  code: 502,
  stock: 10,
});

const allProducts = productManager.getProduct();
console.log("Todos los productos:", allProducts);

const productById = productManager.getProductById(1);
console.log("Producto con ID 1:", productById);

const updateSuccess = productManager.updateProduct(1, {
  title: "Nueva Remera",
  price: 10500,
});
if (updateSuccess) {
  console.log("Producto actualizado con éxito.");
} else {
  console.log("No se encontró ningún producto con el ID especificado.");
}

productManager.deleteProduct(2);
console.log("Producto con ID 2 eliminado.");

const updatedProducts = productManager.getProduct();
console.log("Productos actualizados:", updatedProducts);