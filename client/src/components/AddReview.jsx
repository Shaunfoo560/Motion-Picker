import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MovieAPI from '../apis/MovieAPI';

const AddReview = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");

    const handleSubmitReview = async () => {
        const response = await MovieAPI.post(`/${id}/addReview`, {
            name,
            review: reviewText,
            rating
        });
    };

    return (
        <div className="form-group font-weight-bold">
            <form action="">
                <div className="form-group font-weight-bold">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="name" type="text" className="form-control" />
                </div>
                <div className="form-group font-weight-bold">
                    <label htmlFor="rating">Rating</label>
                    <select value={rating} onChange={(e) => setRating(e.target.value)} id="rating" className="custom-select">
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="form-group font-weight-bold">
                    <label htmlFor="Review">Review</label>
                    <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} id="Review" className="form-control"></textarea>
                </div>
                <div className="form-group font-weight-bold text-center">
                    <button onClick={handleSubmitReview} className="btn btn-success">Add Review</button>
                </div>
            </form>
        </div>
    )
}

export default AddReview