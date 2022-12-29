import React from 'react'
import StarRating from './StarRating'

const Reviews = ({ reviews }) => {
    return (
        <div className="row row-cols-3 mb-2">
            {reviews.map((review) => {
                return (
                    <div key={review.id} className="card text-black bg-light mb-3"
                        style={{ justifyContent: 'center', width: '100%', fontSize: "1.1rem", fontWeight: "550", cursor: "pointer" }}>
                        <div className="card-header d-flex justify-content-between">
                            <span>{review.name}</span>
                            <span><StarRating rating={review.rating} /></span>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{review.review}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Reviews