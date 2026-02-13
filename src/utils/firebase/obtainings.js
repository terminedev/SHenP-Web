import {
    collection,
    query,
    where,
    limit,
    getDocs,
    doc,
    getDoc,
    orderBy,
    startAt,
    endAt
} from "firebase/firestore";
import { db } from "services/firebase/firebase";

export async function getProjectsByLimitedCategory(categoryName = '', limitCount = 1) {

    if (categoryName.trim() === '') {
        console.warn('Category name is required');
        return [];
    }

    try {
        const projectsRef = collection(db, 'proyectos');

        const q = query(
            projectsRef,
            where('catalog', '==', categoryName.toLowerCase()),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(q);

        const projects = querySnapshot.docs.map(doc => ({
            idProyect: doc.id,
            ...doc.data()
        }));

        return projects;

    } catch (error) {
        console.error(error);
        return [];
    }
};

export async function getProjectsByCatalog(nameCategory = '') {

    if (nameCategory.trim() === '') {
        console.warn('Category name is required');
        return [];
    }

    try {
        const projectsRef = collection(db, 'proyectos');

        const q = query(
            projectsRef,
            where('catalog', '==', nameCategory.toLowerCase())
        );

        const querySnapshot = await getDocs(q);

        const projects = querySnapshot.docs.map(doc => ({
            idProyect: doc.id,
            ...doc.data()
        }));

        return projects;

    } catch (error) {
        console.error(error);
        return [];
    }
};

export async function getProjectsLost() {

    try {
        const projectsRef = collection(db, 'proyectos');

        const q = query(
            projectsRef,
            where('status', '==', 'lost-media')
        );

        const querySnapshot = await getDocs(q);

        const projects = querySnapshot.docs.map(doc => ({
            idProyect: doc.id,
            ...doc.data()
        }));

        return projects;

    } catch (error) {
        console.error(error);
        return [];
    }
};

export async function getProject(idProyect) {

    if (!idProyect) {
        console.warn('Project ID is required');
        return null;
    }

    try {
        const docRef = doc(db, 'proyectos', idProyect);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                idProyect: docSnap.id,
                ...docSnap.data()
            };
        } else {
            console.warn(`No project found with ID: ${idProyect}`);
            return null;
        }

    } catch (error) {
        console.error(error);
        return null;
    }
};

export async function searchProductsByName(searchQuery = '') {

    if (!searchQuery.trim()) return [];

    try {
        const projectsRef = collection(db, 'proyectos');

        const q = query(
            projectsRef,
            orderBy('projectNameSearch'),
            startAt(searchQuery),
            endAt(searchQuery + '\uf8ff')
        );

        const querySnapshot = await getDocs(q);

        const projects = querySnapshot.docs.map(doc => ({
            idProyect: doc.id,
            ...doc.data()
        }));

        return projects;

    } catch (error) {
        console.error(error);
        return [];
    }
};