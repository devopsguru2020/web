import {
    DIAGNOSIS_FETCH_REQUESTED,
    DIAGNOSIS_FETCH_SUCCESS,
    DIAGNOSIS_FETCH_ERROR
} from "../../types/diagnosis";

const INITIAL_STATE = {
    evidence: [],
    inProgress: false,
    currentQuestion: {},
    allQuestion: []
};

const diagnosisReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case DIAGNOSIS_FETCH_REQUESTED:
        return (() => {
            const {
                data: { evidence }
            } = action;

            const currentEvidence = state.evidence;

            return {
                ...state,
                evidence: [...currentEvidence, ...evidence],
                inProgress: true,
                isLoading: true
            };
        })();
    case DIAGNOSIS_FETCH_SUCCESS:
        return (() => {
            const {
                data: { question, should_stop, conditions }
            } = action;

            const isInProgress = () => {
                return should_stop != null;
            };

            return {
                ...state,
                question,
                should_stop,
                conditions,
                inProgress: isInProgress(),
                isLoading: false
            };
        })();
    case DIAGNOSIS_FETCH_ERROR:
        return {
            ...state,
            isLoading: false
        };
    default:
        return state;
    }
};

export default diagnosisReducer;
