export const productValidator = (req, res, next) => {
  const { title, description, code, price, stock, category, status } = req.body;
  if(
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof code !== "string" ||
    typeof category !== "string" ||
    typeof price !== "number" ||
    typeof stock !== "number" ||
    typeof status !== "boolean"
  ){
    res.status(404).json({ msg: "Los tipos de datos son incorrectos" });
  }
  else if(
    title.trim() === "" ||
    description.trim() === "" ||
    code.trim() === "" ||
    category.trim() === "" ||
    isNaN(price) ||
    isNaN(stock)
  ){
    res.status(400).json({ msg: "Todos los campos son obligatorios" }); 
  } 
  else {
    next();
  }
};
