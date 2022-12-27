const { useState, useEffect } = React

import { BooksService } from "../services/books.service.js"

export function BookFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(BooksService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => {
            return {...prevFilter, [field]: value}
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="book-filter main-layout">
        <form className="filter-form" onSubmit={onSubmitFilter}>
            <input type="text"
                id="title"
                name="title"
                placeholder="Search by title"
                onChange={handleChange} /> 

            <input type="range" min="10" max="300"
                id="maxPrice"
                name="maxPrice"
                placeholder="by max price"
                onChange={handleChange} />
    
        </form>

    </section>
}