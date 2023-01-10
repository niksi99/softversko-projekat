import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    databaseURL: "https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app"
}
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export default database;