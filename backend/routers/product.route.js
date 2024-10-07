import express from "express";

import { createProducts, deleteProducts, getProducts, updateProducts } from "../controllers/product.controller.js";

const router = express.Router();

// Llamar los productos
router.get("/", getProducts );
// Crear un producto
router.post("/", createProducts );
// Editar un producto (put para todos los fields y patch para unos cuantos, no necesariamente todos)
router.put("/:id", updateProducts );
// Eliminar un producto
router.delete("/:id", deleteProducts );

export default router;