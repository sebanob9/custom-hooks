import { useState, useEffect, useRef } from "react";

export const useFetch = (url) => {

    const isMounted = useRef(true);

    const [state, setState] = useState({data: null, loading: true, error: null});
    
    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, []); // este effect no hace nada. solamente, cambia el valor del ref cuando se desmonta

    useEffect( () => {

        setState({data: null, loading: true, error: null});
        
        fetch(url)
            .then(resp =>resp.json())
            .then(data => {
                    if(isMounted.current) {
                        setState({
                            data: data,
                            loading: false, 
                            error: false
                        }); // si está montado, puedo llamar el setState. en caso contrario, no se llama porque daria el error de hacer una peticion de un componente no montado
                    } 
                
            });
    }, [url]);

    return state;
}

/* 
setTimeout(() => {
    if (isMounted.current) {
        setState({
            data: data,
            loading: false, 
            error: false
        }) // si está montado, puedo llamar el setState. en caso contrario, no se llama porque daria el error de hacer una peticion de un componente no montado
    } else {
        console.log('No se llama setState')
    }
    
}, 1000) */