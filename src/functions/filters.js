export function filterProjects(filter = null, proyects = []) {
    if (!filter) return proyects;

    return proyects.filter(proyect => proyect.genre.toLowerCase() === filter.toLowerCase());
};