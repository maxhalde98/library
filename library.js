let myLibrary = [];

if(localStorage.getItem('library') === null) {
    populateStorage();
}

else {
    retrieveFromStorage();
}

function populateStorage() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function retrieveFromStorage() {
    myJSON = localStorage.getItem('library');
    myLibrary = JSON.parse(myJSON);
}

function Book(title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
    this.info = function () {
        let str = '';
        if (haveRead === true) {
            str = title + ' by ' + author + ', ' + numPages + ' pages, read';
        }
        else {
            str = title + ' by ' + author + ', ' + numPages + ' pages, not read yet';
        }
        return str;
    };
}

function addBookToLibrary() {
    let book = arguments[0];
    retrieveFromStorage()
    myLibrary.push(book);
    populateStorage();
}

function displayBooks() {
    myLibrary.forEach(book => {
        console.log(book.info());
    })
}

const DISPLAY_BTN = document.querySelector('#visible');
const DIV_CONTENT = document.querySelector('#content');
const HEADER = document.querySelector('#header');
const ADD_BTN = document.querySelector('#visible-add');
const ADD_FORM = document.querySelector('#add-book-form');
const CANCEL_ADD = document.querySelector('#cancel');
const ADD_BOOK_FORM = document.querySelector('#add-form');
const SUBMIT_BTN = document.querySelector('#submit');

DISPLAY_BTN.addEventListener('click', () => {
    if (DISPLAY_BTN.innerHTML === 'My Books' && myLibrary.length !== 0) {
        populateContent();
        DIV_CONTENT.style.backgroundImage = 'none';
        DISPLAY_BTN.innerHTML = 'Hide';
    }
    else if (myLibrary.length === 0) {
        alert('You need to add some books to your library first!');
    }
    else {
        removeContent();
        DIV_CONTENT.style.backgroundImage = 'url("images/shelves-background.jpg")';
        DISPLAY_BTN.innerHTML = 'My Books';
    }
})

ADD_BTN.addEventListener('click', () => {
    ADD_FORM.style.display = 'inline';
})

CANCEL_ADD.addEventListener('click', () => {
    ADD_FORM.style.display = 'none';
})

SUBMIT_BTN.addEventListener('click', () => {
    let title = ADD_BOOK_FORM.elements['title'].value;
    let author = ADD_BOOK_FORM.elements['author'].value;
    let numPages = ADD_BOOK_FORM.elements['num-pages'].value;
    let read = ADD_BOOK_FORM.elements['read'].checked;

    let book = new Book(title,author,numPages,read);

    let present = false;

    myLibrary.forEach(libBook => {
        if (libBook.title === book.title) {
            present = true;
        }
    })
    
    if (present === true) {
        alert('This book is already in your library!');
    }
    else {
        addBookToLibrary(book);

        if (DISPLAY_BTN.innerHTML === 'My Books') {
            populateContent();
        }

        else {
            addSingleBook(book);
        }
    }

    ADD_FORM.style.display = 'none';
})

function newBookCard() {
    let book = arguments[0];
    let str = ``;
    str += `${book.title}\nby ${book.author}\nNumber of pages: ${book.numPages}\n`;
    return str;
}

function populateContent() {
    retrieveFromStorage();
    myLibrary.forEach(book => {
        addSingleBook(book);
    })
}

function removeContent() {
    let books = document.querySelectorAll('.book-card');
    books.forEach(book => {
        book.remove();
    })
}

function addSingleBook(book) {

    let bookCard = document.createElement('div');
    bookCard.innerHTML = newBookCard(book);

    let readInput = document.createElement('input');
    readInput.setAttribute('type', 'checkbox');
    readInput.setAttribute('id', 'read');
    readInput.checked = book.haveRead;

    let readLabel = document.createElement('label');
    readLabel.setAttribute('for', 'read');
    readLabel.textContent = 'Read: ';

    bookCard.textContent += 'Read: ';
    bookCard.style.display = 'inline-block';
    bookCard.appendChild(readInput);
    bookCard.appendChild(document.createElement('br'));

    let removeBtn = document.createElement('button');
    removeBtn.style.position = 'absolute';
    removeBtn.style.bottom = '12px';
    removeBtn.textContent = 'Remove';

    bookCard.appendChild(removeBtn);

    removeBtn.addEventListener('click', () => {
        bookCard.remove();
        retrieveFromStorage();
        for (i=0; i<myLibrary.length; i++) {
            if (book.title === myLibrary[i].title) {
                myLibrary.splice(i,1);
            }
        }
        populateStorage();
        if (myLibrary.length === 0) {
            DIV_CONTENT.style.backgroundImage = 'url("images/shelves-background.jpg")';
            DISPLAY_BTN.innerHTML = 'My Books';
        }
    })

    bookCard.classList.add('book-card');

    let children = DIV_CONTENT.childNodes;

    let present = false;

    children.forEach(child => {
        if (child.isEqualNode(bookCard)) {
            present = true;
        }
    })

    if (present === false) {
        DIV_CONTENT.appendChild(bookCard);
        DIV_CONTENT.style.backgroundImage = 'none';
        DISPLAY_BTN.innerHTML = 'Hide';
    }
}
