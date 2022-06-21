import * as actionType from '../constants/actionTypes';
import { initialPollState } from './initialState';

const pollReducer = (state = initialPollState, action) => {
    switch (action.type) {
        case actionType.POLLADD_SUCCESS:
            return { ...state, polls: [action.payload, ...state.polls] };
        case actionType.OPTIONADD_SUCCESS:
            return {
                ...state,
                polls: [
                    ...state.polls.map((poll) =>
                        poll.id === action.payload.poll_id
                            ? {
                                  ...poll,
                                  options: poll.options
                                      ? [...poll.options, action.payload]
                                      : [action.payload],
                              }
                            : poll
                    ),
                ],
            };
        case actionType.POLLSEARCH_SUCCESS:
            return { ...state, polls: action.payload };
        case actionType.POLLDELETE_SUCCESS:
            return {
                ...state,
                polls: state.polls.filter((poll) => poll.id !== action.payload),
            };
        case actionType.OPTIONDELETE_SUCCESS:
            return {
                ...state,
                polls: [
                    ...state.polls.map((poll) =>
                        poll.id === action.payload.poll_id
                            ? {
                                  ...poll,
                                  options: poll.options.filter(
                                      (option) =>
                                          option.id !== action.payload.id
                                  ),
                              }
                            : poll
                    ),
                ],
            };
        case actionType.POLLVOTE_SUCCESS:
            return {
                ...state,
                polls: [
                    ...state.polls.map((poll) =>
                        poll.id === action.payload.poll_id
                            ? {
                                  ...poll,
                                  options: [
                                      ...poll.options.map((option) =>
                                          option.id === action.payload.id
                                              ? {
                                                    ...option,
                                                    votes: [
                                                        ...option.votes,
                                                        action.payload.user_id,
                                                    ],
                                                }
                                              : option
                                      ),
                                  ],
                              }
                            : poll
                    ),
                ],
            };
        default:
            return state;
    }
};

export default pollReducer;
