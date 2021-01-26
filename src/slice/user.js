import { createSlice } from "@reduxjs/toolkit"
import loadExtraReducers from "./utils/load-extra-reducers"
import { fetchUser } from "../actions/user"
import { STAGES } from "./utils/constants"

const fulfilledReducer = (state, action) => {
  state.status = STAGES.SUCCESS
  Object.assign(state, action.payload)
}

const rejectedReducer = state => {
  state.status = STAGES.FAILED
}

const userSlice = createSlice({
  name         : 'user',
  initialState : {},
  reducers     : {},
  extraReducers: loadExtraReducers(fetchUser, {
    fulfilledReducer,
    rejectedReducer,
  }),
})

export default userSlice.reducer

export const selectUser = state => state.user
export const { action } = userSlice.actions