const newBookBtn = document.querySelector(".new-book-btn");
const bookContainer = document.querySelector('.book-container');
const modal = document.querySelector('dialog');
const newBookForm = document.querySelector('.new-book-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const bookContainerList = bookContainer.children;
// Number of placeholder books to populate library
const fillerBookCount = 0;
let readBtn;
let removeBtn;

const myLibrary = [];

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
    changeReadStatus()  {
        this.isRead = !this.isRead;
    }
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
    newBookForm.reset();
    modal.showModal();
})

newBookForm.addEventListener('reset', () => {
    modal.close();
})

newBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    validateTitle();
    validateAuthor();
    validatePages();

    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    displayBooks(); 
})

title.addEventListener('input', () => {
    validateTitle();
})

author.addEventListener('input', () => {
    validateAuthor();
})

pages.addEventListener('input', () => {
    validatePages();
})

function validateTitle() {
    if (title.validity.valueMissing) {
        title.style.border = '2px solid red';
        title.setCustomValidity('Please enter a title.');
        title.reportValidity();
    } else {
       title.setCustomValidity('');
       title.style.border = '';
    }
}

function validateAuthor() {
    if (author.validity.valueMissing) {
        author.style.border = '2px solid red';
        author.setCustomValidity('Please enter an author.');
        author.reportValidity();
    } else {
       author.setCustomValidity('');
       author.style.border = '';
    }
}

function validatePages() {
    if (pages.validity.valueMissing) {
        pages.style.border = '2px solid red';
        pages.setCustomValidity('Please enter page amount.');
        pages.reportValidity();
    } else {
       pages.setCustomValidity('');
       pages.style.border = '';
    }
}

// Simply force requirement and custom message each input