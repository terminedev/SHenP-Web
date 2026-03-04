// Librería
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

// Estilos
import personalizationStyles from "styles/pages/Personalization.module.css";

// Fondos
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
import granAmigo from "assets/customization/funds/gran-amigo.png";

// Logos
import defaultLogo from "assets/default-customization/web-lg.png";
import clasicoLg from "assets/customization/logos/logo-clasico.png";
import clasicoNuevaGenLg from "assets/customization/logos/logo-clasico-nueva-generacion.png";
import elementalPowersLg from "assets/customization/logos/elemental-powers-lg.png";
import glitchWarLg from "assets/customization/logos/glitch-war-lg.png";
import novaLg from "assets/customization/logos/nova-lg.png";
import octubre2020Lg from "assets/customization/logos/octubre-2020-lg.png";
import powerArcadeLg from "assets/customization/logos/power-arcade-lg.png";
import theBrothersLg from "assets/customization/logos/the-brothers-lg.png";

// Opciones de fondo
const backgroundOptions = [
    { value: defaultBg, label: "Universos (Por defecto)" },
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
    { value: granAmigo, label: "Exe y Dani" },
];

const logoOptions = [
    { value: defaultLogo, label: "Logo Web 2026 (Por defecto)" },
    { value: clasicoLg, label: "Clásico" },
    { value: clasicoNuevaGenLg, label: "Clásico Nueva Generación" },
    { value: elementalPowersLg, label: "Elemental Powers" },
    { value: glitchWarLg, label: "Glitch War" },
    { value: novaLg, label: "Nova" },
    { value: octubre2020Lg, label: "Octubre 2020" },
    { value: powerArcadeLg, label: "Power Arcade" },
    { value: theBrothersLg, label: "The Brothers" },
];

// Componente select personalizado 
const ImageSelect = ({ options, value, name, onChange, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.value === value) || options[0];

    const handleSelect = (optionValue) => {
        onChange({ target: { name, value: optionValue } });
        setIsOpen(false);
    };

    // Soporte para teclado en el botón principal
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    return (
        <div className={personalizationStyles.selectWrapper}>

            {/* Botón (Combobox) */}
            <div
                id={id}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls={`${id}-listbox`}
                tabIndex={0}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                className={personalizationStyles.selectButton}
            >
                <img
                    src={selectedOption.value}
                    alt=""
                    aria-hidden="true"
                    className={personalizationStyles.thumbnail}
                />
                <span>{selectedOption.label}</span>
            </div>

            {/* Lista desplegable (Listbox) */}
            {isOpen && (
                <ul
                    id={`${id}-listbox`}
                    role="listbox"
                    aria-activedescendant={selectedOption.label.replace(/\s+/g, '-')}
                    className={personalizationStyles.dropdownList}
                >
                    {options.map((option) => (
                        <li
                            key={option.value}
                            id={option.label.replace(/\s+/g, '-')}
                            role="option"
                            aria-selected={value === option.value}
                            tabIndex={0}
                            onClick={() => handleSelect(option.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleSelect(option.value);
                                }
                            }}
                            className={personalizationStyles.dropdownItem}
                        >
                            <img
                                src={option.value}
                                alt=""
                                aria-hidden="true"
                                className={personalizationStyles.thumbnail}
                            />
                            <span>{option.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default function Personalization() {
    const { theme, setTheme } = useOutletContext();

    // Manejar el cambio de personalización
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTheme(prev => ({ ...prev, [name]: value }));
    };

    // Cambiar el título de la pestaña
    document.title = `Personalización | Series hechas en Paint`;

    return (
        <section className={personalizationStyles.container}>
            <h2 className={personalizationStyles.heading}>Configuración de Tema</h2>

            {/* Opción 1: Fondo */}
            <div className={personalizationStyles.formGroup}>
                <label htmlFor="bgImage-select" className={personalizationStyles.label}>
                    Estilo del Fondo
                </label>
                <ImageSelect
                    id="bgImage-select"
                    options={backgroundOptions}
                    value={theme.bgImage || defaultBg}
                    name="bgImage"
                    onChange={handleChange}
                />
            </div>

            {/* Opción 2: Opacidad */}
            <div className={personalizationStyles.formGroup}>
                <label htmlFor="opacity-range" className={personalizationStyles.label}>
                    Opacidad del Fondo: {theme.opacity}
                </label>
                <input
                    id="opacity-range"
                    type="range"
                    name="opacity"
                    min="0"
                    max="1"
                    step="0.1"
                    value={theme.opacity}
                    onChange={handleChange}
                    className={personalizationStyles.rangeInput}
                    aria-valuemin={0}
                    aria-valuemax={1}
                    aria-valuenow={theme.opacity}
                />
            </div>

            {/* Opción 3: Logo */}
            <div className={personalizationStyles.formGroup}>
                <label htmlFor="logo-select" className={personalizationStyles.label}>
                    Estilo del Logo
                </label>
                <ImageSelect
                    id="logo-select"
                    options={logoOptions}
                    value={theme.logo || defaultLogo}
                    name="logo"
                    onChange={handleChange}
                />
            </div>
        </section>
    );
}