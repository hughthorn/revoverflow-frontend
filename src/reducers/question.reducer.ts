/**
@author
Jordon Hill
*/

import { QuestionState } from '.';
import { QuestionActionPayload, questionActionTypes, QuestionsActionPayload } from '../actions/question.actions';
import { Action } from 'redux';


const initialState: QuestionState = {
    collectedQuestions: [],
    storeQuestion: JSON.parse((localStorage.getItem('question')) || '{}'),
    storeTab: 0,
    storePageCount: 0,
    storePage: 0,
}

export const questionReducer = (state: QuestionState = initialState,
    action: QuestionActionPayload & QuestionsActionPayload & Action) => {

    switch (action.type) {
        case questionActionTypes.POST_QUESTION: {
            let questionArray = state.collectedQuestions;
            questionArray = [...questionArray, action.payload.question]
                    .sort((a, b) => a.creationDate.getTime() - b.creationDate.getTime());
            return {
                ...state,
                collectedQuestions: questionArray
            }
        }
        case questionActionTypes.CLICK_QUESTION: {
            return {
                ...state,
                storeQuestion: action.payload.question
            }
        }
        case questionActionTypes.CLICK_TAB: {
            return {
                ...state,
                collectedQuestions: action.payload.questions,
                storeTab: action.payload.tab,
                storePageCount: action.payload.pageCount,
                storePage: action.payload.page
            }
        }
        default: {
            return state;
        }
    }
}