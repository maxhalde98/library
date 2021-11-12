let myLibrary = [];

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
    }
}

function addBookToLibrary() {
    let book = arguments[0];
    myLibrary.push(book);
}

function displayBooks() {
    myLibrary.forEach(book => {
        console.log(book.info());
    })
}

const DISPLAY_BTN = document.querySelector('#visible');
const DIV_CONTENT = document.querySelector('#content');

DISPLAY_BTN.addEventListener('click', () => {
    DIV_CONTENT.style.backgroundImage = 'none';
    let children = DIV_CONTENT.children;
    for (i=0; i<children.length; i++) {
        children[i].style.visibility = 'visible';
    }
})

const HOBBIT = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const GOBLET_FIRE = new Book('Harry Potter and the Goblet of Fire', 'JK Rowling', 438, true);

addBookToLibrary(HOBBIT);
addBookToLibrary(GOBLET_FIRE);

function newBookCard() {
    let book = arguments[0];
    let str = ``;
    str += `Title: ${book.title}\nAuthor: ${book.author}\nNumber of pages: ${book.numPages}\n`;
    return str;
}

function populateContent() {
    myLibrary.forEach(book => {
        let bookCard = document.createElement('div');
        bookCard.textContent = newBookCard(book);

        let readInput = document.createElement('input');
        readInput.setAttribute('type', 'checkbox');
        readInput.setAttribute('id', 'read');

        let readLabel = document.createElement('label');
        readLabel.setAttribute('for', 'read');

        let readSpan = document.createElement('span');
        readSpan.innerText = 'Read: ';
        
        bookCard.appendChild(readSpan);
        bookCard.appendChild(readInput);

        bookCard.classList.add('book-card');
        DIV_CONTENT.appendChild(bookCard);
    })
}

populateContent();
