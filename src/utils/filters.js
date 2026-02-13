export function filterProjects(
    filter = {
        gender: null,
        state: null
    },
    proyects = []
) {
    const { gender, state } = filter;

    if (!gender && !state) return proyects;

    let filtered = [...proyects];

    if (gender) filtered = filtered.filter(proyect => proyect.genre?.includes(gender.toLowerCase()));
    if (state) filtered = filtered.filter(proyect => proyect.status?.toLowerCase() === state.toLowerCase());

    return filtered;
};