document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('alumno-form');
    const alumnosList = document.getElementById('alumnos-list');
    const searchInput = document.getElementById('search-input');
    
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
  
    function renderAlumnos() {
      alumnosList.innerHTML = '';
      alumnos.forEach(function(alumno) {
        const alumnoDiv = document.createElement('div');
        alumnoDiv.innerHTML = `
          <p><strong>Nombre:</strong> ${alumno.nombre}</p>
          <p><strong>Apellidos:</strong> ${alumno.apellidos}</p>
          <p><strong>Edad:</strong> ${alumno.edad}</p>
          <p><strong>Materias Inscritas:</strong> ${alumno.materias.join(', ')}</p>
          <p><strong>Calificaciones:</strong></p>
          <ul>
            ${Object.entries(alumno.calificaciones).map(([materia, calificacion]) => `<li>${materia}: ${calificacion}</li>`).join('')}
          </ul>
        `;
        alumnosList.appendChild(alumnoDiv);
      });
    }

    renderAlumnos();
  
    function guardarAlumno(nombre, apellidos, edad, materias, calificaciones) {
      const alumno = {
        nombre: nombre,
        apellidos: apellidos,
        edad: edad,
        materias: materias,
        calificaciones: calificaciones
      };
      alumnos.push(alumno);
      localStorage.setItem('alumnos', JSON.stringify(alumnos));
      renderAlumnos();
    }
  
    function borrarAlumno(index) {
      alumnos.splice(index, 1);
      localStorage.setItem('alumnos', JSON.stringify(alumnos));
      renderAlumnos();
    }
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const apellidos = document.getElementById('apellidos').value;
      const edad = document.getElementById('edad').value;
      
      guardarAlumno(nombre, apellidos, edad, [], []);
      
      form.reset();
    });
  
    searchInput.addEventListener('input', function() {
      const query = searchInput.value.toLowerCase();
      const filteredAlumnos = alumnos.filter(function(alumno) {
        return alumno.nombre.toLowerCase().includes(query) || alumno.apellidos.toLowerCase().includes(query);
      });
      renderAlumnos(filteredAlumnos);
    });
  
    renderAlumnos();
  });
  