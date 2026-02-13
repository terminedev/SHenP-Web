import { useState, useEffect, Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from 'components/ui/Sidebar';
import AdvancedSearch from 'components/ui/AdvancedSearch';
import Load from 'components/ui/Load';

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
                <Suspense fallback={<Load />}>
                    <Outlet context={{ theme, setTheme }} />
                </Suspense>
            </main>

            {openSidebar && <Sidebar onClose={() => setOpenSidebar(false)} />}
            {openAdvancedSearch && <AdvancedSearch onClose={() => setOpenAdvancedSearch(false)} />}
        </>
    );
};