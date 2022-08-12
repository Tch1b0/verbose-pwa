<template>
    <a href="https://verbose.raphaelpour.de">
        <img
            src="https://verbose.raphaelpour.de/logo.png"
            alt="Verbose Logo"
            class="mt-5 mb-3 rounded-md outline-double outline-4 outline-black" />
    </a>
    <p class="text-gray-400 mb-6">
        A PWA for
        <a
            href="https://verbose.raphaelpour.de"
            class="text-blue-400 hover:underline"
            >Verbose</a
        >
    </p>

    <search-bar class="pb-3" @inputUpdated="filterVocs"></search-bar>
    <table>
        <tr>
            <th>EN</th>
            <th>DE</th>
            <th>⭐</th>
        </tr>
        <tr v-for="[k, v] of displayedVocs" :key="k">
            <td>{{ k }}</td>
            <td>{{ v.words.join(", ") }}</td>
            <td>
                <button
                    title="Add to collection"
                    @click="store.dispatch('toggleFavourite', k)">
                    {{ store.state.favourites.includes(k) ? "⭐" : "⭕" }}
                </button>
            </td>
        </tr>
    </table>
</template>

<script lang="ts" setup>
import store from "@/store";
import SearchBar from "@/components/SearchBar.vue";
import { ref } from "vue";

const allVocs: { [key: string]: { words: string[] } } = JSON.parse(
    '{"Annotation":{"words":["Anmerkung","Kommentar","Vermerk"]},"Capability":{"words":["Fähigkeit","Möglichkeit","Potential","Ressource"]},"Evidence":{"words":["Beleg","Beweis","Hinweis","Nachweis"]},"Fun":{"words":["Spaß"]},"Hello":{"words":["Hallo"]},"Principal Component Analysis":{"words":["Hauptkomponentenanalyse"]},"Vapor":{"words":["Dampf","Dunst","Wahn",""]},"Victory":{"words":["Sieg","Triumph","Erfolg"]},"Vortex":{"words":["Wirbel","Strudel"]},"a posteriori":{"words":["aus Erfahrung","aus Wahrnehmung gewonnen"]},"a priori":{"words":["alleine durch denken gewonnen","von der Wahrnehmung unabhängig"]},"abandon":{"words":["verlassen","stehen lassen","abschaffen","aufgeben","preisgeben","still legen","sitzen lassen"]},"absent":{"words":["abwesend"]},"accuracy":{"words":["Genauigkeit","Exaktheit","Sorgfalt"]},"acquire":{"words":["aufnehmen","beschaffen","organisieren","erlangen","gewinnen"]},"adjacent":{"words":["angrenzend","benachbart","adjazent"]},"admire":{"words":["bewundern","verehren"]},"admit":{"words":["zugeben","einräumen","anerkennen"]},"adorable":{"words":["bezaubernd","liebenswert"]},"adventurous":{"words":["kühn","waghalsig","draufgängerisch","verwegen","experimentierfreudig"]},"aftermath":{"words":["Nachwirkung","Folge","Nachspiel"]},"agnostic":{"words":["skeptisch","agnostisch"]},"aimed":{"words":["gezielt","bezweckt"]},"ample":{"words":["reichlich","genügend","hinreichend",""]},"amply":{"words":["reichlich","üppig","großzügig","umfänglich"]},"ancient":{"words":["antik","historisch"]},"anodyne":{"words":["beruhigend","schmerzstillend","nichtssagend"]},"anticipation":{"words":["Erwartung","Vorahnung","Vorgreifen"]},"anxiety":{"words":["Angst","Sorge","Unruhe","Furcht"]},"appreciate":{"words":["würdigen","schätzen","annerkennen"]},"appropiately":{"words":["angemessen","passend","geeignet","sachgerecht"]},"aptitude":{"words":["Begabug","Fährigkeit","Talent","Geschick","Neigung"]},"arbitrary":{"words":["beliebig","zufällig","eigenwillig"]},"arbitrate":{"words":["vermitteln","schlichten"]},"ascribe":{"words":["zurückführen","zuweisen","zuschreiben","unterstellen"]},"askew":{"words":["schief","schräg","quer","verrutscht"]},"assert":{"words":["behaupten","versichern",""]},"astonish":{"words":["erstaunen","überraschen"]},"attach":{"words":["anhängen","anschließen","befestigen"]},"backlog":{"words":["Überhang","Rückstau","Rückstand","Nachholbedarf"]},"bald":{"words":["kahl","glatzköpfig","karg","armselig","bedürftig"]},"ball of wool":{"words":["Wollknäul"]},"blearily":{"words":["trüb"]},"blight":{"words":["vernichten","verderben","zerstören"]},"boast":{"words":["prahlen","angeben"]},"brittleness":{"words":["Brüchigkeit","Sprödigkeit","Zerbrechlichkeit"]},"callousness":{"words":["Gefühlslosigkeit"]},"canonical":{"words":["anerkannt","autorisiert","vorschriftsmäßig"]},"caveat":{"words":["Vorbehalt","Einspruch","Warnung","Mahnung"]},"chamfer":{"words":["Fase","Schräge"]},"cohesion":{"words":["Zusammenhang","Zusammenhalt","Bindekraft"]},"compounds":{"words":["Verbindungen","Zusammensetzung"]},"concise":{"words":["gedrängt","kurz (gefasst)","präzise"]},"conduct":{"words":["durchführen","leiten","betreiben"]},"congestion":{"words":["Überlastung","Andrang","Stau",""]},"consensus":{"words":["Konsens","Einigkeit","Übereinstimmung"]},"consolidation":{"words":["Zusammenlegung","Vertiefung","Fusion","Verdichtung"]},"continuous":{"words":["kontinulierlich","stetig","fortlaufend","endlos"]},"continuousely":{"words":["kontinuierlich","stetig","dauernd","ununterbrochen"]},"convenient":{"words":["praktisch","bequem","passend","vorteilhaft"]},"cursed":{"words":["verflucht","scheusslich"]},"decouple":{"words":["entkoppeln"]},"degoratory":{"words":["abwertend"]},"denote":{"words":["bezeichnen","symbolosieren","markieren"]},"depict":{"words":["schildern","beschreiben","abbilden","verbindlichen"]},"deploy":{"words":["installieren","verteilen","anwenden"]},"derivation":{"words":["Abweichung","Ableitung","Herkunft","Herleitung"]},"detach":{"words":["lösen","abtrennen"]},"digest":{"words":["Auswahl","Kurzfassung","Hashwert"]},"disambigulation":{"words":["Begriffserklärung","Vereindeutlichung"]},"distinguish":{"words":["unterscheiden"]},"diurnal":{"words":["täglich"]},"docile":{"words":["sanftmütig","fügsam","widerstandslos"]},"done":{"words":["fertig"]},"due":{"words":["fällig","passend","nötig","gebührend"]},"eager":{"words":["eifrig","ungeduldig","gespannt","erwartungsvoll"]},"edifying":{"words":["belehrend"]},"elaborate":{"words":["durchdacht","aufwendig","kompliziert","kunstvoll"]},"enforce":{"words":["durchsetzen","erzwingen","vollstrecken"]},"envitable":{"words":["vermeidbar"]},"epoch":{"words":["Epoche","Zeitraum","Abschnitt"]},"eradicated":{"words":["ausradiert","ausgerottet","eliminiert"]},"error-prone":{"words":["fehleranfällig"]},"evict":{"words":["zwangsräumen"]},"exacerbate":{"words":["verschlimmer","erschweren","verschärfen","verärgern"]},"exaggeration":{"words":["Übertreibung","Überzeichnung","Überspitzung"]},"finicky":{"words":["etepetete","pingelich","zimperlich","pedantisch","wählerisch"]},"flaky":{"words":["unzuverlässig","exzentrisch","flockig"]},"foam":{"words":["Schaum","Schaumstoff","(auf-/über-) schäumen"]},"friction":{"words":["Reibung"]},"frontier":{"words":["Grenze","Grenzgebiet","Landesgrenze"]},"gamut":{"words":["Skala","Bandbreite","Spektrum"]},"gathering":{"words":["Ansammlung","Versammlung","Erfassung"]},"gentle":{"words":["zart","sanft","behutsam","mild","leise","mäßig","sanftmütig","gemächlich"]},"grok":{"words":["verstehen","begreifen"]},"harassed":{"words":["belästigt"]},"hard hat":{"words":["Schutzhelm"]},"hearse":{"words":["Leichenwagen"]},"heatsink":{"words":["Kühlkörper"]},"hit":{"words":["Treffer","treffen","schlagen"]},"hollow":{"words":["dumpf","leer","hohl","bedeutungslos"]},"hostile":{"words":["ablehnend","feindselig",""]},"howl":{"words":["heulen","jaulen","brüllen"]},"humble":{"words":["bescheiden","demütig","einfach"]},"hyperhearse":{"words":["Intergalaktischer Leichenwagen"]},"i.e.":{"words":["d.h.","sprich"]},"idle":{"words":["inaktiv","faul","nutzlos","unproduktiv"]},"impedance":{"words":["Impedanz","hemmen","hindern"]},"ingress":{"words":["Zugang","Eintritt"]},"intertwinded":{"words":["verflochten","miteinander verknüpft"]},"intimidate":{"words":["einschüchtern","bedrohen"]},"intrusive":{"words":["aufdringlich","störend"]},"item":{"words":["Gegenstand","Element","Sache","Artikel"]},"jolt":{"words":["der Schock","Ruck","schütteln","anstoßen"]},"judiciously":{"words":["vernünftig","umsichtig"]},"labor":{"words":["abmühen","hart arbeiten"]},"lack":{"words":["Mangeln","fehlen","benötigen"]},"lament":{"words":["beklagen","jammern","lamentieren","Trübsahl blasen"]},"latter":{"words":["letzte","jünger","letztgenannt"]},"least":{"words":["kleinste","geringste"]},"linger":{"words":["verweilen","trödeln","lungern","nachklingen","fortbestehen"]},"lol":{"words":["räkeln"]},"lurch":{"words":["taumeln","torkeln"]},"madness":{"words":["Wahnsinn","Verrücktheit"]},"magnitude":{"words":["Ausmaß","Betrag","Größenordnung","Stärke","Menge","Umfang"]},"marvel":{"words":["staunen","wundern"]},"matter":{"words":["bedeuten","Bedeutung","Anliegen","Sache","Materie"]},"mercurial":{"words":["lebhaft","launisch","wechselhaft"]},"mercy":{"words":["Gnade","Mitleid"]},"misbegotten":{"words":["scheußlich","unehelich","schlecht konzipiert"]},"mismatch":{"words":["Diskrepanz","nicht zusammenpassen"]},"mitigate":{"words":["entschärfen","lindern","abschwächen"]},"moot":{"words":["irrelevant","hypothetisch"]},"moreover":{"words":["außerdem","ferner","des weiteren"]},"morning dew":{"words":["Morgentau"]},"narrow":{"words":["knapp","eingeschränkt"]},"negligible":{"words":["vernachlässigbar","unwesentlich"]},"nitpick":{"words":["Spitzfindigkeit","herummäkeln","kleinlich kritisieren"]},"nod":{"words":["nicken","zunicken","schlafen"]},"notorious":{"words":["berüchtigt","verrufen"]},"observability":{"words":["Beobachtbarkeit"]},"octophorpe":{"words":["Rautenzeichen"]},"odds":{"words":["Chancen","Wahrscheinlichkeit","Gewinnchancen"]},"on purpose":{"words":["absichtlich"]},"opacity":{"words":["Undurchsichtigkeit"]},"outskirts":{"words":["Stadtrand","Randgebiet","Vorort"]},"palm":{"words":["belasten","Palme","Handfläche","Sieg"]},"parcel":{"words":["teilweise","halb","parzellieren","Paket","Haufen","Stück"]},"patient":{"words":["geduldig","Patient"]},"percolation":{"words":["Filter","Versickerung","Durchfluss","Perkolation"]},"piggyback":{"words":["huckepack"]},"pitfall":{"words":["Falle","Stolperfalle","Schwierigkeit"]},"plummet":{"words":["abstürzen","fallen","sinken","ungebremmst fallen"]},"pose":{"words":["posieren","(Fragen) aufwerfen","darlegen","darstellen"]},"prelude":{"words":["Auftakt","Einleitung","Vorspiel"]},"promiscuous":{"words":["leichtfertig","wahllos"]},"propagate":{"words":["propagieren","ausbreiten","fortpflanzen","werben"]},"propose":{"words":["vorschlagen","anregen","beabsichtigen"]},"proposition":{"words":["Angebot","Vorhaben","anmachen","Behauptung","These","Absicht"]},"prudent":{"words":["vernünftig","umsichtig","diskret"]},"quagmire":{"words":["Zwickmühle","Sumpf"]},"questionnaire":{"words":["Fragebogen","Umfrage"]},"quiesce":{"words":["stillegen"]},"ransom":{"words":["freikaufen","erlösen","gegen Lösegeld freilassen","Lösegeld","Erlösung"]},"rapidity":{"words":["Schnelligkeit"]},"reap":{"words":["ernten","erlangen","einheimsen"]},"reasoning":{"words":["Gedankengang","Argumentation","Schlussfolgerung"]},"rehearse":{"words":["proben","einstudieren","einüben"]},"rejoice":{"words":["jubeln","glücklich sein","sich freuen"]},"relentlessly":{"words":["unermüdlich","gnadenlos"]},"resilience":{"words":["Stabilität","Belastbarkeit","Widerstandskraft"]},"retroactively":{"words":["rückwirkend"," nachträglich"]},"righteousness":{"words":["Rechtschaffenheit","Gerechtigkeit"]},"scarcity":{"words":["Knappheit","Mangel","Verknappung","Seltenheit"]},"scattering":{"words":["Streuung","verstreuend","ausseinandertreibend"]},"sentinel":{"words":["Wache","Wachposten","Markierung"]},"serendipitous":{"words":["glücklicherweise","zufällig entdeckt"]},"severe":{"words":["ernst","heftig","streng","hart","akut","massiv","bitter","scharf","schwerwiegend","empfindlich"]},"shard":{"words":["Scherbe","Splitter","Bruchstück"]},"shortage":{"words":["Mangel","Knappheit","Engpass","Unterversorgung"]},"shrug":{"words":["mit den Achseln zucken",""]},"sickening":{"words":["abscheulich","eckelerregend"]},"sickeningly":{"words":["widerlich","unerträglich","Ekel erregend"]},"sieve":{"words":["(aus-) sieben"]},"skew":{"words":["schief","schräg","verzerren","verdrehen","umdrehen"]},"slay":{"words":["erschlagen","umbringen","erledigen"]},"snoop":{"words":["herumschnüffeln"]},"soluble":{"words":["löslich (alcohol-soluble = alkohollöslich)"]},"sophisticated":{"words":["durchdacht","ausgeklügelt","anspruchsvoll","ausgefeilt","komplex"]},"sovereignty":{"words":["Souveränität","Eigenständigkeit"]},"spatial":{"words":["räumlich"]},"specular":{"words":["spiegelnd"]},"spur":{"words":["anspornen","beflügeln","anstacheln"]},"squint":{"words":["schielen","blinzeln"]},"stale":{"words":["abgelaufen","verdorben","abgestanden","fad","schal"]},"stall":{"words":["verzögern","hinhalten","abwürgen","steckenbleiben"]},"standardised":{"words":["standardisiert","genormt"]},"stare":{"words":["starren","glotzen","gaffen"]},"stash":{"words":["verbergen","bunkern"]},"stomp":{"words":["stampfen"]},"strafe":{"words":["beharken","bombadieren"]},"sturdy":{"words":["stabil","robust","kräftig","unbeugsam"]},"subsequent":{"words":["nachfolgend","anschließend"]},"sufficient":{"words":["ausreichend","hinreichend","genügend"]},"supplement":{"words":["ergänzen","Nachtrag","Zusatz"]},"surrogate":{"words":["Ersatz","stellvertretend","nicht vollwertig"]},"sway":{"words":["schwanken","torkeln","schaukeln","überreden","beeinflussen"]},"swivel":{"words":["schwenken","drehen","Drehgelenk","Wirbel (von Wirbelsäule)"]},"tangling":{"words":["verwirrrend"]},"tax deductible":{"words":["Von der Steuer absetzbar"]},"tension":{"words":["Spannung","spannen","beanspruchen"]},"testy":{"words":["gereizt","reizbar"]},"tether":{"words":["anbinden","anketten"]},"though":{"words":["obwohl","jedoch","aber"]},"tradeoff":{"words":["Kompromiss"]},"trait":{"words":["Eigenschaft","Merkmal","Wesenszug"]},"transition":{"words":["Übergang","Umstellung","Wende"]},"treacherous":{"words":["heimtückisch","trügerisch"]},"unbound":{"words":["entfesselt","ungebunden"]},"upfront":{"words":["direkt","geradeheraus"]},"utilize":{"words":["anwenden","(aus-) nutzen","verwerten"]},"vagueness":{"words":["Unklarheit","Unbestimmtheit","Vagheit","Verschwommen"]},"verbose":{"words":["quasseln"]},"violation":{"words":["Verstoß","Missmachtung"]},"virtue":{"words":["Tugend","Wirkung","Vorteil","Kraft","Wirksamkeit","Eigenschaft"]},"vivid":{"words":["lebhaft","strahlend","klar","blühend"]},"vocabulary":{"words":["Wortschatz"]},"volatile":{"words":["flüchtig","schankend","wechselhaft","vergänglich"]},"weird":{"words":["schräg","sonderbar","verschroben"]},"whatsoever":{"words":["was auch immer","jeglicher Art"]},"wheeze":{"words":["keuchen"]},"wiped":{"words":["abgewischt","gewischt"]},"woe":{"words":["Leid","Kummer","Sorge"]},"yank":{"words":["herausziehen"]}}',
);
let displayedVocs = ref(Object.entries(allVocs));
// await (
//     await fetch("https://verbose.raphaelpour.de/api/v1/words")
// ).json();

function filterVocs(input: string) {
    if (input === "") {
        displayedVocs.value = Object.entries(allVocs);
        return;
    }

    displayedVocs.value = [];
    for (const [key, value] of Object.entries(allVocs)) {
        const letterPool = input.replace(" ", "");
        if (
            containsLetters(key, letterPool) ||
            value.words.some((val) => containsLetters(val, letterPool))
        ) {
            displayedVocs.value.push([key, value]);
        }
    }
}

function containsLetters(word: string, letters: string): boolean {
    for (const char of letters) {
        if (!word.includes(char)) return false;
        word = word.replace(char, "");
    }
    return true;
}
</script>

<style>
tr {
    @apply odd:bg-gray-200;
}
th,
td {
    @apply border-b-2 border-black pt-2 pb-2 pl-2 md:pr-3 lg:pr-10;
}
</style>
