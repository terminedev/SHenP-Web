import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import AdvancedSearch from './AdvancedSearch'; // Asumo la ruta relativa

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
            <header>
                <Link to={'/'}>
                    SP
                </Link>

                <button type="button" onClick={() => setOpenSidebar(true)}>
                    Menú
                </button>
                <button type="button" onClick={() => setOpenAdvancedSearch(true)}>
                    Buscar
                </button>
                <Link to={'/personalizacion'}>Personalización</Link>
                <small>Gastón Términe</small>
            </header>

            <main>
                <Outlet context={{ theme, setTheme }} />
            </main>

            {openSidebar && <AdvancedSearch onClose={() => setOpenSidebar(false)} />}
            {openAdvancedSearch && <AdvancedSearch onClose={() => setOpenAdvancedSearch(false)} />}
        </>
    );
};