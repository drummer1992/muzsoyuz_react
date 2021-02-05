import { createAsyncThunk } from '@reduxjs/toolkit'
import { ACTION_PREFIXES as p } from '../constants/action-types'
import { setDataToLocalStorage } from '../utils/muzsoyuz/setDataToLS'


export const fetchUser = createAsyncThunk(
  p.USER_FETCH,
  (_, thunkAPI) => {
    return thunkAPI.extra.api.getUserProfile()
  }
)

export const authenticateUser = createAsyncThunk(
  p.USER_AUTH,
  async({ route, body }, thunkAPI) => {
    const response = await thunkAPI.extra.api.makeAuthentication(route, body)

    await setDataToLocalStorage(response)

    await thunkAPI.dispatch(fetchUser())
  }
)

export const getTokenAfterOauth = createAsyncThunk(
  p.USER_OAUTH,
  async({ provider, query }, thunkAPI) => {
    thunkAPI.extra.api.getTokenAfterSocialOauth(provider, query)

    await thunkAPI.dispatch(fetchUser())
  }
)

export const userProfileUpdate = createAsyncThunk(
  p.USER_PROFILE_UPDATE,
  ({ role, yearCommercialExp }, thunkAPI) => {
    return thunkAPI.extra.api.makeProfileUpdate({ role, yearCommercialExp })
  }
)

export const setDaysOff = createAsyncThunk(
  p.USER_DAYS_OFF,
  ({dates, dayOff}, thunkAPI) => {
    return thunkAPI.extra.api.setDaysOff({dates, dayOff})
  }
)
