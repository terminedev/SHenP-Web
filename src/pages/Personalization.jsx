import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "styles/pages/Personalization.module.css";

// --- IMPORTACIONES DE FONDOS ---
import defaultBg from "assets/default-customization/background-web.png";
import academiaMagicaBg from "assets/customization/funds/academia-magica-bg.png";
import bratalyBg from "assets/customization/funds/brataly-bg.png";
import entreMundosBg from "assets/customization/funds/entre-mundos-bg.png";
import gorelandBg from "assets/customization/funds/goreland-bg.png";
import granFestivalBg from "assets/customization/funds/gran-festival-bg.png";
import imperioYlsBg from "assets/customization/funds/imperio-yls.bg.png";
import islaIcebergBg from "assets/customization/funds/isla-iceberg-y-loca.png";
import mollyBg from "assets/customization/funds/molly-bg.png";
import spaceCarrotsBg from "assets/customization/funds/space-carrots-bg.png";
import theCrystalBg from "assets/customization/funds/the-crystal-bg.png";
import nuevoHorizonteBg from "assets/customization/funds/un-nuevo-horizonte-bg.png";

// --- IMPORTACIONES DE LOGOS ---
import defaultLogo from "assets/default-customization/web-lg.png";
import elementalPowersLg from "assets/customization/logos/elemental-powers-lg.png";
import glitchWarLg from "assets/customization/logos/glitch-war-lg.png";
import clasicoNuevaGenLg from "assets/customization/logos/logo-clasico-nueva-generacion.png";
import clasicoLg from "assets/customization/logos/logo-clasico.png";
import novaLg from "assets/customization/logos/nova-lg.png";
import octubre2020Lg from "assets/customization/logos/octubre-2020-lg.png";
import powerArcadeLg from "assets/customization/logos/power-arcade-lg.png";
import theBrothersLg from "assets/customization/logos/the-brothers-lg.png";

// --- ARREGLOS DE OPCIONES ---
const backgroundOptions = [
    { value: defaultBg, label: "Universos" },
    { value: academiaMagicaBg, label: "Academia Mágica" },
    { value: bratalyBg, label: "Brataly" },
    { value: entreMundosBg, label: "Entre Mundos" },
    { value: gorelandBg, label: "Goreland" },
    { value: granFestivalBg, label: "Gran Festival 2026" },
    { value: imperioYlsBg, label: "Imperio YLS" },
    { value: islaIcebergBg, label: "Isla Iceberg y Loca" },
    { value: mollyBg, label: "Molly ♡" },
    { value: spaceCarrotsBg, label: "Space Carrots" },
    { value: theCrystalBg, label: "The Crystal" },
    { value: nuevoHorizonteBg, label: "Un Nuevo Horizonte" },
];

const logoOptions = [
    { value: defaultLogo, label: "Logo Web 2026" },
    { value: elementalPowersLg, label: "Elemental Powers" },
    { value: glitchWarLg, label: "Glitch War" },
    { value: clasicoNuevaGenLg, label: "Clásico Nueva Generación" },
    { value: clasicoLg, label: "Clásico" },
    { value: novaLg, label: "Nova" },
    { value: octubre2020Lg, label: "Octubre 2020" },
    { value: powerArcadeLg, label: "Power Arcade" },
    { value: theBrothersLg, label: "The Brothers" },
];

// --- COMPONENTE SELECT PERSONALIZADO ---
const ImageSelect = ({ options, value, name, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.value === value) || options[0];

    const handleSelect = (optionValue) => {
        onChange({ target: { name, value: optionValue } });
        setIsOpen(false);
    };

    return (
        <div className={styles.selectWrapper}>
            {/* Botón que muestra la opción seleccionada */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={styles.selectButton}
            >
                <img
                    src={selectedOption.value}
                    alt={selectedOption.label}
                    className={styles.thumbnail}
                />
                <span>{selectedOption.label}</span>
            </div>

            {/* Lista desplegable */}
            {isOpen && (
                <ul className={styles.dropdownList}>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(option.value)}
                            className={styles.dropdownItem}
                        >
                            <img
                                src={option.value}
                                alt={option.label}
                                className={styles.thumbnail}
                            />
                            <span>{option.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// --- COMPONENTE PRINCIPAL ---
export default function Personalization() {
    const { theme, setTheme } = useOutletContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTheme(prev => ({ ...prev, [name]: value }));
    };

    return (
        <section className={styles.container}>
            <h2 className={styles.heading}>Configuración de Tema</h2>

            {/* Opción 1: Fondo */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Estilo del Fondo</label>
                <ImageSelect
                    options={backgroundOptions}
                    value={theme.bgImage || defaultBg}
                    name="bgImage"
                    onChange={handleChange}
                />
            </div>

            {/* Opción 2: Opacidad */}
            <div className={styles.formGroup}>
                <label className={styles.label}>
                    Opacidad del Fondo: {theme.opacity}
                </label>
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

            {/* Opción 3: Logo */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Estilo del Logo</label>
                <ImageSelect
                    options={logoOptions}
                    value={theme.logo || defaultLogo}
                    name="logo"
                    onChange={handleChange}
                />
            </div>
        </section>
    );
}