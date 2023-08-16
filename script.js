document.addEventListener("DOMContentLoaded", function () {
    const registroForm = document.getElementById("registro-form");
    const listaPersonas = document.getElementById("lista-personas");
    const buscarInput = document.getElementById("buscar");
    const fotoInput = document.getElementById("foto");
    const fotoPreview = document.getElementById("foto-preview");
  
    fotoInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            fotoPreview.style.display = "block";
            fotoPreview.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });

    registroForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const id = document.getElementById("id").value;
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const telefono = document.getElementById("telefono").value;
        const fotoInput = document.getElementById("foto");
  
        
        const foto = fotoPreview.src; 
  
        const persona = {
          id: new Date().getTime(),
          nombre,
          correo,
          telefono,
          foto
        };
      
        const personas = JSON.parse(localStorage.getItem("personas")) || [];
        personas.push(persona);
        localStorage.setItem("personas", JSON.stringify(personas));
      
        actualizarListaPersonas(personas);
      
        registroForm.reset();
      });
      
  
    buscarInput.addEventListener("input", function () {
      const filtro = buscarInput.value.toLowerCase();
      const personas = JSON.parse(localStorage.getItem("personas")) || [];
      const personasFiltradas = personas.filter((persona) =>
        persona.nombre.toLowerCase().includes(filtro)
      );
  
      actualizarListaPersonas(personasFiltradas);
    });
  
   
        function actualizarListaPersonas(personas) {
            listaPersonas.innerHTML = "";
          
            if (personas.length === 0) {
              const mensaje = document.createElement("li");
              mensaje.textContent = "No hay personas registradas .";
              listaPersonas.appendChild(mensaje);
              return;
            }
          
            personas.forEach((persona) => {
              const li = document.createElement("li");
              li.innerHTML = `
                <strong>${persona.nombre}</strong> - ID: ${persona.id}, Correo: ${persona.correo}, Teléfono: ${persona.telefono}<br>
                <img src="${persona.foto}" alt="Foto de perfil" style="max-width: 100px;">
              `;
              listaPersonas.appendChild(li);
            });
          }
          
      
      
      const borrarTodoBtn = document.getElementById("borrar-todo");

      borrarTodoBtn.addEventListener("click", function () {
        if (confirm("¿Estás seguro de que deseas borrar todos los registros?")) {
          borrarTodosLosRegistros();
        }
      });
    
      function borrarTodosLosRegistros() {
        localStorage.removeItem("personas");
        listaPersonas.innerHTML = "";
      }
    
    
    
    
    const personasGuardadas = JSON.parse(localStorage.getItem("personas")) || [];
    actualizarListaPersonas(personasGuardadas);
  });
  