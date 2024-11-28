const formatResponse = ({ status = 'success', message = '', data = null, ...args }) => {
    return {
        status,
        message,
        ...args,
        data,
    };
};

export default formatResponse;
