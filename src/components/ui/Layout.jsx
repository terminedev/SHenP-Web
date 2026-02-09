import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <header>
                <Link to={'/'}>SP</Link>
                <button type="button">Menú</button>
                <button type="button">Buscar</button>
                <Link to={'/personalizacion'}>Personalización</Link>
                <small>Gastón Términe</small>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};
