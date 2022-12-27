const { useState, useEffect } = React
const { Link } = ReactRouterDOM


import { BookFilter } from "../cmps/book-filter.jsx"
import { BooksList } from "../cmps/books-list.jsx"

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { BooksService } from "../services/books.service.js"

export function BooksIndex() {
    const [filterBy, setFilterBy] = useState(BooksService.getDefaultFilter())
    const [books, setBooks] = useState()
    // const [userMsg, setUserMsg] = useState('')

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        BooksService.query(filterBy)
            .then(booksToDIsplay => {
                setBooks(booksToDIsplay)
            })
    }

       function onRemoveBook(bookId) {
        BooksService.remove(bookId)
            .then(() => {
                const updatedBooks = books.filter(book => book.id !== bookId)
                setBooks(updatedBooks)
                // flashMsg('Book removed!')
                showSuccessMsg('Book Removed!')
            })
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not remove book, try again please!')
            })
        }
        
    function onSetFilter(filterBy) {
        setFilterBy(filterBy)

    }

    return <section className="books-index">
    
         <div>
            {!books && <h1>Loading Books...</h1>}
            <BookFilter onSetFilter={onSetFilter}/>
            <Link to="/book/edit">Add Book</Link>
            {books && < BooksList books={books} onRemoveBook={onRemoveBook} />}
        </div>
     
    </section>

}