export function ReviewPreview({ onRemoveReview, reviews }) {
    return <div className="book-reviews">
        <ul className="review">
            {reviews.map(bookReview =>
                <li key={bookReview.id}>
                    By: <span>{bookReview.reviewer}</span> <br />
                    Rate: <span>{bookReview.rate}</span>⭐️ <br />
                    Read At: <span>{bookReview.readAt}</span>
                    <button className="dlt-btn" onClick={() => onRemoveReview(bookReview.id)}>X</button>
                </li>
            )
            }
        </ul>
    </div>
}