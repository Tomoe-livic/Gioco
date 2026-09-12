const formPersonaggio = document.querySelector("#creazione-personaggio");
const inputNome = document.querySelector("#nome-giocatore");
const sceltaClasse = document.querySelector ("#scelta-classe");
const home = document.querySelector("#home");
const incipit = document.querySelector("#incipit");
const scelta2 = document.querySelector("#scelta2")
const listaTask = document.querySelector("#lista-task");
const inputTask = document.querySelector("#nuova-task");
const bottoneAggiungi = document.querySelector("#aggiungi-task");
const stat = document.querySelector("#stat");
const tabBar = document.querySelector("#tab-bar");
const paginaQuest = document.querySelector("#pagina-quest");
const paginaStatistiche = document.querySelector("#pagina-statistiche");
const inputStatistica = document.querySelector("#statistica-task");
const banner = document.querySelector("#banner-benvenuto");



formPersonaggio.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nome = inputNome.value.trim();
    giocatore.nome = nome;
    salvaGiocatore();

    formPersonaggio.hidden = true;
    scelta2.hidden = false;
})

//mago, guerriero, chierico, bardo, ladro, barbaro
//task
let task = JSON.parse(localStorage.getItem("task")) || [
    { id: 1, nome: "Studia", fatto: false, xp: 10, xpAssegnato : false, statistica: "intelletto", dataCreazione: "Mon Jan 01 2024" },
    { id: 2, nome: "Allenati", fatto: false, xp: 10, xpAssegnato : false, statistica: "forza", dataCreazione: "Mon Jan 01 2024" },
    { id: 3, nome: "Leggi", fatto: false, xp: 10, xpAssegnato : false, statistica: "saggezza", dataCreazione: "Mon Jan 01 2024" },
    { id: 4, nome: "Suona", fatto: false, xp: 10, xpAssegnato : false, statistica: "carisma", dataCreazione: "Mon Jan 01 2024" },
    { id: 5, nome: "Pratica", fatto: false, xp: 10, xpAssegnato : false, statistica: "destrezza", dataCreazione: "Mon Jan 01 2024" },
    { id: 6, nome: "Bevi", fatto: false, xp: 10, xpAssegnato : false, statistica: "costituzione", dataCreazione: "Mon Jan 01 2024" }
];

//stat
let giocatore = JSON.parse(localStorage.getItem("giocatore")) || {
    nome: null,
    xp: 0,
    livello: 1,
    classe: null,

    statistiche: {
        forza: 0,
        saggezza: 0,
        intelletto: 0,
        carisma: 0,
        destrezza: 0,
        costituzione: 0
    }
};

if (giocatore.nome !== null) {
    formPersonaggio.hidden = true;
    scelta2.hidden = false;
}

if (giocatore.classe !== null) {
    incipit.hidden = true;
    home.hidden = false;
}

const classi = {
    GUERRIERO: {
        forza: 8,
        saggezza: 3,
        intelletto: 3,
        carisma: 4,
        destrezza: 5,
        costituzione: 7
    },

    MAGO: {
        forza: 2,
        saggezza: 6,
        intelletto: 9,
        carisma: 4,
        destrezza: 3,
        costituzione: 3
    },

    CHIERICO: {
        forza: 4,
        saggezza: 9,
        intelletto: 5,
        carisma: 6,
        destrezza: 2,
        costituzione: 5
    },

    BARDO: {
        forza: 3,
        saggezza: 5,
        intelletto: 5,
        carisma: 9,
        destrezza: 6,
        costituzione: 3
    },

    LADRO: {
        forza: 4,
        saggezza: 4,
        intelletto: 6,
        carisma: 4,
        destrezza: 9,
        costituzione: 4
    },

    BARBARO: {
        forza: 9,
        saggezza: 3,
        intelletto: 2,
        carisma: 3,
        destrezza: 5,
        costituzione: 9
    }
};

function scegliClasse(nomeClasse) {
    giocatore.classe = nomeClasse;
    giocatore.statistiche = {
        ...classi[nomeClasse]
    };
    salvaGiocatore();

    incipit.hidden = true;
    home.hidden = false;

    mostraStatRiassunto();
    mostraStatDettaglio();
}

//Reset Giornaliero
function controllaReset() {
    const oggi = new Date().toDateString();
    const ultimoReset = localStorage.getItem("ultimoReset");

    if (ultimoReset !== oggi) {
        const taskDaConsolidare = task.filter(elemento => elemento.xpAssegnato === true);
        const xpDaConsolidare = taskDaConsolidare.reduce((totale, elemento) => {
            return totale + elemento.xp;
        }, 0);

        giocatore.xp += xpDaConsolidare;
        giocatore.livello = calcolaLivello(giocatore.xp);

        taskDaConsolidare.forEach(elemento => {
            giocatore.statistiche[elemento.statistica] += 1;
        });

        task = task.map(elemento => ({
            ...elemento,
            fatto: false,
            xpAssegnato: false
        }));

        localStorage.setItem("ultimoReset", oggi);
        salvaTask();
        salvaGiocatore();

        banner.innerHTML = "<p>Che il vento ti guidi, viandante. L'alba di un nuovo giorno è giunta e nuove quest ti attendono. Non demordere e prosegui per la tua strada.</p>"
        banner.style.display = "block";
        banner.classList.add("visible");

        setTimeout (() => {
            banner.classList.remove("visible");

            setTimeout (() => {
                banner.style.display = "none";
            }, 600);
        }, 9000);
    }
}

//mostra task e funzioni su checked, disabled e elimina
function mostraTask() {
    if (task.length === 0) {
        listaTask.innerHTML = "<p>Nessuna quest ancora. Aggiungine una!</p>";
        return;
    }
    const nomiTask = task.map(elemento => {
        return `<div class="task">
        <label>
        <input type="checkbox" data-id="${elemento.id}"
        ${elemento.fatto ? "checked" : ""}
        ${elemento.fatto ? "disabled" : ""}>
        ${elemento.nome}
        </label>
        <button data-id="${elemento.id}" class="rimuovi">X</button>
        </div>`;
    }).join("");

    listaTask.innerHTML = nomiTask;
};

//creazione id task
listaTask.addEventListener("change", (evento) => {
    const idTask = Number(evento.target.dataset.id);
    const taskCliccato = task.find(elemento => elemento.id === idTask);

    const oggi = new Date().toDateString();
    if (taskCliccato.dataCreazione === oggi) {
        alert("Hai appena accettato la quest, domani potrai metterti in viaggio per completarla.");
        evento.target.checked = false;
        return;
    }

    //conferma del check
    const confermato = confirm(`Confermi di aver completato la quest "${taskCliccato.nome}"?`);
    if (!confermato) {
        evento.target.checked = false;
        return;
    }


    task = task.map(elemento => {
    if (elemento.id === idTask) {
        return {
        ...elemento, fatto: true,
        xpAssegnato: true };
    }

    return elemento;
});
mostraTask();
mostraStatRiassunto();
mostraStatDettaglio();
salvaTask();
salvaGiocatore();
});
//Rimozione task
listaTask.addEventListener ("click", (evento) => {
    if (!evento.target.classList.contains("rimuovi")) {
        return;
    }

//Cambiare le caselle elimina in icone o rendere il tasto elimina unico che funge per tutti i task
    const idDaRimuovere = Number (evento.target.dataset.id);
    
    const taskCliccato = task.find(elemento => elemento.id === idDaRimuovere);
    const confermato = confirm(`Vuoi davvero rinunciare alla quest "${taskCliccato.nome}"? Perderai l'esperienza di oggi acquisita grazie ad essa.`);
    if (!confermato) {
        return;
    }

    task = task.filter (elemento => elemento.id !== idDaRimuovere);

    mostraTask();
    salvaTask();
});

sceltaClasse.addEventListener("click", (evento) => {
    if (!evento.target.dataset.classe) {
        return;
    }

    const nomeClasse = evento.target.dataset.classe;
    const decisione = confirm(`Mi assicuri che la tua via sia quella del "${nomeClasse}"?`)
    if(!decisione) {
        return;
    }
    scegliClasse(nomeClasse);
});


bottoneAggiungi.addEventListener("click", () => {
    if (inputTask.value.trim() === "") {
        return;
    }

    const limite = calcolaLimiteTask();
    if (task.length >= limite) {
        alert (`Non affaticarti troppo, ${limite} quest vanno più che bene per il tuo livello attuale.`);
        return;
    }

    const nuovoTask = {
    id: Date.now(),
    nome: inputTask.value.trim(),
    fatto: false,
    xp: 10,
    xpAssegnato: false,
    statistica: inputStatistica.value,
    dataCreazione: new Date().toDateString()
};


task = [...task, nuovoTask];

mostraTask();
salvaTask();
});

tabBar.addEventListener("click", (evento) => {
    if (!evento.target.dataset.pagina) {
        return;
    }

    paginaQuest.hidden = true;
    paginaStatistiche.hidden = true;

   document.querySelector(`#${evento.target.dataset.pagina}`).hidden = false;
});

//creazione task
function mostraStatRiassunto() {
    const taskDiOggi = task.filter(elemento => elemento.xpAssegnato === true);
    const xpProvvisorio = taskDiOggi.reduce((totale, elemento) => totale + elemento.xp, 0);
    const xpVisualizzato = giocatore.xp + xpProvvisorio;
    const livelloVisualizzato = calcolaLivello(xpVisualizzato);

    document.querySelector("#stat-riassunto").innerHTML =
        `<p>${giocatore.nome} - livello: ${livelloVisualizzato} | XP: ${xpVisualizzato}</p>`;
}

function mostraStatDettaglio() {
    const taskDiOggi = task.filter(elemento => elemento.xpAssegnato === true);
    const xpProvvisorio = taskDiOggi.reduce((totale, elemento) => totale + elemento.xp, 0);
    const xpVisualizzato = giocatore.xp + xpProvvisorio;
    
    let livelloVisualizzato = 1;
    let xpAccumulata = 0;
    while (xpAccumulata + xpNecessaria(livelloVisualizzato) <= xpVisualizzato) {
        xpAccumulata += xpNecessaria(livelloVisualizzato);
        livelloVisualizzato++;
    }
    const xpNelLivello = xpVisualizzato - xpAccumulata;

    const listaStatistiche = Object.entries(giocatore.statistiche)
        .map(([nome, valore]) => `${nome}: ${valore}`)
        .join(" | ");

    document.querySelector("#stat-dettaglio").innerHTML = `<div id="stat-base"><p>${giocatore.nome} - ${giocatore.classe} livello: ${livelloVisualizzato} | Prossimo livello: ${xpNelLivello}/${xpNecessaria(livelloVisualizzato)} XP</p></div> <br><br><div id="stat-tutte"><p>${listaStatistiche}</p></div>`;
}


function salvaTask () {
    localStorage.setItem("task", JSON.stringify(task));
}

function salvaGiocatore() {
    localStorage.setItem("giocatore", JSON.stringify(giocatore));
}

function calcolaLimiteTask () {
    const limite = 10 + Math.floor ((giocatore.livello - 1) / 5);
    return Math.min (limite, 30);
}

function xpNecessaria(livello) {
    return livello * 20;
}

function calcolaLivello(xpTotale) {
    let livello = 1;
    let xpAccumulata = 0;

    while (xpAccumulata + xpNecessaria(livello) <= xpTotale) {
        xpAccumulata += xpNecessaria(livello);
        livello++;
    }
    return livello;
}

controllaReset();
mostraStatRiassunto();
mostraStatDettaglio();
mostraTask();