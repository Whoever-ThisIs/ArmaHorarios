class Materia {
    constructor(name, active, options = []) {
        this.name = name;
        this.active = active;
        this.options = options;
    }
}

class Curso {
    constructor(docente, horaInicio, horaFinal, dias=[], materia, active) {
        this.docente = docente;
        this.horaInicio = horaInicio;
        this.horaFinal = horaFinal;
        this.dias = dias;
        this.materia = materia;
        this.active = active;
    }
}

let texto, horaInicio, horaFin, i, j, k;
let materias = [];
let cursos = [];


function actualizarMaterias(materias, cursos) {
    var todasMaterias = '', materiasDisponibles = '',tempi;

    //para cada materia
    for (i = 0; i < materias.length; i ++) {

        if (materias[i].options !== 0) {

            var todosCursos = `<h2>${materias[i].name}</h2>`;
            //para cada opcion de cada clase
            for (j = 0; j < materias[i].options.length; j++) {

                //id de la opcion actual de la materia
                tempi = materias[i].options[j];

                var diasDeClase = '';
                //Para cada dia de cada clase
                for (k = 0; k < cursos[tempi].dias.length; k++) {

                    diasDeClase += cursos[tempi].dias[k];
                    if (cursos[tempi].dias.length > 1) {
                        if (cursos[tempi].dias.length - 2 === k) diasDeClase += " y "
                        else if( cursos[tempi].dias.length - 1 !== k ) diasDeClase += ", "
                    }
                }

                todosCursos += `<div id="${i}#${j}">Docente: ${cursos[tempi].docente} de ${cursos[tempi].horaInicio} a ${cursos[tempi].horaInicio} los dias ${diasDeClase} </div>`
            }
        }

        materiasDisponibles += `<option value="${i}">${materias[i].name}</option>`;
        todasMaterias += `<div id="${materias[i].name}">${todosCursos}</div>`;
    }
    document.getElementById("materiasDisponibles").innerHTML = materiasDisponibles;
    document.getElementById("todasMaterias").innerHTML = todasMaterias;
}

function otraClase(materias, cursos) {
    texto = document.getElementById("textNewMateria").value;
    materias.push(new Materia(texto,true));

    actualizarMaterias(materias, cursos);
    texto.value = '';
    console.log(JSON.stringify(materias));
}

function otroCurso(cursos, materias) {
    texto = document.getElementById("nameNewCurso").value;
    horaInicio = document.getElementById("horaInicio").value;
    horaFin = document.getElementById("horaFin").value;
    var dias = [];
    var days = document.getElementsByClassName("dias");
    for (var c of days) { if (c.checked) { dias.push(c.value) } }
    let materiaDelCurso = document.getElementById("materiasDisponibles").value;
    cursos.push(new Curso(texto, horaInicio, horaFin, dias, materiaDelCurso, true));
    materias[materiaDelCurso].options.push(cursos.length - 1);
    actualizarMaterias(materias, cursos);
    console.log(JSON.stringify(cursos));
    console.log(JSON.stringify(materias));
}