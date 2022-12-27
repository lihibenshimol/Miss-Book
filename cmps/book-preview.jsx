export function BookPreview({book}) {
    return <article className="book-preview">
       <div className="img-container">
         <img src={book.thumbnail}/>
        </div>
        <div>
        <h4>{book.title.toUpperCase()}</h4>
        <h5>{book.listPrice.amount} {book.listPrice.currencyCode}</h5>
        </div>
    </article>
}