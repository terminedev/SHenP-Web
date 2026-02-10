import { useState } from "react"

export default function LostProject() {

    const [lostProyect, setLostProyect] = useState([]);

    //Función para obtener los proyectos perdidos.

    return (
        <section>
            <h2>Proyecto perdidos</h2>
            <p>Homenaje a los proyectos perdidos que no pudieron ser recuperados.</p>

            {
                lostProyect.length > 0
                    ?
                    <ul>
                        {lostProyect.map(proyect =>
                            <>
                                <hr />
                                <li key={proyect.id}>
                                    <h3>{proyect.projectName}</h3>
                                    {
                                        proyect.coverArtUrl?.trim() !== '' && <img src={proyect.coverArtUrl} alt={`Portada del proyecto ${projectName ?? 'desconocido'}`} />
                                    }
                                </li>
                            </>
                        )
                        }
                    </ul>
                    :
                    <p>No hay proyectos perdidos</p>
            }
        </section>
    )
};