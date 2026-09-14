// =====================================================================
// COSTANTI
// =====================================================================
// Creazione del personaggio
// ---------------------------------------------------------------------
const formPersonaggio = document.querySelector("#creazione-personaggio");
const inputNome = document.querySelector("#nome-giocatore");
const sceltaClasse = document.querySelector ("#scelta-classe");
const scelta2 = document.querySelector("#scelta2")
// ---------------------------------------------------------------------

// Struttura della pagina
// ---------------------------------------------------------------------
const home = document.querySelector("#home");
const incipit = document.querySelector("#incipit");
const tabBar = document.querySelector("#tab-bar");
const paginaQuest = document.querySelector("#pagina-quest");
const paginaStatistiche = document.querySelector("#pagina-statistiche");
const paginaCampagna = document.querySelector("#pagina-campagna");
const mappaContainer = document.querySelector("#mappa-container");
const dialogoCampagna = document.querySelector("#dialogo-campagna");
// ---------------------------------------------------------------------

// Quest
// ---------------------------------------------------------------------
const listaTask = document.querySelector("#lista-task");
const inputTask = document.querySelector("#nuova-task");
const bottoneAggiungi = document.querySelector("#aggiungi-task");
const inputStatistica = document.querySelector("#statistica-task");
// ---------------------------------------------------------------------

// Banner di benvenuto
// ---------------------------------------------------------------------
const banner = document.querySelector("#banner-benvenuto");

// =====================================================================
// DATI: TASK
// =====================================================================
let task = JSON.parse(localStorage.getItem("task")) || [
    { id: 1, nome: "Studia", fatto: false, xp: 10, xpAssegnato : false, statistica: "intelletto", dataCreazione: "Mon Jan 01 2024" },
    { id: 2, nome: "Allenati", fatto: false, xp: 10, xpAssegnato : false, statistica: "forza", dataCreazione: "Mon Jan 01 2024" },
    { id: 3, nome: "Leggi", fatto: false, xp: 10, xpAssegnato : false, statistica: "saggezza", dataCreazione: "Mon Jan 01 2024" },
    { id: 4, nome: "Suona", fatto: false, xp: 10, xpAssegnato : false, statistica: "carisma", dataCreazione: "Mon Jan 01 2024" },
    { id: 5, nome: "Pratica", fatto: false, xp: 10, xpAssegnato : false, statistica: "destrezza", dataCreazione: "Mon Jan 01 2024" },
    { id: 6, nome: "Bevi", fatto: false, xp: 10, xpAssegnato : false, statistica: "costituzione", dataCreazione: "Mon Jan 01 2024" }
];

// =====================================================================
// DATI: GIOCATORE
// =====================================================================
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
    },

    hpAttuali: 0,
    hpMassimi: 0,
    mpAttuale: 0,
    mpMassimo: 0
};

// =====================================================================
// DATI: CLASSI
// =====================================================================
const classi = {
    GUERRIERO: {
        forza: 8,
        saggezza: 3,
        intelletto: 3,
        carisma: 4,
        destrezza: 5,
        costituzione: 7,
        hpMassimi: 50, mpMassimo: 10
    },
    MAGO: {
        forza: 2,
        saggezza: 6,
        intelletto: 9,
        carisma: 4,
        destrezza: 3,
        costituzione: 3,
        hpMassimi: 20, mpMassimo: 50
    },
    CHIERICO: {
        forza: 4,
        saggezza: 9,
        intelletto: 5,
        carisma: 6,
        destrezza: 2,
        costituzione: 5,
        hpMassimi: 30, mpMassimo: 40
    },
    BARDO: {
        forza: 3,
        saggezza: 5,
        intelletto: 5,
        carisma: 9,
        destrezza: 6,
        costituzione: 3,
        hpMassimi: 25, mpMassimo: 35
    },
    LADRO: {
        forza: 4,
        saggezza: 4,
        intelletto: 6,
        carisma: 4,
        destrezza: 9,
        costituzione: 4,
        hpMassimi: 30, mpMassimo: 25
    },
    BARBARO: {
        forza: 9,
        saggezza: 3,
        intelletto: 2,
        carisma: 3,
        destrezza: 5,
        costituzione: 9,
        hpMassimi: 60, mpMassimo: 5
    }
};

// =====================================================================
// DATI: MAPPA
// =====================================================================
let mappa = {

    taverna: {
        nome: "Taverna",
        npc: true,
    },

    villaggio: {
        nome: "Denma",
        tipo: "vuoto"
    },

    bosco: {
        nome: "Bosco di Denma",
        tipo: "mostro",
        mostro: "lupo"
    },

    spiaggia: {
        nome: "Spiaggia",
        tipo: "esplorazione",
        oggetto: "alga-ricordo",
        mostri: ["granchioGigante", "lumacaDiMare"]
    },

    profondoBosco: {
        nome: "Profondo Bosco",
        tipo: "boss",
        boss: "selas"
    }
};

// =====================================================================
// DATI: SIDE-QUEST
// =====================================================================
let sidequest = JSON.parse(localStorage.getItem("sidequest")) || {
    caccia1: {
        nome: "Granchi ovunque!",
        tipo: "caccia",
        bersaglio: "granchioGigante",
        stato: "non_iniziata",
        xp: 10
    },
    caccia2: {
        nome: "Branco feroce",
        tipo: "caccia",
        bersaglio: "lupo",
        stato: "non_iniziata",
        xp: 15
    },

    raccolta1: {
        nome: "Rinfrescami la memoria",
        tipo: "raccolta",
        bersaglio: "alga-ricordo",
        stato: "non_iniziata",
        xp: 5
    }
};

// =====================================================================
// DATI: MOSTRI
// =====================================================================
const mostri = {
    lupo: {
        nome: "Lupo Selvatico",
        forzaNemico: 8,
        xp: 3
    },
    granchioGigante: {
        nome: "Granchio Del Cocco",
        forzaNemico: 6,
        xp: 2
    },
    lumacaDiMare: {
        nome: "Lumaca Di Mare",
        forzaNemico: 3,
        xp: 1
    }
};

// Boss
// ---------------------------------------------------------------------
const boss = {
    selas: {
        nome: "Selas - Re Dei lupi",
        forzaNemico: 60,
        xp: 60,
        intelletto: - 1,
        forza: 6,
        carisma: 0,
        saggezza: - 1,
        destrezza: 3,
        costituzione: 4,
    }
};

// =====================================================================
// STATO INIZIALE DELLA PAGINA
// =====================================================================
if (giocatore.nome !== null) {
    formPersonaggio.hidden = true;
    scelta2.hidden = false;
}

if (giocatore.classe !== null) {
    incipit.hidden = true;
    home.hidden = false;
}

// =====================================================================
// CREAZIONE PERSONAGGIO
// =====================================================================
formPersonaggio.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nome = inputNome.value.trim();

    if (nome === "") {
        return;
    }

    giocatore.nome = nome;
    salvaGiocatore();

    formPersonaggio.hidden = true;
    scelta2.hidden = false;
})

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

function scegliClasse(nomeClasse) {

    giocatore.classe = nomeClasse;
    giocatore.statistiche = {
        forza: classi[nomeClasse].forza,
        saggezza: classi[nomeClasse].saggezza,
        intelletto: classi[nomeClasse].intelletto,
        carisma: classi[nomeClasse].carisma,
        destrezza: classi[nomeClasse].destrezza,
        costituzione: classi[nomeClasse].costituzione
    };

    giocatore.hpMassimi = classi[nomeClasse].hpMassimi;
    giocatore.hpAttuali = classi[nomeClasse].hpMassimi;
    giocatore.mpMassimo = classi[nomeClasse].mpMassimo;
    giocatore.mpAttuale = classi[nomeClasse].mpMassimo;

    localStorage.setItem("ultimoReset", new Date().toDateString());

    salvaGiocatore();

    incipit.hidden = true;
    home.hidden = false;

    mostraStatRiassunto();
    mostraStatDettaglio();
}

// =====================================================================
// RESET GIORNALIERO
// =====================================================================
function controllaReset() {
    if (giocatore.classe === null) {
        return;
    }

    const oggi = new Date().toDateString();
    const ultimoReset = localStorage.getItem("ultimoReset");

    if (ultimoReset !== oggi) {
        const taskDaConsolidare = task.filter(elemento => elemento.xpAssegnato === true);
        const xpDaConsolidare = taskDaConsolidare.reduce((totale, elemento) => {
            return totale + elemento.xp;
        }, 0);

        giocatore.xp += xpDaConsolidare;
        giocatore.livello = calcolaLivello(giocatore.xp);

        const differenzaHp = calcolaHpMassimi() - giocatore.hpMassimi;
        const differenzaMp = calcolaMpMassimo() - giocatore.mpMassimo;

        giocatore.hpAttuali += differenzaHp;
        giocatore.mpAttuale += differenzaMp;

        giocatore.hpMassimi = calcolaHpMassimi();
        giocatore.mpMassimo = calcolaMpMassimo();

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

// =====================================================================
// QUEST: MOSTRA, COMPLETA, RIMUOVI, AGGIUNGI
// =====================================================================
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
// ---------------------------------------------------------------------

// creazione id task, checkbox
// ---------------------------------------------------------------------
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
// ---------------------------------------------------------------------

//Rimozione task
// ---------------------------------------------------------------------
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
// ---------------------------------------------------------------------

// Aggiungi task
// ---------------------------------------------------------------------
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

// =====================================================================
// NAVIGAZIONE TRA PAGINE
// =====================================================================
tabBar.addEventListener("click", (evento) => {
    if (!evento.target.dataset.pagina) {
        return;
    }

    paginaQuest.hidden = true;
    paginaStatistiche.hidden = true;
    paginaCampagna.hidden = true;

   document.querySelector(`#${evento.target.dataset.pagina}`).hidden = false;

   if (evento.target.dataset.pagina === "pagina-campagna") {
    mostraMappa();
   }
});

// =====================================================================
// VISUALIZZAZIONE STAT
// =====================================================================
function mostraStatRiassunto() {
    const taskDiOggi = task.filter(elemento => elemento.xpAssegnato === true);
    const xpProvvisorio = taskDiOggi.reduce((totale, elemento) => totale + elemento.xp, 0);
    const xpVisualizzato = giocatore.xp + xpProvvisorio;
    const livelloVisualizzato = calcolaLivello(xpVisualizzato);

    document.querySelector("#stat-riassunto").innerHTML = `<p>${giocatore.nome} - livello: ${livelloVisualizzato} | XP: ${xpVisualizzato}</p>`;

    const percentualeHp = (giocatore.hpAttuali / giocatore.hpMassimi) * 100;
    const percentualeMp = (giocatore.mpAttuale / giocatore.mpMassimo) * 100;

    document.querySelector("#barra-hp").style.width = percentualeHp + "%";
    document.querySelector("#barra-mp").style.width = percentualeMp + "%";

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

    document.querySelector("#stat-base").innerHTML = `<p>${giocatore.nome} - ${giocatore.classe} livello: ${livelloVisualizzato} | Prossimo livello: ${xpNelLivello}/${xpNecessaria(livelloVisualizzato)} XP</p>`;

    document.querySelector("#stat-tutte").innerHTML = `<p>${listaStatistiche}</p>`;

    const percentualeHp = (giocatore.hpAttuali / giocatore.hpMassimi) * 100;
    const percentualeMp = (giocatore.mpAttuale / giocatore.mpMassimo) * 100;

    document.querySelector("#barra-health").style.width = percentualeHp + "%";
    document.querySelector("#barra-mana").style.width = percentualeMp + "%";

    document.querySelector("#valore-hp").textContent = `${giocatore.hpAttuali}/${giocatore.hpMassimi}`;
    document.querySelector("#valore-mp").textContent = `${giocatore.mpAttuale}/${giocatore.mpMassimo}`;
}

// =====================================================================
// MOSTRAMAPPA
// =====================================================================
function mostraMappa () {
    const nodiHtml = Object.entries(mappa).map(([chiave, nodo]) => {
        return `<button class="nodo-mappa" data-nodo="${chiave}">${nodo.nome}</button>`;
    }).join("");
    
    mappaContainer.innerHTML = nodiHtml
}

// =====================================================================
// CLICK E NODI
// =====================================================================
mappaContainer.addEventListener("click", (evento) => {
    if (!evento.target.dataset.nodo) {
        return;
    }

    const chiaveNodo = evento.target.dataset.nodo;
    const nodo = mappa[chiaveNodo];

    gestisciNodo(chiaveNodo, nodo);
});


// Nodi
// ---------------------------------------------------------------------
function gestisciNodo(chiaveNodo, nodo) {
    if (nodo.npc) {
        mostraDialogoNpc();
        return;
    }

    if (nodo.tipo === "vuoto") {
        dialogoCampagna.innerHTML = `<p>Il villaggio brulica di vita.</p>`;
        return;
    }

    if (nodo.tipo === "mostro") {
        avviaCombattimento(nodo.mostro, false);
        return;
    }

    if (nodo.tipo === "boss") {
        avviaCombattimento(nodo.boss, true);
        return;
    }

    if (nodo.tipo === "esplorazione") {
        mostraEsplorazione(nodo);
        return;
    }
}

// =====================================================================
// COMBATTIMENTO
// =====================================================================
function avviaCombattimento(chiaveNemico, eBoss) {
    const nemico = eBoss ? boss[chiaveNemico] : mostri [chiaveNemico];

    const potenzaGiocatore = giocatore.statistiche.forza + giocatore.statistiche.intelletto + Math.floor(Math.random() *10);
    const potenzaNemico = nemico.forzaNemico + Math.floor(Math.random() * 10);

    if (potenzaGiocatore >= potenzaNemico) {
        giocatore.xp += nemico.xp;

        if (eBoss) {
            giocatore.statistiche.forza = nemico.forza;
            giocatore.statistiche.saggezza = nemico.saggezza;
            giocatore.statistiche.intelletto = nemico.intelletto;
            giocatore.statistiche.carisma = nemico.carisma;
            giocatore.statistiche.destrezza = nemico.destrezza;
            giocatore.statistiche.costituzione = nemico.costituzione;
        }

        giocatore.livello = calcolaLivello(giocatore.xp);
        salvaGiocatore();

        dialogoCampagna.innerHTML = `<p>Congratulazione, hai appena sconfitto ${nemico.nome}! Guadagni ${nemico.xp} XP.</p>`;
       
        /*aggiornaSidequestCaccia(chiaveNemico);*/
    } else {
        dialogoCampagna.innerHTML = `<p>${nemico.nome} ti ha sconfitto. Completare quest ti rende più forte, ritenta non appena te la sentirai</p>`
    }

    mostraStatRiassunto();
    mostraStatDettaglio();
}

// =====================================================================
// SIDEQUEST DIALOGHI
// =====================================================================
function mostraDialogoNpc() {
    const nonIniziate = Object.entries(sidequest).filter(([chiave, q]) => q.stato === "non_iniziata");
    const completabili =Object.entries(sidequest).filter(([chiave, q]) => q.stato === "completabile");

    let html = "<p>Che piacere incontrarsi di nuovo, viandante. Se la stanchezza ti opprime trova pure rifugio nella mia locanda. Qualora invece è l'avventura ciò che cerchi, ho dei piccoli lavoretti per te:</p>";

    completabili.forEach(([chiave, q]) => {
        html += `<button class="chiudi-quest" data-quest="${chiave}">Consegna: ${q.nome}</button>`;
    });

    nonIniziate.forEach(([chiave, q]) => {
        html += `<button class="accetta-quest" data-quest="${chiave}">Accetta: ${q.nome}</button>`;
    });

    if (completabili.length === 0 && nonIniziate.length === 0) {
        html += `<p>Grazie per il tuo aiuto, ma al momento non è necessario che tu faccia altro.</p>`;
    }

    dialogoCampagna.innerHTML = html;
}

dialogoCampagna.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("accetta-quest")) {
        const chiaveQuest = evento.target.dataset.quest;
        sidequest[chiaveQuest].stato = "attiva";
        salvaSidequest();
    }

    if (evento.target.classList.contains ("chiudi-quest")) {
        const chiaveQuest = evento.target.dataset.quest;
        const q = sidequest[chiaveQuest];

        giocatore.xp += q.xp;
        giocatore.livello = calcolaLivello(giocatore.xp);
        salvaGiocatore();

        q.stato = "conclusa";
        salvaSidequest();

        dialogoCampagna.innerHTML = `<p>Sidequest completata! Hai guadagnato ${q.xp} XP.</p>`;
        mostraStatRiassunto();
    }

    if (evento.target.classList.contains("raccogli")) {
    const chiaveOggetto = evento.target.dataset.oggetto;
    Object.values(sidequest).forEach(q => {
        if (q.tipo === "raccolta" && q.bersaglio === chiaveOggetto && q.stato === "attiva") {
            q.stato = "completabile";
        }
    });
    salvaSidequest();
    dialogoCampagna.innerHTML = `<p>Hai raccolto: ${chiaveOggetto}. Torna dal locandiere per consegnarlo.</p>`;
    }

    if (evento.target.classList.contains("combatti")) {
        avviaCombattimento(evento.target.dataset.mostro, false);
    }

});

// =====================================================================
// MOSTRAESPLORAZIONE
// =====================================================================
function mostraEsplorazione(nodo) {
    let html = `<p>Esplori ${nodo.nome}.</p>`;

    if (nodo.oggetto) {
        html += `<button class="raccogli" data-oggetto="${nodo.oggetto}">Raccogli ${nodo.oggetto}</button>`;
    }

    nodo.mostri.forEach(chiaveMostro => {
        html += `<button class="combatti" data-mostro="${chiaveMostro}">Affronta ${mostri[chiaveMostro].nome}</button>`;
    });

    dialogoCampagna.innerHTML = html;
}

// =====================================================================
// LOCALSTORAGE
// =====================================================================
function salvaTask () {
    localStorage.setItem("task", JSON.stringify(task));
}

function salvaGiocatore() {
    localStorage.setItem("giocatore", JSON.stringify(giocatore));
}

function salvaSidequest() {
    localStorage.setItem("sidequest", JSON.stringify(sidequest));
}

// =====================================================================
// CALCOLI
// =====================================================================
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

function calcolaHpMassimi() {
        const base = classi[giocatore.classe].hpMassimi;
        return base + (giocatore.livello - 1) * 5;
        }

        function calcolaMpMassimo() {
        const base = classi[giocatore.classe].mpMassimo;
        return base + (giocatore.livello - 1) * 3;
        }

// =====================================================================
// AVVIO
// =====================================================================
controllaReset();
mostraStatRiassunto();
mostraStatDettaglio();
mostraTask();

