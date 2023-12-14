const express = require("express");
const router = express.Router();
const Libro = require("../models/Libro");

// Ruta para obtener todos los libros
router.get("/", async (req, res, next) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    next(error);
  }
});

// Ruta para crear un nuevo Libro
router.post("/", async (req, res, next) => {
  try {
    const nuevoLibro = new Libro(req.body);
    await nuevoLibro.save();
    res.json(nuevoLibro);
  } catch (error) {
    next(error);
  }
});

// Ruta para actualizar un Libro existente
router.put("/:id", async (req, res, next) => {
  try {
    const libroActualizado = await Libro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(libroActualizado);
  } catch (error) {
    next(error);
  }
});

// Ruta para eliminar un Libro
router.delete("/:id", async (req, res, next) => {
  try {
    await Libro.findByIdAndDelete(req.params.id);
    res.json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
