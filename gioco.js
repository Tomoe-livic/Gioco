//mago, guerriero, chierico(?), bardo, ladro
let task = JSON.parse(localStorage.getItem("task")) || [
    { id: 1, nome: "Studia", fatto: false, xp: 10 },
    { id: 2, nome: "Allenati", fatto: false, xp: 10 },
    { id: 3, nome: "Leggi", fatto: false, xp: 10 },
    { id: 4, nome: "Suona", fatto: false, xp: 10 },
    { id: 5, nome: "Crea", fatto: false, xp: 10 }
];


let giocatore = JSON.parse(localStorage.getItem("giocatore")) || {
    xp: 0,
    livello: 1
};

const listaTask = document.querySelector("#lista-task");
const inputTask = document.querySelector("#nuova-task");
const bottoneAggiungi = document.querySelector("#aggiungi-task");
const stat = document.querySelector("#stat");

function controllaReset() {
    const oggi = new Date().toDateString();
    const ultimoReset = localStorage.getItem("ultimoReset");

    if (ultimoReset !== oggi) {
        task = task.map(elemento => ({
            ...elemento,
            fatto: false
        }));

        localStorage.setItem("ultimoReset", oggi);
        salvaTask();
    }
}

function mostraTask() {
    if (task.length === 0) {
        listaTask.innerHTML = "<p>Nessuna task ancora. Aggiungine una!</p>";
        return;
    }
    const nomiTask = task.map(elemento => {
        return `<label>
        <input type="checkbox" data-id="${elemento.id}"
        ${elemento.fatto ? "checked" : ""}
        ${elemento.fatto ? "disabled" : ""}>
        ${elemento.nome}
        </label>
        <button data-id="${elemento.id}" class="rimuovi">Elimina</button>`;
    }).join("");

    listaTask.innerHTML = nomiTask;
};

listaTask.addEventListener("change", (evento) => {
    const idTask = Number(evento.target.dataset.id);
    const taskCliccato = task.find(elemento => elemento.id === idTask);

    const confermato = confirm(`Confermi di aver completato "${taskCliccato.nome}"?`);
    if (!confermato) {
        evento.target.checked = false;
        return;
    }

    giocatore.xp += taskCliccato.xp;
    giocatore.livello = Math.floor(giocatore.xp / 100) + 1;

    task = task.map(elemento => {
    if (elemento.id === idTask) {
        return {
            ...elemento, fatto: true};
    }

    return elemento;
});
mostraTask();
mostraStat()
salvaTask();
salvaGiocatore();
});

listaTask.addEventListener ("click", (evento) => {
    if (!evento.target.classList.contains("rimuovi")) {
        return;
    }
//Cambiare le caselle elimina in icone o rendere il tasto elimina unico che funge per tutti i task
    const idDaRimuovere = Number (evento.target.dataset.id);
    task = task.filter (elemento => elemento.id !== idDaRimuovere);

    mostraTask();
    salvaTask();
});

bottoneAggiungi.addEventListener("click", () => {
    //Reindirizzare nuovotask in una macrocategoria a seconda delle caratteristiche
     //magari usando un dropdown per caratteristica nella creazione della nuova task
    if (inputTask.value.trim() === "") {
        return;
    }

    const nuovoTask = {
    id: Date.now(),
    nome: inputTask.value.trim(),
    fatto: false,
    xp: 10
};


task = [...task, nuovoTask];

mostraTask();
salvaTask();
});

 function mostraStat() {
       stat.innerHTML = `<p>livello: ${giocatore.livello} | XP: ${giocatore.xp}</p>`
};

function salvaTask () {
    localStorage.setItem("task", JSON.stringify(task));
}

function salvaGiocatore() {
    localStorage.setItem("giocatore", JSON.stringify(giocatore));
}

controllaReset();
mostraStat();
mostraTask();