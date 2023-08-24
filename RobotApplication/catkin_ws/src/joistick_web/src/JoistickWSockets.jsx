import React, { useState } from 'react';
import ReactNipple from 'react-nipple';
import { io } from "socket.io-client";
import { useEffect } from 'react';

//Conecta al client con el websocket server del Mardan
const socket=io('http://localhost:5170')

export default function JoistickWSockets() {
    //maneja el estado de conexión con el servidor
    const [conexionWS, setConexionWS] = useState(false)

    const [posicion,setPosicion]=useState({
      x:0,
      y:0
    })

    const [dataJoistick,setDataJoistick]=useState({
      steering:0,
      throttle:0
    })

    //Conexión con el socket
    useEffect(() => {
      socket.on("connect",()=>setConexionWS(true))
    }, [])

    //Efecto para recuperar los valores medios de X y Y para normalizar el nipple
    useEffect(()=>{
      const ancho=window.innerWidth
      const alto=window.innerHeight

      const mitadX=ancho/2
      const mitadY=alto/2

      setPosicion({
        x:mitadX,
        y:mitadY
      })
    },[dataJoistick])
    

    const freno=(data)=>{
      const data_joistick=JSON.stringify({
        steering:0,
        throttle:0
      })

      setDataJoistick(data_joistick)
      // console.log({dataJoistick})
      //enviamos el mensaje y el topico al servidor
      socket.emit('robot-command',data_joistick)
      
    }
    //Recupera los valores del Joistick 
    const handleJoystickMove = (data) => {

      //Velocidades
      const velocidadAngular=50
      const velocidadLinear=40

      //Desplazamiento angular - Se puede normalizar con Velocidad = 75 
      const valorX=((data.x-posicion.x)*-1)/(velocidadAngular)

      //Desplazamiento Linear - Se puede normalizar con Velocidad = 75 
      const valorY=((data.y-posicion.y)*-1)/(velocidadLinear)

      console.log({valorX})
      console.log({valorY})

        //Crea el objeto data_joistick y lo convierte en un JSON
        const data_joistick=JSON.stringify({
          steering:valorY,
          throttle:valorX
        })

        //Cambia el estado de dataJoistick con la información del JSON 
        setDataJoistick(data_joistick)
        
        //Enviamos el JSON al servidor por el canal robot-commad
        socket.emit('robot-command',data_joistick)
        
              
      
    };
  
    return (
      <>
        {
          (conexionWS) ? (<h2>Conectado</h2>) : (<h2>Desconectado</h2>)
        }
        <div style={{
          position:'fixed',
          top:"50%",
          left:"50%"
        }}>
        <ReactNipple
                    options={{ mode: "static",
                    color: "hsl(219, 84%, 56%)",
                    position: { top: "50%", left: "50%" },
                    size: 150,
                    treshold: 0.1,}}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 250,
                        height: 250,
                      }}
          onMove={(evt, data) => handleJoystickMove(data.position)}
          onEnd={(evt, data) => freno(data)}
          
        />

        </div>
      </>
    );
  }