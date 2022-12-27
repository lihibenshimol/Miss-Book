import { BooksService } from "../services/books.service.js"
import { eventBusService, showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(BooksService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (!bookId) return
        loadBook()
    }, [])

    function loadBook() {
        BooksService.get(bookId)
        .then((book) => setBookToEdit(book))
        .catch((err) => {
            console.log('Had issues in book details', err)
            navigate('/book')
        })
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setBookToEdit((prevBook) => ({...prevBook, [field]: value}))
    }

    function handleChangePrice({ target }) {
        let { value } = target
        setBookToEdit((prevBook) => ({...prevBook, listPrice: {
        ...prevBook.listPrice ,amount: +value 
        }}))
    }


    function onSaveBook(ev) {
        ev.preventDefault()
        BooksService.save(bookToEdit).then((book) => {
            showSuccessMsg('Book saved!')
            navigate('/book')
        })
        .catch((err) => {
            showErrorMsg('Cancled')
        })
    }


    return <section className="book-edit">

        <form onSubmit={onSaveBook}>
            <label htmlFor="title">Title:</label>
            <input type="text"
                name="title"
                id="title"
                placeholder="Enter title..."
                value={bookToEdit.title}
                onChange={handleChange}
            />

            <label htmlFor="price">Price:</label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter Price..."
                value={bookToEdit.listPrice.amount}
                onChange={handleChangePrice}
            />

            <div className="btns">
                <span> <button>{bookToEdit.id ? 'Save' : 'Add'}</button> </span>
                <button> <Link to="/book">Cancel</Link></button>
            </div>

        </form>
    </section>
}