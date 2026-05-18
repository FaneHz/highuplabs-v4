import type { Article } from "./types";

export const ceEstePoas: Article = {
  slug: "ce-este-poas",
  publishedAt: "2026-01-15",
  readTime: { ro: "15 min", en: "15 min" },
  tag: "fundamente",
  translations: {
    ro: {
      title: "POAS: singura cifra care-ti arata daca reclamele aduc bani reali in cont",
      hook: "ROAS-ul iti arata cat ai incasat. POAS-ul iti arata cat iti ramane in cont dupa ce platesti furnizorul, curierul si banca. Dintre cele doua, doar al doilea se plimba cu tine la restaurant.",
      metaTitle: "Ce este POAS? Profit on Ad Spend explicat simplu",
      metaDescription:
        "POAS (Profit on Ad Spend) e metrica pe care agentiile o ocolesc si antreprenorii ar trebui s-o ceara primi. Formula, exemple, praguri reale.",
      blocks: [
        {
          type: "p",
          text: "Cunosc un fondator din Arges, agentie de turism, care a pornit de la zero digital. In 12 luni a facut 1.700.657 lei revenue, 993 facturi, POAS 3.2x. Stie exact cat a castigat pe fiecare leu bagat in reclame. In acelasi timp, stiu un fondator din Bucuresti, produse pentru casa, care lucra cu o agentie pe ROAS 3.2x agregat. Rapoartele erau frumoase. Contul lui de firma nu urca. La bilant, descoperise ca jumatate din buget pleca in campanii care pierdeau bani.",
        },
        {
          type: "p",
          text: "De-aia exista POAS. Pentru ca ROAS-ul masoara cat ai incasat, nu cat ai castigat. Intre cele doua e tot ce conteaza. Si, stai putin, o sa-ti arat exact de ce asta nu e doar o chestie tehnica de contabil. E diferenta dintre a ramane in business si a falimenta elegant, cu rapoarte frumoase. Nu vrei sa fi pacalit din nou.",
        },
        {
          type: "h2",
          text: "Povestea reala: cum am intrat in contul unui fondator care voia sa se lase",
        },
        {
          type: "p",
          text: "Un tip din Bucuresti care vindea produse pentru casa mi-a scris pe LinkedIn. Mesajul a fost direct: 'Am lucrat sase luni cu o agentie, ROAS 3.2x, si am pierdut bani. Vreau sa ma las.' I-am zis sa nu se lase inca, sa-mi arate contul. Am intrat. Si am vazut ceva ce vad prea des.",
        },
        {
          type: "p",
          text: "Agentia raporta ROAS 3.2x. Adica pentru fiecare leu dat pe reclame, veneau 3.2 lei inapoi. Suna bine. Problema: produsele pe care le vindea aveau marja neta de 15%. Cost marfa mare, livrare scumpa, retururi frecvente. Deci din cei 3.2 lei, doar 0.48 lei erau profit. Scade leul dat pe reclame. Ramai cu minus 0.52 lei. Pe fiecare leu cheltuit.",
        },
        {
          type: "p",
          text: "Sase luni de asta. In fiecare saptamana, raport frumos. In fiecare luna, contul mai gol. Tipul nu stia asta pentru ca nimeni nu i-a aratat POAS-ul. Agentia stia. Sau, daca nu stia, era incompetenta. Daca stia si nu i-a zis, era ceva mai rau. In ambele cazuri, fondatorul a platit scump.",
        },
        {
          type: "h2",
          text: "Formula. Simplu.",
        },
        {
          type: "callout",
          tone: "lime",
          title: "POAS = (Revenue din ads x marja neta) : buget ads",
          text: "Adica: cati bani iti raman efectiv pentru fiecare leu dat pe reclame. Nu vanzarea bruta. Profitul net, dupa ce platesti tot ce se plateste.",
        },
        {
          type: "p",
          text: "ROAS-ul e fratele mai comod. Revenue impartit la buget ads. Nu-l intereseaza daca produsul pe care-l vinzi cu 50 de lei te costa 5 sau 48. El doar numara vanzarile. Si de-aia e periculos. Pentru ca iti da un numar care suna bine si care, in acelasi timp, te poate duce la faliment.",
        },
        {
          type: "h2",
          text: "De ce te minte ROAS-ul fara sa vrea",
        },
        {
          type: "p",
          text: "Iei doua magazine online. Amandoua cheltuie 10.000 de euro pe luna pe Meta. Amandoua incaseaza 40.000 de euro. ROAS 4x. Raport identic. Dar daca te uiti la POAS, descoperi doua povesti complet diferite.",
        },
        {
          type: "table",
          headers: ["", "Magazin A", "Magazin B"],
          rows: [
            ["Revenue din ads", "EUR40.000", "EUR40.000"],
            ["Buget ads", "EUR10.000", "EUR10.000"],
            ["ROAS", "4.0x", "4.0x"],
            ["Marja neta produs", "15%", "45%"],
            ["Profit brut dupa marja", "EUR6.000", "EUR18.000"],
            ["POAS real", "0.6x", "1.8x"],
            ["Profit dupa ads", "-EUR4.000", "+EUR8.000"],
          ],
        },
        {
          type: "p",
          text: "Magazinul A iese pe minus 4.000 in fiecare luna ca sa creasca vanzarile. Magazinul B face 8.000 profit curat. Acelasi ROAS. Alt film. Si asta e doar pe doua magazine. Imagineaza-ti ca esti fondatorul magazinului A si agentia ta te lauda in fiecare saptamana cu ROAS 4x. Te simti bine. Pana la bilant.",
        },
        {
          type: "h2",
          text: "Cum calculezi POAS pe businessul tau",
        },
        {
          type: "ol",
          items: [
            "Iei revenue-ul atribuit reclamelor pe ultima luna, direct din Meta Ads Manager sau GA4. Fara estimari. Fara 'cred ca mai venea ceva organic.' Doar ce spune platforma ca a adus.",
            "Calculezi marja neta pe produsul dominant. Pret de vanzare minus cost marfa, minus livrare, minus ambalaj, minus comision platforma, minus procesare plati. Impartit la pret. Asta e marja reala, nu cea din capul tau.",
            "Inmultesti revenue-ul cu marja. Asta e profitul brut pe care ti l-au adus reclamele, inainte sa scazi costul reclamelor.",
            "Imparti la bugetul de ads. Ce rezulta e POAS-ul. Peste 1, faci profit. Sub 1, pierzi.",
          ],
        },
        {
          type: "callout",
          tone: "ink",
          title: "Praguri cu care sa te orientezi",
          text: "POAS peste 1 inseamna ca reclamele iti aduc profit peste banii pusi in ele. Zona sanatoasa pentru e-commerce, 1.5-2.5x. Sub 1, pierzi bani ca sa cresti volumul. Peste 3, ori ai marja masiva pe un produs de nisa, ori ai calculat ceva gresit. Sau agentia iti da cifre vopsite.",
        },
        {
          type: "h2",
          text: "Cazul turismului din Arges: de ce POAS-ul ne-a salvat de o greseala mare",
        },
        {
          type: "p",
          text: "Clientul nostru din Arges, turism rural, a venit la noi cu un cont care rula deja. Agentia veche raporta ROAS 2.8x. Suna decent. Clientul era nemultumit pentru ca 'banii nu se aduna.' Am intrat in cont. Am facut calculul.",
        },
        {
          type: "p",
          text: "Revenue atribuit: 1.700.657 lei in 12 luni. 993 facturi. ROAS 2.8x. Dar marja neta pe pachetele de cazare era 22%. Costuri fixe mari, personal mult, sezon scurt. POAS-ul real la inceput: 0.62x. Adica pentru fiecare leu dat pe reclame, pierdeam 0.38 lei.",
        },
        {
          type: "p",
          text: "Am oprit campaniile pe loc. Nu am optimizat. Nu am testat alte audiente. Am oprit. Apoi am lucrat la oferta. Am restructurat pachetele. Am eliminat optiunile care consumau timp si nu aduceau profit. Am negociat cu furnizorii locali discount pe volum. Am crescut pretul pe weekend-uri cu 15%, testand elasticitatea. In trei luni, POAS-ul a urcat la 1.8x. Acelasi buget, acelasi numar de clienti aproximativ, dar acum fiecare client aducea profit. Acum, dupa 12 luni, POAS-ul e 3.2x si 85% din clienti se intorc din ads.",
        },
        {
          type: "table",
          headers: ["Indicator", "Inainte", "Dupa 3 luni", "Dupa 12 luni"],
          rows: [
            ["Revenue", "1.700.657 Lei", "1.450.000 Lei", "1.700.657 Lei"],
            ["Facturi", "993", "712", "993"],
            ["ROAS", "2.8x", "2.4x", "2.8x"],
            ["POAS", "0.62x", "1.8x", "3.2x"],
            ["Profit dupa ads", "Pierdere", "Profit", "Profit"],
          ],
        },
        {
          type: "p",
          text: "Observa ceva important. Revenue-ul initial a scazut. Numarul de facturi a scazut. ROAS-ul a scazut. Dar POAS-ul a urcat. Si businessul a trecut pe profit. Asta e diferenta dintre a optimiza pentru cifre frumoase si a optimiza pentru bani reali. Ti-o zic pe fata: mai bine 712 facturi profitabile decat 993 care te sap.",
        },
        {
          type: "h2",
          text: "Unde devine POAS-ul scuza pentru minciuna",
        },
        {
          type: "p",
          text: "Atentie aici. POAS-ul poate fi si el folosit ca praf in ochi. Daca o agentie iti zice 'POAS 3x' fara sa-ti arate foaia pe care a calculat marja, probabil a pus un procent rotund care suna bine. Marja trebuie sa fie neta de tot ce costa variabil. Nu bruta, nu optimista, nu rotunjita in sus.",
        },
        {
          type: "p",
          text: "Ce intra in costul variabil, fara exceptie:",
        },
        {
          type: "ul",
          items: [
            "Cost marfa. Pretul real la care ajunge produsul in depozitul tau, inclusiv transportul de la furnizor. Nu pretul din oferta. Pretul final, cu tot ce se adauga.",
            "Livrare la client. Daca oferi transport gratuit, costul tot iese din marja, nu dispare. Doar ca nu-l vezi separat. E acolo, ascuns.",
            "Ambalaj plus retururi estimate pe categoria respectiva. Daca 5% din produse se intorc, adaugi 5% la cost. Produsele returnate fie se strica, fie se vand in stoc secundar cu discount.",
            "Comision platforma, daca vinzi pe eMAG, Amazon, Allegro. Pe eMAG poti ajunge la 15-20%. Pe Amazon 12-15%. Asta e bani reali care pleaca din profit.",
            "Procesare plati. Stripe, PayU, comision bancar, toate la un loc. Intre 1.9% si 3% pe tranzactie. La 100.000 de euro vanzari, aia sunt 2.000-3.000 de euro pe care ii uiti daca nu le pui in calcul.",
          ],
        },
        {
          type: "p",
          text: "Daca sari peste vreuna, te minti singur. POAS-ul iese mai mare decat e. Peste cateva luni, la bilant, te intrebi unde s-au dus banii. S-au dus in costuri pe care nu le-ai socotit.",
        },
        {
          type: "callout",
          tone: "red",
          title: "Minciuna marjei rotunjite",
          text: "Daca agentia ta iti zice 'am estimat marja ta la 35%' si nu iti arata calculul cu fiecare cost inclus, nu accepta. Cere sa vada foaia. Daca nu o are, ori nu a muncit, ori stie ca marja reala e mai mica si nu vrea sa ti-o spuna. In ambele cazuri, e un semnal.",
        },
        {
          type: "h2",
          text: "POAS diferit de la campanie la campanie",
        },
        {
          type: "p",
          text: "In acelasi cont poti avea simultan o campanie cu POAS 2.5x pe cold audience cu produse scumpe si marja mare, si una cu POAS 0.4x pe retargeting pe accesorii ieftine. ROAS-ul le face media, iese un numar placut si rotund. POAS-ul le separa si-ti arata exact ce sa urci si ce sa opresti azi.",
        },
        {
          type: "p",
          text: "Iti dau un exemplu din contul clientului nostru din Sibiu, trotinete electrice. Campanie de cold traffic pe trotinete de 300-500 de lei, marja 40%, POAS 2.1x. In aceeasi luna, campanie de retargeting pe accesorii de 30-50 de lei, marja 12%, POAS 0.3x. ROAS-ul combinat: 2.4x. Suna bine. POAS-ul combinat: 0.85x. Pierzi bani. Daca nu le separi pe POAS, nu stii ca una dintre campanii te distruge.",
        },
        {
          type: "callout",
          tone: "red",
          title: "Observatie directa, din teren",
          text: "Am vazut prea multe conturi in care ROAS-ul agregat pe cont arata 3x si doua campanii individuale scoteau bani din firma in tacere. Daca nu-ti separi campaniile pe POAS, nu stii care te hraneste si care te sap.",
        },
        {
          type: "h2",
          text: "Ce faci cand POAS-ul e sub 1 dar vrei sa scalezi",
        },
        {
          type: "p",
          text: "Situatie comuna. POAS 0.8x. Pierzi bani, dar businessul creste. Ce faci? Depinde. Daca cresterea e sustenabila si aduce clienti care recumpara, poate merita sa pierzi pe prima vanzare ca sa castigi pe a doua si a treia. Asta se cheama investitie in LTV.",
        },
        {
          type: "p",
          text: "Dar atentie mare. Nu toate businessurile au LTV. Daca vinzi televizoare, clientul nu revine in 3 luni. Daca vinzi sampon, revine. Stai putin si calculeaza: cat valoreaza un client pe 12 luni? Daca LTV-ul acopera pierderea de pe prima vanzare, POAS sub 1 pe campania de acuzitie e acceptabil temporar. Daca nu, nu.",
        },
        {
          type: "table",
          headers: ["POAS", "Ce inseamna", "Ce decizie iei"],
          rows: [
            ["Peste 2.0x", "Profit sanatos", "Scalezi. Urci bugetul cu 20% pe saptamana."],
            ["1.5x - 2.0x", "Profit bun", "Scalezi moderat. Testezi audiente noi."],
            ["1.0x - 1.5x", "Break-even sau aproape", "Mentine. Optimizezi creative, nu buget."],
            ["0.8x - 1.0x", "Pierdere mica", "Analizezi. Daca LTV-ul acopera, tii. Daca nu, opresti."],
            ["Sub 0.8x", "Pierdere reala", "Opresti. Nu exista discutie."],
          ],
        },
        {
          type: "h2",
          text: "Rezumat scurt",
        },
        {
          type: "ul",
          items: [
            "ROAS. Vanzari brute impartite la buget ads. Cifra de pe raport. Frumoasa, incompleta, uneori periculoasa.",
            "POAS. Profit dupa marja impartit la buget ads. Cifra din cont. Urata cand e sub 1, singura care conteaza cand e peste.",
            "Doua campanii cu ROAS identic pot avea POAS-uri diametral opuse. Acelasi raport, alt film.",
            "Marja neta se calculeaza onest, cu toate costurile variabile incluse. Fara rotunjiri, fara optimism, fara scuze.",
            "Zona sanatoasa de POAS pe e-commerce: intre 1.5 si 2.5, sustenabil pe sase luni.",
          ],
        },
        {
          type: "callout",
          tone: "lime",
          title: "Ce faci azi, concret",
          text: "Deschide Meta Ads Manager. Ia revenue-ul pe ultima luna. Calculeaza marja neta onest, cu toate costurile variabile. Aplica formula. Daca POAS-ul iese sub 1, nu inseamna ca reclamele sunt proaste. Inseamna fie ca marja nu sustine scaling-ul, fie ca targetarea e pe audientele gresite. Amandoua se repara, dar trebuie sa stii care e problema. Si singurul mod sa stii e sa calculezi POAS-ul in fiecare saptamana.",
        },
      ],
    },
    en: {
      title: "POAS: the only number that tells you if your ads bring real money",
      hook: "ROAS tells you what you billed. POAS tells you what stays in your account after you pay the supplier, the courier, and the bank. Only one of them takes you to dinner.",
      metaTitle: "What is POAS? Profit on Ad Spend, explained simply",
      metaDescription:
        "POAS (Profit on Ad Spend) is the metric agencies avoid and founders should demand first. Formula, examples, honest thresholds.",
      blocks: [
        {
          type: "p",
          text: "I know a founder from Arges, a tourism agency, who started from zero digital. In 12 months he made RON1,700,657 in revenue, 993 invoices, POAS 3.2x. He knows exactly how much he earned per leu spent on ads. At the same time, I know a founder from Bucharest, home products, who worked with an agency on 3.2x aggregate ROAS. The reports looked clean. His business account never grew. At year-end, he discovered half the budget went into campaigns that lost money.",
        },
        {
          type: "p",
          text: "That's the reason POAS exists. Because ROAS measures what you billed, not what you kept. Everything important lives in the gap between the two. And wait, I'll show you exactly why this isn't just an accountant's technicality. It's the difference between staying in business and going bankrupt elegantly, with beautiful reports. You don't want to be fooled again.",
        },
        {
          type: "h2",
          text: "Real story: how I entered an account of a founder who wanted to quit",
        },
        {
          type: "p",
          text: "A guy from Bucharest who sold home products messaged me on LinkedIn. The message was direct: 'I worked six months with an agency, 3.2x ROAS, and I lost money. I want to quit.' I told him not to quit yet, show me the account. I went in. And I saw something I see too often.",
        },
        {
          type: "p",
          text: "The agency reported 3.2x ROAS. Meaning for every leu spent on ads, 3.2 lei came back. Sounds good. Problem: the products he sold had a net margin of 15%. High COGS, expensive shipping, frequent returns. So out of those 3.2 lei, only 0.48 lei was profit. Subtract the leu spent on ads. You're left with minus 0.52 lei. On every leu spent.",
        },
        {
          type: "p",
          text: "Six months of this. Every week, a beautiful report. Every month, a emptier account. The guy didn't know this because nobody showed him POAS. The agency knew. Or if they didn't, they were incompetent. If they knew and didn't tell him, it was something worse. In both cases, the founder paid dearly.",
        },
        {
          type: "h2",
          text: "The formula. Plain.",
        },
        {
          type: "callout",
          tone: "lime",
          title: "POAS = (Ad revenue x net margin) : ad spend",
          text: "How many euros you actually keep per euro spent on ads. Not gross sales. Net profit, after everything that has to be paid is paid.",
        },
        {
          type: "p",
          text: "ROAS is the easier cousin. Revenue divided by ad spend. It doesn't care whether the product you sell for EUR50 costs you EUR5 or EUR48. It only counts transactions. And that's why it's dangerous. Because it gives you a number that sounds good and that, at the same time, can lead you to bankruptcy.",
        },
        {
          type: "h2",
          text: "Why ROAS lies to you without meaning to",
        },
        {
          type: "p",
          text: "Take two online stores. Both spend EUR10,000 a month on Meta. Both bring in EUR40,000. ROAS 4x. Identical report. But if you look at POAS, you discover two completely different stories.",
        },
        {
          type: "table",
          headers: ["", "Store A", "Store B"],
          rows: [
            ["Ad revenue", "EUR40,000", "EUR40,000"],
            ["Ad spend", "EUR10,000", "EUR10,000"],
            ["ROAS", "4.0x", "4.0x"],
            ["Product net margin", "15%", "45%"],
            ["Gross profit after margin", "EUR6,000", "EUR18,000"],
            ["Real POAS", "0.6x", "1.8x"],
            ["Profit after ads", "-EUR4,000", "+EUR8,000"],
          ],
        },
        {
          type: "p",
          text: "Store A bleeds EUR4,000 every month to grow top-line. Store B banks EUR8,000 in clean profit. Same ROAS. Different movie. And this is just two stores. Imagine you're the founder of Store A and your agency praises you every week with 4x ROAS. You feel good. Until the balance sheet.",
        },
        {
          type: "h2",
          text: "How to calculate POAS on your business",
        },
        {
          type: "ol",
          items: [
            "Take the ad-attributed revenue for last month, straight from Meta Ads Manager or GA4. No estimates. No 'I think some organic came in too.' Only what the platform says it brought.",
            "Calculate net margin on your dominant product. Sale price minus cost of goods, shipping, packaging, platform fees, payment processing. Divided by sale price. That's the real margin, not the one in your head.",
            "Multiply revenue by margin. That's the gross profit your ads produced, before subtracting ad costs.",
            "Divide by ad spend. What comes out is POAS. Above 1, you're profitable. Below 1, you're losing.",
          ],
        },
        {
          type: "callout",
          tone: "ink",
          title: "Thresholds to orient yourself",
          text: "POAS above 1 means ads brought profit on top of what you spent on them. Healthy e-commerce zone, 1.5-2.5x. Below 1, you're paying to grow volume. Above 3, either you've got niche margins or something's off in the math. Or the agency is giving you painted numbers.",
        },
        {
          type: "h2",
          text: "The Arges tourism case: why POAS saved us from a big mistake",
        },
        {
          type: "p",
          text: "Our client from Arges, rural tourism, came to us with an account already running. The old agency reported 2.8x ROAS. Sounded decent. The client was unhappy because 'the money doesn't add up.' I went into the account. Did the math.",
        },
        {
          type: "p",
          text: "Attributed revenue: RON1,700,657 over 12 months. 993 invoices. ROAS 2.8x. But net margin on accommodation packages was 22%. High fixed costs, lots of staff, short season. Real POAS at the start: 0.62x. Meaning for every leu spent on ads, we lost 0.38 lei.",
        },
        {
          type: "p",
          text: "We stopped campaigns on the spot. Didn't optimize. Didn't test other audiences. Stopped. Then we worked on the offer. Restructured packages. Eliminated options that consumed time and brought no profit. Negotiated with local suppliers for volume discounts. Raised weekend prices 15%, testing elasticity. In three months, POAS climbed to 1.8x. Same budget, roughly same number of customers, but now each customer brought profit. Now, after 12 months, POAS is 3.2x and 85% of clients return from ads.",
        },
        {
          type: "table",
          headers: ["Metric", "Before", "After 3 months", "After 12 months"],
          rows: [
            ["Revenue", "RON1,700,657", "RON1,450,000", "RON1,700,657"],
            ["Invoices", "993", "712", "993"],
            ["ROAS", "2.8x", "2.4x", "2.8x"],
            ["POAS", "0.62x", "1.8x", "3.2x"],
            ["Profit after ads", "Loss", "Profit", "Profit"],
          ],
        },
        {
          type: "p",
          text: "Notice something important. Initial revenue dropped. Number of invoices dropped. ROAS dropped. But POAS went up. And the business became profitable. That's the difference between optimizing for pretty numbers and optimizing for real money. I'll tell you straight to your face: better 712 profitable invoices than 993 that bury you.",
        },
        {
          type: "h2",
          text: "Where POAS becomes another excuse",
        },
        {
          type: "p",
          text: "One warning. POAS can also be weaponized. If an agency tells you 'POAS 3x' without showing you the sheet where they calculated margin, they've probably used a round number that sounds good. Margin has to be net of every variable cost. Not gross, not optimistic, not rounded up.",
        },
        {
          type: "p",
          text: "What goes into variable cost, non-negotiable:",
        },
        {
          type: "ul",
          items: [
            "Cost of goods. The real price at which the product lands in your warehouse, transport from supplier included. Not the quote price. The final price, with everything added.",
            "Shipping to customer. If you offer free shipping, the cost still comes out of margin, it doesn't disappear. It's just hidden.",
            "Packaging plus estimated returns on that category. If 5% of products come back, you add 5% to cost. Returned products either break or go into secondary stock at a discount.",
            "Platform commission, if you sell on Amazon, eMAG, Allegro. On eMAG you can hit 15-20%. On Amazon 12-15%. That's real money leaving your profit.",
            "Payment processing. Stripe, PayU, bank fees, all of it. Between 1.9% and 3% per transaction. At EUR100,000 in sales, that's EUR2,000-3,000 you forget if you don't calculate it.",
          ],
        },
        {
          type: "p",
          text: "Skip even one, you're lying to yourself. POAS comes out higher than it is. A few months in, at year-end, you wonder where the money went. It went into costs you didn't count.",
        },
        {
          type: "callout",
          tone: "red",
          title: "The rounded margin lie",
          text: "If your agency says 'we estimated your margin at 35%' and doesn't show you the calculation with every cost included, don't accept. Ask to see the sheet. If they don't have it, either they didn't do the work, or they know the real margin is lower and don't want to tell you. In both cases, it's a signal.",
        },
        {
          type: "h2",
          text: "POAS varies per campaign",
        },
        {
          type: "p",
          text: "In the same account you can run a cold-audience campaign at 2.5x POAS on premium products, and a retargeting campaign at 0.4x POAS on cheap accessories. ROAS blends them into a pleasant average. POAS separates them and shows you exactly what to scale and what to kill today.",
        },
        {
          type: "p",
          text: "Here's an example from our client in Sibiu, electric scooters. Cold traffic campaign on scooters at RON300-500, margin 40%, POAS 2.1x. In the same month, retargeting campaign on accessories at RON30-50, margin 12%, POAS 0.3x. Combined ROAS: 2.4x. Sounds good. Combined POAS: 0.85x. You're losing money. If you don't separate by POAS, you don't know one campaign is destroying you.",
        },
        {
          type: "callout",
          tone: "red",
          title: "A direct observation",
          text: "I've seen too many accounts where the aggregate ROAS showed 3x while two individual campaigns were quietly pulling money out of the company. Until you split campaigns by POAS, you don't know which ones are feeding you and which are draining you.",
        },
        {
          type: "h2",
          text: "What to do when POAS is below 1 but you want to scale",
        },
        {
          type: "p",
          text: "Common situation. POAS 0.8x. You're losing money, but the business is growing. What do you do? It depends. If the growth is sustainable and brings customers who repurchase, maybe it's worth losing on the first sale to win on the second and third. That's called investing in LTV.",
        },
        {
          type: "p",
          text: "But be very careful. Not all businesses have LTV. If you sell TVs, the customer isn't coming back in 3 months. If you sell shampoo, they are. Stop and calculate: what's a customer worth over 12 months? If LTV covers the loss on the first sale, POAS below 1 on acquisition is temporarily acceptable. If not, it's not.",
        },
        {
          type: "table",
          headers: ["POAS", "What it means", "Decision"],
          rows: [
            ["Above 2.0x", "Healthy profit", "Scale. Raise budget 20% per week."],
            ["1.5x - 2.0x", "Good profit", "Scale moderately. Test new audiences."],
            ["1.0x - 1.5x", "Break-even or close", "Hold. Optimize creative, not budget."],
            ["0.8x - 1.0x", "Small loss", "Analyze. If LTV covers, keep. If not, stop."],
            ["Below 0.8x", "Real loss", "Stop. No discussion."],
          ],
        },
        {
          type: "h2",
          text: "Short recap",
        },
        {
          type: "ul",
          items: [
            "ROAS. Gross revenue divided by ad spend. The number on the report. Beautiful, incomplete, sometimes dangerous.",
            "POAS. Profit after margin divided by ad spend. The number in the bank. Ugly when below 1, the only one that matters when above.",
            "Two campaigns with identical ROAS can have opposite POAS. Same report, different movie.",
            "Net margin is calculated honestly, with every variable cost included. No rounding, no optimism, no excuses.",
            "Healthy e-commerce POAS sits between 1.5 and 2.5, sustainable over six months.",
          ],
        },
        {
          type: "callout",
          tone: "lime",
          title: "What you do today, concretely",
          text: "Open Meta Ads Manager. Pull last month's revenue. Calculate honest net margin, with every variable cost. Apply the formula. If POAS comes out below 1, it doesn't mean ads are broken. It means either margin doesn't support scaling, or targeting is pointing at the wrong audiences. Both are fixable, but you need to know which one is the problem. And the only way to know is to calculate POAS every single week.",
        },
      ],
    },
  },
};
