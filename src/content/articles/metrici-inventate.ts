import type { Article } from "./types";

export const metriciInventate: Article = {
  slug: "metrici-inventate",
  publishedAt: "2026-02-20",
  readTime: { ro: "22 min", en: "22 min" },
  tag: "protectie",
  translations: {
    ro: {
      title: "ROI eficient, amplificare influencer si alte cuvinte pe care agentia le inventeaza ca sa pari prost",
      hook: "Mi-a scris un fondator din Cluj cu un raport in mana. Am oprit la pagina doi. Nici o cifra verificabila. Toate inventate.",
      metaTitle: "Metrici inventate de agentii. Cum le prinzi imediat.",
      metaDescription: "Ce sunt metricile inventate, de ce le folosesc agentiile slabe, cum le recunosti in 30 de secunde. Cu exemple reale din rapoarte primite de clienti.",
      blocks: [
        {
          type: "p",
          text: "Mi-a scris acum sase saptamani un antreprenor din Cluj. Voia o a doua opinie pe raportul primit de la agentia lui. L-am deschis, m-am oprit la a doua pagina. Scria acolo: 'ROI total 4.2', 'amplificare influencer 340.000', 'sentiment score 91', 'reach calibrat'. Nimic. Absolut nicio cifra pe care sa o poti verifica tu, deschizand Ads Manager. Toate inventate. Toate puse acolo sa te faca sa crezi ca se intampla ceva.",
        },
        {
          type: "p",
          text: "I-am zis direct. Nu e doar agentia ta. E un pattern care traverseaza intreaga industrie de marketing din Romania si nu numai. Agentiile slabe inventeaza metrici pentru ca metricii reali ii fac sa arate prost. Si in loc sa-si repare treaba, isi schimba unitatile de masura. E ca si cum ai conduce un Mercedes pe kilometraj stricat si in loc sa-l repari, ai zice 'nu conteaza kilometrajul, conteaza cat de bine te simti la volan'. Pana la urma nu mai stii cat ai mers, cat combustibil ai consumat si daca mai ajungi la destinatie.",
        },
        {
          type: "p",
          text: "In acest articol o sa-ti arat exact ce metrici inventati vad cel mai des, de unde vin, cum functioneaza mecanismul de inselare si ce sa faci cand prinzi unul. Nu e vorba sa devii paranoic. E vorba sa stii cand ti se vinde fum si cand ti se vinde profit. Diferenta e de milioane de lei pe an pentru un business de marime medie.",
        },
        { type: "h2", text: "Exista vreo 12 metrici reali. Atat." },
        {
          type: "p",
          text: "Toata industria de ads se invarte pe aceleasi 12 metrici standardizati. Le stii, le calculeaza toate platformele la fel, le poti deschide singur. Restul e zgomot. Nu e parerea mea. E arhitectura platformelor. Meta Ads Manager are aceleasi coloane de la Bucuresti pana la San Francisco. Google Ads foloseste aceleasi definitii in toate conturile. Cand cineva iti prezinta un metric care nu exista in aceste interfete, nu a descoperit el ceva nou. A inventat ceva fals.",
        },
        {
          type: "ul",
          items: [
            "CPM, cat costa 1.000 de impresii",
            "CPC, cat costa un click",
            "CTR, procent de click-uri din impresii",
            "CPA, cat costa o achizitie",
            "CAC, cat costa un client nou",
            "LTV, cat iti aduce un client pe durata relatiei",
            "ROAS, de cate ori iti intorci banii din ads",
            "POAS, profitul ramas dupa toate costurile variabile, raportat la bugetul de ads",
            "AOV, valoarea medie a unei comenzi",
            "Conversion rate, procentul de vizitatori care cumpara",
            "Frequency, de cate ori vede acelasi om reclama",
            "Reach, cati oameni unici au vazut reclama",
          ],
        },
        {
          type: "p",
          text: "Daca in raport iti apar cuvinte in afara listei asteia, deschide ochii. Nu e obligatoriu frauda. Uneori e doar lene. Dar amandoua te costa. Lenea e mai periculoasa decat frauda pentru ca e mai greu de prins. Un escroc stie ca minte si se pregateste. Un lenes doar copiaza ce a vazut la altii si crede ca e ok. Si tu platesti pentru ambele.",
        },
        { type: "h2", text: "Top 5 inventii pe care le vad in fiecare luna" },
        { type: "h3", text: "1. ROI total sau ROI eficient" },
        {
          type: "p",
          text: "ROI-ul se calculeaza intr-un singur fel. (Profit minus investitie) impartit la investitie. Atat. Nu exista 'total', nu exista 'eficient', nu exista 'ajustat'. Cand cineva iti spune 'ROI total', a amestecat reach, impresii, engagement si poate doua achizitii reale, intr-o formula pe care a inventat-o saptamana trecuta. Am vazut un raport in care 'ROI total' includea valoarea estimata a 'expunerii brandului' calculata astfel: reach inmultit cu un 'coeficient de impact' inventat de agentie. Coeficientul era 0.003. De ce 0.003? 'Pentru ca asa am stabilit noi.' Cere formula scrisa. Pe hartie. Daca explicatia dureaza cinci minute si tot nu intelegi, metrica e inventata. Un ROI real se calculeaza in 10 secunde si se intelege de un copil de 12 ani.",
        },
        { type: "h3", text: "2. Amplificare influencer" },
        {
          type: "p",
          text: "Au rugat un tip cu 20.000 de followeri sa dea un share la un post. 20.000 plus cei 1.000 care au vazut postul original, au bagat 21.000 'amplificare' in raport. Realitatea e diferita. Un share pe Instagram ajunge la 3-8% din audienta celui care da share. Deci vreo 600-1.600 de oameni. Si dintre aia, jumatate au scroll-uit peste. Un sfert nici nu stiu ce e in post. Nu iti vand oameni. Iti vand cifre pe hartie. Am vazut rapoarte in care 'amplificarea influencer' valora mai mult decat bugetul de ads platit. Matematic imposibil, dar estetic impresionant. Si asta conteaza pentru un fondator care nu are timp sa verifice.",
        },
        { type: "h3", text: "3. Sentiment score" },
        {
          type: "p",
          text: "Un algoritm numara 'haha' si inimioare din comentarii si scoate '85% pozitiv'. Pentru un brand cu 50 de mentiuni pe luna, e statistic inutil. Pentru unul cu 500, e tot aproximativ. Rareori iti spune ceva util, dar arata foarte bine in PDF. De-aia il baga. Am vazut un 'sentiment score' de 94% pentru un brand care avea, in aceeasi luna, 12 review-uri de 1 stea pe Google. Algoritmul nu citea review-urile. Numara emoji-uri. Nu iti spun ca sentiment analysis nu are valoare. Iti spun ca 'sentiment score' prezentat ca metric principal de succes e o gluma. E ca si cum ai masura sanatatea unei companii dupa cat de mult zambesc angajatii in pozele de pe LinkedIn.",
        },
        { type: "h3", text: "4. Reach calibrat" },
        {
          type: "p",
          text: "Nu exista. Meta iti da Reach. Google iti da Reach. Punct. 'Calibrat' e un cuvant lipit la coada ca sa sune sofisticat. Intreaba-i ce formula folosesc. Garantat primesti 20 de secunde de tacere, apoi o improvizaie. Nu exista formula, fiindca nu exista metrica. Am vazut un raport in care 'reach calibrat' era reach normal inmultit cu 1.4 'pentru ca am ajustat pentru calitatea audientei'. Cine a decis ca audienta are calitate de 1.4? 'Noi, pe baza experientei.' Experienta nu e formula. Experienta e scuza pentru lipsa formulei.",
        },
        { type: "h3", text: "5. Engagement calitativ" },
        {
          type: "p",
          text: "Engagement-ul se masoara. Likes, comments, shares, saves. Cifre. Daca ai 30 de likes pe post in loc de 300, cuvantul 'calitativ' e parasuta. Inseamna 'avem putine, dar ne prefacem ca valoreaza mai mult'. Nu valoreaza. Un like de la un potential client valoreaza exact cat un like de la un bot daca bot-ul nu cumpara. Am vazut agentii care prezentau 'engagement calitativ' bazat pe 'profundimea comentariilor'. Adica daca cineva scrie un comentariu de 50 de cuvinte, valoreaza mai mult decat unul de 5 cuvinte. Cine a stabilit asta? Nimeni. E o masuratoare inventata ca sa ascunda faptul ca engagement-ul real e mic.",
        },
        {
          type: "callout",
          tone: "red",
          title: "Ce intrebi cand prinzi o metrica ciudata",
          text: "Intrebare simpla: 'Care e formula, linie cu linie, si in ce interfata deschid eu singur cifra asta?' Daca raspunsul nu incape in trei propozitii, metrica e inventata. Nu te multumi cu 'ti-o trimit pe mail'. Raspunde acum sau nu raspunde deloc.",
        },
        { type: "h2", text: "Cum functioneaza fabrica de metrici inventati" },
        {
          type: "p",
          text: "Nu e doar o problema de agentii rele. E o problema de structura de incentivare. Majoritatea agentiilor din Romania lucreaza pe retainer. Adica tu le platesti o suma fixa pe luna, indiferent de rezultate. Cand rezultatele nu vin, agentia are doua optiuni. Ori recunoaste ca nu livreaza si risti sa pleci. Ori inventezi metrici care arata bine si speri ca nu stii sa ii verifici. Ghici care optiune e aleasa de 80% din agentii.",
        },
        {
          type: "p",
          text: "Am stat de vorba cu un fost manager de agentie care mi-a explicat mecanismul. 'Fiecare luna in care nu atingem KPI real, trebuie sa gasim altceva de pus in raport. Reach, engagement, sentiment, awareness, consideration. Orice in afara de profit. Pentru ca profitul nu e acolo.' Asta e realitatea pe care multi fondatori nu o vad. Nu pentru ca sunt prosti. Pentru ca sunt ocupati. Si agentia stie asta. Stie ca tu nu ai 4 ore pe saptamana sa deschizi Ads Manager si sa verifici. Stie ca tu citesti raportul in 5 minute inainte de sedinta. Si atunci iti da un raport care arata bine in 5 minute.",
        },
        {
          type: "p",
          text: "Problema e ca tu platesti pentru ore de munca, nu pentru PDF-uri frumoase. Un raport de 20 de pagini cu grafice colorate si metrici inventati costa mai mult timp de produs decat un raport de 2 pagini cu POAS, ROAS, CAC si doua decizii clare. Si totusi, primul arata mai 'profesionist'. Asa ca multi fondatori aleg agentii care produc rapoarte groase in loc de agentii care produc profit. E o greseala pe care o fac sute de oameni in fiecare luna.",
        },
        { type: "h2", text: "Patru intrebari care demonteaza orice raport" },
        {
          type: "ol",
          items: [
            "Imi arati pe ecran, acum, cifra asta in Meta Ads Manager sau Google Ads?",
            "Care e formula exacta pe care o folosesti aici?",
            "Ce metrica standard se apropie cel mai mult de ce-mi prezinti?",
            "Daca imi dai datele brute, pot sa calculez eu singur si sa ajung la aceeasi cifra?",
          ],
        },
        {
          type: "p",
          text: "Un raport onest trece testul fara probleme. Unul umflat se dezumfla pe prima intrebare. Am aplicat aceste patru intrebari la un raport primit de la o agentie mare din Bucuresti. Pe intrebarea 1, am aflat ca 'ROI eficient' nu exista in nicio interfata. Pe intrebarea 2, mi-au trimis o formula de doua pagini care includea 7 variabile nedefinite. Pe intrebarea 3, au recunoscut ca 'e aproape de ROAS, dar nu exact'. Pe intrebarea 4, mi-au zis ca 'datele brute sunt confidentiale'. Patru intrebari, patru esecuri. Acel raport valora zero. Clientul platea 4.000 de euro pe luna pentru el.",
        },
        { type: "h2", text: "Cum arata un raport sanatos" },
        {
          type: "p",
          text: "Nu are cuvinte pe care trebuie sa le traduci. Are metrici standard, comparate saptamana asta cu cea dinainte. Langa cifre sunt doua-trei decizii clare: campania X o urcam cu 30%, campania Y o taiem maine, creative-urile A si B le bagam in test. Atat. Restul e scriitura de umplere. Un raport sanatos nu are nevoie de 20 de pagini. Are nevoie de 2 pagini cu cifre adevarate si decizii clare.",
        },
        {
          type: "p",
          text: "Rapoartele pe care le trimitem noi sunt maxim 3 pagini. Pagina 1: POAS per campanie, per produs, per saptamana. Pagina 2: ce-am decis saptamana trecuta, ce-am invatat, ce schimbam saptamana viitoare. Pagina 3: intrebari pentru client, blocaje, decizii care asteapta input. Un fondator poate citi totul in 4 minute si stie exact unde e business-ul. Nu are nevoie de un dicționar. Nu are nevoie de explicatii de 5 paragrafe despre 'ecosistemul digital'. Are nevoie de numere si decizii.",
        },
        {
          type: "callout",
          tone: "lime",
          title: "Testul de 30 de secunde",
          text: "Deschizi raportul. Gasesti POAS, ROAS, CPA, CAC, Conversion rate. Daca nu le gasesti pe ele, ci alte cuvinte noi, inchide raportul si cere-l rescris. Nu e treaba ta sa descifrezi. E treaba agentiei sa iti arate profit intr-o limba pe care o vorbesc toate platformele.",
        },
        {
          type: "p",
          text: "La final, un avertisment. Nu toate agentiile care folosesc metrici inventati sunt escroci. Uneori sunt doar neinformate. Am vazut agentii mici care preluau de la agentii mari acest obicei pentru ca asa credeau ca 'se face'. Problema e ca tu, fondatorul, nu poti sa stii care e care. De aceea, regula e simpla: daca nu poti verifica cifra in 2 minute, cifra nu exista. Nu conteaza intentia agentiei. Conteaza ce poti masura.",
        },
        {
          type: "p",
          text: "Si inca ceva. Modelul pe comision rezolva o parte din problema. Daca agentia ta ia procent din profit, nu are niciun interes sa te amageasca cu 'sentiment score'. Vrea sa vada bani reali in cont, pentru ca de acolo ia si ea. De-aia noi lucrăm doar pe comision. Nu pentru ca suntem sfinti. Pentru ca matematic nu are sens sa inventezi metrici cand platesti facturile din procentul de profit real.",
        },
        {
          type: "h2",
          text: "Ce faci azi, concret",
        },
        {
          type: "ol",
          items: [
            "Deschide ultimul raport de la agentia ta.",
            "Cauta POAS, ROAS, CPA, CAC, Conversion rate.",
            "Daca gasesti alte cuvinte noi, pune intrebarea: 'Care e formula si unde o verific?'",
            "Daca agentia nu poate raspunde in 3 propozitii, e inventata.",
          ],
        },
        {
          type: "p",
          text: "Daca vrei sa verifici daca rapoartele agentiei tale sunt reale sau inventate, aplica pentru un audit gratuit de 30 de minute. Analizam impreuna ultimul raport, verificam fiecare cifra, si iti spunem daca e reala sau praf in ochi. Fara cost. Fara obligatie. Doar adevarul pe cifre.",
        },
      ],
    },
    en: {
      title: "Efficient ROI, influencer amplification and other words agencies invent to make you look stupid",
      hook: "A founder from Cluj sent me a report. I stopped on page two. Zero verifiable numbers. All invented.",
      metaTitle: "Invented agency metrics. How to catch them instantly.",
      metaDescription: "What invented metrics are, why weak agencies use them, how to spot them in 30 seconds. Real examples from reports clients brought us.",
      blocks: [
        {
          type: "p",
          text: "Six weeks ago a founder from Cluj wrote me. Wanted a second opinion on the report his agency had just sent. I opened the PDF, stopped on page two. It said: 'Total ROI 4.2', 'influencer amplification 340,000', 'sentiment score 91', 'calibrated reach'. Not one number you could verify yourself by opening Ads Manager. All invented. All placed there to make you feel something is happening.",
        },
        {
          type: "p",
          text: "I told him straight. It's not just your agency. It's a pattern that runs through the entire marketing industry in Romania and beyond. Weak agencies invent metrics because real metrics make them look bad. And instead of fixing their work, they change their units of measurement. It's like driving a Mercedes with a broken odometer and instead of fixing it, saying 'the odometer doesn't matter, what matters is how you feel behind the wheel'. Eventually you don't know how far you've driven, how much fuel you've burned, or if you'll reach your destination.",
        },
        {
          type: "p",
          text: "In this article I'll show you exactly which invented metrics I see most often, where they come from, how the deception mechanism works, and what to do when you catch one. It's not about becoming paranoid. It's about knowing when you're being sold smoke and when you're being sold profit. The difference is millions of lei per year for a mid-sized business.",
        },
        { type: "h2", text: "There are about 12 real metrics. That's it." },
        {
          type: "p",
          text: "The entire ads industry runs on the same 12 standardized metrics. You know them, every platform calculates them the same way, you can open them yourself. Everything else is noise. That's not my opinion. It's platform architecture. Meta Ads Manager has the same columns from Bucharest to San Francisco. Google Ads uses the same definitions in every account. When someone presents you with a metric that doesn't exist in these interfaces, they haven't discovered something new. They've invented something false.",
        },
        {
          type: "ul",
          items: [
            "CPM, cost per 1,000 impressions",
            "CPC, cost per click",
            "CTR, click share out of impressions",
            "CPA, cost per acquisition",
            "CAC, cost to acquire a new customer",
            "LTV, what a customer brings over the full relationship",
            "ROAS, revenue returned per dollar of ad spend",
            "POAS, profit left after all variable costs, divided by ad spend",
            "AOV, average order value",
            "Conversion rate, percent of visitors who buy",
            "Frequency, how many times the same person sees the ad",
            "Reach, unique people who saw the ad",
          ],
        },
        {
          type: "p",
          text: "If words outside that list show up in the report, wake up. It's not always fraud. Sometimes it's just laziness. Both cost you money. Laziness is more dangerous than fraud because it's harder to catch. A scammer knows they're lying and prepares. A lazy person just copies what they saw elsewhere and thinks it's fine. And you pay for both.",
        },
        { type: "h2", text: "Top 5 inventions I see every month" },
        { type: "h3", text: "1. Total ROI or Efficient ROI" },
        {
          type: "p",
          text: "ROI has one formula. (Profit minus investment) divided by investment. That's all there is to it. There's no 'total', no 'efficient', no 'adjusted'. When someone says 'total ROI', they mixed reach, impressions, engagement, and maybe two real purchases into a formula they made up last week. I saw a report where 'total ROI' included an estimated 'brand exposure value' calculated as: reach multiplied by an 'impact coefficient' invented by the agency. The coefficient was 0.003. Why 0.003? 'Because that's what we decided.' Ask for the formula in writing. On paper. If the explanation takes five minutes and you still don't get it, the metric is made up. Real ROI calculates in 10 seconds and a 12-year-old can understand it.",
        },
        { type: "h3", text: "2. Influencer amplification" },
        {
          type: "p",
          text: "They paid someone with 20,000 followers to share a post. Added 20,000 plus the 1,000 who saw the original post, called it 'amplification 21,000'. Reality is different. A share on Instagram reaches 3-8% of the sharer's audience. About 600-1,600 people. And of those, half scrolled past. A quarter don't even know what's in the post. They're not selling you people. They're selling you numbers on paper. I've seen reports where 'influencer amplification' was worth more than the paid ad budget. Mathematically impossible, but aesthetically impressive. And that's what matters to a founder who doesn't have time to verify.",
        },
        { type: "h3", text: "3. Sentiment score" },
        {
          type: "p",
          text: "An algorithm counts 'haha' and hearts in comments and spits out '85% positive'. For a brand with 50 mentions a month, it's statistically useless. For one with 500, still rough. Rarely tells you anything actionable, but looks great in a PDF. That's why it goes in. I saw a 'sentiment score' of 94% for a brand that had, in the same month, 12 one-star reviews on Google. The algorithm didn't read the reviews. It counted emojis. I'm not saying sentiment analysis has no value. I'm saying 'sentiment score' presented as a primary success metric is a joke. It's like measuring a company's health by how much employees smile in LinkedIn photos.",
        },
        { type: "h3", text: "4. Calibrated reach" },
        {
          type: "p",
          text: "Doesn't exist. Meta gives you Reach. Google gives you Reach. That's it. 'Calibrated' is a word glued on to sound fancy. Ask for the formula. You'll get 20 seconds of silence, then improvisation. There's no formula because there's no metric. I saw a report where 'calibrated reach' was normal reach multiplied by 1.4 'because we adjusted for audience quality'. Who decided the audience has 1.4 quality? 'We did, based on experience.' Experience isn't a formula. Experience is the excuse for lacking a formula.",
        },
        { type: "h3", text: "5. Qualitative engagement" },
        {
          type: "p",
          text: "Engagement is measurable. Likes, comments, shares, saves. Numbers. When you have 30 likes per post instead of 300, the word 'qualitative' is the parachute. It means 'we have little but we pretend it's worth more'. It's not. A like from a potential buyer is worth exactly what a bot's like is worth if the bot doesn't buy. I've seen agencies present 'qualitative engagement' based on 'comment depth'. Meaning if someone writes a 50-word comment, it counts more than a 5-word one. Who established that? Nobody. It's an invented measurement to hide the fact that real engagement is low.",
        },
        {
          type: "callout",
          tone: "red",
          title: "What to ask when you catch a weird metric",
          text: "Simple question: 'What's the formula, line by line, and in which interface can I open this number myself?' If the answer doesn't fit in three sentences, the metric is invented. Don't accept 'I'll send it over email'. Answer now or not at all.",
        },
        { type: "h2", text: "How the invented metric factory works" },
        {
          type: "p",
          text: "It's not just a problem of bad agencies. It's a problem of incentive structure. Most agencies in Romania work on retainer. Meaning you pay them a fixed sum per month regardless of results. When results don't come, the agency has two options. Either admit they're not delivering and risk you leaving. Or invent metrics that look good and hope you don't know how to verify them. Guess which option 80% of agencies choose.",
        },
        {
          type: "p",
          text: "I spoke with a former agency manager who explained the mechanism to me. 'Every month we don't hit the real KPI, we have to find something else to put in the report. Reach, engagement, sentiment, awareness, consideration. Anything except profit. Because profit isn't there.' That's the reality many founders don't see. Not because they're stupid. Because they're busy. And the agency knows this. They know you don't have 4 hours a week to open Ads Manager and verify. They know you read the report in 5 minutes before the meeting. So they give you a report that looks good in 5 minutes.",
        },
        {
          type: "p",
          text: "The problem is you pay for hours of work, not for pretty PDFs. A 20-page report with colorful charts and invented metrics takes more time to produce than a 2-page report with POAS, ROAS, CAC, and two clear decisions. And yet the first looks more 'professional'. So many founders choose agencies that produce thick reports over agencies that produce profit. It's a mistake hundreds of people make every month.",
        },
        { type: "h2", text: "Four questions that dismantle any report" },
        {
          type: "ol",
          items: [
            "Show me this number on screen, right now, in Meta Ads Manager or Google Ads.",
            "What's the exact formula you use here?",
            "Which standard metric comes closest to this?",
            "If you give me the raw data, can I calculate it myself and land on the same number?",
          ],
        },
        {
          type: "p",
          text: "An honest report passes the test without flinching. A padded one collapses on the first question. I applied these four questions to a report from a large Bucharest agency. On question 1, I found out 'efficient ROI' doesn't exist in any interface. On question 2, they sent me a two-page formula with 7 undefined variables. On question 3, they admitted it's 'close to ROAS but not exactly'. On question 4, they said 'raw data is confidential'. Four questions, four failures. That report was worth zero. The client paid 4,000 euros a month for it.",
        },
        { type: "h2", text: "What a healthy report looks like" },
        {
          type: "p",
          text: "It has no words you need to translate. It has standard metrics, this week against last. Next to the numbers, two or three clear decisions: scale campaign X by 30%, kill campaign Y tomorrow, push creatives A and B into test. That's it. The rest is filler. A healthy report doesn't need 20 pages. It needs 2 pages with true numbers and clear decisions.",
        },
        {
          type: "p",
          text: "The reports we send are maximum 3 pages. Page 1: POAS per campaign, per product, per week. Page 2: what we decided last week, what we learned, what we change next week. Page 3: questions for the client, blockers, decisions waiting for input. A founder can read everything in 4 minutes and knows exactly where the business stands. No dictionary needed. No 5-paragraph explanations about the 'digital ecosystem'. Just numbers and decisions.",
        },
        {
          type: "callout",
          tone: "lime",
          title: "The 30-second test",
          text: "Open the report. Find POAS, ROAS, CPA, CAC, Conversion rate. If those aren't there but new words are, close the report and ask for a rewrite. It's not your job to decipher. It's the agency's job to show you profit in a language every platform speaks.",
        },
        {
          type: "p",
          text: "Finally, a warning. Not all agencies that use invented metrics are scammers. Sometimes they're just uninformed. I've seen small agencies that picked up this habit from larger agencies because they thought that's 'how it's done'. The problem is you, the founder, can't know which is which. That's why the rule is simple: if you can't verify the number in 2 minutes, the number doesn't exist. It doesn't matter what the agency intended. What matters is what you can measure.",
        },
        {
          type: "p",
          text: "And one more thing. Commission-based model solves part of the problem. If your agency takes a percentage of profit, they have zero interest in deceiving you with 'sentiment score'. They want to see real money in the account, because that's where they take their cut from. That's why we only work on commission. Not because we're saints. Because mathematically it makes no sense to invent metrics when you pay your bills from a percentage of real profit.",
        },
        {
          type: "h2",
          text: "What you do today, concretely",
        },
        {
          type: "ol",
          items: [
            "Open the last report from your agency.",
            "Look for POAS, ROAS, CPA, CAC, Conversion rate.",
            "If you find new words, ask: 'What's the formula and where do I verify it?'",
            "If the agency can't answer in 3 sentences, it's invented.",
          ],
        },
        {
          type: "p",
          text: "If you want to check whether your agency's reports are real or invented, apply for a free 30-minute audit. We'll analyze the last report together, verify each number, and tell you if it's real or smoke. No cost. No obligation. Just truth on numbers.",
        },
      ],
    },
  },
};
