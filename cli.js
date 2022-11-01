// imports
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var csv = require('fast-csv');
var fs = require('fs');

// variable Declarations
var input = [];
var output = [];
var outputJson = [];
var is_valid_entry = Boolean;

// Get input file name
const inputfileName = process.argv.splice(2);

// Process ouput file name with structure
const csvWriter = createCsvWriter({
    path: 'output.csv',
    header: [{
            id: 'id',
            title: 'id'
        },
        {
            id: 'json',
            title: 'json'
        },
        {
            id: 'is_valid',
            title: 'is_valid'
        }
    ]
});

//Process input file
csv.parseFile(inputfileName[0], {
        headers: true
    })
    .on("data", data => {
        input.push(data);
    })
    .on("end", () => {
        parseInputData(input)
        csvWriter
            .writeRecords(output);
    })
    .on("error", (error) => {
        console.log('Error in the input file. kindly check it and try again. => ', error.message)
    });

//Parse data from input file and process
var parseInputData = function (inputData) {
    for (i = 0; i < inputData.length; i++) {
        item = parseJson(inputData[i].json)
        if (item) {
            itemLength = item.length
            const tableSize = Math.round(Math.sqrt(itemLength))
            if (isValidSquare(itemLength)) {
                is_valid_entry = true
                outputJson = rotateTable(item, tableSize)
            } else {
                is_valid_entry = false
                outputJson = "[]"
            }
        }
        generateOutputEntry(inputData[i].id, outputJson, is_valid_entry)
    }
    displayOutput()
}

//Parse JSON
var parseJson = function (inputJson) {
    try {
        parsedJson = JSON.parse(inputJson);
    } catch (e) {
        parsedJson = ''
        is_valid_entry = false
        outputJson = '[] Error - ' + e.message
    }
    return parsedJson
}
// Process output data
var generateOutputEntry = function (id, json, is_valid) {
    output.push({
        id: id,
        json: json,
        is_valid: is_valid
    })
}

//  process the data from output file
var displayOutput = function () {
    var reader = fs.createReadStream('output.csv');
    reader.pipe(process.stdout)
}

// rotate the table based on json
var rotateTable = function (data, size) {
    var chunked = chunk(data, size); // 3*3
    var rotated = Array.from({
        length: chunked.length
    }, function (_, r) {
        return Array.from({
            length: chunked[r].length
        });
    });

    var rCenter = (chunked.length - 1) / 2;
    for (var r = 0; r < chunked.length; r++) {
        var dr = r - rCenter;
        var cCenter = (chunked[r].length - 1) / 2;
        for (var c = 0; c < chunked[r].length; c++) {
            var val = chunked[r][c];
            var dc = c - cCenter;
            var ring = Math.max(Math.abs(dr), Math.abs(dc));
            rNew = r;
            cNew = c;
            if (ring !== 0) {
                if (dr === -ring && dc !== ring)
                    cNew++;
                // ➡
                else if (dc === -ring)
                    rNew--;
                // ⬆
                else if (dr === ring)
                    cNew--;
                // ⬅
                else
                    rNew++; // ⬇
            }
            rotated[rNew][cNew] = val;
        }
    }
    var mergedJson = [].concat.apply([], rotated)
    return JSON.stringify(mergedJson)
}

// Divide data into multiple chunks
var chunk = function (data, size) {
    return Array.from({
        length: size
    }, function (_, i) {
        return data.slice(i * size, (i + 1) * size);
    });
};


// Check if the given json length is valid for table or not
var isValidSquare = function (n) {
    return n > 0 && Math.sqrt(n) % 1 === 0;
};