import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from 'pages/Home';
import Layout from 'components/ui/Layout';
import CompleteCatalog from "pages/CompleteCatalog";
import LostProject from "pages/LostProject";
import ProjectTemplate from 'pages/ProjectTemplate';
import Personalization from "pages/Personalization";

export default function SpaRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>

                    <Route path="/" element={<Home />} />

                    <Route path="/catalogo">
                        <Route index element={<Navigate to={"series"} replace />} />
                        <Route path=":nameCategory" element={<CompleteCatalog />} />
                    </Route>

                    <Route path="/proyectos-perdidos" element={<LostProject />} />

                    <Route path="/proyecto">
                        <Route index element={<Navigate to={"/"} replace />} />
                        <Route path=":idProyect" element={<ProjectTemplate />} />
                    </Route>

                    <Route path="/personalizacion" element={<Personalization />} />

                    {/* 404 */}
                    <Route path="*" element={<Navigate to={'/'} replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
};