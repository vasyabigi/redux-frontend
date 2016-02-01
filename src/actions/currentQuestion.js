import * as types from '../constants/ActionTypes';
import { createAction } from 'redux-actions';
import { cleanQuestion } from './newQuestion';
import { routeActions } from 'react-router-redux';
import { api } from '../utils/api';

export function getQuestion(slug) {
    return {
         type: types.GET_QUESTION,
        payload: {
            promise: api.get(`/questions/${slug}`)
        }
    };
}

export function createQuestion(questionData) {
    return {
        type: types.CREATE_QUESTION,
        payload: {
            promise: api.post('/questions', questionData).then(response => {
                return (action, dispatch, getState) => {
                    dispatch(cleanQuestion());
                    dispatch(routeActions.push(`/questions/${response.slug}`));
                };
            })
        }
    };
}