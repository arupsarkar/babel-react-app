import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        display_name: 'Not Logged In',
        user_id: '',
        active: false
    },
    reducers: {
        logged_in: (state, payload) => {
            console.log('---> state ', state)
            console.log('---> payload ', payload)
            console.log('---> user_id ', payload.payload.user_id)
            console.log('---> display name ', payload.payload.display_name)
            console.log('---> active ', payload.payload.active)

            state.display_name = payload.payload.display_name
            state.user_id = payload.payload.user_id
            state.active = payload.payload.active
        },
        logged_out: (state) => {
            state.display_name = ''
            state.user_id = ''
            state.active = false
        }
    }
})


// Action creators are generated for each case reducer function

export const { logged_in, logged_out } = userSlice.actions

export default userSlice.reducer
