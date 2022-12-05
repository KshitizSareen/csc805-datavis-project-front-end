export const initialContentState ={
    chartsText: "Charts Default Text"
}

export default function ContentReducer(state, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
      // Do something here based on the different types of actions
      case 'changeContentText': {
        return {
            ...state,
            chartsText: "New Content Default Text"
        }
      }

      default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
  }