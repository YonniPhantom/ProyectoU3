document.addEventListener('DOMContentLoaded', function() {
    const materiaForm = document.getElementById('materia-form');
    const materiasList = document.getElementById('materias-list');
    const inscripcionForm = document.getElementById('inscripcion-form');
    const alumnoSelect = document.getElementById('alumno-select');
    const materiaSelect = document.getElementById('materia-select');
    
    let materias = JSON.parse(localStorage.getItem('materias')) || [];
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
  
    function renderMaterias() {
      materiasList.innerHTML = '';
      materias.forEach(function(materia) {
        const materiaDiv = document.createElement('div');
        materiaDiv.textContent = materia;
        materiasList.appendChild(materiaDiv);
      });
    }
  
    function guardarMateria(materia) {
      materias.push(materia);
      localStorage.setItem('materias', JSON.stringify(materias));
      renderMaterias();
      renderMateriasSelect(); // Llamamos a la función para actualizar el select de materias
    }
  
    function renderMateriasSelect() {
      materiaSelect.innerHTML = ''; // Limpiamos el select de materias
      materias.forEach(function(materia) {
        const materiaOption = document.createElement('option');
        materiaOption.value = materia;
        materiaOption.textContent = materia;
        materiaSelect.appendChild(materiaOption);
      });
    }
  
    function renderAlumnos() {
      alumnoSelect.innerHTML = '';
      alumnos.forEach(function(alumno) {
        const alumnoOption = document.createElement('option');
        alumnoOption.value = alumno.nombre;
        alumnoOption.textContent = `${alumno.nombre} ${alumno.apellidos}`;
        alumnoSelect.appendChild(alumnoOption);
      });
    }
  
    function inscribirAlumnoEnMateria(alumno, materia) {
      const index = alumnos.findIndex(function(a) {
        return a.nombre === alumno;
      });
      if (index !== -1) {
        if (!alumnos[index].materias.includes(materia)) {
          alumnos[index].materias.push(materia);
          localStorage.setItem('alumnos', JSON.stringify(alumnos));
          alert(`¡${alumno} ha sido inscrito en ${materia} exitosamente!`);
        } else {
          alert(`${alumno} ya está inscrito en ${materia}.`);
        }
      } else {
        alert(`El alumno ${alumno} no fue encontrado.`);
      }
    }
  
    materiaForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const materiaInput = document.getElementById('materia');
      const materia = materiaInput.value.trim();
      if (materia !== '') {
        guardarMateria(materia);
        materiaInput.value = '';
      }
    });
  
    inscripcionForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const alumno = alumnoSelect.value;
      const materia = materiaSelect.value;
      inscribirAlumnoEnMateria(alumno, materia);
    });
  
    renderMaterias();
    renderAlumnos();
    renderMateriasSelect(); // Llamamos a la función para cargar las materias en el select al cargar la página
  });
  