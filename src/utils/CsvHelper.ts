import fs from 'fs';    //fs; files syste,
import {parse} from 'csv-parse/sync';  //parse; parse the csv file

export class CsvHelper {
    static readCsv(filePath: string): Record<string, string>[] { //Record object is a built-in type in TypeScript that represents an object with string keys and string values. It is used to define the return type of the readCsv method, which returns an array of objects where each object is a record with string keys and string values.
        return parse(fs.readFileSync(filePath, 'utf-8'),{ // readFileSync; read the file synchronously, utf-8; encoding type
            columns: true, //first row is header column 
            trim: true //trim the spaces
 
        

        }) as Record<string, string>[];//Record is a existing collection type in typescript, it is a generic type that takes two parameters, the first parameter is the key type and the second parameter is the value type. In this case, we are using string as the key type and string as the value type. so it will return an array of objects where each object is a record with string keys and string values.    
        
    }
    }