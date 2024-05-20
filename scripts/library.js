const newBookBtn = document.querySelector(".new-book-btn");
const bookContainer = document.querySelector('.book-container');
const modal = document.querySelector('dialog');
const newBookForm = document.querySelector('.new-book-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const bookContainerList = bookContainer.children;
const fillerBookCount = 0;
let readBtn;
let removeBtn;

const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead
}

Book.prototype.changeReadStatus = function () {
    this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}

function displayBooks() {
    // Go to last item of library array
    let book = myLibrary.at(-1);

    // Create book div
    let bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    bookDiv.setAttribute('data-index', `${myLibrary.length - 1}`);

    // Create book info
    let newTitle = document.createElement('p');
    let newAuthor = document.createElement('p');
    let newPages = document.createElement('p');
    let readStatus = document.createElement('p');
    readBtn = document.createElement('button');
    removeBtn = document.createElement('button');
    
    newTitle.textContent = book.title;
    newAuthor.textContent = book.author;
    newPages.textContent = book.pages;
    readBtn.textContent = 'Read yet?';
    removeBtn.textContent = 'Remove book';
    if (book.isRead) {
        readStatus.textContent = 'Read';
    } else {
        readStatus.textContent = 'Not Read';
    }

    readBtn.className = 'read-yet';
    readBtn.setAttribute('type', 'button');
    removeBtn.className = 'remove-book';
    removeBtn.setAttribute('type', 'button');

    // Append info to book div
    bookDiv.appendChild(newTitle);
    bookDiv.appendChild(newAuthor);
    bookDiv.appendChild(newPages);
    bookDiv.appendChild(readStatus);
    bookDiv.appendChild(readBtn);
    bookDiv.appendChild(removeBtn);

    // Append book div to bookContainer
    bookContainer.appendChild(bookDiv);

    readBtn.addEventListener('click', (e) => {
        switch (readStatus.textContent) {
            case 'Read':
                readStatus.textContent = 'Not Read';
                break;
            case 'Not Read':
                readStatus.textContent = 'Read';
        }
        myLibrary[bookDiv.dataset.index].changeReadStatus();
    })

    removeBtn.addEventListener('click', () => {
        bookDiv.remove();
        removeBook(bookDiv.dataset.index);
    })
}

function removeBook(bookIndex) {
    // Remove book from library
    myLibrary.splice(bookIndex, 1);
    // Update the rest of library with new index
    for (let i = Number(fillerBookCount) + Number(bookIndex); 
            i < bookContainerList.length; i++) {
        bookContainerList[i].dataset.index = i - fillerBookCount;
    }
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

