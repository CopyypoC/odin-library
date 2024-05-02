const newBookBtn = document.querySelector(".new-book-btn");
const bookContainer = document.querySelector('.book-container');
const modal = document.querySelector('dialog');
const newBookForm = document.querySelector('.new-book-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');

const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead
}

function addBookToLibrary(title, author, pages, isRead) {
    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}

function displayBooks() {
    // Go to last item of library array
    let book = myLibrary.at(-1);
    // Add new element to book-container with innerhtml
    
}

newBookBtn.addEventListener('click', (e) => {
    modal.showModal();
})

newBookForm.addEventListener('reset', () => {
    modal.close();
})

newBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    displayBooks();

    newBookForm.reset(); 
})