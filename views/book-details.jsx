const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

import { AddReview } from "../cmps/add-review.jsx"
import { ReviewPreview } from "../cmps/review-preview.jsx"
import { BooksService } from "../services/books.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"

export function BookDetails() {
    const [book, setBook] = useState(null)
    const [modal, setModalIsOpen] = useState(false)
    const [nextBookId, setNextBookId] = useState(null)
    const [prevBookId, setPrevBookId] = useState(null)
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [book])

    function loadBook() {
        BooksService.get(bookId)
            .then((book) => {
                setBook(book)
            })
            .catch((err) => {
                console.log('Had issues in book details', err)
                navigate('/book')
            })

        BooksService.getNextBookId(bookId)
            .then(setNextBookId)

        BooksService.getPrevBookId(bookId)
            .then(setPrevBookId)
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

    function onSaveReview(review) {
        console.log('review = ', review)
        BooksService.addReview(book.id, review)
        loadBook()
        showSuccessMsg('Review Added!')
    }

    function onRemoveReview(reviewId) {
        BooksService.removeReview(book.id, reviewId).then(() => {
            const filteredReviews = book.reviews.filter((review) => review.id !== reviewId)
            setBook({ ...book, reviews: filteredReviews })
        })
    }

    if (!book) return <h1>Loading Book...</h1>
    return <section className="book-details">
        <div className="pages">
        <Link to={`/book/${prevBookId}`}>Prev</Link>
        <Link to={`/book/${nextBookId}`}>Next</Link>
        </div>

        <section className="book-details-layout">
            <img src={book.thumbnail} />
            <div className="content">
                <h3 className="title">{book.title} </h3>
                <h5>{book.subtitle}</h5>
                <h4 className={`price ${checkPrice()}`}>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h4>
                {book.listPrice.isOnSale && <img className="on-sale-img" src="../assets/img/sale.png"/>}
                <p>{book.description}</p>

                <h5>Published at {book.publishedDate}
                    <p>{publishedDate()}</p></h5>

                <p>{book.pageCount} pages <br />
                    <span> {pageCount()}</span></p>

                <h5>Language: {book.language}
                    {book.categories[0]}, {book.categories[1]}
                </h5>

            </div>
        </section>
        <div className="btns">
            <span> <button> <Link to="/book">Go back</Link></button> </span>
            <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>

        </div>

        {<h1> {!book.reviews || !book.reviews.length ? 'No reviews yet' : 'Book Reviews'} </h1>}
        <div className="reviews-container">

            {<AddReview setModalIsOpen={setModalIsOpen} onSaveReview={onSaveReview} />} <hr />

            {book.reviews && <ReviewPreview reviews={book.reviews} onRemoveReview={onRemoveReview} />}
        </div>

    </section>
}