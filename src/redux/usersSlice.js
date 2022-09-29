import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersList: [],
        error: false,
        errorMessage: "",
        isLoading: false
    },
    reducers: {
        setUsers: (state, action) => {
            state.usersList = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
})

export const { setUsers, setError, setErrorMessage, setLoading } = usersSlice.actions

export default usersSlice.reducer