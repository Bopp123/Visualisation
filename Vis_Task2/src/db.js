import * as PouchDB from 'pouchdb';


export default{
install(vue){
        vue.prototype.$db = new PouchDB("dataDB");
    }
}
