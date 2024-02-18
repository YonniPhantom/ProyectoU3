document.addEventListener('DOMContentLoaded', function() {
    const calificacionForm = document.getElementById('calificacion-form');
    const alumnoSelect = document.getElementById('alumno-select');
    const materiaSelect = document.getElementById('materia-select');
    const calificacionInput = document.getElementById('calificacion');
    
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
  
    function renderAlumnos() {
      alumnoSelect.innerHTML = '';
      alumnos.forEach(function(alumno) {
        const alumnoOption = document.createElement('option');
        alumnoOption.value = alumno.nombre;
        alumnoOption.textContent = `${alumno.nombre} ${alumno.apellidos}`;
        alumnoSelect.appendChild(alumnoOption);
      });
    }
  
    function renderMaterias(alumnoSeleccionado) {
      materiaSelect.innerHTML = '';
      const alumno = alumnos.find(function(alumno) {
        return alumno.nombre === alumnoSeleccionado;
      });
      if (alumno) {
        alumno.materias.forEach(function(materia) {
          const materiaOption = document.createElement('option');
          materiaOption.value = materia;
          materiaOption.textContent = materia;
          materiaSelect.appendChild(materiaOption);
        });
      }
    }
  
    function guardarCalificacion(alumno, materia, calificacion) {
        const index = alumnos.findIndex(function(a) {
            return a.nombre === alumno;
        });
        if (index !== -1) {
            const materiaIndex = alumnos[index].materias.indexOf(materia);
            if (materiaIndex !== -1) {
                alumnos[index].calificaciones[materia] = calificacion;
                localStorage.setItem('alumnos', JSON.stringify(alumnos));
                console.log(`Calificación guardada para ${alumno} en ${materia}: ${calificacion}`);
                alert(`Calificación guardada para ${alumno} en ${materia}: ${calificacion}`);
            } else {
                alert(`El alumno ${alumno} no está inscrito en la materia ${materia}.`);
            }
        } else {
            alert(`El alumno ${alumno} no fue encontrado.`);
        }
    }
    
  
    calificacionForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const alumno = alumnoSelect.value;
      const materia = materiaSelect.value;
      const calificacion = calificacionInput.value.trim();
      if (calificacion !== '') {
        guardarCalificacion(alumno, materia, calificacion);
        calificacionInput.value = '';
      }
    });
  
    alumnoSelect.addEventListener('change', function() {
      const alumnoSeleccionado = alumnoSelect.value;
      renderMaterias(alumnoSeleccionado);
    });
  
    renderAlumnos();
  });
  