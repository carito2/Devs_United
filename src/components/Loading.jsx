function Loading () {
    console.log("entre loading");
    return(
        <section className="loading">
            <iframe 
                src="https://giphy.com/embed/grNkIEN4dkiMXFLIE9" 
                width="480" 
                height="198" 
                frameBorder="0" 
                className="giphy-embed">
            </iframe>
        </section>
    )
};

export default Loading;