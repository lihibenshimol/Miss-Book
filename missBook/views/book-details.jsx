const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

import { BooksService } from "../services/books.service.js"

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        BooksService.get(params.bookId)
            .then((book) => setBook(book) )
            .catch((err) => {
                console.log('Had issues in book details', err)
                navigate('/book')
            })
    }
    


    function pageCount() {
        if (book.pageCount > 500) return 'Serious reading'
        if (book.pageCount > 200) return 'Descent reading'
        if (book.pageCount < 100) return 'Light reading'
    }

    function publishedDate() {
        const date = (new Date()).getFullYear()
        if (date - book.publishedDate > 10) return ' Vintage'
        else if (date - book.publishedDate <= 1) return ' New'
    }

    function checkPrice() {
        if (book.listPrice.amount >= 150) return ' red'
        else if (book.listPrice.amount <= 20) return ' green'
        else return ''
    }

    if (!book) return <h1>Loading Book...</h1>
    return <section className="book-details">
        <h3 className="title">{book.title} </h3>
        <h5>{book.subtitle}</h5>
        <img src={book.thumbnail} />

        <div className="content">
            <h4 className={`price ${checkPrice()}`}>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h4>
            <p>{book.description}</p>

            <h5>Published at {book.publishedDate}
                <p>{publishedDate()}</p></h5>

            <p>{book.pageCount} pages <br />
                <span> {pageCount()}</span></p>

            <h5>Language: {book.language}
                {book.categories[0]}, {book.categories[1]}
            </h5>

        </div>

        <div className="btns">
            <span> <button> <Link to="/book">Go back</Link></button> </span>
            <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
            <span> <button> <Link to={`/book/review/${book.id}`}>{book.review ? 'Edit Review' : 'Add Review'}</Link></button> </span>
        </div>

        {
        book.reviews && <div className="book-reviews">
            <h1>Book Reviews</h1>
            <ul className="review">

            { book.reviews.map((bookReview, idx) => 
            <li key={idx}>
                By: <span>{bookReview.reviewer}</span> <br />
                Rate: <span>{bookReview.rate}</span>⭐️ <br />
                Read At: <span>{bookReview.readAt}</span>
                <button className="dlt-btn">Delete</button>
            </li>
            )    
        }
        </ul>
         
        </div>
        }
    </section>
}