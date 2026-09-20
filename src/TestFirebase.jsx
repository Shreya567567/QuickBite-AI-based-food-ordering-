import { db } from "./firebase/firebase";

function TestFirebase() {
  console.log("Firebase Connected:", db);

  return <h2>Firebase Connected Successfully</h2>;
}

export default TestFirebase;