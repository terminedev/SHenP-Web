import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from 'pages/Home';
import CompleteCatalog from "pages/CompleteCatalog";

export default function SpaRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>

                    <Route path="/" element={<Home />} />

                    <Route path="/catalogo">
                        <Route index element={<Navigate to={"series"} replace />} />

                        <Route path="series" element={<CompleteCatalog />} />
                        <Route path="comics" element={<CompleteCatalog />} />
                        <Route path="libros" element={<CompleteCatalog />} />
                        <Route path="juegos" element={<CompleteCatalog />} />
                    </Route>

                    {/* 404 */}
                    <Route path="*" element={<Navigate to={'/'} replace />} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
};