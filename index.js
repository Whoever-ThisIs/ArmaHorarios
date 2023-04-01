class Materia {
    constructor(name, active, options = []) {
        this.name = name;
        this.active = active;
        this.options = options;
    }
}

class Curso {
    constructor(id, docente, horaInicio, horaFinal, dias=[], materia, active) {
        this.id = id
        this.docente = docente;
        this.horaInicio = horaInicio;
        this.horaFinal = horaFinal;
        this.dias = dias;
        this.materia = materia;
        this.active = active;
    }
}

let texto, horaInicio, horaFin, i, j, k;
let cont_cursos = 1;
let materias = [];
let cursos = [];



/*function union(set1, set2) {
    let tempArray = set1;

    for (let v_set2 of set2) for (let v_temp of tempArray) if (v_set2 !== v_temp) tempArray.push(v_set2);

    return tempArray
}

function intersection(set1, set2) {
    let tempArray = [];

    for (let v_set1 of set1) for (let v_set2 of set2) if (v_set1 === v_set2) tempArray.push(v_set1);

    return tempArray
}

function neighbour (P, v) {
    let neighArray = [];
    for (let vs of P) if (vs.docente !== P[v].docente) if (vs.horaFinal <= P[v].horaInicio || P[v].horaFinal <= vs.horaInicio) neighArray.push(vs);
    return neighArray
}
function BK(R = [], P = [], X = []) {

    if (P.length === 0 && X.length ===0) return R

    for (let v of P) {
        let R_rec = R;
        let P_rec = P;
        let X_rec = X;
        BK (union(R_rec,v), intersection(P_rec, neighbour(P_rec,v)), intersection(X_rec, neighbour(P_rec,v)));
        // P = P \ v
        X_rec = union(X_rec, v);
    }

}*/

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

                todosCursos += `<div id="${i}#${j}">Docente: ${cursos[tempi].docente} de ${cursos[tempi].horaInicio} a ${cursos[tempi].horaFinal} los dias ${diasDeClase} </div>`
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
    cursos.push(new Curso(cont_cursos, texto, horaInicio, horaFin, dias, materiaDelCurso, true));
    cont_cursos++;
    materias[materiaDelCurso].options.push(cursos.length - 1);
    actualizarMaterias(materias, cursos);
    //console.log(JSON.stringify(cursos));
    //console.log(JSON.stringify(materias));
}

function calcularCalendarios(cursos, materias) {
    let edgesArray = [], usados = [];
    for (let a = 0; a < cursos.length; a++) {
        for (let b = 1 + a; b < cursos.length; b++) {
            let tempArreglo = [];
            let mismosDias = false;
            //TODO arreglar lo de los diferentes dias, encontrar una manera de mostrar todo en un calendario, y mostrar todas las opciones resultado del bk en calendarios tambien. en ese punto seria la primera iteracion funcional

            for (let diasA of cursos[a].dias) for (let diasB of cursos[b].dias) if ((diasA === diasB)) mismosDias = true;

            if (mismosDias) if (cursos[b].horaFinal <= cursos[a].horaInicio || cursos[a].horaFinal <= cursos[b].horaInicio) {
                tempArreglo.push(a);
                tempArreglo.push(b);
                //usados.push(a);
                //usados.push(b);
                edgesArray.push(tempArreglo);
                console.log(edgesArray)
            } else {
                tempArreglo.push(a);
                tempArreglo.push(b);
                edgesArray.push(tempArreglo);
                console.log(edgesArray)
            }
        }
    }

    console.log(BronKerbosch(edgesArray))
}