import { combineReducers } from 'redux'
import ChartsReducer from './ChartsState'
import ContentReducer from './ContentState'
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  charts: ChartsReducer,
  filters: ContentReducer
})

const store = configureStore(
    {
        reducer: rootReducer
    })

export default store