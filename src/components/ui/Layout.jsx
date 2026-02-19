import { useState, useEffect, Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from 'components/ui/Sidebar';
import AdvancedSearch from 'components/ui/AdvancedSearch';
import Load from 'components/ui/Load';
import { OpenSidebar, Personalize, Search } from "components/ui/SVGs";

import layoutStyles from 'styles/ui/Layout.module.css';
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

                {/* Grupo izquierdo: Logo + Menú */}
                <div className={layoutStyles.leftGroup}>
                    <Link to={'/'} onClick={() => setOpenAdvancedSearch(false)}>
                        <img
                            src={logoWeb}
                            alt="logo básico"
                            className={layoutStyles.logoWeb}
                        />
                    </Link>

                    <button
                        type="button"
                        onClick={() => {
                            setOpenSidebar(true)
                            setOpenAdvancedSearch(false)
                        }}
                        className={layoutStyles.button}
                    >
                        <OpenSidebar customClass={layoutStyles.svg} />
                    </button>
                </div>

                {/* Grupo derecho: Buscador/Pers + Usuario */}
                <div className={layoutStyles.rightGroup}>

                    {/* Contenedor estilo "Input" */}
                    <div className={layoutStyles.searchContainer}>
                        <button
                            type="button"
                            onClick={() => setOpenAdvancedSearch(true)}
                            className={layoutStyles.button}
                        >
                            <Search customClass={layoutStyles.svg} />
                        </button>

                        <span className={layoutStyles.separator}>|</span>

                        <Link
                            to={'/personalizacion'}
                            className={layoutStyles.button}
                            onClick={() => setOpenAdvancedSearch(false)}
                        >
                            <Personalize customClass={layoutStyles.svg} />
                        </Link>
                    </div>

                    <a
                        href="https://github.com/terminedev"
                        target="_blank"
                        rel="noreferrer"
                        className={layoutStyles.userName}
                    >
                        Gastøn ♱érmine
                    </a>
                </div>

            </header>

            <main className={layoutStyles.main}>
                <Suspense fallback={<Load />}>
                    <Outlet context={{ theme, setTheme }} />
                </Suspense>
            </main>

            <Sidebar
                isOpen={openSidebar}
                onClose={() => setOpenSidebar(false)}
            />

            {openAdvancedSearch && <AdvancedSearch onClose={() => setOpenAdvancedSearch(false)} />}
        </>
    );
};