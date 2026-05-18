import type { Article } from "./types";

export const marjaNeta: Article = {
  slug: "marja-neta-salvare-sau-moartea",
  publishedAt: "2026-01-29",
  readTime: { ro: "22 min", en: "22 min" },
  tag: "fundamente",
  translations: {
    ro: {
      title: "Marja neta: de ce 15% te omoara si 30% te scaleaza",
      hook: "Sub 15% marja neta, nicio agentie din lume nu te salveaza. Peste 30%, ai loc de scalare serioasa. Uite cum o calculezi onest si ce decizii iei pe baza ei.",
      metaTitle: "Cum calculezi marja neta. Ghid pentru e-commerce",
      metaDescription:
        "Marja neta, explicata complet. Formula, exemplu pe trotineta electrica, pragurile care decid daca poti scala, si cum cresti marja fara sa ridici pretul.",
      blocks: [
        {
          type: "p",
          text: "De fiecare data cand un antreprenor imi zice 'am marja 40%', imi iau deja cafeaua in mana. Pentru ca stiu ce urmeaza. Incepem sa sapam. Scadem costul real al marfii. Scadem curierul. Scadem retururile. Scadem comisionul platformei. La final iese, de obicei, undeva pe la 18-22%. Nu minte intentionat. Nu a calculat niciodata corect. Asta e problema reala. Deciziile de scaling se iau pe o marja care nu exista, si contul bancar plateste factura.",
        },
        {
          type: "p",
          text: "Iti zic o poveste pe care am trait-o personal. Clientul nostru din Sibiu, trotinete electrice, la primul call imi zice: 'Marja mea e 56%, pot sa scalez agresiv.' I-am zis: 'OK, deschide Excel-ul si calculeaza cu mine.' Dupa 40 de minute, marja reala pe trotineta era 43.4%. Nu era prost. Pur si simplu nu socotise niciodata costul real al retururilor, ambalajului special si comisionul PayU pe tranzactii.",
        },
        {
          type: "p",
          text: "Asta se intampla in 7 din 10 cazuri. Si e normal. Antreprenorul se uita la pretul de vanzare si la pretul de achizitie si face diferenta. 'Am marja 50%.' Dar marja bruta nu plateste facturi. Marja neta plateste. Iar diferenta dintre ele e tot ce conteaza.",
        },
        {
          type: "h2",
          text: "Formula corecta",
        },
        {
          type: "callout",
          tone: "lime",
          title: "Marja neta = (pret de vanzare - toate costurile variabile) : pret de vanzare",
          text: "Cost variabil inseamna orice cheltuiala care creste cu fiecare comanda. Fara costuri fixe. Fara chirie. Fara salarii. Fara abonamente software. Doar ce te costa efectiv o comanda in plus.",
        },
        {
          type: "p",
          text: "Daca vinzi 10 produse, costurile variabile se inmultesc cu 10. Daca vinzi 100, se inmultesc cu 100. Asta e diferenta fata de costurile fixe. Chiria e aceeasi daca vinzi 1 sau 1000. Dar curierul, ambalajul, marfa, returul, comisionul platformei, toate cresc proportional cu vanzarile.",
        },
        {
          type: "h2",
          text: "Ce trebuie inclus, fara compromis",
        },
        {
          type: "ul",
          items: [
            "**Costul marfii.** Pretul real pe care-l platesti furnizorului, plus transportul pana la tine. Nu pretul din catalog. Pretul final, cu tot ce se adauga: transport, vama, taxe, asigurare.",
            "**Livrarea la client.** Daca oferi 'transport gratuit', costul tot iese din buzunar. Doar ca-l ascunzi in marja. La produsele mari, curierul poate costa 40-80 de lei. La produsele mici, 15-25. Conteaza.",
            "**Ambalajul.** Cutie, folie, etichete, material de protectie. Pe fiecare comanda. La produse fragile, ambalajul poate costa 10-15 lei. La haine, 3-5 lei. Nu e mult per comanda, dar la 500 de comenzi pe luna devine 1.500-2.500 de lei.",
            "**Returnarile estimate.** Daca ai 5% rata de retur pe categorie, adaugi 5% la cost. Produsele returnate fie se strica, fie se vand in stoc secundar cu discount. Fiecare retur te costa. Nu e doar curierul inapoi. E timpul pierdut, e depozitarea, e resigilarea, e eventual discount-ul la revanzare.",
            "**Comisionul platformei.** Pe eMAG poti ajunge la 15-20%. Pe Amazon, 12-15%. Pe Allegro, depinde de categorie. Conteaza. La 100.000 de lei vanzari pe eMAG, comisionul poate fi 15.000-20.000 de lei. Daca nu-l pui in calcul, marja ta e cu 15-20 puncte mai mare decat in realitate.",
            "**Procesarea platilor.** Stripe, PayU, comisioanele bancare. Intre 1.9% si 3% pe tranzactie. La volume mari, aia sunt mii de lei pe luna.",
            "**Ambalarea manuala.** Daca ai un om care pacheteaza comenzi, ora lui conteaza. Imparti costul pe numarul de comenzi procesate. Daca un om costa 4.000 de lei pe luna si pacheteaza 800 de comenzi, fiecare comanda costa 5 lei din salariul lui.",
          ],
        },
        {
          type: "h2",
          text: "Exemplu concret, pe trotineta",
        },
        {
          type: "p",
          text: "Vinzi o trotineta electrica la 500 de euro. Fondatorul zice ca are marja 56%. Uite cum arata calculul real, fara filtre. Acesta e exact modelul pe care l-am folosit cu clientul nostru din Sibiu, cel care a ajuns la 2.161.742 RON in vanzari.",
        },
        {
          type: "table",
          headers: ["Element", "Suma"],
          rows: [
            ["Pret de vanzare", "EUR500"],
            ["Cost marfa (China plus transport UE)", "EUR220"],
            ["Livrare la client", "EUR28"],
            ["Ambalaj si etichete", "EUR7"],
            ["Retur estimat, 6% pe categorie", "EUR13"],
            ["Procesare plati (PayU 2.2%)", "EUR11"],
            ["Ambalare manuala (alocata)", "EUR4"],
            ["Total costuri variabile", "EUR283"],
            ["Profit brut per unitate", "EUR217"],
            ["Marja neta reala", "43.4%"],
          ],
        },
        {
          type: "p",
          text: "Marja reala, 43.4%, nu 56%. Diferenta de 12.6 puncte inseamna 63 de euro pe fiecare trotineta. La 100 de trotinete pe luna, 6.300 de euro pe care fondatorul ii credea alocati pentru reclame si nu erau nicaierea. De-aia, cand scalezi pe marja gresita, primele doua luni par sa mearga, iar luna a treia vine extrasul bancar si realitatea.",
        },
        {
          type: "p",
          text: "Si asta e doar pe un produs. Imagineaza-ti un magazin cu 50 de SKU-uri, fiecare cu marja diferita. Unul e la 45%, altul la 8%, altul la 22%. Daca scalezi tot magazinul la gramada, scalezi si produsele care te sap. De-aia primul pas in orice scalare e sa calculezi marja pe FIECARE produs. Nu pe categorie. Nu pe magazin. Pe produs.",
        },
        {
          type: "h2",
          text: "Pragurile de scaling",
        },
        {
          type: "table",
          headers: ["Marja neta", "Verdict"],
          rows: [
            ["Sub 15%", "Nu poti scala. Comisionul si costul media te inghit. Primul lucru de facut e sa restructurezi produsul, nu sa cumperi reclame."],
            ["15-25%", "Scalare limitata. Buget mic pe ads, focus masiv pe repeat customers si pe cresterea LTV. Aici fiecare leu conteaza."],
            ["25-40%", "Zona sanatoasa. Poti scala pe comision fara sa mori, daca operationalul tine ritmul. Majoritatea businessurilor de succes sunt aici."],
            ["Peste 40%", "Loc pentru scaling agresiv. Testing creative sustinut, volume mare, testare de audiente noi. Dar atentie: marja mare atrage competitie."],
          ],
        },
        {
          type: "p",
          text: "Observa ca nu exista 'depinde'. Sub 15% nu scalezi, punct. N-are cum. Daca dai 10% comision agentiei si 5% costuri de procesare, ai ramas cu zero. Si asta presupunand ca reclamele functioneaza perfect, ceea ce nu se intampla niciodata.",
        },
        {
          type: "h2",
          text: "Cum cresti marja fara sa ridici pretul",
        },
        {
          type: "ol",
          items: [
            "Schimbi furnizorul sau negociezi volum. Trecerea de la 100 la 1.000 de unitati pe luna scoate discount intre 15% si 25%. La comenzi mai mari, mai mult. Un client din industria modei a obtinut 18% discount doar prin concentrarea comenzilor pe 11 SKU-uri in loc de 340.",
            "Optimizezi ambalajul. Cutie mai mica inseamna transport volumetric mai ieftin. Pe produsele mari, diferenta poate fi 20-30% pe comanda. Am vazut un caz unde trecerea de la cutie standard la cutie custom a redus costul de livrare cu 12 lei per comanda. La 1.000 de comenzi, 12.000 de lei economisiti. Fara sa schimbi pretul.",
            "Reduci retururile. Poze mai bune, specs clare, video pe pagina de produs. Clientii primesc ce se asteptau. Rata de retur scade de la 6-8% la 2-3%. Fiecare retur in minus e profit in plus.",
            "Bundles. Vinzi doua-trei produse impreuna cu un discount mic. Cresti AOV, imparti costul de livrare pe mai multe produse, marja efectiva urca. Exemplu: vinzi o perie de par la 50 de lei, marja 30%. Vinzi un set perie + sampon + balsam la 120 de lei, marja efectiva 42% pentru ca livrarea e aceeasi.",
            "Upsell la checkout. Garantie extinsa, accesorii, setup service. Marjele pe astea sunt 60-80%. Adauga efectiv profit fara buget de marketing suplimentar. Un client care cumpara o trotineta poate cumpara si o casca. Casca are marja 65%. Aia e marja pura adaugata.",
          ],
        },
        {
          type: "callout",
          tone: "red",
          title: "Minciuna pe care si-o spun 7 din 10 antreprenori",
          text: "'Am marja 40%.' Cand sapi, iese 22-28%. Nu e rea-vointa. E lipsa de exercitiu. Daca o agentie incepe sa lucreze cu tine fara sa-ti ceara sa calculezi marja pe fiecare produs, ai semnat pentru o relatie care se va termina prost. Nu au cum sa scaleze corect ce tu nici n-ai masurat.",
        },
        {
          type: "h2",
          text: "Exercitiul de 30 de minute",
        },
        {
          type: "p",
          text: "Deschizi Excel. Pui toate produsele de pe site pe randuri. Pui sapte coloane de cost, dupa lista de mai sus. Calculezi marja reala pe fiecare. Sortezi descrescator. In 30 de minute vei vedea ceva ce nu ai mai vazut pana acum.",
        },
        {
          type: "ul",
          items: [
            "Ai doua-trei produse cu marja peste 40%. Aici e banul. Aici scalezi. Pune 80% din bugetul de ads pe ele.",
            "Ai cinci-opt produse cu marja 20-35%. Aici muncesti pe optimizarea costului si eventual pe bundle-uri. Nu le opri, dar nu le scala inca.",
            "Ai produse cu marja sub 15%. Le scoti din catalog sau le folosesti ca loss-leader pentru AOV, constient ca pierzi pe ele ca sa castigi in cos. Dar nu le pune in campanii platite. Acolo doar arzi bani.",
          ],
        },
        {
          type: "p",
          text: "Acest exercitiu e primul lucru pe care il facem cu fiecare client nou. Inainte sa deschid Meta Ads Manager. Inainte sa vorbesc despre buget. Inainte de orice. Pentru ca daca nu stim marja, orice decizie de buget e o parghie ruseasca. Poti sa castigi sau poti sa-ti spargi contul.",
        },
        {
          type: "h2",
          text: "Cum marja reala schimba intreaga strategie",
        },
        {
          type: "p",
          text: "Un client din industria modei a venit cu 340 de SKU-uri si marja medie raportata de 28%. Am facut exercitiul de mai sus. Rezultatul: 11 produse cu marja reala peste 40%. 23 de produse cu marja intre 25% si 40%. Restul de 306 sub 20%, din care 89 sub 10%.",
        },
        {
          type: "p",
          text: "Decizia a fost drastica. Am taiat 306 produse din campanii. Am concentrat tot bugetul pe 11 hero products. Am negociat cu furnizorul discount de 18% pe volumul concentrat. Am crescut AOV-ul cu bundle-uri. Am adaugat upsell-uri la checkout. In 8 luni, marja medie a urcat de la 12% la 38%. Vanzarile au crescut de 15x.",
        },
        {
          type: "p",
          text: "Acelasi buget de marketing. Aceleasi platforme. Doar ca acum stiam pe ce punem banii. Inainte puneam bani la intamplare pe 340 de produse si speram. Acum puneam bani strategic pe 11 si stiam de ce. Asta e diferenta dintre a spera si a calcula.",
        },
        {
          type: "callout",
          tone: "lime",
          title: "Ideea de baza",
          text: "Nu poti scala businessul mai repede decat iti permite marja. Calculezi onest. Ajustezi catalogul. Abia apoi lansezi reclame. Orice alta ordine e reteta falimentului elegant, cu rapoarte frumoase si facturi neplatite. Agentiile care iti propun sa 'testam si vedem' fara sa stie marja ta nu te vor scala. Te vor arde incet.",
        },
        {
          type: "h2",
          text: "Cum folosesti marja ca sa filtrezi agentiile",
        },
        {
          type: "p",
          text: "La primul call cu o agentie, pune intrebarea asta: 'Care e marja neta reala pe produsul meu cel mai vandut?' Daca agentia nu stie, nu e problema. Daca agentia nu intreaba, e o problema mare. O agentie care incepe sa vorbeasca de buget, de audiente, de creative, inainte sa stie daca poti sa platesti comisionul lor si sa ramai cu profit, nu e o agentie. E un vanzator de speranta.",
        },
        {
          type: "p",
          text: "Noi refuzam clienti pentru care marja e sub 15%. Nu pentru ca nu ne plac. Pentru ca matematic nu are sens. Daca tu vinzi un produs cu 12% marja neta si noi luam 7% comision, iti raman 5%. Din aia 5% trebuie sa platesti costurile fixe, salariile, chiria. Nu se poate. Si nu are rost sa incepem o relatie care se va termina cu amaraciune.",
        },
        {
          type: "h2",
          text: "Actiune imediata: calculeaza acum",
        },
        {
          type: "ol",
          items: [
            "Deschide Excel sau Google Sheets.",
            "Pune primele 5 produse dupa vanzari.",
            "Calculeaza marja neta cu toate cele 7 costuri variabile de mai sus.",
            "Daca marja e sub 15% pe toate, opreste orice buget de ads si rezolva produsul mai intai.",
            "Daca ai cel putin un produs peste 25%, aplica pentru un audit gratuit si hai sa vedem cum scalam.",
          ],
        },
        {
          type: "p",
          text: "Daca vrei sa verifici daca marja ta sustine scalarea, aplica pentru un audit de 30 de minute. Analizam impreuna produsele tale, calcule marja reala, si iti spunem daca are sens sa investesti in ads sau sa restructurezi mai intai. Fara cost. Fara obligatie. Doar adevarul pe cifre.",
        },
      ],
    },
    en: {
      title: "Net margin: why 15% kills you and 30% lets you scale",
      hook: "Below 15% net margin, no agency on earth can save you. Above 30%, you have real room to scale. Here's how to calculate it honestly and what decisions it drives.",
      metaTitle: "How to calculate net margin. An e-commerce guide",
      metaDescription:
        "Net margin fully explained. Formula, worked example on an electric scooter, the thresholds that decide if you can scale, and how to grow margin without raising price.",
      blocks: [
        {
          type: "p",
          text: "Every time a founder tells me 'I've got 40% margin', I reach for the coffee. Because I know what's coming. We start digging. We subtract real cost of goods. Subtract courier. Subtract returns. Subtract platform commission. By the end it usually lands around 18-22%. Nobody's lying on purpose. They've just never done the math properly. That's the real problem. Scaling decisions get made on a margin that doesn't exist, and the bank account pays the bill.",
        },
        {
          type: "p",
          text: "Let me tell you a story I lived personally. Our client from Sibiu, electric scooters, on the first call he tells me: 'My margin is 56%, I can scale aggressively.' I said: 'OK, open Excel and calculate with me.' After 40 minutes, real margin on the scooter was 43.4%. He wasn't stupid. He simply had never counted the real cost of returns, special packaging, and PayU commission on transactions.",
        },
        {
          type: "p",
          text: "This happens in 7 out of 10 cases. And it's normal. The entrepreneur looks at sale price and purchase price and does the difference. 'I've got 50% margin.' But gross margin doesn't pay bills. Net margin does. And the gap between them is everything that matters.",
        },
        {
          type: "h2",
          text: "The right formula",
        },
        {
          type: "callout",
          tone: "lime",
          title: "Net margin = (sale price - all variable costs) : sale price",
          text: "Variable cost means any expense that grows with each order. No fixed costs. No rent. No salaries. No software subscriptions. Only what one additional order actually costs you.",
        },
        {
          type: "p",
          text: "If you sell 10 products, variable costs multiply by 10. If you sell 100, they multiply by 100. That's the difference from fixed costs. Rent is the same whether you sell 1 or 1,000. But courier, packaging, goods, returns, platform commission, all grow proportionally with sales.",
        },
        {
          type: "h2",
          text: "What must be included, no shortcuts",
        },
        {
          type: "ul",
          items: [
            "**Cost of goods.** The real price you pay the supplier, plus transport to your warehouse. Not the catalog price. The final price, with everything added: transport, customs, taxes, insurance.",
            "**Shipping to customer.** If you offer 'free shipping', it still comes out of your pocket. You just bury it in margin. On large products, courier can cost EUR8-16. On small ones, EUR3-5. It counts.",
            "**Packaging.** Box, wrap, labels, protective material. Every order. On fragile products, packaging can cost EUR2-3. On clothes, EUR0.6-1. Not much per order, but at 500 orders a month it becomes EUR1,500-2,500.",
            "**Estimated returns.** If you have a 5% return rate in that category, you add 5% to cost. Returned products either break or go into secondary stock at a discount. Every return costs you. It's not just the return courier. It's lost time, storage, repackaging, eventual discount on resale.",
            "**Platform commission.** On eMAG you can hit 15-20%. Amazon, 12-15%. Allegro depends on category. All of it counts. At EUR20,000 sales on eMAG, commission can be EUR3,000-4,000. If you don't put it in the calculation, your margin is 15-20 points higher than reality.",
            "**Payment processing.** Stripe, PayU, bank fees. Between 1.9% and 3% per transaction. At high volumes, that's thousands per month.",
            "**Manual packing.** If you employ someone to pack orders, their time counts. You split the cost across processed orders. If a person costs EUR800 per month and packs 800 orders, each order costs EUR1 from their salary.",
          ],
        },
        {
          type: "h2",
          text: "Concrete example, on a scooter",
        },
        {
          type: "p",
          text: "You sell an electric scooter at EUR500. The founder says his margin is 56%. Let's see what honest math looks like. This is exactly the model we used with our client from Sibiu, the one who reached RON2,161,742 in sales.",
        },
        {
          type: "table",
          headers: ["Item", "Amount"],
          rows: [
            ["Sale price", "EUR500"],
            ["Cost of goods (China + EU transport)", "EUR220"],
            ["Shipping to customer", "EUR28"],
            ["Packaging and labels", "EUR7"],
            ["Estimated returns, 6% on category", "EUR13"],
            ["Payment processing (PayU 2.2%)", "EUR11"],
            ["Manual packing (allocated)", "EUR4"],
            ["Total variable costs", "EUR283"],
            ["Gross profit per unit", "EUR217"],
            ["Real net margin", "43.4%"],
          ],
        },
        {
          type: "p",
          text: "Real margin, 43.4%, not 56%. The 12.6-point gap is EUR63 per scooter. At 100 scooters a month, EUR6,300 the founder thinks is allocated for ads and isn't anywhere. That's why, when you scale on the wrong margin, the first two months seem to work, and the bank statement for month three hands you the reality.",
        },
        {
          type: "p",
          text: "And this is just one product. Imagine a store with 50 SKUs, each with different margin. One at 45%, another at 8%, another at 22%. If you scale the whole store together, you also scale the products that bury you. That's why the first step in any scaling is to calculate margin on EVERY product. Not per category. Not per store. Per product.",
        },
        {
          type: "h2",
          text: "Scaling thresholds",
        },
        {
          type: "table",
          headers: ["Net margin", "Verdict"],
          rows: [
            ["Below 15%", "You can't scale. Commission and media cost eat you alive. First move is restructuring the product, not buying ads."],
            ["15-25%", "Limited scaling. Small ad budget, heavy focus on repeat customers and LTV growth. Every euro counts here."],
            ["25-40%", "Healthy zone. You can scale on commission without dying, provided operations can keep up. Most successful businesses are here."],
            ["Above 40%", "Room for aggressive scaling. Sustained creative testing, bigger volumes, new audience exploration. But beware: high margin attracts competition."],
          ],
        },
        {
          type: "p",
          text: "Notice there's no 'it depends.' Below 15% you don't scale, period. You can't. If you give 10% agency commission and 5% processing costs, you're left with zero. And that assumes ads work perfectly, which never happens.",
        },
        {
          type: "h2",
          text: "How to grow margin without raising price",
        },
        {
          type: "ol",
          items: [
            "Switch supplier or negotiate volume. Going from 100 to 1,000 units a month gets you 15-25% off. Beyond that, more. A client in the fashion industry got an 18% discount just by concentrating orders on 11 SKUs instead of 340.",
            "Optimize packaging. Smaller box means cheaper volumetric shipping. On bulky products, the difference can be 20-30% per order. I've seen a case where switching from standard to custom box reduced shipping cost by EUR2.4 per order. At 1,000 orders, EUR2,400 saved. Without changing the price.",
            "Reduce returns. Better photos, clearer specs, product video. Customers get what they expected. Return rate drops from 6-8% to 2-3%. Every return less is profit more.",
            "Bundles. Sell two or three products together at a small discount. AOV rises, shipping cost splits across items, effective margin goes up. Example: you sell a hairbrush at EUR10, margin 30%. You sell a set brush + shampoo + conditioner at EUR24, effective margin 42% because shipping is the same.",
            "Checkout upsell. Extended warranty, accessories, setup service. Margins there are 60-80%. Adds real profit with no extra marketing budget. A customer buying a scooter might buy a helmet too. Helmet margin is 65%. That's pure added margin.",
          ],
        },
        {
          type: "callout",
          tone: "red",
          title: "The lie 7 out of 10 founders tell themselves",
          text: "'My margin is 40%.' Dig in, it comes out at 22-28%. Not bad faith. Lack of practice. If an agency starts working with you without asking you to calculate margin per product, you've signed up for a relationship that ends badly. They can't scale properly what you haven't measured.",
        },
        {
          type: "h2",
          text: "The 30-minute exercise",
        },
        {
          type: "p",
          text: "Open Excel. Put every product on the site as a row. Seven cost columns, from the list above. Calculate real margin on each. Sort descending. Within 30 minutes you'll see something you haven't seen before.",
        },
        {
          type: "ul",
          items: [
            "Two or three products with margin above 40%. That's where the money is. Scale here. Put 80% of ad budget on them.",
            "Five to eight products at 20-35% margin. That's where you work on cost and bundle plays. Don't stop them, but don't scale them yet.",
            "Products below 15%. Remove from the catalog, or use them as loss-leaders for AOV, knowing you lose on them to win on the cart. But don't put them in paid campaigns. There you just burn money.",
          ],
        },
        {
          type: "p",
          text: "This exercise is the first thing we do with every new client. Before opening Meta Ads Manager. Before talking budget. Before anything. Because if we don't know margin, every budget decision is Russian roulette. You might win, or you might blow your account.",
        },
        {
          type: "h2",
          text: "How real margin changed our entire strategy",
        },
        {
          type: "p",
          text: "A client in the fashion industry came with 340 SKUs and reported average margin of 28%. We did the exercise above. Result: 11 products with real margin above 40%. 23 products with margin between 25% and 40%. The remaining 306 under 20%, of which 89 under 10%.",
        },
        {
          type: "p",
          text: "The decision was drastic. We cut 306 products from campaigns. We concentrated all budget on 11 hero products. We negotiated an 18% supplier discount on concentrated volume. We increased AOV with bundles. We added checkout upsells. In 8 months, average margin climbed from 12% to 38%. Sales grew 15x.",
        },
        {
          type: "p",
          text: "Same marketing budget. Same platforms. Only now we knew where we put the money. Before we threw money randomly at 340 products and hoped. Now we put money strategically on 11 and knew why. That's the difference between hoping and calculating.",
        },
        {
          type: "callout",
          tone: "lime",
          title: "The core idea",
          text: "You can't scale a business faster than margin allows. Calculate honestly. Adjust the catalog. Only then launch ads. Any other order is the recipe for an elegant bankruptcy, with beautiful reports and unpaid invoices. Agencies that propose to 'test and see' without knowing your margin won't scale you. They'll burn you slowly.",
        },
        {
          type: "h2",
          text: "How to use margin to filter agencies",
        },
        {
          type: "p",
          text: "On the first call with an agency, ask this: 'What's the real net margin on my best-selling product?' If the agency doesn't know, that's fine. If the agency doesn't ask, that's a big problem. An agency that starts talking about budget, audiences, and creatives before knowing if you can pay their commission and still make profit isn't an agency. It's a hope seller.",
        },
        {
          type: "p",
          text: "We turn down clients whose margin is below 15%. Not because we don't like them. Because mathematically it doesn't make sense. If you sell a product with 12% net margin and we take 7% commission, you have 5% left. From that 5% you need to pay fixed costs, salaries, rent. It can't work. And there's no point starting a relationship that will end in bitterness.",
        },
        {
          type: "h2",
          text: "Immediate action: calculate now",
        },
        {
          type: "ol",
          items: [
            "Open Excel or Google Sheets.",
            "Put your top 5 products by sales.",
            "Calculate net margin with all 7 variable costs from above.",
            "If margin is below 15% on all, stop any ad budget and fix the product first.",
            "If you have at least one product above 25%, apply for a free audit and let's see how we scale.",
          ],
        },
        {
          type: "p",
          text: "If you want to check whether your margin supports scaling, apply for a 30-minute audit. We'll analyze your products together, calculate real margin, and tell you if it makes sense to invest in ads or restructure first. No cost. No obligation. Just truth on numbers.",
        },
      ],
    },
  },
};
