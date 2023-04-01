function union(set1, set2) {
    let tempArray = set1;

    for (let vtemp of set1) if (set2 !== vtemp) tempArray.push(set2)

    //for (let v_set2 of set2) for (let v_temp of tempArray) if (v_set2 !== v_temp) tempArray.push(v_set2);

    return tempArray
}

function intersection(set1, set2) {
    let tempArray = [];

        for (let v_set1 of set1) for (let v_set2 of set2) if (v_set1 === v_set2) tempArray.push(v_set1);

    return tempArray
}

/*
function neighbour (P, v) {
    let neighArray = [];
    for (let vs of P) if (vs.id !== P[v].id) if (vs.horaFinal <= P[v].horaInicio || P[v].horaFinal <= vs.horaInicio) neighArray.push(vs);
    return neighArray
}

*/
function BK(R = [], P = [], X = []) {
    /*let resR ='', resP='', resX='';
    for (let x of R) resR += x.id;
    for (x of P) resR += x.id;
    for (x of X) resX += x.id;
*/
    //console.log(`| R:${resX} | P:${resP} | X:${resX} |`)
    console.log(`| R:${JSON.stringify(R)} | P:${JSON.stringify(P)} | X:${JSON.stringify(X)} |`)
    console.log("----------------------")
    if (P.length === 0 && X.length === 0) return R

    for (let v of P) {

        let R2, P2, X2;
        R2 = R;
        R2.push(v)
        P2 = intersection(P, v.c);
        X2 = intersection(X, v.c)

        BK(R2, P2, X2)
        let indexP;
        for (let i = 0; i < P.length; i++) if (v.c === P[i].c) indexP = i;
        P.splice(indexP,1)
        X.push(v)
    }

}

let t = [{'v':1,'c':[2,3]},{'v':2,'c':[1,3]},{'v':3,'c':[1,2,4]},{'v':4,'c':[3]},{'v':5,'c':[]}]
let graph_vertices = [1,2,3,4,5]
let vertices_connections = [[2,3],[1,3],[1,2,4],[3],[]];
let R_ini = [{'c':[]}]
let X_ini = [];

console.log(t[0].v)
BK(R_ini, t, X_ini)
