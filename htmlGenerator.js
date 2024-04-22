const htmlGenerator = {
    getHTMLDocumentStart: function() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cars</title>
</head>`;
    },
    getHTMLDocumentEnd: function() {
        return `</html>`;
    }
};

module.exports = htmlGenerator;


{ 
    id: Number;
    make: String;
    model: String;
    year: Number;
    color: String;
};