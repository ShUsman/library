const bookList = document.querySelector('#bookList');
const addBookButton = document.querySelector('.add-book');
const modal = document.querySelector('#modal');
const submitButton = document.querySelector('.modal-submit');
const onCloseModal = document.querySelector('.close'); 

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

const books = [];

function createBookCards(book, index) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const title = document.createElement('h3');
    const author = document.createElement('h3');
    const pages = document.createElement('h3');
    const status = document.createElement('h3');

    const removeBook = document.createElement('button');
    removeBook.textContent = 'Remove';

    removeBook.addEventListener('click', () => {
        books.splice(index, 1)
        renderBooks()
    })

    title.textContent = `Title: ${book.title}`;
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `Pages: ${book.pages}`;
    status.textContent = `Status: ${book.isRead ? 'Read' : 'Not read'}`;


    bookCard.append(title, author, pages, status, removeBook);
    return bookCard;
}

function renderBooks() {
    bookList.textContent = '';

    books.forEach((book, index) => {
        bookList.append(createBookCards(book, index));
    });
}

onCloseModal.addEventListener('click', () => {
    modal.style.display = 'none';
    
})

// Открытие модального окна при нажатии кнопки "Add book"
addBookButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', (event) => {
    console.log(event.target);
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Добавление новой книги при нажатии кнопки "Submit" в модальном окне
submitButton.addEventListener('click', () => {
    const bookName = document.querySelector('#bookName').value;
    const bookAuthor = document.querySelector('#bookAuthor').value;
    const bookPages = document.querySelector('#bookPages').value;
    const bookCheck = document.querySelector('#bookCheck').checked;
    if (bookName && bookAuthor && bookPages) {
        const book = new Book(bookName, bookAuthor, bookPages, bookCheck);
        books.push(book);
        renderBooks();

        // Очистка полей ввода и закрытие модального окна
        document.querySelector('#bookName').value = '';
        document.querySelector('#bookAuthor').value = '';
        document.querySelector('#bookPages').value = '';
        document.querySelector('#bookCheck').checked = false;
        modal.style.display = 'none';
        addBookButton.removeAttribute('disabled'); // Включение кнопки "Add book"
    } else {
        alert('Please fill in all fields');
    }
});

renderBooks()
