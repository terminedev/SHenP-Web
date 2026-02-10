import { useOutletContext } from "react-router-dom";

export default function Personalization() {

    const { theme, setTheme } = useOutletContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTheme(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div >
            <h2>Configuración de Tema</h2>

            {/* Opción 1: Fondo */}
            <div>
                <label>Estilo del Logo:</label>
                <select name="logo" value={theme.bgImage} onChange={handleChange}>
                    <option value="default">SP (Default)</option>
                    <option value="retro">👾 SP Retro</option>
                    <option value="minimal">⬜ SP Minimal</option>
                </select>
            </div>

            {/* Opción 2: Opacidad */}
            <div>
                <label>Opacidad del Fondo: {theme.opacity}</label>
                <input
                    type="range"
                    name="opacity"
                    min="0" max="1" step="0.1"
                    value={theme.opacity}
                    onChange={handleChange}
                />
            </div>

            {/* Opción 3: Logo */}
            <div>
                <label>Estilo del Logo:</label>
                <select name="logo" value={theme.logo} onChange={handleChange}>
                    <option value="default">SP (Default)</option>
                    <option value="retro">👾 SP Retro</option>
                    <option value="minimal">⬜ SP Minimal</option>
                </select>
            </div>
        </div>
    );
};
