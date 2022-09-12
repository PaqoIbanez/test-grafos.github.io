import { useEffect, useState } from "react";
import { Network } from "vis-network";
import './App.css'
import { UFs } from "./data/data";

function App() {

   const [directionInput, setDirectionInput] = useState('UD');
   const [subtemas, setSubtemas] = useState([]);

   let tempSubtemas = [];
   useEffect(() => {
      UFs.map(UF => {
         UF.temas.map((tema) => {
            tema.subtemas.map(subtema => {
               tempSubtemas.push({
                  id: `${subtema.id}`,
                  label: `${UFs[0].clave} - ${subtema.nombre}`,
                  color: subtema.id % 2 ? 'blue' : 'red'
               })
            });
         });
      });
      setSubtemas(tempSubtemas);
   }, [])

   useEffect(() => {
      draw();
   }, [subtemas])



   const handleClick = (value) => {
      setDirectionInput(value);
      draw();
   }

   const handleSubmit = (e) => {
      draw();
      return false;
   }

   var nodes = null;
   var edges = null;
   var network = null;

   function destroy() {
      if (network !== null) {
         network.destroy();
         network = null;
      }
   }

   const draw = () => {
      destroy();
      // randomly create some nodes and edges
      // var nodeCount = document.getElementById("nodeCount").value;

      // create a network
      var container = document.getElementById("mynetwork");
      var options = {
         autoResize: true,
         nodes: {
            shape: "dot",
            size: 12,
         },
         layout: {
            // hierarchical: {
            //    direction: directionInput,
            // },
         },
      };
      network = new Network(container, {
         "nodes": subtemas,
         "edges": [
            {
               from: 1,
               to: 2,
               arrows: "to"
            }
         ]
      }, options);

      // add event listeners
      network.on("select", function (params) {
         console.log(params);
         document.getElementById("selection").innerText =
            "Selection: " + JSON.stringify(params);
      });
   }

   return (
      <div className="App">
         <h2>
            {UFs[0].clave}: {UFs[0].nombreUF}
         </h2>
         <h3>
            Semestress: {UFs[0].semestre}
         </h3>

         <br />

         <form onSubmit={handleSubmit}>
            <input type="submit" value="Go" />
         </form>
         <p>
            <input type="button" id="btn-UD" onClick={() => handleClick("UD")} value='Up-Down' />
            <input type="button" id="btn-DU" onClick={() => handleClick("DU")} value='Down-Up' />
            <input type="button" id="btn-LR" onClick={() => handleClick("LR")} value='Left-Right' />
            <input type="button" id="btn-RL" onClick={() => handleClick("RL")} value='Right-Left' />
            <input type="hidden" id="direction" value="UD" onClick={() => handleClick()} />
         </p>

         <br />

         <div
            id="mynetwork"
            style={{
               width: '100%',
               height: 'calc(80vh)',
               border: '1px solid black',
            }} >
         </div>


         <p id="selection"></p>

      </div >
   )
}

export default App;