export const PHRASES_REFERENCES = [
    'Cargando universos...',
    'Viajando entre mundos...',
    'Recolectando gemas...',
    'Explorando ciudades...',
    'Canalizando magia...',
];

export const getRandomPhrase = () => {
    const randomIndex = Math.floor(Math.random() * PHRASES_REFERENCES.length);
    return PHRASES_REFERENCES[randomIndex];
};