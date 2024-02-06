import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { useCallback } from "react"
import { FIREBASE_PATHS } from "../constants";
import { database } from "../configs";

// type FirebaseData<T> = {
//     value: T;
// };

export const useFirebase = () => {

    const getData = useCallback(async <T>(path: FIREBASE_PATHS, pathSegment: string): Promise<T | undefined> => {
        try {
            const collectionRef = doc(database, path, pathSegment);
            const docSnap = await getDoc(collectionRef);
            const data = docSnap.data();

            return data as T;
        } catch (error) {
            console.log(error)
        }
    }, []);

    const getCollection = useCallback(async <T>(path: FIREBASE_PATHS): Promise<T[] | undefined> => {
        try {
            const collectionRef = collection(database, path);
            const querySnapshot = await getDocs(collectionRef);
            const data: T[] = querySnapshot.docs.map(doc => doc.data() as T);
            return data;
        } catch (error) {
            console.log(error);
        }
    }, [])

    const changeData = useCallback(async (path: FIREBASE_PATHS, pathSegment: string, data: unknown) => {
        try {
            const collectionRef = doc(database, path, pathSegment);
            await setDoc(collectionRef, data)
        } catch (error) {
            console.log(error)
        }
    }, []);

    const deleteData = useCallback(async (path: FIREBASE_PATHS, pathSegment: string) => {
        try {
            const collectionRef = doc(database, path, pathSegment);
            await deleteDoc(collectionRef)
        } catch (error) {
            console.log(error)
        }
    }, [])

    return {
        getData,
        changeData,
        deleteData,
        getCollection
    }
}