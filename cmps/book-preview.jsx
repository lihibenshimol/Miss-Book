export function BookPreview({book}) {
    return <article className="book-preview">
        <img src={book.thumbnail} alt="" />
        <h4>{book.title.toUpperCase()}</h4>
        <h5>{book.listPrice.amount} {book.listPrice.currencyCode}</h5>
    </article>
}