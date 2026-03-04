// Librerias
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Componentes de UI Globales
import Layout from 'components/ui/Layout';
import ScrollToTop from 'components/ui/ScrollToTop';

// Vistas de Carga Inmediata (Eager Loading)
import Home from 'pages/Home';
import Personalization from "pages/Personalization";
import Load from 'components/ui/Load';

// Vistas de Carga Diferida (Lazy Loading)
const CompleteCatalog = lazy(() => import("pages/CompleteCatalog"));
const LostProject = lazy(() => import("pages/LostProject"));
const ProjectTemplate = lazy(() => import("pages/ProjectTemplate"));
const Gallery = lazy(() => import("pages/Gallery"));
const ShenpReflection = lazy(() => import("pages/ShenpReflection"));

export default function SpaRoutes() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            <Suspense fallback={<Load />}>
                <Routes>
                    <Route element={<Layout />}>

                        {/* Ruta Principal */}
                        <Route path="/" element={<Home />} />

                        {/* Catálogo */}
                        <Route path="/catalogo">
                            <Route index element={<Navigate to={"series"} replace />} />
                            <Route path=":nameCategory" element={<CompleteCatalog />} />
                        </Route>

                        {/* Proyectos */}
                        <Route path="/proyecto">
                            <Route index element={<Navigate to={"/"} replace />} />
                            <Route path=":idProyect" element={<ProjectTemplate />} />
                        </Route>

                        {/* Proyectos Perdidos */}
                        <Route path="/proyectos-perdidos" element={<LostProject />} />

                        {/* Galería */}
                        <Route path="/galeria" element={<Gallery />} />

                        {/* Personalización */}
                        <Route path="/personalizacion" element={<Personalization />} />

                        {/* Reflexión ShenP */}
                        <Route path="/reflexion-shenp" element={<ShenpReflection />} />

                        {/* Captura de 404 (Not Found) */}
                        <Route path="*" element={<Navigate to={'/'} replace />} />

                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}