const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Create book
router.post("/", bookController.createBook);

// Fetch all books with sorting
router.get("/", bookController.getAllBooks);

// Search books by name
router.get("/search", bookController.searchByName);

// Get single book
router.get("/:id", bookController.getBook);

// Update book
router.put("/:id", bookController.updateBook);

// Delete book
router.delete("/:id", bookController.deleteBook);

module.exports = router;

