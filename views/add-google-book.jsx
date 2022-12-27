const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

import { googleBookService } from "../services/google-book.service.js"
import { GoogleBooksPreview } from "../cmps/google-book-preview.jsx"
import { BooksService } from "../services/books.service.js"
import { eventBusService, showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

export function AddGoogleBook() {
    const [titleToSearch, setTitleToSearch] = useState('')
    const [books, setBooks] = useState()
    const [list, setListIsOpen] = useState(true)
    const navigate = useNavigate()
    
    const processChange = debounce(() => loadBooks());

    useEffect(() => {
        processChange()
    }, [titleToSearch])

    function loadBooks() {
        googleBookService.query(titleToSearch)
            .then(books => {
                setBooks(books)
            })
    }

    function handleChange({ target }) {
        let { value } = target
        setTitleToSearch(prevTitle => prevTitle = value)
    }

    function debounce(func, timeout = 300){
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => { func.apply(args); }, timeout);
        };
      }

    function searchGoogleBook(ev) {
        ev.preventDefault()
        // setListIsOpen(true)
        googleBookService.query(titleToSearch)
            .then((books) => console.log('books = ', books))
    }

    function addBook(bookId) {
        googleBookService.get(bookId)
            .then((book) => {
                console.log(book)
                BooksService.save(book)
                showSuccessMsg('Book has been Added')
                navigate('/book')
            })
    }


    return <section className="add-google-book">
        <h1>Add book from web</h1>
        <form onSubmit={searchGoogleBook}>
            <input type="search"
                id="title"
                name="title"
                placeholder="Search book by title"
                value={titleToSearch}
                onChange={handleChange}
            />
        </form>

        {books && list && <GoogleBooksPreview books={books} addBook={addBook} />}

    </section>
}