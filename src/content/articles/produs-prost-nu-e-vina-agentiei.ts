import type { Article } from "./types";

export const produsProstNuEVinaAgentiei: Article = {
  slug: "produs-prost-nu-e-vina-agentiei",
  publishedAt: "2026-03-10",
  readTime: { ro: "18 min", en: "18 min" },
  tag: "protectie",
  translations: {
    ro: {
      title: "Produs prost, nu vina agentiei. Aici gresesti cel mai des.",
      hook: "Agentia nu vinde marfa proasta. Dar tu platesti ca si cum ar vinde. Si atunci cine e de vina: produsul, pretul, checkout-ul, sau omul care da like-uri?",
      metaTitle: "Cum diferentiezi un produs slab de o agentie proasta",
      metaDescription:
        "Cum stii daca rezultatele slabe vin din produs, pret, checkout sau agentie. Diagnostic clar pe cifre, nu pe sentimente.",
      blocks: [
        {
          type: "p",
          text: "Am vorbat saptamana trecuta cu un antreprenor din Arad. Se lupta cu agentia de opt luni. Opt luni de bani dati, de rapoarte, de promisiuni. Nimic nu se misca. A trecut de la una la alta, a crescut bugetul, a scazut bugetul, a schimbat targetul. Pana cand a deschis eu contul si am vazut ceva simplu. Produsul lui se vindea cu 89 de lei pe o pagina care se incarca in 11 secunde pe mobil. Nici Iisus n-avea ROAS bun pe o pagina de 11 secunde. Agentia anteriora nu ii spusese asta. Nu pentru ca erau rai. Pentru ca nu se uitau. Iar antreprenorul, bineinteles, dadea vina pe 'strategia de ads'. Problema nu era strategia. Era ca nimeni nu se uitase la produs ca la o experienta intreaga.",
        },
        {
          type: "p",
          text: "Acest articol nu e sa-ti arat cum sa dai vina pe altcineva. E sa-ti arat cum sa stii, pe baza de cifre, care e componenta care strica intregul. Cand stii unde e ruptura, poti repara. Cand presupui, dai bani pe supozitii. Multi antreprenori platesc pentru optimizari de ads cand de fapt ar trebui sa plateasca pentru un developer care sa repare checkout-ul. Multi platesc pentru campanii noi cand ar trebui sa-si vada pretul fata de concurenta. Mai intai diagnostic. Apoi solutie. Nu invers.",
        },
        {
          type: "callout",
          tone: "ink",
          title: "Cadrul de diagnostic in 60 de secunde",
          text: "Vrei sa stii daca e produsul sau agentia? Deschide Ads Manager si verifica trei cifre. CTR sub 1%: mesajul nu prinde sau audienta e proasta. ATC sub 2% din click-uri: landing-ul nu convinge sau incarcare lenta. Purchase sub 0.5% din ATC: checkout, pret, sau incredere. Nu e vrajitorie. E matematica de clasa a cincea. Si totusi, 80% din antreprenori nu stiu sa citeasca cele trei cifre in ordine.",
        },
        { type: "h2", text: "Semnalele care spun ca e produsul" },
        {
          type: "p",
          text: "Produsul e o problema cand ai CTR bun, ATC bun, dar nu se cumpara. Adica lumea ajunge la produs, e interesata, dar la final spune nu. Aici cauzele sunt de obicei pretul, increderea, sau utilitatea perceputa. Un produs de 200 de lei care promite acelasi lucru ca unul de 80 pe eMag nu are cum sa prinda, indiferent cat de frumoase sunt anunturile. Agentia nu poate schimba pretul. Nu poate schimba fizicul produsului. Poate doar sa incerce sa vanda ceva care nu e vandabil. Si atunci cine e de vina?",
        },
        {
          type: "ul",
          items: [
            "Pretul e cu 30% peste medie si nu oferi un motiv clar de diferentiere",
            "Review-urile sunt sub 4 stele sau sub 50 de bucati per produs",
            "Descrierea e copiata de pe site-ul furnizorului, fara niciun beneficiu tradus in limba clientului",
            "Imaginile sunt facute cu telefonul, pe masa din bucatarie, cu lumina de bec",
            "Nu exista politica de retur clara sau garantie vizibila inainte de butonul de cumpara",
            "Produsele sunt intr-o categorie saturata, cu 15 concurenti care arata si pretuiesc mai bine",
          ],
        },
        {
          type: "p",
          text: "Am vazut un caz in care CTR-ul era 2.1%, ATC-ul era 4%, dar conversion rate era 0.2%. Lumea intra, se uita, nu cumpara. Am deschis pagina produsului. Pretul era corect. Imaginile erau ok. Dar politica de retur era ascunsa sub un link de 'termeni si conditii'. Clientul nu vedea ca poate returna in 30 de zile pana sa dea click pe cumpara. Am mutat garantia deasupra butonului. Conversion rate a urcat la 0.9% in doua saptamani. Nu agentia era problema. Era increderea. Dar nimeni nu se uitase acolo pentru ca toti erau ocupati sa 'optimizeze campaniile'.",
        },
        { type: "h2", text: "Semnalele care spun ca e agentia" },
        {
          type: "p",
          text: "E agentia cand mesajul nu prinde, audienta e prost aleasa, sau landing-ul trimis e dezastru. Aici antreprenorul are tot dreptul sa fie furios. Ai dat bani pentru un serviciu care nu si-a facut tema. Semnele sunt clare. CTR sub 0.5% pe o audienta de mai mult de 10.000 de oameni inseamna ca anuntul e irelevant sau creativul e prost. Un CTR de 0.2% nu inseamna ca 'algoritmul invata'. Inseamna ca anuntul tau e invizibil sau enervant.",
        },
        {
          type: "ul",
          items: [
            "CTR sub 0.5% timp de mai mult de 14 zile fara schimbare de creative",
            "Audienta e prea larga, peste 2 milioane de oameni, fara segmentare clara",
            "Landing-ul trimis de anunt nu corespunde cu promisiunea din anunt",
            "Bugetul e impartit in 15 campanii mici, fiecare fara suficiente conversii ca sa invete",
            "Nu exista testare de creative in rotatie, doar un singur anunt care 'functioneaza bine' de luni de zile",
            "Rapoartele nu arata POAS sau CAC, doar reach, engagement si 'impresii pozitive'",
          ],
        },
        {
          type: "p",
          text: "Un client din Constanta avea un produs bun, pret corect, landing curat. CTR 0.3%. L-am deschis. Agentia rulasera aceleasi trei imagini de la lansare, acum sase luni. Imagini de stock, cu un tip zambind la birou. Produsul era un suplement pentru somn. Imaginea de stock arata un om treaz si fericit. Mesajul era 'Dormi mai bine'. Imaginea arata pe cineva care nu are nevoie de produs. Am schimbat creativ-ul cu o imagine reala, luata de client, a unui pat neatins dimineata, cu textul 'Cum arata patul tau la 7 dimineata?'. CTR a sarit la 1.8% in patru zile. Aceea nu era vina produsului. Era vina agentiei care nu se gandea la congruenta dintre imagine si mesaj.",
        },
        { type: "h2", text: "Semnalele care spun ca e oferta" },
        {
          type: "p",
          text: "Oferta inseamna ce primeste clientul, la ce pret, cu ce bonusuri, cu ce garantii. O oferta proasta nu se repara cu ads mai bune. Se repara cu structura mai buna. Daca vrei sa vinzi un ceas la 500 de lei si concurenta vinde acelasi ceas la 320, nu exista copy care sa salveze diferenta. Trebuie sa adaugi ceva in oferta. Bundles, garantii extinse, consultanta post-vanzare, unghi de nisa pe care concurenta nu-l acopera.",
        },
        {
          type: "ul",
          items: [
            "Nu exista oferta clara de valoare, doar descrierea produsului",
            "Nu exista bonus sau urgency in pagina de vanzari",
            "Garantia e prezenta dar invizibila sau neclara",
            "Produsul se vinde singur, fara bundles sau upsells",
            "Nu exista element de social proof recent, doar review-uri vechi sau generice",
          ],
        },
        {
          type: "p",
          text: "Am preluat un cont de skincare in care produsul era excelent, pretul rezonabil, landing-ul curat. Dar oferta era: 'Crema hidratanta, 150 ml'. Atat. Nici un bundle, nici o garantie, nici un testimonial video, nici o comparatie cu concurenta. Am adaugat un bundle cu un cleanser la 40% reducere, am pus un testimonial video de 30 de secunde, am adaugat o garantie de 60 de zile 'bani inapoi fara intrebari'. AOV-ul a crescut cu 35%, conversion rate cu 1.2%. Nu era agentia. Nu era produsul. Era oferta care nu convingea.",
        },
        {
          type: "callout",
          tone: "red",
          title: "Regula de fier",
          text: "Daca produsul, oferta si checkout-ul sunt corecte, iar agentia nu livreaza CTR minim 0.8-1% si conversion rate minim 1%, e agentia. Daca produsul are review-uri sub 4 stele, pret cu 30% peste piata, si checkout cu 5 pasi, nu e agentia. E produsul. Nu platesti agentia sa repare produsul. Platesti agentia sa vanda produsul corect.",
        },
        {
          type: "p",
          text: "Cel mai mare pericol e sa arunci cu bani in ads atunci cand produsul sau oferta nu sunt pregatite. E ca si cum ai accelera cu o masina cu rotile strambe. O sa mergi mai repede spre dezastru. Primul lucru pe care il facem la fiecare audit e sa deschidem pagina de produs, sa citim review-urile, sa vedem checkout-ul, sa verificam pretul fata de concurenta. Abia apoi deschidem Ads Manager. Pentru ca daca produsul nu tine, nici cel mai bun copywriter din lume nu te salveaza.",
        },
        {
          type: "p",
          text: "Iar daca produsul tine si agentia nu livreaza, nu te teme sa schimbi. Multi antreprenori stau prea mult cu agentii slabe dintr-un amestec de loialitate si frica. Loialitatea nu plateste salariile. Cifrele da. Daca CTR-ul sta la 0.3% de trei luni si audienta e larga cat Europa de Est, agentia nu stie ce face. Sau nu vrea sa recunoasca. Sau amandoua. Oricum, tu platesti.",
        },
        {
          type: "p",
          text: "Un ultim lucru. Nu e nevoie sa te simti prost daca realizezi ca produsul tau nu e pregatit pentru ads. E un semn de inteligenta sa recunosti asta inainte sa dai zeci de mii de euro pe ads care nu vor converti. E mai inteligent sa opresti, repari produsul, oferta sau checkout-ul, si abia apoi sa scalezi. Acel fondator din Arad cu pagina de 11 secunde? A platit 14.000 de euro pe opt luni de ads inainte sa afle ca problema era viteza de incarcare. A reparat-o in doua ore. Daca ar fi stiut sa citeasca cele trei cifre, ar fi aflat in saptamana 1.",
        },
        {
          type: "callout",
          tone: "lime",
          title: "Ce faci azi",
          text: "Deschide Ads Manager. Verifica CTR, ATC rate si Conversion rate. Daca CTR < 1% si ATC < 2%, landing-ul sau anuntul e problema. Daca CTR si ATC sunt ok dar conversion < 0.5%, produsul, pretul sau checkout-ul e problema. Daca toate trei sunt sub prag, ai probleme in toate cele trei zone. Nu cauta vinovati. Cauta cifre.",
        },
        {
          type: "h2",
          text: "Cum folosesti diagnosticul ca sa filtrezi agentiile",
        },
        {
          type: "p",
          text: "La primul call cu o agentie, pune intrebarea asta: 'Cum faceti diagnosticul inainte sa incepeti campaniile?' Daca raspunsul e 'nu facem, doar pornim', ai o problema. O agentie serioasa incepe cu auditul produsului, al ofertei, al checkout-ului. Abia apoi deschide Ads Manager. Pentru ca stie ca daca produsul nu tine, nici cel mai bun ads manager nu te salveaza.",
        },
        {
          type: "h2",
          text: "Ce faci azi, concret",
        },
        {
          type: "ol",
          items: [
            "Deschide Ads Manager. Noteaza CTR, ATC rate, Conversion rate.",
            "Verifica pagina de produs pe mobil. E rapida? E clara? Are social proof?",
            "Verifica pretul fata de concurenta. E competitiv? Oferta e clara?",
            "Verifica checkout-ul. Cati pasi sunt? Functioneaza pe Safari?",
            "Daca toate trei zone sunt ok si agentia nu livreaza, e timpul sa schimbi.",
          ],
        },
        {
          type: "p",
          text: "Daca vrei sa stii daca problema e produsul, oferta, checkout-ul sau agentia, aplica pentru un audit gratuit de 30 de minute. Analizam impreuna cele trei cifre cheie, pagina ta de produs, si iti spunem exact unde e ruptura. Fara cost. Fara obligatie. Doar adevarul pe cifre.",
        },
      ],
    },
    en: {
      title: "Bad product, not the agency's fault. This is where you mess up most often.",
      hook: "The agency doesn't sell bad merchandise. But you pay them like they do. So who's at fault: the product, the price, checkout, or the person handing out likes?",
      metaTitle: "How to tell a weak product from a bad agency",
      metaDescription:
        "How to know if poor results come from product, price, checkout, or the agency. Clear diagnosis with numbers, not feelings.",
      blocks: [
        {
          type: "p",
          text: "I spoke last week with a founder from Arad. He'd been fighting his agency for eight months. Eight months of money spent, reports, promises. Nothing moved. He switched agencies, raised budget, lowered budget, changed targeting. Until I opened the account and saw something simple. His product sold for 89 lei on a page that loaded in 11 seconds on mobile. Not even Jesus had a good ROAS on an 11-second page. The previous agency hadn't told him this. Not because they were evil. Because they weren't looking. And the founder, of course, blamed the 'ads strategy'. The problem wasn't the strategy. It was that nobody had looked at the product as a whole experience.",
        },
        {
          type: "p",
          text: "This article isn't about shifting blame. It's about knowing, based on numbers, which component is breaking the whole. When you know where the tear is, you can fix it. When you guess, you pay for guesses. Many founders pay for ad optimizations when they should be paying a developer to fix checkout. Many pay for new campaigns when they should be looking at their price against competitors. First diagnosis. Then solution. Not the other way around.",
        },
        {
          type: "callout",
          tone: "ink",
          title: "The 60-second diagnostic framework",
          text: "Want to know if it's the product or the agency? Open Ads Manager and check three numbers. CTR below 1%: message doesn't land or audience is bad. ATC below 2% of clicks: landing doesn't convince or loads slowly. Purchase below 0.5% of ATC: checkout, price, or trust. Not magic. Fifth-grade math. And yet 80% of founders don't know to read these three numbers in order.",
        },
        { type: "h2", text: "Signals that say it's the product" },
        {
          type: "p",
          text: "The product is the problem when you have good CTR, good ATC, but no purchases. Meaning people get to the product, they're interested, but at the end they say no. The causes here are usually price, trust, or perceived utility. A 200 lei product that promises the same thing as an 80 lei one on eMag can't catch on, no matter how beautiful the ads are. The agency can't change the price. Can't change the physical product. Can only try to sell something that's not sellable. So then who's at fault?",
        },
        {
          type: "ul",
          items: [
            "Price is 30% above average and you offer no clear differentiation reason",
            "Reviews are below 4 stars or under 50 per product",
            "Description is copied from the supplier's site, with no benefit translated into the customer's language",
            "Images are taken with a phone, on the kitchen table, under a light bulb",
            "No clear return policy or guarantee visible before the buy button",
            "Products are in a saturated category with 15 competitors who look and price better",
          ],
        },
        {
          type: "p",
          text: "I saw a case where CTR was 2.1%, ATC was 4%, but conversion rate was 0.2%. People enter, look, don't buy. I opened the product page. Price was right. Images were okay. But the return policy was hidden under a 'terms and conditions' link. The customer didn't see they could return in 30 days before clicking buy. We moved the guarantee above the button. Conversion rate rose to 0.9% in two weeks. That wasn't the agency's fault. It was trust. But nobody had looked there because everyone was busy 'optimizing campaigns'.",
        },
        { type: "h2", text: "Signals that say it's the agency" },
        {
          type: "p",
          text: "It's the agency when the message doesn't land, the audience is poorly chosen, or the landing page sent is a disaster. Here the founder has every right to be angry. You paid for a service that didn't do its homework. The signs are clear. CTR below 0.5% on an audience of more than 10,000 people means the ad is irrelevant or the creative is bad. A 0.2% CTR doesn't mean 'the algorithm is learning'. It means your ad is invisible or annoying.",
        },
        {
          type: "ul",
          items: [
            "CTR below 0.5% for more than 14 days without creative change",
            "Audience is too broad, over 2 million people, with no clear segmentation",
            "Landing page from the ad doesn't match the promise in the ad",
            "Budget is split into 15 small campaigns, each without enough conversions to learn",
            "No creative rotation testing, just one ad that 'works well' for months",
            "Reports don't show POAS or CAC, only reach, engagement and 'positive impressions'",
          ],
        },
        {
          type: "p",
          text: "A client from Constanta had a good product, correct price, clean landing. CTR 0.3%. I opened it. The agency had been running the same three images since launch, six months ago. Stock images, with a guy smiling at a desk. The product was a sleep supplement. The stock image showed someone awake and happy. The message was 'Sleep better'. The image showed someone who doesn't need the product. We changed the creative to a real image, taken by the client, of an unmade bed in the morning, with the text 'What does your bed look like at 7 AM?'. CTR jumped to 1.8% in four days. That wasn't the product's fault. It was the agency that didn't think about congruence between image and message.",
        },
        { type: "h2", text: "Signals that say it's the offer" },
        {
          type: "p",
          text: "The offer means what the customer gets, at what price, with what bonuses, with what guarantees. A bad offer isn't fixed with better ads. It's fixed with better structure. If you want to sell a watch for 500 lei and the competitor sells the same watch for 320, there's no copy that saves the gap. You need to add something to the offer. Bundles, extended guarantees, post-sale consulting, a niche angle the competitor doesn't cover.",
        },
        {
          type: "ul",
          items: [
            "No clear value offer, just product description",
            "No bonus or urgency on the sales page",
            "Guarantee exists but invisible or unclear",
            "Product sells alone, no bundles or upsells",
            "No recent social proof element, only old or generic reviews",
          ],
        },
        {
          type: "p",
          text: "I took over a skincare account where the product was excellent, price reasonable, landing clean. But the offer was: 'Moisturizing cream, 150 ml'. That was it. No bundle, no guarantee, no video testimonial, no comparison with competitors. We added a bundle with a cleanser at 40% off, added a 30-second video testimonial, added a 60-day 'no-questions-asked' money-back guarantee. AOV rose 35%, conversion rate by 1.2%. It wasn't the agency. It wasn't the product. It was the offer that didn't convince.",
        },
        {
          type: "callout",
          tone: "red",
          title: "The iron rule",
          text: "If product, offer and checkout are correct, and the agency doesn't deliver minimum 0.8-1% CTR and 1% conversion rate, it's the agency. If the product has under 4-star reviews, price 30% above market, and a 5-step checkout, it's not the agency. It's the product. You don't pay the agency to fix the product. You pay the agency to sell the product correctly.",
        },
        {
          type: "p",
          text: "The biggest danger is throwing money at ads when the product or offer isn't ready. It's like accelerating a car with crooked wheels. You'll go faster toward disaster. The first thing we do in every audit is open the product page, read reviews, see checkout, check price against competitors. Only then do we open Ads Manager. Because if the product doesn't hold, not even the best copywriter in the world can save you.",
        },
        {
          type: "p",
          text: "And if the product holds and the agency doesn't deliver, don't be afraid to switch. Many founders stay too long with weak agencies out of a mix of loyalty and fear. Loyalty doesn't pay salaries. Numbers do. If CTR sits at 0.3% for three months and the audience is as wide as Eastern Europe, the agency doesn't know what they're doing. Or doesn't want to admit it. Or both. Either way, you pay.",
        },
        {
          type: "p",
          text: "One last thing. There's no need to feel bad if you realize your product isn't ready for ads. It's a sign of intelligence to recognize this before spending tens of thousands on ads that won't convert. It's smarter to stop, fix the product, offer, or checkout, and only then scale. That founder from Arad with the 11-second page? He paid 14,000 euros over eight months of ads before finding out the problem was loading speed. He fixed it in two hours. If he'd known how to read those three numbers, he would have known in week 1.",
        },
        {
          type: "callout",
          tone: "lime",
          title: "What to do today",
          text: "Open Ads Manager. Check CTR, ATC rate, and Conversion rate. If CTR < 1% and ATC < 2%, the landing or ad is the problem. If CTR and ATC are okay but conversion < 0.5%, the product, price, or checkout is the problem. If all three are below threshold, you have problems in all three areas. Don't look for blame. Look for numbers.",
        },
        {
          type: "h2",
          text: "How to use diagnosis to filter agencies",
        },
        {
          type: "p",
          text: "On the first call with an agency, ask: 'How do you do diagnosis before starting campaigns?' If the answer is 'we don't, we just start', you have a problem. A serious agency starts with auditing the product, offer, and checkout. Only then opens Ads Manager. Because they know that if the product doesn't hold, not even the best ads manager can save you.",
        },
        {
          type: "h2",
          text: "What you do today, concretely",
        },
        {
          type: "ol",
          items: [
            "Open Ads Manager. Write down CTR, ATC rate, Conversion rate.",
            "Check your product page on mobile. Is it fast? Is it clear? Does it have social proof?",
            "Check your price against competitors. Is it competitive? Is the offer clear?",
            "Check your checkout. How many steps? Does it work on Safari?",
            "If all three areas are okay and the agency doesn't deliver, it's time to switch.",
          ],
        },
        {
          type: "p",
          text: "If you want to know whether the problem is product, offer, checkout, or agency, apply for a free 30-minute audit. We'll analyze the three key numbers, your product page, and tell you exactly where the break is. No cost. No obligation. Just truth on numbers.",
        },
      ],
    },
  },
};
