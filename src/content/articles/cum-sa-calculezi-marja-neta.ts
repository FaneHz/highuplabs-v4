import type { Article } from "./types";

export const cumSaCalculeziMarjaNeta: Article = {
  slug: "cum-sa-calculezi-marja-neta",
  publishedAt: "2026-03-25",
  readTime: { ro: "18 min", en: "18 min" },
  tag: "fundamente",
  translations: {
    ro: {
      title: "Cum calculezi marja neta pe 5 produse in 30 de minute, cu Excel",
      hook: "Majoritatea fondatorilor stiu cat vand, dar nu stiu ce ramane. Aici e diferenta intre un business care creste si unul care se scufunda lent.",
      metaTitle: "Cum calculezi marja neta pe produse in Excel - ghid practic",
      metaDescription:
        "Calculeaza marja neta pe produse in 30 de minute cu un sablon Excel. 5 exemple reale, formule exacte, 4 erori clasice.",
      blocks: [
        {
          type: "p",
          text: "Am vorbat saptamana trecuta cu un fondator din Oradea. Vanza 40.000 de lei pe luna. Ma mandrea cu cifra asta. Cand l-am intrebat cat ramane in cont dupa toate cheltuielile, s-a uitat la mine ca la un extraterestru. 'Pai platesc furnizorul, curierul, taxele... dar nu stiu exact suma.' Vanza de 40.000, dar nu stia daca ramane cu 4.000 sau cu 15.000. Asta nu e business. E ruleta cu costuri necunoscute.",
        },
        {
          type: "p",
          text: "Marja neta e singura cifra care conteaza. Nu cifra de afaceri. Nu numarul de comenzi. Nu reach-ul de pe Facebook. Cat ramane in cont dupa ce platesti tot ce variaza cu fiecare vanzare. Daca nu stii asta, faci decizii pe orb. Urci bugetul de ads fara sa stii daca ai loc. Scazi pretul fara sa stii cat de jos poti merge. Semnezi cu agentia fara sa stii daca poti suporta un comision de 7%. Acest articol iti arata cum sa calculezi marja neta pe produse in 30 de minute, cu un sablon pe care il faci singur in Excel.",
        },
        {
          type: "callout",
          tone: "ink",
          title: "Formulele pe care le folosesti",
          text: "Marja neta per produs = (Pret vanzare - Cost produse - Cost curier - Taxe plata - Taxe retur - Ambalaj - Alte costuri variabile) / Pret vanzare x 100. Marja neta pe tot businessul = Suma (marja per produs x pondere in vanzari). Nu e algebra. E adunare si impartire.",
        },
        { type: "h2", text: "De ce marja neta, nu marja bruta" },
        {
          type: "p",
          text: "Marja bruta e simpla. Pretul de vanzare minus costul de achizitie. Te face sa te simti bine, dar te minte. Pentru ca ignora curierul, ambalajul, taxele de procesare, retururile, costurile de depozitare. Un produs cu marja bruta de 50% poate avea marja neta de 8% dupa toate cheltuielile. Si 8% nu scaleaza. Nu platesti salariile. Nu lasa loc de reinvestit.",
        },
        {
          type: "p",
          text: "Am vazut un caz de moda in care marja bruta era 55%. Impresionant. Dar costul curierului era 22 lei per colet, returul era 18%, taxele de procesare erau 2.5%, ambalajul era 3 lei, iar stocul ramas la final de sezon era amortizat. Marja neta reala: 11%. Fondatorul credea ca e bogat. Agentia ii cerea sa urce bugetul. El urca. Pierdea bani la fiecare vanzare in plus. A aflat dupa un an, cand a facut un audit complet. Un an de scalat pe pierdere.",
        },
        { type: "h2", text: "Sablonul Excel in 8 coloane" },
        {
          type: "p",
          text: "Deschide Excel. Fa un tabel cu opt coloane. Coloana A: nume produs. Coloana B: pret vanzare cu TVA. Coloana C: cost produs cu tot cu transport pana la tine. Coloana D: cost curier per colet. Coloana E: taxe procesare plata. Coloana F: cost ambalaj. Coloana G: estimare retururi. Coloana H: alte costuri variabile, daca exista. In coloana I pui formula: =(B2-SUM(C2:H2))/B2*100. Asta e marja neta in procente. In coloana J pui vanzarile pe ultimele 30 de zile. In coloana K pui ponderea in total vanzari.",
        },
        {
          type: "p",
          text: "Daca ai 20 de produse, faci asta pentru primele 5 care genereaza 80% din venituri. Regula Pareto. Nu trebuie sa calculezi toate 20. Doar pe cele care conteaza. Restul pot astepta. Daca cele 5 principale au marja neta ok, businessul e sanatos. Daca nu, nu conteaza ce fac celelalte 15.",
        },
        {
          type: "table",
          headers: ["Produs", "Pret", "Cost", "Curier", "Taxe", "Ambalaj", "Retur", "Marja neta"],
          rows: [
            ["Trotineta electrica", "2.500", "1.200", "35", "62", "15", "5%", "45.1%"],
            ["Husa telefon", "89", "25", "18", "4.5", "3", "12%", "33.7%"],
            ["Crema fata", "120", "35", "18", "5", "4", "8%", "42.5%"],
            ["Pantaloni barbati", "180", "70", "20", "7", "3", "22%", "28.9%"],
            ["Supliment fitness", "95", "22", "18", "3.5", "2", "6%", "48.9%"],
          ],
        },
        {
          type: "p",
          text: "Uite cum functioneaza pe trotineta. Pret vanzare 2.500 lei. Cost produs 1.200. Curier 35. Taxe plata 2.5% din 2.500 = 62.5 lei. Ambalaj 15. Retur estimat 5% din pret = 125 lei. Total costuri 1.437.5 lei. Marja neta 1.062.5 lei, adica 42.5%. Asta e o marja sanatoasa. Poti plati agentie, poti reinvesti, poti rezista la un sezon slab. Daca marja neta era 12%, aceeasi trotineta ar fi fost o capcana.",
        },
        { type: "h2", text: "Cinci exemple din lumea reala" },
        {
          type: "p",
          text: "Am luat cinci categorii de produse pe care le-am intalnit in ultimul an. Elefantul e marja bruta, soarecele e marja neta. Si diferenta e intre a crede ca esti bogat si a sti ca esti vulnerabil.",
        },
        {
          type: "ol",
          items: [
            "Electronice mari: marja bruta 35%, marja neta 18% dupa curier, garantie, retur. Scalabil, dar cu grija.",
            "Fashion basic: marja bruta 55%, marja neta 22% dupa retururi de 20% si schimburi. Mediocru pentru ads.",
            "Skincare premium: marja bruta 70%, marja neta 45% dupa toate costurile. Foarte scalabil.",
            "Accesorii tech: marja bruta 40%, marja neta 15% dupa curier si ambalaj. Periculos pentru bugete mari.",
            "Produse alimentare: marja bruta 25%, marja neta 8% dupa curier refrigerat si ambalaj special. Nu scaleaza cu ads.",
          ],
        },
        {
          type: "p",
          text: "Observi ceva? Skincare-ul premium are marja bruta de 70% si neta de 45%. Asta inseamna ca din fiecare 100 de lei vanzati, 45 raman dupa toate cheltuielile. Poti da 20 de lei pe ads si tot mai ramai cu 25. De-aia skincare-ul e o categorie magnet pentru agentii. Dar produsele alimentare cu livrare refrigerata? Marja neta 8%. Daca dai 5 lei pe ads sa vinzi 100 de lei, ramai cu 3 lei. Nu poti plati salariul unui om cu 3 lei per comanda. Categoria decide daca ads-ul e o arma sau o povara.",
        },
        { type: "h2", text: "Patru erori clasice in calculul marjei" },
        {
          type: "ol",
          items: [
            "Ignori retururile. Le pui la zero pentru ca 'nu am asa multe'. Daca ai 15% retur in moda, asta e o cheltuiala reala. Nu e zero.",
            "Calculezi curierul la media nationala. Dar 40% din comenzi sunt in Bucuresti cu 15 lei, iar restul in Moldova cu 28 lei. Media e 20, dar tu platesti 28 pentru jumatate din comenzi.",
            "Uiti taxele de procesare la plata cu cardul. Sunt 1.5-2.5% din valoare. La 100.000 de lei pe luna, asta e 2.500 de lei. Nu e maruntis.",
            "Nu incluzi costul ambalajului. Cutia, folia, banda, stickerul. 3-5 lei per colet. La 500 de comenzi pe luna, 1.500-2.500 de lei.",
          ],
        },
        {
          type: "p",
          text: "Un fondator din Cluj mi-a aratat calculul lui initial. Marja bruta 48%. Mi-a zis ca e foarte bine. I-am cerut sa adauge retururi, ambalaj si taxe. Marja neta a coborat la 19%. Fata lui s-a schimbat. A realizat ca toate deciziile luate in ultimul an, de la bugetul de ads la preturile de Black Friday, au fost bazate pe o cifra gresita. 19% nu e rau, dar nu e 48%. Si diferenta aia de 29 de puncte procentuale i-a costat probabil 30.000 de euro in decizii proaste.",
        },
        {
          type: "callout",
          tone: "red",
          title: "Regula de aur",
          text: "Daca nu poti calcula marja neta pe fiecare produs principal in 15 minute, nu stii daca businessul tau e viabil. Nu e optional. E obligatoriu. Ca sa stii daca poti plati agentia, daca poti reduce pretul, daca poti face un bundle, daca poti supravietui unui sezon slab.",
        },
        {
          type: "p",
          text: "Am o metoda simpla pe care o aplic la fiecare audit. Iau ultima factura de la curier, ultimul extras de cont cu taxele de procesare, ultima comanda de ambalaje, si calculez marja neta pe ultimele 30 de zile de vanzari. Nu pe estimari. Pe facturi reale. Diferenta e socanta de fiecare data. Estimarile sunt intotdeauna optimiste. Facturile sunt intotdeauna reale.",
        },
        {
          type: "p",
          text: "Ultimul lucru. Dupa ce calculezi marja neta, nu o pastra doar pentru tine. Arata-o agentiei. Daca agentia ta nu stie marja neta pe produse, nu stie ce campanii sa scaleze. Nu stie ce produse sa promoveze. Nu stie daca POAS-ul de 2.0 e bun sau prost. Un agent care lucreaza fara sa stie marja neta e ca un chirurg care opereaza fara sa stie ce organe are pacientul. Nu e profesionism. E ghicit.",
        },
        {
          type: "callout",
          tone: "lime",
          title: "Actiune imediata",
          text: "Deschide Excel acum. Ia primele 5 produse dupa vanzari. Pune-le in tabelul cu 8 coloane. Aplica formulele. In 30 de minute stii mai mult despre businessul tau decat stiau 80% din concurenta ta. Si asta e avantajul care face diferenta.",
        },
        {
          type: "h2",
          text: "Ce faci azi, concret",
        },
        {
          type: "ol",
          items: [
            "Deschide Excel sau Google Sheets.",
            "Ia primele 5 produse dupa vanzari.",
            "Completeaza cele 8 coloane de costuri.",
            "Aplica formula de marja neta.",
            "Daca ai cel putin un produs peste 25%, aplica pentru un audit gratuit.",
          ],
        },
        {
          type: "p",
          text: "Daca vrei sa calculezi corect marja neta pe produsele tale, aplica pentru un audit gratuit de 30 de minute. Facem impreuna exercitiul de mai sus pe businessul tau si iti aratam exact cat ramane in cont dupa fiecare vanzare. Fara cost. Fara obligatie. Doar adevarul pe cifre.",
        },
      ],
    },
    en: {
      title: "How to calculate net margin on 5 products in 30 minutes, with Excel",
      hook: "Most founders know how much they sell, but not what stays in the account. Here's the difference between a business that grows and one that slowly sinks.",
      metaTitle: "How to calculate net product margin in Excel - practical guide",
      metaDescription:
        "Calculate net margin per product in 30 minutes with an Excel template. 5 real examples, exact formulas, 4 classic errors.",
      blocks: [
        {
          type: "p",
          text: "I spoke last week with a founder from Oradea. He sells 40,000 lei per month. He was proud of that number. When I asked how much stays in the account after all expenses, he looked at me like I was an alien. 'Well I pay the supplier, the courier, taxes... but I don't know the exact amount.' Selling 40,000, but not knowing if he keeps 4,000 or 15,000. That's not business. That's roulette with unknown costs.",
        },
        {
          type: "p",
          text: "Net margin is the only number that matters. Not revenue. Not number of orders. Not Facebook reach. What stays in the account after you pay everything that varies with each sale. If you don't know this, you make decisions blind. You raise ad budget without knowing if you have room. You lower prices without knowing how low you can go. You sign with an agency without knowing if you can afford a 7% commission. This article shows you how to calculate net margin per product in 30 minutes, with a template you build yourself in Excel.",
        },
        {
          type: "callout",
          tone: "ink",
          title: "The formulas you use",
          text: "Net margin per product = (Sale price - Product cost - Courier cost - Payment fees - Return cost - Packaging - Other variable costs) / Sale price x 100. Business-wide net margin = Sum (margin per product x sales share). Not algebra. Addition and division.",
        },
        { type: "h2", text: "Why net margin, not gross margin" },
        {
          type: "p",
          text: "Gross margin is simple. Sale price minus acquisition cost. It makes you feel good, but it lies. Because it ignores courier, packaging, processing fees, returns, storage costs. A product with 50% gross margin can have 8% net margin after all expenses. And 8% doesn't scale. Doesn't pay salaries. Doesn't leave room to reinvest.",
        },
        {
          type: "p",
          text: "I saw a fashion case where gross margin was 55%. Impressive. But courier cost was 22 lei per package, returns were 18%, processing fees were 2.5%, packaging was 3 lei, and remaining end-of-season stock was amortized. Real net margin: 11%. The founder thought he was rich. The agency asked him to raise budget. He raised. He lost money on every additional sale. He found out after a year, when he did a full audit. One year of scaling at a loss.",
        },
        { type: "h2", text: "The 8-column Excel template" },
        {
          type: "p",
          text: "Open Excel. Make a table with eight columns. Column A: product name. Column B: sale price with VAT. Column C: product cost including transport to you. Column D: courier cost per package. Column E: payment processing fees. Column F: packaging cost. Column G: return estimate. Column H: other variable costs if any. In column I put the formula: =(B2-SUM(C2:H2))/B2*100. That's net margin in percentage. In column J put last 30 days sales. In column K put share of total sales.",
        },
        {
          type: "p",
          text: "If you have 20 products, do this for the first 5 that generate 80% of revenue. Pareto's rule. You don't need to calculate all 20. Just the ones that matter. The rest can wait. If the top 5 have healthy net margin, the business is healthy. If not, it doesn't matter what the other 15 do.",
        },
        {
          type: "table",
          headers: ["Product", "Price", "Cost", "Courier", "Fees", "Packaging", "Returns", "Net margin"],
          rows: [
            ["Electric scooter", "2,500", "1,200", "35", "62", "15", "5%", "45.1%"],
            ["Phone case", "89", "25", "18", "4.5", "3", "12%", "33.7%"],
            ["Face cream", "120", "35", "18", "5", "4", "8%", "42.5%"],
            ["Men's pants", "180", "70", "20", "7", "3", "22%", "28.9%"],
            ["Fitness supplement", "95", "22", "18", "3.5", "2", "6%", "48.9%"],
          ],
        },
        {
          type: "p",
          text: "Here's how it works on the scooter. Sale price 2,500 lei. Product cost 1,200. Courier 35. Payment fees 2.5% of 2,500 = 62.5 lei. Packaging 15. Estimated returns 5% of price = 125 lei. Total costs 1,437.5 lei. Net margin 1,062.5 lei, or 42.5%. That's a healthy margin. You can pay an agency, reinvest, survive a slow season. If net margin was 12%, the same scooter would be a trap.",
        },
        { type: "h2", text: "Five real-world examples" },
        {
          type: "p",
          text: "I took five product categories I've encountered in the past year. The elephant is gross margin, the mouse is net margin. And the difference is between thinking you're rich and knowing you're vulnerable.",
        },
        {
          type: "ol",
          items: [
            "Large electronics: gross margin 35%, net margin 18% after courier, warranty, returns. Scalable, but carefully.",
            "Basic fashion: gross margin 55%, net margin 22% after 20% returns and exchanges. Mediocre for ads.",
            "Premium skincare: gross margin 70%, net margin 45% after all costs. Very scalable.",
            "Tech accessories: gross margin 40%, net margin 15% after courier and packaging. Dangerous for large budgets.",
            "Food products: gross margin 25%, net margin 8% after refrigerated courier and special packaging. Doesn't scale with ads.",
          ],
        },
        {
          type: "p",
          text: "Notice something? Premium skincare has 70% gross margin and 45% net. That means from every 100 lei sold, 45 remain after all expenses. You can spend 20 on ads and still keep 25. That's why skincare is a magnet for agencies. But refrigerated food products? Net margin 8%. If you spend 5 lei on ads to sell 100 lei, you keep 3 lei. You can't pay a person's salary with 3 lei per order. The category decides whether ads are a weapon or a burden.",
        },
        { type: "h2", text: "Four classic margin calculation errors" },
        {
          type: "ol",
          items: [
            "Ignoring returns. You put them at zero because 'I don't have that many'. If you have 15% returns in fashion, that's a real expense. It's not zero.",
            "Calculating courier at national average. But 40% of orders are in Bucharest at 15 lei, and the rest in Moldova at 28 lei. Average is 20, but you pay 28 for half your orders.",
            "Forgetting card processing fees. They're 1.5-2.5% of value. At 100,000 lei per month, that's 2,500 lei. Not pocket change.",
            "Not including packaging cost. Box, foil, tape, sticker. 3-5 lei per package. At 500 orders per month, 1,500-2,500 lei.",
          ],
        },
        {
          type: "p",
          text: "A founder from Cluj showed me his initial calculation. Gross margin 48%. He said it was very good. I asked him to add returns, packaging, and fees. Net margin dropped to 19%. His face changed. He realized that all decisions made in the past year, from ad budget to Black Friday prices, were based on a wrong number. 19% isn't bad, but it's not 48%. And that 29 percentage point difference probably cost him 30,000 euros in bad decisions.",
        },
        {
          type: "callout",
          tone: "red",
          title: "The golden rule",
          text: "If you can't calculate net margin on each main product in 15 minutes, you don't know if your business is viable. It's not optional. It's mandatory. So you know if you can pay an agency, if you can lower prices, if you can make a bundle, if you can survive a slow season.",
        },
        {
          type: "p",
          text: "I have a simple method I apply in every audit. I take the last courier invoice, the last bank statement with processing fees, the last packaging order, and calculate net margin on the last 30 days of sales. Not on estimates. On real invoices. The difference is shocking every time. Estimates are always optimistic. Invoices are always real.",
        },
        {
          type: "p",
          text: "One last thing. After you calculate net margin, don't keep it to yourself. Show it to the agency. If your agency doesn't know net margin per product, they don't know which campaigns to scale. They don't know which products to promote. They don't know whether a 2.0 POAS is good or bad. An agent working without knowing net margin is like a surgeon operating without knowing what organs the patient has. It's not professionalism. It's guessing.",
        },
        {
          type: "callout",
          tone: "lime",
          title: "Immediate action",
          text: "Open Excel now. Take your top 5 products by sales. Put them in the 8-column table. Apply the formulas. In 30 minutes you'll know more about your business than 80% of your competition. And that's the advantage that makes the difference.",
        },
        {
          type: "h2",
          text: "What you do today, concretely",
        },
        {
          type: "ol",
          items: [
            "Open Excel or Google Sheets.",
            "Take your top 5 products by sales.",
            "Fill in the 8 cost columns.",
            "Apply the net margin formula.",
            "If you have at least one product above 25%, apply for a free audit.",
          ],
        },
        {
          type: "p",
          text: "If you want to calculate net margin correctly on your products, apply for a free 30-minute audit. We'll do the exercise above on your business together and show you exactly how much stays in your account after each sale. No cost. No obligation. Just truth on numbers.",
        },
      ],
    },
  },
};
