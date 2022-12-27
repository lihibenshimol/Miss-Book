const { useState, useEffect } = React

import { BooksService } from "../services/books.service.js"


export function AddReview({ setModalIsOpen, onSaveReview }) {

    const [review, setReview] = useState(BooksService.getEmptyReview())

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setReview((prevReview) => ({
            ...prevReview, [field]: value
        }))
    }

    function submitReview(ev) {
        ev.preventDefault()
        setModalIsOpen(false)
        onSaveReview(review)
    }

    return <section className="add-review">

        <form onSubmit={submitReview}>
            <label htmlFor="reviewer">Fullname:</label>
            <input type="text"
                name="reviewer"
                id="reviewer"
                placeholder="Enter fullname..."
                value={review.reviewer}
                onChange={handleChange}
            />

            <label htmlFor="readAt">Read At:</label>
            <input type="date"
                name="readAt"
                id="readAt"
                placeholder="Enter your rate..."
                value={review.readAt}
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
            </div>
        </form>

    </section>

}