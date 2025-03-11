import Dexie,{Table} from 'dexie';
import { City } from '../models/upload-result';



// export interface City {
//     code:string;
//     city_name:string;
// }


export class AppDB extends Dexie{
    // primary key is type string
    cities!:Table<City,string>; //list. can define a table and show the list of cities
    constructor(){
        super('fileUpload'); // name of the folder / database name
        this.version(1).stores({
            cities:'code,city_name' // Define the schema for the 'cities' table

            //cities -> table name
            // code -> primary key
            // city_name -> value / indexed field (non-unique)

            
        });
        this.cities = this.table('cities') // explicity defined as the table
    }
    async addCity(item:City){
        await this.cities.put(item) // Add or update a city
    }
}
export const db = new AppDB();
