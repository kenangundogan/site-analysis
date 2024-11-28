const cleanText = (text) => {
    return text.replace(/[^\x00-\x7F]/g, "");
}

export default cleanText;