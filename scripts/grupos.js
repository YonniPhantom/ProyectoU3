document.addEventListener('DOMContentLoaded', function() {
    const grupoForm = document.getElementById('grupo-form');
    const gruposList = document.getElementById('grupos-list');
    const asignacionForm = document.getElementById('asignacion-form');
    const grupoSelect = document.getElementById('grupo-select');
    const alumnoSelect = document.getElementById('alumno-select');
  
    let grupos = JSON.parse(localStorage.getItem('grupos')) || [];
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
  
    function renderGrupos() {
      gruposList.innerHTML = '';
      grupos.forEach(function(grupo) {
        const grupoDiv = document.createElement('div');
        grupoDiv.textContent = grupo;
        gruposList.appendChild(grupoDiv);
      });
    }
  
    function guardarGrupo(nombre) {
      grupos.push(nombre);
      localStorage.setItem('grupos', JSON.stringify(grupos));
      renderGrupos();
      renderGruposSelect();
    }
  
    function renderGruposSelect() {
      grupoSelect.innerHTML = '';
      grupos.forEach(function(grupo) {
        const grupoOption = document.createElement('option');
        grupoOption.value = grupo;
        grupoOption.textContent = grupo;
        grupoSelect.appendChild(grupoOption);
      });
    }
  
    function renderAlumnosSelect() {
      alumnoSelect.innerHTML = '';
      alumnos.forEach(function(alumno) {
        const alumnoOption = document.createElement('option');
        alumnoOption.value = alumno.nombre;
        alumnoOption.textContent = `${alumno.nombre} ${alumno.apellidos}`;
        alumnoSelect.appendChild(alumnoOption);
      });
    }
  
    function asignarAlumnoAGrupo(grupo, alumno) {
      // Aquí puedes implementar la lógica para asignar un alumno a un grupo
      // Puedes actualizar la estructura de datos de grupos si es necesario
      console.log(`Alumno ${alumno} asignado al grupo ${grupo}.`);
      alert(`Alumno ${alumno} asignado al grupo ${grupo}.`);
    }
  
    grupoForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      if (nombre !== '') {
        guardarGrupo(nombre);
        grupoForm.reset();
      }
    });
  
    asignacionForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const grupo = grupoSelect.value;
      const alumno = alumnoSelect.value;
      asignarAlumnoAGrupo(grupo, alumno);
    });
  
    renderGrupos();
    renderGruposSelect();
    renderAlumnosSelect();
  });
  