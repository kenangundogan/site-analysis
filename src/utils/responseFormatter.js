const formatResponse = ({ status = 'success', message = '', data = null }) => {
    return {
        status,
        message,
        data,
    };
};

export default formatResponse;
