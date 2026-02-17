import { useState, useEffect, Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from 'components/ui/Sidebar';
import AdvancedSearch from 'components/ui/AdvancedSearch';
import Load from 'components/ui/Load';

import layoutStyles from 'styles/structure/ui/Layout.module.css';
import logoWeb from 'assets/default-customization/web-lg.png'

const getInitialTheme = () => {
    const saved = localStorage.getItem("shenp-theme");
    return saved ? JSON.parse(saved) : { bgImage: "", opacity: 0.5, logo: "default" };
};

export default function Layout() {

    const [theme, setTheme] = useState(getInitialTheme);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openAdvancedSearch, setOpenAdvancedSearch] = useState(false);

    useEffect(() => {
        localStorage.setItem("shenp-theme", JSON.stringify(theme));
    }, [theme]);

    return (
        <>
            <header className={layoutStyles.header}>

                {/* GRUPO IZQUIERDO: Logo + Menú */}
                <div className={layoutStyles.leftGroup}>
                    <Link to={'/'}>
                        <img
                            src={logoWeb}
                            alt="logo básico"
                            className={layoutStyles.logoWeb}
                        />
                    </Link>

                    <button
                        type="button"
                        onClick={() => setOpenSidebar(true)}
                        className={layoutStyles.button}
                    >
                        Menú
                    </button>
                </div>

                {/* GRUPO DERECHO: Buscador/Pers + Usuario */}
                <div className={layoutStyles.rightGroup}>

                    {/* Contenedor estilo "Input" */}
                    <div className={layoutStyles.searchContainer}>
                        <button
                            type="button"
                            onClick={() => setOpenAdvancedSearch(true)}
                            className={layoutStyles.button}
                        >
                            BUSCAR
                        </button>

                        <span className={layoutStyles.separator}>|</span>

                        <Link
                            to={'/personalizacion'}
                            className={layoutStyles.button}
                        >
                            PERSONALIZACIÓN
                        </Link>
                    </div>

                    <small className={layoutStyles.userName}>Gastón Términe</small>
                </div>

            </header>

            <main className={layoutStyles.main}>
                <Suspense fallback={<Load />}>
                    <Outlet context={{ theme, setTheme }} />
                </Suspense>
            </main>

            {openSidebar && <Sidebar onClose={() => setOpenSidebar(false)} />}
            {openAdvancedSearch && <AdvancedSearch onClose={() => setOpenAdvancedSearch(false)} />}
        </>
    );
};