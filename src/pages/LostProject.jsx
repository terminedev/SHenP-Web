import { useState } from "react"
import { getProjectsLost } from 'utils/firebase/obtainings';

export default function LostProject() {

    const [asynchronousData, setAsynchronousData] = useState({
        lostProyect: [],
        isLoading: false,
        error: null,
    });

    useEffect(() => {
        const getProyects = async () => {
            try {
                setAsynchronousData({ lostProyect: [], isLoading: true, error: null });

                const lostProyect = await getProjectsLost();

                setAsynchronousData({ lostProyect: lostProyect, isLoading: false, error: null });
            } catch (error) {
                setAsynchronousData({ lostProyect: [], isLoading: false, error: error });
            }
        }

        getProyects();
    }, []);

    const { lostProyect, isLoading, error } = asynchronousData;

    return (
        <section>
            <h2>Proyecto perdidos</h2>
            <p>Homenaje a los proyectos perdidos que no pudieron ser recuperados.</p>

            {
                isLoading
                    ?
                    <p>Obteniendo proyectos...</p>
                    :
                    (lostProyect.length > 0
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
                        <p>No hay proyectos perdidos</p>)
            }
            {
                error &&
                <p>{error.message}</p>
            }
        </section>
    )
};