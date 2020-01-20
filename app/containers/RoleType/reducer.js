/*
 *
 * RoleType reducer
 *
 */
import { fromJS } from 'immutable';
import {
  GET_ALL_ROLETYPE,
  GET_ALL_ROLETYPE_SUCCESS,
  GET_ALL_ROLETYPE_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  response: false,
  actiontype: false,
  methodtype: false,
});

function roleTypeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ROLETYPE:
      return state.set('loading', true).set('actiontype', action.type);
    case GET_ALL_ROLETYPE_SUCCESS:
      return state
        .set('allROLETYPE', action.allROLETYPE)
        .set('loading', false)
        .set('actiontype', action.type);
    case GET_ALL_ROLETYPE_ERROR:
      return state
        .set('error', true)
        .set('loading', false)
        .set('actiontype', action.type);
    default:
      return state;
  }
}

export default roleTypeReducer;
