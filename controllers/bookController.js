const Book = require("../models/Book");

// Create a book
exports.createBook = async (req, res) => {
  try {
    const { title, author, isbn, description, publishedDate, copies } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: "Title and Author are required" });
    }

    const book = new Book({ title, author, isbn, description, publishedDate, copies });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Fetch a book by ID
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

// Search book by name
exports.searchByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: "Query param `name` is required" });

    const regex = new RegExp(name, "i");
    const books = await Book.find({ title: regex });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Fetch all books with sorting
exports.getAllBooks = async (req, res) => {
  try {
    const { sort, order } = req.query;
    let sortOption = { createdAt: -1 }; // default sort: newest first

    if (sort === "author") sortOption = { author: order === "asc" ? 1 : -1 };
    if (sort === "createdAt") sortOption = { createdAt: order === "asc" ? 1 : -1 };

    const books = await Book.find().sort(sortOption);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedBook) return res.status(404).json({ message: "Book not found" });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};
