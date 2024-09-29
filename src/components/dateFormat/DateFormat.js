// The formatDate function takes a date string as input and converts it into a JavaScript Date object.

function formatDate (dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA');
 };

 export default formatDate;