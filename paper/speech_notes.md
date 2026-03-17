# AI Academic Navigator -- Poznámky k prezentaci
## ESCP Business School, Paris, 17. března 2026
## Session B1: AI-Powered Assessment & Feedback

---

### Slide 1: Title Slide

Dobré dopoledne, děkuji za pozvání. Jmenuji se Jan Saro, jsem z České zemědělské univerzity v Praze, z Fakulty ekonomiky a managementu. Dnes vám představím projekt AI Academic Navigator -- platformu, která využívá GPT-4 k tomu, aby studentům pomohla lépe porozumět svým kognitivním schopnostem a stylům učení.

---

### Slide 2: Outline

Začneme motivací -- proč jsme vůbec tento projekt začali. Pak se podíváme na to, jaké psychologické nástroje používáme, jak vypadá architektura systému, ukážeme si platformu v praxi, a na závěr zmíním budoucí směřování.

---

### Slide 3: Socrates -- "Know Thyself"

Než se pustíme do technických detailů, dovolte mi začít jedním z nejstarších pedagogických principů. "Gnothi seauton" -- "Poznej sebe sama." Sokrates věřil, že sebepoznání je základem veškerého učení. A přesně to je mise, kterou se snažíme naplnit -- jen místo filozofického dialogu na agoře používáme GPT-4 a validované psychologické nástroje. Cíl zůstává stejný: pomoci studentům, aby porozuměli sami sobě a díky tomu se učili efektivněji.

---

### Slide 4: Advantages of LLM & GPT Models

Proč právě velké jazykové modely? Proč GPT-4? Výzkum ukazuje tři klíčové schopnosti, které jsou pro náš projekt zásadní.

Za prvé -- syntéza napříč různými zdroji. GPT-4 dokáže vzít výsledky ze sedmi různých testů a vytvořit z nich jeden koherentní profil studenta. To je něco, co by lidský poradce dělal hodiny.

Za druhé -- srozumitelné vysvětlení komplexních výsledků. Studie z JAMA Network ukázala, že pacienti hodnotili AI-generované lékařské zprávy jako srozumitelnější než ty napsané lékaři. Stejný princip aplikujeme na výsledky psychometrických testů.

Za třetí -- personalizovaná zpětná vazba. Výzkum Kasneci a kolegů ukázal, že vysvětlení výsledků generovaná LLM modely dosáhla kvality srovnatelné s expertními tutory a zlepšila sebeřízené učení studentů.

V naší platformě kombinujeme všechny tři tyto schopnosti dohromady.

---

### Slide 5: Status Quo of Current Assessment Systems

Pojďme se podívat na současný stav. Tradiční psychometrické testy mají několik zásadních problémů. Zpětná vazba přichází se zpožděním dnů nebo i týdnů. Interpretace je generická, stejná pro všechny. Výsledky z různých testů zůstávají izolované -- nikdo je nespojí dohromady. A míra dokončení? Kolem padesáti procent. Studenti to vnímají jako byrokratické cvičení.

Naše vize je jiná. Okamžitá zpětná vazba generovaná AI. Personalizovaná interpretace přes GPT-4. Integrovaný multidimenzionální profil. Zapojující konverzační rozhraní. A celé to stojí na architektuře, která respektuje soukromí -- data zůstávají na zařízení studenta.

Klíčový vhled je tento: AI nenahrazuje validované nástroje. AI je vylepšuje.

---

### Slide 6: Seven Validated Psychological Instruments

Platforma integruje sedm validovaných psychologických nástrojů. Máme dva výkonové kognitivní testy -- Stroopův test, který měří selektivní pozornost a kognitivní flexibilitu přes dvacet čtyři pokusů, a test mentální rotace založený na práci Sheparda a Metzlera, který měří prostorovou vizualizaci v šestnácti pokusech se třemi úrovněmi obtížnosti.

Pak je tu pět sebehodnotících dotazníků: VAK pro preferenci učebního stylu, Grit Scale pro vytrvalost a vášeň, Growth Mindset pro přesvědčení o tvárnosti inteligence, RIASEC pro kariérní zájmy, a emoční inteligence.

Každý nástroj má svůj teoretický základ a desetiletí validačního výzkumu. My tyto osvědčené nástroje neměníme -- přidáváme k nim AI vrstvu pro interpretaci a syntézu.

---

### Slide 7: Architecture -- Privacy-First Design

Architektura je navržena s důrazem na soukromí. Celý frontend běží v prohlížeči -- React 19 s TypeScriptem. Veškerá data studentů se ukládají lokálně v localStorage, nikdy neopouštějí zařízení studenta. To je zásadní pro GDPR compliance.

Na GPT-4 API posíláme pouze anonymizované prompty s výsledky testů. Z cloudu se vrací tři klíčové výstupy: AI syntéza, která propojí výsledky všech testů, AI coach s personalizovaným studijním plánem, a AI interview -- konverzační rozhovor, který jde za hranice strukturovaných testů.

Celý stack je moderní: React 19, TypeScript, Tailwind CSS, Vite, a bilingvální rozhraní v češtině a angličtině.

---

### Slide 8: Assessment Dashboard

Takhle vypadá hlavní dashboard. Studenti vidí všechny dostupné testy v přehledném kartovém layoutu. Každá karta ukazuje název testu, odhadovaný čas dokončení, a stav -- jestli je test dokončený nebo ne.

Důležité je, že studenti mohou testy absolvovat v libovolném pořadí. Nemusí procházet celou baterií najednou. Mohou se vrátit a dokončit zbývající testy později. Rozhraní je dostupné v češtině i angličtině, což je klíčové pro naše mezinárodní studenty.

---

### Slide 9: AI Conversational Interview

Tohle je jedna z nejzajímavějších funkcí. Kromě strukturovaných testů nabízíme konverzační interview poháněný GPT-4. AI vede přirozený rozhovor o zájmech studenta, studijních návycích a kariérních cílech.

AI přizpůsobuje otázky na základě předchozích odpovědí. Výsledkem je takzvaný "Student Passport" -- komplexní zpráva, která zachycuje kvalitativní dimenze, ke kterým se strukturovanými testy nedostanete.

A to je ta klíčová inovace: konverzační AI dokáže prozkoumat to, co tradiční psychometrika nedokáže.

---

### Slide 10: AI Synthesis & Recommendations

Po dokončení testů GPT-4 syntetizuje všechny výsledky do jednoho koherentního profilu. Na tomto screenshotu vidíte, jak to vypadá v praxi.

AI identifikuje styl myšlení studenta, preferovanou modalitu učení, úroveň mindsetové orientace, klíčové silné stránky a oblasti pro rozvoj. Navíc generuje konkrétní studijní tipy a doporučuje relevantní vzdělávací videa.

Toto je ta přidaná hodnota AI -- žádný jednotlivý test by tenhle celkový obraz neposkytl.

---

### Slide 11: AI Coaching Module

Koučovací modul transformuje výsledky hodnocení do konkrétních akčních plánů. Každý student dostane personalizovaný týdenní rozvrh, který reflektuje jeho kognitivní profil.

Například student s vizuální preferencí a growth mindsetem dostane doporučení: v pondělí vytvořit myšlenkové mapy, v úterý sledovat video tutoriály. Každá aktivita je propojena se specifickými výsledky z testů.

Celkem jsme vygenerovali osmdesát devět unikátních studijních plánů -- každý odráží individuální profil a cíle konkrétního studenta.

---

### Slide 12: Student Journey

Tady vidíte celou cestu studenta platformou. Začíná uvítací obrazovkou, pokračuje na dashboard, kde si vybere testy. Po absolvování testů vidí výsledky, a odtud může přejít k AI syntéze a AI koučovi.

Důležitý je ten přerušovaný šipka zpět -- student se může kdykoliv vrátit na dashboard a absolvovat další testy. Celý proces je rozdělený do tří fází: hodnocení validovanými nástroji, AI analýza s cross-modulovou syntézou, a akce -- personalizovaný studijní plán s trackingem návyků.

---

### Slide 13: Future Directions

Kam směřujeme dál? V první řadě chceme longitudinální sledování -- propojit vstupní hodnocení s akademickými výsledky a validovat tak, jestli AI doporučení skutečně fungují.

Velmi zajímavá je integrace s wearables -- propojení s chytrými hodinkami pro měření HRV a stresu, což by přidalo fyziologickou dimenzi ke kognitivnímu profilu.

A samozřejmě multijazyčnost pro mezinárodní nasazení.

Z výzkumného pohledu nás čeká validace kvality AI doporučení, měření dopadu na retenci studentů, srovnání s lidskými poradci, a vývoj etického rámce pro AI-mediované hodnocení.

Závěrem chci zdůraznit jednu myšlenku: budoucnost AI ve vzdělávání nespočívá v nahrazování, ale v augmentaci. V tom, abychom studentům pomohli lépe se poznat a najít efektivnější cesty k učení.

---

### Slide 14: Thank You

Děkuji za pozornost. Neváhejte mě kontaktovat -- ať už přes email nebo přes LinkedIn, QR kód je tady na slidu. Rád zodpovím vaše dotazy.
