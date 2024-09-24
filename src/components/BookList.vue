<template>
    <div>
      <h1>Books with ISBN > 1000</h1>
  
      <!-- Search bar for querying book names with a search button -->
      <input v-model="searchTerm" placeholder="Search by book name" />
      <button @click="searchBooks">Search</button>
  
      <ul>
        <li v-for="book in books" :key="book.id">
          <div v-if="editingBookId === book.id">
            <input v-model="updatedBook.name" placeholder="New Name" />
            <input v-model="updatedBook.isbn" placeholder="New ISBN" type="number" />
            <button @click="confirmUpdate(book.id)">Confirm</button>
            <button @click="cancelEdit">Cancel</button>
          </div>
          <div v-else>
            {{ book.name }} - ISBN: {{ book.isbn }}
            <button @click="startEdit(book)">Update</button>
            <button @click="deleteBook(book.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
  import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
  import db from '@/firebase';
  
  export default {
    setup() {
      const books = ref([]);
      const editingBookId = ref(null);
      const updatedBook = ref({ name: '', isbn: '' });
      const searchTerm = ref('');
  
      // Fetch books with ISBN > 1000 or based on search term
      const fetchBooks = async () => {
        try {
          let q;
          if (searchTerm.value.trim() === '') {
            // Default query if no search term
            q = query(
              collection(db, 'books'),
              where('isbn', '>', 1000),
              orderBy('isbn', 'asc'),
              limit(10)
            );
          } else {
            // Query based on the search term (search by name)
            q = query(
              collection(db, 'books'),
              where('name', '>=', searchTerm.value),
              where('name', '<=', searchTerm.value + '\uf8ff'), // To make the search inclusive for partial matches
              limit(10)
            );
          }
  
          const querySnapshot = await getDocs(q);
          const booksArray = [];
          querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
          });
          books.value = booksArray;
        } catch (error) {
          console.log('Error fetching books: ', error);
        }
      };
  
      // Function to update a book
      const confirmUpdate = async (id) => {
        try {
          const bookRef = doc(db, 'books', id);
          await updateDoc(bookRef, updatedBook.value);
          alert('Book updated successfully');
          cancelEdit();
          fetchBooks(); // Refresh the list after update
        } catch (error) {
          console.log('Error updating book: ', error);
          alert('Error updating book');
        }
      };
  
      // Function to delete a book
      const deleteBook = async (id) => {
        if (confirm('Are you sure you want to delete this book?')) {
          try {
            const bookRef = doc(db, 'books', id);
            await deleteDoc(bookRef);
            alert('Book deleted successfully');
            fetchBooks(); // Refresh the list after deletion
          } catch (error) {
            console.log('Error deleting book: ', error);
            alert('Error deleting book');
          }
        }
      };
  
      // Start editing a book
      const startEdit = (book) => {
        editingBookId.value = book.id;
        updatedBook.value = { name: book.name, isbn: book.isbn };
      };
  
      // Cancel editing
      const cancelEdit = () => {
        editingBookId.value = null;
        updatedBook.value = { name: '', isbn: '' };
      };
  
      // Search books by name
      const searchBooks = () => {
        fetchBooks(); // Re-run fetchBooks with search term to filter the list
      };
  
      onMounted(() => {
        fetchBooks(); // Fetch initial data
      });
  
      return {
        books,
        editingBookId,
        updatedBook,
        searchTerm,
        startEdit,
        cancelEdit,
        confirmUpdate,
        deleteBook,
        searchBooks,
      };
    },
  };
  </script>
  