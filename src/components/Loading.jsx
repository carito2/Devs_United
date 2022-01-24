import { Outlet } from "react-router";

function Loading () {
    return(
        <section className="loading">
            <iframe 
                title="loading gif"
                src="https://giphy.com/embed/grNkIEN4dkiMXFLIE9" 
                width="480" 
                height="198" 
                frameBorder="0" 
                className="giphy-embed">
            </iframe>
            <h1>cargando</h1>
            <Outlet/>
        </section>
    )
};

export default Loading;