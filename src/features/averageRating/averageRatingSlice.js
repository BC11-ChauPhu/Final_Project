import { createSlice } from "@reduxjs/toolkit";

export const averageRatingSlice = createSlice({
    name: 'averageRating', 
    initialState: {
        rating: 0,
        reviews: 0
    },
    reducers: {
        setAverageRating: (state, action) => {
            state.rating = action.payload
        },
        setReviews: (state, action) => {
            state.reviews = action.payload
        }
    }
})

export const {setAverageRating} = averageRatingSlice.actions
export const {setReviews} = averageRatingSlice.actions

export default averageRatingSlice.reducer