import { createAsyncThunk } from "@reduxjs/toolkit"
import { ACTION_PREFIXES as p } from "../constants/action-types"

export const fetchUser = createAsyncThunk(
  p.USER_FETCH,
  (_, thunkAPI) => thunkAPI.extra.api.getUserProfile(),
)