import type { Article } from "./types";

export const roasVsPoas: Article = {
  slug: "roas-vs-poas",
  publishedAt: "2026-01-22",
  readTime: { ro: "16 min", en: "16 min" },
  tag: "fundamente",
  translations: {
    ro: {
      title: "ROAS vs POAS: cum aceeasi campanie te poate imbogati sau falimenta",
      hook: "Doua campanii cu acelasi ROAS. Una iti aduce profit, cealalta iti mananca firma. Un exemplu pe cifre, ca sa nu mai intri pe ghicit la sedinta de luni.",
      metaTitle: "ROAS vs POAS. Diferenta care iti schimba businessul",
      metaDescription:
        "Comparam ROAS cu POAS pe doua campanii reale. Aceleasi vanzari, aceleasi reclame, profit complet diferit. Cu formule si decizii concrete.",
      blocks: [
        {
          type: "p",
          text: "Am intrat intr-un cont de e-commerce unde fondatorul avea sedinta saptamanala cu vechea agentie. 'Totul e ok, ROAS 3.2x, cel mai bun din sase luni.' Sase luni mai tarziu era pe minus. ROAS-ul crescuse. Businessul se rupsese. E povestea pe care o auzi de patru-cinci ori in viata de antreprenor, si de fiecare data iti pare noua. Nu vrei sa fi pacalit din nou.",
        },
        {
          type: "p",
          text: "Hai pe cifre. O sa vezi exact unde se rupe logica, si de ce ROAS-ul singur nu-ti spune niciodata daca iei o decizie buna. Pentru ca nu e menit sa faca asta. ROAS-ul e o masuratoare de volum, nu de profit. Confuzia intre cele doua te costa scump.",
        },
        {
          type: "h2",
          text: "Scenariu. Doua campanii, acelasi ROAS.",
        },
        {
          type: "p",
          text: "Magazin online cu doua categorii. Trotinete electrice cu marja neta 35%. Accesorii, casti si incarcatoare, cu marja neta 8%. Agentia raporteaza separat. ROAS 3x pe amandoua. Pe raport, identice.",
        },
        {
          type: "table",
          headers: ["", "Campanie trotinete", "Campanie accesorii"],
          rows: [
            ["Buget pe luna", "EUR5.000", "EUR5.000"],
            ["Revenue", "EUR15.000", "EUR15.000"],
            ["ROAS", "3.0x", "3.0x"],
            ["Marja neta", "35%", "8%"],
            ["Profit brut", "EUR5.250", "EUR1.200"],
            ["POAS", "1.05x", "0.24x"],
            ["Profit final", "+EUR250", "-EUR3.800"],
          ],
        },
        {
          type: "p",
          text: "Campania de accesorii scoate 3.800 de euro din firma in fiecare luna. Dar raportul zice 'ROAS 3x, performanta buna'. Daca agentia scaleaza accesoriile de la 5.000 la 15.000 buget (si ar numi-o 'ROAS-based scaling'), pierderea ajunge la 11.400 pe luna. Cu sedinte saptamanale pline de dat din cap.",
        },
        {
          type: "p",
          text: "Ti-o zic pe fata: am vazut exact scenariul asta. Nu o data. Agentia raporteaza ROAS agregat. 3x. Frumos. Patronul e multumit. La bilant, dupa sase luni, descopera ca jumatate din buget a mers in campanii care pierdeau bani. Dar nimeni nu i-a spus pentru ca nimeni nu a calculat POAS pe campanie. Si de-aia, cand semnezi cu o agentie, primul lucru pe care trebuie sa-l ceri e sa vezi POAS separat pe fiecare campanie, nu ROAS agregat.",
        },
        {
          type: "h2",
          text: "Ce se schimba cand te uiti la POAS",
        },
        {
          type: "p",
          text: "Daca metrica de decizie era POAS, conversatia din acea sedinta arata complet diferit.",
        },
        {
          type: "ul",
          items: [
            "Trotinete, POAS 1.05. Break-even curat. Nu mareti bugetul, lucrati pe creative si pe optimizarea CPM-ului, ca sa muti POAS-ul spre 1.4 inainte sa scalezi.",
            "Accesorii, POAS 0.24. Hemoragie evidenta. Ori opresti campania pe loc, ori urci pretul cu 20% si vezi elasticitatea, ori cauti alt furnizor cu cost mai mic. Dar nu scalezi nimic pana nu se schimba una dintre ele.",
          ],
        },
        {
          type: "p",
          text: "Asta e diferenta fundamentala. ROAS-ul iti zice: 'am vandut.' POAS-ul iti zice: 'am castigat sau am pierdut.' In business, doar a doua intrebare conteaza. Prima e interesanta pentru rapoarte. A doua e esentiala pentru supravietuire.",
        },
        {
          type: "callout",
          tone: "red",
          title: "Unde se rupe totul",
          text: "Agentia care se uita doar la ROAS optimizeaza pentru vanzari brute. Vanzarile brute nu sunt inamicul. Inamicul e vanzarea pe care platesti mai mult decat castigi. ROAS-ul nu face diferenta dintre ele. POAS-ul o face. Si de-aia, daca agentia ta nu iti arata POAS, nu are cum sa optimizeze pentru ce conteaza.",
        },
        {
          type: "h2",
          text: "Cum arata deciziile cand ai POAS-ul in fata",
        },
        {
          type: "p",
          text: "Cu ROAS-ul, deciziile suna simplu dar periculos. Scalezi ce e mare, tai ce e mic. Cu POAS-ul, apar nuante care te salveaza de greseli.",
        },
        {
          type: "ol",
          items: [
            "POAS intre 1.5 si 2.5, scalezi. Urci bugetul cu 20% pe saptamana si urmaresti daca POAS-ul tine. Daca scade sub 1.5, opresti. Daca tine, continui.",
            "POAS intre 1.0 si 1.5, mentii. Iterezi pe creative si audiente, nu cresti bugetul. Lucrezi pe eficienta. Testezi noi unghiuri, noi mesaje, noi landing pages.",
            "POAS intre 0.8 si 1.0, verifici. Daca aduce clienti cu LTV mare si recumpara, poate merita tinut. Dar temporar. Si cu un plan clar de a urca spre 1.0 in 60 de zile.",
            "POAS sub 0.8, opresti campania si faci analiza separata. Nu e loc de discutii. Nu exista 'hai sa mai testam o saptamana.' Opresti.",
          ],
        },
        {
          type: "p",
          text: "Asta e ce facem noi la fiecare sedinta saptamanala cu clientii. Deschidem un spreadsheet. Coloane: campanie, buget, revenue, marja neta pe produs dominant, POAS. Sortam descrescator dupa POAS. Prima jumatate a listei primeste mai mult buget. A doua jumatate primeste analiza. Ultimul sfert primeste stop. Nu e complicat. E doar matematica pe care multi o evita pentru ca rezultatele nu sunt intotdeauna placute.",
        },
        {
          type: "h2",
          text: "Ce faci cand marja variaza de la produs la produs",
        },
        {
          type: "p",
          text: "La majoritatea magazinelor, marja nu e un numar. E un spectru. Si de-aia trebuie sa calculezi POAS la nivel de campanie, nu pe tot contul. Meta Ads Manager nu-ti face asta. Nici GA4. E treaba manuala.",
        },
        {
          type: "p",
          text: "Practic, e un Google Sheet. Coloane: campanie, revenue, produs dominant, marja neta pe produs, buget. Formula simpla pe fiecare rand, POAS = (revenue x marja) : buget. 20 de minute pe luna. Singurele 20 de minute care conteaza. Restul raportarii e decor.",
        },
        {
          type: "p",
          text: "Stai putin, o sa-mi zici: 'dar eu am 50 de produse in aceeasi campanie.' OK. Atunci faci media ponderata a marjelor pe produsele care au generat 80% din revenue in campania aia. Regula Pareto. Nu trebuie sa calculezi fiecare produs. Doar cele care conteaza.",
        },
        {
          type: "h2",
          text: "Cazul real: cum am salvat un cont de la hemoragie cu POAS",
        },
        {
          type: "p",
          text: "Client din Bucuresti, produse pentru casa, 40 de SKU-uri. Agentia veche raporta ROAS 3.2x agregat. Clientul fericit. Pana cand a venit la noi pentru un al doilea opinie. Am intrat in cont. Am facut spreadsheet-ul.",
        },
        {
          type: "p",
          text: "Rezultatul: 4 campanii din 8 aveau POAS sub 0.5. Una singura avea POAS 2.1. Restul erau intre 0.3 si 0.9. ROAS-ul agregat de 3.2x ascundea faptul ca 60% din buget pleca in campanii care pierdeau bani. Agentia nu stia. Sau stia si nu i-a zis.",
        },
        {
          type: "p",
          text: "Am oprit 4 campanii. Am redistribuit bugetul catre cele 2 cu POAS peste 1.0. Am taiat 12 produse din campanii pentru ca aveau marja sub 10%. In 45 de zile, revenue-ul total a scazut cu 15%. Dar profitul a urcat cu 180%. De la pierdere la castig. Acelasi buget. Doar alocat inteligent.",
        },
        {
          type: "table",
          headers: ["Indicator", "Inainte", "Dupa 45 zile"],
          rows: [
            ["Campanii active", "8", "4"],
            ["ROAS agregat", "3.2x", "2.8x"],
            ["POAS mediu", "0.7x", "1.6x"],
            ["Revenue total", "100%", "85%"],
            ["Profit dupa ads", "Pierdere", "+180%"],
          ],
        },
        {
          type: "callout",
          tone: "red",
          title: "Lectia pe care o uita toata lumea",
          text: "Mai mult revenue nu inseamna mai mult profit. Am redus revenue-ul cu 15% si am dublat profitul. Agentia care se uita doar la revenue si ROAS nu poate sa ia decizia asta. Doar POAS-ul iti permite sa scazi vanzarile ca sa cresti profitul. Si asta e, de multe ori, decizia corecta.",
        },
        {
          type: "h2",
          text: "Cand ROAS-ul chiar e util",
        },
        {
          type: "p",
          text: "N-o sa-ti spun ca ROAS-ul e inutil. Nu e. Are rolul lui, si inca unul important. Trebuie doar sa stii unde il folosesti si unde te minte.",
        },
        {
          type: "ul",
          items: [
            "Benchmarking rapid. ROAS 2x vs 4x iti da o idee bruta de performanta relativa, fara sa sapi dupa marja. E util pentru o prima impresie, nu pentru decizii.",
            "Optimizare algoritmica. Meta si Google optimizeaza pe purchase value, nu pe POAS. ROAS-ul e semnalul pe care-l citesc ei. Tu il folosesti sa vezi daca algoritmul merge in directia buna, nu daca tu faci profit.",
            "Raportare catre investitori sau parteneri care nu cunosc detaliile marjei. Aici scrii clar 'ROAS, nu POAS', ca sa nu creezi confuzie. Dar stii tu, in spate, ca POAS-ul e adevaratul verdict.",
          ],
        },
        {
          type: "p",
          text: "Problema incepe in momentul in care ROAS-ul devine singura metrica de decizie. Atunci incepi sa iei alegeri care arata bine pe PowerPoint si te sap in banca. Si asta e ceea ce fac 80% din agentii. Pentru ca e mai usor sa vinzi 'ROAS 4x' decat 'POAS 0.8x, dar avem un plan.'",
        },
        {
          type: "h2",
          text: "Testul de vineri seara",
        },
        {
          type: "p",
          text: "Ia cea mai mare campanie pe care o rulezi acum. Patru pasi, zece minute.",
        },
        {
          type: "ol",
          items: [
            "Cere marja neta pe produsul dominant. Nu 'estimativ', nu 'in jur de'. Cere un numar exact, calculat cu toate costurile variabile.",
            "Ia ROAS-ul pe ultima luna.",
            "Aplici formula. POAS = ROAS x marja neta.",
            "Daca rezultatul e peste 1, ai loc de scalat. Intre 0.8 si 1, optimizezi. Sub 0.8, ai o problema serioasa si trebuie adresata saptamana asta, nu luna viitoare.",
          ],
        },
        {
          type: "p",
          text: "Asta e tot. 10 minute care iti pot salva sute de mii de lei pe an. Si, pe bune, daca nu faci asta in fiecare saptamana, nu stii ce se intampla in contul tau. Stii doar ce-ti arata agentia. Si agentia are interesul sa-ti arate ce arata bine.",
        },
        {
          type: "callout",
          tone: "lime",
          title: "Diferenta practica",
          text: "ROAS-ul e cifra de pe raport. POAS-ul e cifra din cont. Daca le confunzi, businessul tau arata bine la sedinta si pierde bani in realitate. Agentiile cu care merita sa lucrezi raporteaza ambele, transparent, si optimizeaza pe POAS. Celelalte iti vand rapoarte frumoase pana te duci la banca si vezi golul.",
        },
      ],
    },
    en: {
      title: "ROAS vs POAS: how the same campaign can make you rich or bankrupt you",
      hook: "Two campaigns with the same ROAS. One feeds the company, the other eats it. Here's a walkthrough on real numbers, so you stop guessing at the Monday meeting.",
      metaTitle: "ROAS vs POAS. The difference that changes your business",
      metaDescription:
        "Comparing ROAS and POAS on two real campaigns. Same sales, same ads, completely different profit. With formulas and concrete decisions.",
      blocks: [
        {
          type: "p",
          text: "I walked into an e-commerce account where the founder had a weekly call with his old agency. 'All good, 3.2x ROAS, best in six months.' Six months later he was in the red. The ROAS had grown. The business had snapped. It's the kind of story you hear four or five times in your founder lifespan, and each time it feels new. You don't want to be fooled again.",
        },
        {
          type: "p",
          text: "Let's get into the numbers. You'll see exactly where the logic breaks, and why ROAS on its own will never tell you whether you're making a good call. Because it isn't meant to. ROAS is a volume metric, not a profit metric. Confusing the two costs you dearly.",
        },
        {
          type: "h2",
          text: "Scenario. Two campaigns, same ROAS.",
        },
        {
          type: "p",
          text: "Online store with two categories. Electric scooters at 35% net margin. Accessories, helmets and chargers, at 8% net margin. Agency reports separately. 3x ROAS on both. On the report, identical.",
        },
        {
          type: "table",
          headers: ["", "Scooter campaign", "Accessories campaign"],
          rows: [
            ["Monthly budget", "EUR5,000", "EUR5,000"],
            ["Revenue", "EUR15,000", "EUR15,000"],
            ["ROAS", "3.0x", "3.0x"],
            ["Net margin", "35%", "8%"],
            ["Gross profit", "EUR5,250", "EUR1,200"],
            ["POAS", "1.05x", "0.24x"],
            ["Final profit", "+EUR250", "-EUR3,800"],
          ],
        },
        {
          type: "p",
          text: "The accessories campaign pulls EUR3,800 out of the company every month. But the report says '3x ROAS, good performance.' If the agency scales accessories from EUR5,000 to EUR15,000 (and calls it 'ROAS-based scaling'), the loss hits EUR11,400 a month. With weekly meetings full of nodding.",
        },
        {
          type: "p",
          text: "I'll tell you straight to your face: I've seen exactly this scenario. More than once. The agency reports aggregate ROAS. 3x. Beautiful. The owner is happy. At year-end, after six months, he discovers half the budget went into campaigns that lost money. But nobody told him because nobody calculated POAS per campaign. And that's why, when you sign with an agency, the first thing you must demand is to see POAS separately for each campaign, not aggregate ROAS.",
        },
        {
          type: "h2",
          text: "What changes once POAS is in the room",
        },
        {
          type: "p",
          text: "If POAS had been the decision metric, that meeting looked completely different.",
        },
        {
          type: "ul",
          items: [
            "Scooters, 1.05 POAS. Clean break-even. You don't raise budget, you work on creative and CPM optimization to push POAS toward 1.4 before scaling anything.",
            "Accessories, 0.24 POAS. Obvious hemorrhage. Either kill the campaign, raise price 20% and test elasticity, or find a cheaper supplier. But you don't scale anything until one of those moves.",
          ],
        },
        {
          type: "p",
          text: "That's the fundamental difference. ROAS tells you: 'I sold.' POAS tells you: 'I won or I lost.' In business, only the second question matters. The first is interesting for reports. The second is essential for survival.",
        },
        {
          type: "callout",
          tone: "red",
          title: "Where everything breaks",
          text: "An agency that looks only at ROAS optimizes for gross sales. Gross sales aren't the enemy. The enemy is the sale where you pay more than you earn. ROAS doesn't tell the difference. POAS does. And that's why, if your agency doesn't show you POAS, they can't optimize for what matters.",
        },
        {
          type: "h2",
          text: "What decisions look like with POAS in front of you",
        },
        {
          type: "p",
          text: "With ROAS, decisions sound simple but dangerous. Scale what's big, cut what's small. With POAS, you get nuance that saves you from mistakes.",
        },
        {
          type: "ol",
          items: [
            "POAS between 1.5 and 2.5, scale. Raise budget 20% a week and watch whether POAS holds. If it drops below 1.5, stop. If it holds, continue.",
            "POAS between 1.0 and 1.5, hold. Iterate on creative and audiences, don't raise budget. Work on efficiency. Test new angles, new messages, new landing pages.",
            "POAS between 0.8 and 1.0, verify. If it brings high-LTV customers who repurchase, maybe keep it. But temporarily. And with a clear plan to reach 1.0 within 60 days.",
            "POAS below 0.8, pause the campaign and do a separate analysis. No discussion. No 'let's test one more week.' You stop.",
          ],
        },
        {
          type: "p",
          text: "This is what we do at every weekly meeting with clients. We open a spreadsheet. Columns: campaign, budget, revenue, net margin on dominant product, POAS. Sort descending by POAS. The top half gets more budget. The bottom half gets analysis. The bottom quarter gets stopped. It's not complicated. It's just math that many avoid because the results aren't always pleasant.",
        },
        {
          type: "h2",
          text: "What to do when margin varies by product",
        },
        {
          type: "p",
          text: "In most stores, margin isn't a number. It's a spectrum. That's exactly why you have to calculate POAS at the campaign level, not across the whole account. Meta Ads Manager won't do it for you. GA4 won't either. It's manual work.",
        },
        {
          type: "p",
          text: "Practically, it's a Google Sheet. Columns: campaign, revenue, dominant product, product net margin, budget. One formula per row, POAS = (revenue x margin) : budget. Twenty minutes a month. The only twenty minutes that actually matter. The rest of reporting is decor.",
        },
        {
          type: "p",
          text: "Wait, you'll tell me: 'but I have 50 products in the same campaign.' OK. Then you do a weighted average of margins on the products that generated 80% of revenue in that campaign. Pareto's rule. You don't need to calculate every product. Just the ones that matter.",
        },
        {
          type: "h2",
          text: "Real case: how I saved an account from hemorrhage with POAS",
        },
        {
          type: "p",
          text: "Client from Bucharest, home products, 40 SKUs. The old agency reported 3.2x aggregate ROAS. Happy client. Until he came to us for a second opinion. I went into the account. Made the spreadsheet.",
        },
        {
          type: "p",
          text: "Result: 4 out of 8 campaigns had POAS below 0.5. Only one had 2.1 POAS. The rest were between 0.3 and 0.9. The aggregate 3.2x ROAS hid the fact that 60% of budget went into campaigns that lost money. The agency didn't know. Or knew and didn't tell him.",
        },
        {
          type: "p",
          text: "We stopped 4 campaigns. Redistributed budget to the 2 with POAS above 1.0. Cut 12 products from campaigns because their margin was below 10%. In 45 days, total revenue dropped 15%. But profit climbed 180%. From loss to gain. Same budget. Just allocated intelligently.",
        },
        {
          type: "table",
          headers: ["Metric", "Before", "After 45 days"],
          rows: [
            ["Active campaigns", "8", "4"],
            ["Aggregate ROAS", "3.2x", "2.8x"],
            ["Average POAS", "0.7x", "1.6x"],
            ["Total revenue", "100%", "85%"],
            ["Profit after ads", "Loss", "+180%"],
          ],
        },
        {
          type: "callout",
          tone: "red",
          title: "The lesson everyone forgets",
          text: "More revenue doesn't mean more profit. We reduced revenue by 15% and doubled profit. An agency that only looks at revenue and ROAS can't make this call. Only POAS allows you to decrease sales to increase profit. And that is, many times, the right decision.",
        },
        {
          type: "h2",
          text: "When ROAS is genuinely useful",
        },
        {
          type: "p",
          text: "I'm not going to tell you ROAS is useless. It isn't. It has its role, and an important one. You just need to know where to use it and where it lies.",
        },
        {
          type: "ul",
          items: [
            "Quick benchmarking. 2x versus 4x ROAS gives you a rough sense of relative performance without digging into margin. Useful for a first impression, not for decisions.",
            "Algorithmic optimization. Meta and Google optimize on purchase value, not on POAS. ROAS is the signal they read. You use it to see if the algorithm is heading in the right direction, not whether you're profitable.",
            "Reporting to investors or partners who don't know the margin details. Here you label it clearly as 'ROAS, not POAS', so you don't create confusion. But you know, behind the scenes, that POAS is the real verdict.",
          ],
        },
        {
          type: "p",
          text: "The trouble starts the moment ROAS becomes the only decision metric. That's when you start making choices that look good on PowerPoint and drain the bank account. And that's what 80% of agencies do. Because it's easier to sell '4x ROAS' than '0.8x POAS, but we have a plan.'",
        },
        {
          type: "h2",
          text: "The Friday-evening test",
        },
        {
          type: "p",
          text: "Take the biggest campaign you're running right now. Four steps, ten minutes.",
        },
        {
          type: "ol",
          items: [
            "Ask for net margin on the dominant product. No 'estimate', no 'around'. Ask for an exact number, calculated with every variable cost.",
            "Pull last month's ROAS.",
            "Apply the formula. POAS = ROAS x net margin.",
            "If the result is above 1, you have room to scale. Between 0.8 and 1, optimize. Below 0.8, you have a serious issue and it needs to be addressed this week, not next month.",
          ],
        },
        {
          type: "p",
          text: "That's it. 10 minutes that can save you hundreds of thousands of lei per year. And honestly, if you don't do this every week, you don't know what's happening in your account. You only know what the agency shows you. And the agency has an interest in showing you what looks good.",
        },
        {
          type: "callout",
          tone: "lime",
          title: "The practical difference",
          text: "ROAS is the number on the report. POAS is the number in the bank. Mix them up and your business looks good in the meeting and loses money in reality. Agencies worth working with report both, transparently, and optimize on POAS. The others sell you beautiful reports until you go to the bank and see the emptiness.",
        },
      ],
    },
  },
};
