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
            where('status', '!=', 'lost-media'),
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
            where('catalog', '==', nameCategory.toLowerCase()),
            where('status', '!=', 'lost-media')
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
            const projectData = docSnap.data();

            if (projectData.status === 'lost-media') {
                console.warn(`Project with ID: ${idProyect} is cancelled.`);
                return null;
            }

            return {
                idProyect: docSnap.id,
                ...projectData
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

        const projects = querySnapshot.docs
            .map(doc => ({
                idProyect: doc.id,
                ...doc.data()
            }))
            .filter(project => project.status !== 'lost-media');

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

export async function getGallery(seccion = '') {

    if (seccion.trim() === '') return [];

    try {
        const galleryRef = collection(db, 'galeria');

        const q = query(
            galleryRef,
            where('seccion', '==', seccion.toLowerCase())
        );

        const querySnapshot = await getDocs(q);

        const gallery = querySnapshot.docs.map(doc => ({
            idGallery: doc.id,
            ...doc.data()
        }));

        return gallery;

    } catch (error) {
        console.error(error);
        return [];
    }
};




