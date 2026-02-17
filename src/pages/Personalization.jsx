import { useOutletContext } from "react-router-dom";
import styles from 'styles/structure/pages/Personalization.module.css'; // Asegúrate que la ruta sea correcta

export default function Personalization() {

    const { theme, setTheme } = useOutletContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTheme(prev => ({ ...prev, [name]: value }));
    };

    return (
        <section className={styles.pageContainer}>
            <h2 className={styles.title}>Configuración de Tema</h2>

            <div className={styles.settingsList}>

                {/* Opción 1: Fondo (Corregido name="bgImage" basado en tu value) */}
                <div className={styles.settingItem}>
                    <label className={styles.label}>Estilo del Fondo</label>
                    <select
                        name="bgImage"
                        value={theme.bgImage}
                        onChange={handleChange}
                        className={styles.selectInput}
                    >
                        <option value="default">SP (Default)</option>
                        <option value="retro">👾 SP Retro</option>
                        <option value="minimal">⬜ SP Minimal</option>
                    </select>
                </div>

                {/* Opción 2: Opacidad */}
                <div className={styles.settingItem}>
                    <label className={styles.label}>Opacidad del Fondo</label>
                    <div className={styles.rangeContainer}>
                        <span className={styles.rangeValue}>{theme.opacity}</span>
                        <input
                            type="range"
                            name="opacity"
                            min="0"
                            max="1"
                            step="0.1"
                            value={theme.opacity}
                            onChange={handleChange}
                            className={styles.rangeInput}
                        />
                    </div>
                </div>

                {/* Opción 3: Logo */}
                <div className={styles.settingItem}>
                    <label className={styles.label}>Estilo del Logo</label>
                    <select
                        name="logo"
                        value={theme.logo}
                        onChange={handleChange}
                        className={styles.selectInput}
                    >
                        <option value="default">SP (Default)</option>
                        <option value="retro">👾 SP Retro</option>
                        <option value="minimal">⬜ SP Minimal</option>
                    </select>
                </div>

            </div>
        </section>
    );
};