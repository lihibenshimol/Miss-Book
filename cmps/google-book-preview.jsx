
export function GoogleBooksPreview({ books, addBook}) {
    
    return <section className="google-books-preview">
    <ul>
        {books.map(book => <li key={book.googleId}>
            {book.title}
            <button onClick={() => {addBook(book.googleId)}} className="btn" >+</button>
        </li>)}
    </ul>
    </section>
}