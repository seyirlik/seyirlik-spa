const initialState = {
  isActive: false,
  loading: true,
};
export const toggleModal = () => ({ type: 'TOGGLE_MODAL' });

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return {
        ...state,
        isActive: !state.isActive,
      };
    default:
      return state;
  }
}
