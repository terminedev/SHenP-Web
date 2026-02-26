// Librerías
import { useState, useEffect, Suspense, useCallback } from "react";
import { Link, Outlet } from "react-router-dom";

// Componentes
import Sidebar from 'components/ui/Sidebar';
import AdvancedSearch from 'components/ui/AdvancedSearch';
import Load from 'components/ui/Load';
import { OpenSidebar, Personalize, Search } from "components/ui/SVGs";

// Estilos
import layoutStyles from 'styles/ui/Layout.module.css';

// Assets
import defaultBg from "assets/default-customization/background-web.png";
import defaultLogo from "assets/default-customization/web-lg.png";

// Inicializar tema (personalizado/por defecto)
const getInitialTheme = () => {
    const saved = localStorage.getItem("shenp-theme");
    return saved ? JSON.parse(saved) : {
        bgImage: defaultBg,
        opacity: 0.5,
        logo: defaultLogo
    };
};

export default function Layout() {


    // Estados
    const [theme, setTheme] = useState(getInitialTheme);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openAdvancedSearch, setOpenAdvancedSearch] = useState(false);


    // Efectos
    useEffect(() => {
        localStorage.setItem("shenp-theme", JSON.stringify(theme));
    }, [theme]);


    // Manejadores de eventos
    const handleOpenSidebar = useCallback(() => {
        setOpenSidebar(true);
        setOpenAdvancedSearch(false);
    }, []);

    const handleCloseSidebar = useCallback(() => {
        setOpenSidebar(false);
    }, []);

    const handleOpenAdvancedSearch = useCallback(() => {
        setOpenAdvancedSearch(true);
    }, []);

    const handleCloseAdvancedSearch = useCallback(() => {
        setOpenAdvancedSearch(false);
    }, []);

    const handleResetSearch = useCallback(() => {
        setOpenAdvancedSearch(false);
    }, []);



    return (
        <>
            {/* Cabecera */}
            <header className={layoutStyles.header}>

                {/* Sección Izquierda: Logo + Menú */}
                <div className={layoutStyles.leftGroup}>
                    <Link
                        to={'/'}
                        onClick={handleResetSearch}
                        aria-label="Ir a la página de inicio"
                    >
                        <img
                            src={theme.logo}
                            alt="Logotipo de la aplicación"
                            className={layoutStyles.logoWeb}
                        />
                    </Link>

                    <button
                        type="button"
                        onClick={handleOpenSidebar}
                        className={layoutStyles.button}
                        aria-label="Abrir menú de navegación"
                        aria-expanded={openSidebar}
                        aria-controls="sidebar-menu"
                    >
                        <OpenSidebar customClass={layoutStyles.svg} aria-hidden="true" />
                    </button>
                </div>

                {/* Sección derecha: Buscador / Personalización + Usuario */}
                <div className={layoutStyles.rightGroup}>

                    <div className={layoutStyles.searchContainer}>
                        <button
                            type="button"
                            onClick={handleOpenAdvancedSearch}
                            className={layoutStyles.button}
                            aria-label="Abrir búsqueda avanzada"
                            aria-expanded={openAdvancedSearch}
                            aria-controls="advanced-search-panel"
                        >
                            <Search customClass={layoutStyles.svg} aria-hidden="true" />
                        </button>

                        <span className={layoutStyles.separator} aria-hidden="true">|</span>

                        <Link
                            to={'/personalizacion'}
                            className={layoutStyles.button}
                            onClick={handleResetSearch}
                            aria-label="Ir a la configuración de personalización"
                        >
                            <Personalize customClass={layoutStyles.svg} aria-hidden="true" />
                        </Link>
                    </div>

                    <a
                        href="https://github.com/terminedev"
                        target="_blank"
                        rel="noreferrer"
                        className={layoutStyles.userName}
                        aria-label="Visitar perfil de GitHub de Gastøn ♱érmine (se abre en una nueva pestaña)"
                    >
                        Gastøn ♱érmine
                    </a>
                </div>
            </header>

            {/* Contenido principal */}
            <main className={layoutStyles.main}>
                <div
                    className={layoutStyles.backgroundLayer}
                    style={{
                        backgroundImage: `url(${theme.bgImage})`,
                        opacity: theme.opacity
                    }}
                    aria-hidden="true"
                />

                <div className={layoutStyles.contentContainer}>
                    <Suspense fallback={<Load />}>
                        <Outlet context={{ theme, setTheme }} />
                    </Suspense>
                </div>
            </main>

            {/* Modales */}
            <Sidebar
                isOpen={openSidebar}
                onClose={handleCloseSidebar}
            />

            {openAdvancedSearch && (
                <AdvancedSearch
                    onClose={handleCloseAdvancedSearch}
                />
            )}
        </>
    );
}