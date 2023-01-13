const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    return `${date.toLocaleDateString()}, ${date.toLocaleTimeString().slice(0, -3)}`;
}

export default formatDate;