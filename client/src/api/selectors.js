export const createErrorMessageSelector = (actions) => (state) => {
    const errors = actions.map((action) => state.errors[action]);
    if (errors && errors[0]) {
        return errors[0];
    }
    return '';
};

export const createLoadingSelector = (actions) => (state) => {
    return actions.some((action) => state.loading[action]);
};
