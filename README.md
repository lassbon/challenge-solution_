## Rotation Engine

This is a javascript based node project 

## Requirements

- **npm  >= 8.11.0**
- **node >= 16.16.0**

## Details

cli.js - contains the logic of the challange

input.csv - is the input file for the program

output.csv - this file will be created that the program writes the output to

I have used multiple scenarios for testing, all are mentioned in input.csv file.

## Usage

- Install the dependencies using `npm i`
- Use command `npm run start or node cli.js <input.csv> > <output.csv>` to process the entries in `<input.csv>` and write the output to `<output.csv>`

**Try Out:**

```
   npm install
   npm run start or  node cli.js input.csv > output.csv
```

# Error Handling
Error handling was done inside the computation itself. if any input throws an error, the system will throw the error for that certain entry and continue working on the other entries.

Corresponding errors can be found in the output file.

For the same, one can run input.csv to check the errors.

## Sample Input/Output CSV

**Input CSV:**
```
id,json
1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
2,"[40, 20, 90, 10]"
3,"[-5]"
9,"[2, -0]"
5,"[2, -5, -5]"
8,"[1, 1, 1, 1, 1]”
```

**Output CSV:**
```
id,json,is_valid
1,"[4, 1, 2, 7, 5, 3, 8, 9, 6]",true
2,"[90, 40, 10, 20]",true
3,"[-5]",true
9,"[]",false
5,"[]",false
8,”[]",false
```

## Contact
You can always reach me for more details 
- abayomiajao27@gmail.com

