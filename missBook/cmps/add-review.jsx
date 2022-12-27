import { BooksService } from "../services/books.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"

const { useNavigate, useParams, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function AddReview() {
    const { bookId } = useParams()
    const navigate = useNavigate()
    const [bookToReview, setBookToReview] = useState(null)
    const [review, setReview] = useState(BooksService.getEmptyReview())

    useEffect(() => {
        if (!bookId) return
        loadBook()
    }, [])

    function loadBook() {
        BooksService.get(bookId)
            .then((book) => setBookToReview(book))
            .catch((err) => {
                console.log('Had issues in book details', err)
                navigate('/book')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setReview((prevReview) => ({
            ...prevReview, [field]: value
        }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        BooksService.addReview(bookId ,review)
        showSuccessMsg('Review Added!')
        navigate(`/book/${bookId}`)
    }

    // function onRemoveReview() {

    // }


    return <section className="add-review">
        {bookToReview && <h1>Add review to {`"${bookToReview.title}"`}</h1>}

        {bookToReview && <form onSubmit={onSaveReview}>
            <label htmlFor="reviewer">Fullname:</label>
            <input type="text"
                name="reviewer"
                id="reviewer"
                placeholder="Enter fullname..."
                value = {review.reviewer}
                onChange={handleChange}
            />

            <label htmlFor="readAt">Read At:</label>
            <input type="date"
                name="readAt"
                id="readAt"
                placeholder="Enter your rate..."
                value = {review.readAt}
                onChange={handleChange}
            />

            <label htmlFor="rate">Rate:</label>
            <select onChange={handleChange} name="rate" id="rate">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <div>
                <button>Save</button>
                <button> <Link to={`/book/${bookToReview.id}`}>Cancel</Link></button>
            </div>

        </form>}


        {!bookToReview && <div>Loading..</div>}

    </section>

}