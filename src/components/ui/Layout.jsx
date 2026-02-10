import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AdvancedSearch from 'components/ui/AdvancedSearch';

export default function Layout() {

    const [openSidebar, setOpenSidebar] = useState(false);
    const [openAdvancedSearch, setOpenAdvancedSearch] = useState(false);

    return (
        <>
            <header>
                <Link to={'/'}>SP</Link>
                <button
                    type="button"
                    onClick={() => setOpenSidebar(true)}
                >
                    Menú
                </button>
                <button
                    type="button"
                    onClick={() => setOpenAdvancedSearch(true)}
                >
                    Buscar
                </button>
                <Link to={'/personalizacion'}>Personalización</Link>
                <small>Gastón Términe</small>
            </header>
            <main>
                <Outlet />
            </main>

            {openSidebar && <AdvancedSearch onClose={() => setOpenSidebar(false)} />}
            {openAdvancedSearch && <AdvancedSearch onClose={() => setOpenAdvancedSearch(false)} />}
        </>
    );
};
