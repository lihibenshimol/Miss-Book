const { Link } = ReactRouterDOM

import { BookPreview } from "./book-preview.jsx";

export function BooksList({ books, onRemoveBook}) {
    
    return  <ul className="books-list full">
            {
                books.map(book => <li key={book.id}>
                    <BookPreview book={book}/>
                   <section className="btns">
                   <button className="select-btn btn"><Link to={`/book/${book.id}`}>Select book</Link> </button>
                   <button className="remove-btn btn" onClick={() => onRemoveBook(book.id)}>Remove book</button> 
                   </section>
                
                </li>)
            }
        </ul>
    
}