import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { useCallback } from "react"
import { FIREBASE_PATHS } from "../constants";
import { database } from "../configs";
import { get, getDatabase, ref, set } from "firebase/database";

export const useFirebase = () => {

    const getData = useCallback(async <T>(path: FIREBASE_PATHS, pathSegment: string): Promise<T | undefined> => {
        try {
            const collectionRef = doc(database, path, pathSegment);
            const docSnap = await getDoc(collectionRef);
            const data = docSnap.data();

            return data as T;
        } catch (error) {
            console.error(error)
        }
    }, []);

    const getCollection = useCallback(async <T>(path: FIREBASE_PATHS): Promise<T[] | undefined> => {
        try {
            const collectionRef = collection(database, path);
            const querySnapshot = await getDocs(collectionRef);
            const data: T[] = querySnapshot.docs.map(doc => doc.data() as T);
            return data;
        } catch (error) {
            console.error(error);
        }
    }, [])

    const changeData = useCallback(async (path: FIREBASE_PATHS, pathSegment: string, data: unknown) => {
        try {
            const collectionRef = doc(database, path, pathSegment);
            await setDoc(collectionRef, data)
        } catch (error) {
            console.error(error)
        }
    }, []);

    const deleteData = useCallback(async (path: FIREBASE_PATHS, pathSegment: string) => {
        try {
            const collectionRef = doc(database, path, pathSegment);
            await deleteDoc(collectionRef)
        } catch (error) {
            console.error(error)
        }
    }, [])

    const getRealtimeData = useCallback(async<T>(path: FIREBASE_PATHS, pathSegment: string): Promise<T | null> => {
        const db = getDatabase();
        const realtimeRef = ref(db, `${path}/${pathSegment}`);
        const snapshot = await get(realtimeRef);
        let data: null | T = null;
        if (snapshot.exists()) {
            data = snapshot.val() as T;
        }
        return data
    }, [])

    const changeRealtimeData = useCallback(async (path: FIREBASE_PATHS, pathSegment: string, data: unknown) => {
        try {
            const db = getDatabase();
            const realtimeRef = ref(db, `${path}/${pathSegment}`);
            await set(realtimeRef, data)
        } catch (error) {
            console.error(error)
        }
    }, [])

    return {
        getData,
        changeData,
        deleteData,
        getCollection,
        changeRealtimeData,
        getRealtimeData
    }
}