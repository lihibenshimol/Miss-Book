const { Link } = ReactRouterDOM

import { BookPreview } from "./book-preview.jsx";

export function BooksList({ books, onRemoveBook}) {
    
    return  <ul className="books-list full">
            {
                books.map(book => <li key={book.id}>
                    <BookPreview book={book}/>
                   <section className="btns">
        
                     <Link className="fa select-btn btn" to={`/book/${book.id}`}></Link>
                   <button className="fa remove-btn btn" onClick={() => onRemoveBook(book.id)}> </button> 
                   
                   </section>
                
                </li>)
            }
        </ul>
    
}