### 🎨 1. Identidad y Concepto

* **Nombre del Sitio:** Proyecto Shenp.
* **Propósito:** Archivo digital y plataforma de acceso a los proyectos de la comunidad "Series hechas en Paint" (SHENP).
* **Eslogan/Espíritu:** "10 años haciendo historias. Dibujamos por pasión."

---

### 🗺️ 2. Mapa del Sitio (Navegación)

#### **A. Home (Página Principal)**

#### **B. Categorías (El Catálogo)**: 
Secciones dedicadas para filtrar el contenido según el formato:
1. **Series:** (Series episódicas, cortometrajes, animaciones).
2. **Cómics:** (Webcómics, tiras cómicas, novelas gráficas).
3. **Libros:** (Obras literarias, guiones, historias escritas).
4. **Juegos:** (Videojuegos completos, minijuegos, experiencias interactivas).

#### **C. ¿Quiénes Somos? (About)**
* **Texto Oficial:**
> "10 años haciendo historias. Series hechas en Paint, dibujamos por pasión. Entre amigos, forjamos mundos desde la imaginación, donde la creatividad y la diversión se entrelazan en series, juegos, cómics, entre otros medios originales. ¡Bienvenido a Shenp!"

#### **D. Proyectos Perdidos (Lost Media)**
> "Homenaje a los proyectos perdidos que no pudieron ser recuperados."
---

### 📄 3. Plantillas de Contenido (Fichas Técnicas)

Aquí se define qué información debe tener cada página individual.

#### **Plantilla: "Proyecto Activo"**
Cada vez que entras a un juego, serie o cómic, verás:

* **Cabecera:** Logotipo y Portada del proyecto.
* **Información Clave:**
* **Nombre del proyecto.**
* **Autor** (con link a su perfil).
* **Fecha de lanzamiento.**
* **Género.**
* **Sinopsis:** Descripción detallada de la trama o mecánica.
* **Visuales:** Galería de imágenes (screenshots, arte conceptual).
* **Acción:** **Link al proyecto** (Jugar, Leer, Ver).


#### **Plantilla: "Proyecto Perdido"**
Versión reducida para la sección Lost Media:

* **Visual:** Portada (si existe) o imagen por defecto ("No Signal").
* **Info:** Nombre, Autor y Fecha de lanzamiento (aproximada).
* **Descripción:** De qué trataba y estado actual de la búsqueda.

---

### ⚙️ 4. Funcionalidades Técnicas (UI/UX)

Herramientas que mejoran la experiencia del usuario en la web.

* **🔍 Buscador Avanzado:**
* **Estilo:** "Tipo Steam".
* **Comportamiento:** Al escribir, despliega un rectángulo con resultados que incluyen la **portada pequeña + nombre**, permitiendo una identificación visual rápida.

* **🎨 Personalización (Theme Switcher):**
* Panel de control para el usuario.
* **Opciones:**
* Cambiar imagen de Fondo (Background).
* Ajustar Opacidad del fondo (para mejorar lectura).
* Cambiar Logotipo de la página (quizás logos retro de la comunidad).



### 📋 Ficha Técnica Maestra (Actualizada)

0. **idProyect | ID del Proyecto:** Título oficial.
1. **projectNameSearch | Nombre del Proyecto para la búsqueda:** Título oficial.
2. **projectName | Nombre del Proyecto:** Título oficial.
3. **status | Estado:** *[NUEVO]* Define la situación actual del proyecto.
4. **logoUrl | Logotipo:** Imagen del título (PNG transparente).
5. **coverArtUrl | Portada (Key Art):** Imagen principal vertical u horizontal.
6. **introUrl | MiniPortada (Key Art):** Imagen mini vertical u horizontal.
7. **description | Descripción:** Sinopsis de la trama o mecánica.
8. **authorName | Autor:** Nombre/Nick del creador.
9. **authorProfileUrl | Link al Perfil del Autor:** Enlace interno o redes sociales.
10. **releaseDate | Fecha de Lanzamiento:** Día/Mes/Año (o solo Año).
11. **genre | Género:** Acción, Aventura, Comedia, Terror, etc.
12. **catalog | Catálogo:** Juego, serie, comic, etc...
13. **gallery | Galería:** Lista de imágenes (screenshots, arte, bocetos).
14. **projectUrl | Link al Proyecto:** URL de descarga, video de YouTube, lector online, etc. *(Este campo puede ocultarse si el estado es "Lost Media" o "Próximamente").*

* **Etiquetas Visuales (Badges):** Podrías mostrar una pequeña etiqueta de color sobre la portada en el menú principal.
* 🟢 **completed | Finalizado:** Verde.
* 🔵 **ongoing | En Emisión:** Azul.
* ⚫ **lostMedia | Lost Media:** Gris o Negro (con efecto de "glitch" quizás).
* 🔴 **cancelled | Cancelado:** Rojo.

* **Distintos Filtros:**
rpg
aventura
comedia
drama
duelos
terror
suspenso
supervivencia
guerra
entretenimiento
demo
informativo 
explícito
acción
desafío

