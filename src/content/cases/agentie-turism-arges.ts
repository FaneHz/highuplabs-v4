import type { CaseStudy } from "./types";

export const agentieTurismArges: CaseStudy = {
  slug: "agentie-turism-arges",
  publishedAt: "2026-03-29",
  readTime: { ro: "17 min", en: "17 min" },
  translations: {
    ro: {
      title: "1,7 milioane lei în 12 luni. Pornind de la zero digital. 993 de facturi.",
      subtitle:
        "Aveau o pagină de Facebook cu engagement și un site WordPress abandonat. Patru luni, 3.000 de euro cheltuiți pe reach, zero rezervări trackabile. Am pornit de la un Pixel curat și un Excel cu marje. Am terminat cu 993 de facturi.",
      industry: "Turism · Pachete locale",
      metaTitle: "Agenție turism Argeș, 1,7M lei în 12 luni, POAS 3,2x",
      metaDescription:
        "Agenție de turism mică din Argeș. De la zero digital la 1.700.657 lei revenue, 993 facturi în 2025. POAS 3,2x, retenție 85%, full funnel pe Meta.",
      hook: "Șase oameni. 45 de pachete. Prețuri între 800 și 4.500 de lei. 90% din vânzări din recomandări. Restul de unde apuca. Fără sistem. Fără Pixel. Fără să știe care pachete sunt profitabile.",
      heroStats: [
        { value: "1,7M Lei", label: "Revenue 2025", highlight: true },
        { value: "993", label: "Facturi emise" },
        { value: "4.436 Lei", label: "Revenue / zi 2026" },
        { value: "3,2x", label: "POAS mediu" },
      ],
      sections: [
        {
          type: "narrative",
          heading: "Cum a ajuns managera la noi. Și de ce seriozitatea începe cu \"n-am buget mare\".",
          paragraphs: [
            "Ne-a scris în decembrie 2024. Mesaj scurt: \"Vedem foarte multe postări de la voi despre POAS. Înțeleg ce spuneți. Mi-ar plăcea să discutăm, dar n-am buget mare.\" Așa începe mai orice conversație serioasă. Oamenii care vor să verifice dacă merită încep așa. Oamenii care vor să fie amăgiți încep cu \"vreau să fac 1 milion de euro în 3 luni\".",
            "La primul call ne-a povestit ce pățise cu agenția de dinainte. Patru luni. Trei mii de euro. Campanii de reach și engagement peste tot. La sfârșit avea 12.000 de like-uri noi, vreo 400 de comentarii entuziaste, multe \"ce frumos!\", și o întrebare simplă fără răspuns: \"Câte rezervări au venit concret din reclamele alea?\" Niciuna trackabilă. Nu pentru că erau prost făcute. Pentru că nimeni nu le spusese să aducă rezervări. Le spuseseră să aducă atenție. Le-au adus. Și atenția nu plătește salariile.",
            "Când am intrat în cont am găsit peisaj pustiu. Nici Pixel. Nici Conversion API. Nici măcar un eveniment custom pe click la numărul de telefon. Pagina lor de booking era, de fapt, pagina de Facebook: oamenii scriau DM, echipa răspundea când apuca. Timp de răspuns mediu: 6 ore. Într-o industrie în care decizia de cumpărare se face în 45 de minute. Dacă nu răspunzi în 45 de minute, clientul a rezervat deja la altcineva.",
            "Dar cel mai nasol lucru era ăsta: dintre cele 45 de pachete, nimeni nu putea spune cu precizie care sunt profitabile după ce scoteai ghizii, transportul, cazarea, mesele și comisioanele. Aveau instinct. Aveau experiență. Nu aveau cifre. Iar în turism, fără cifre, ești jucător la păcănele. Uneori câștigi, dar nu știi de ce. Și nu poți reproduce.",
          ],
        },
        {
          type: "discovery",
          heading: "Ce-am descoperit în două săptămâni. Și de ce 800 de clienți vechi erau ignorați.",
          intro:
            "Auditul nostru n-a fost doar pe reclame. Am stat de vorbă cu echipa operațională, cu doi ghizi și cu administrativul. Din discuții plus un Excel cu marjele nete pe fiecare pachet, a ieșit o imagine pe care nimeni n-o văzuse până atunci.",
          items: [
            "Din 45 de pachete, doar 22 aveau marjă netă peste 20%. Dintre restul, 15 erau la limită, iar 8 direct în pierdere când se adunau toate costurile — inclusiv retururi, cancelări și pachete complementare vândute sub cost pentru atragere client. Câteva dintre pachetele pe care le promovau cel mai des erau exact cele care îi costau bani. Adică plăteau ca să piardă. Și nu știau.",
            "Infrastructura de conversie lipsea cu desăvârșire. Cineva care voia să rezerve un circuit la Rucăr trebuia să dea click pe reclamă, să aterizeze pe pagina de Facebook, să vadă un album cu 23 de poze din 2019, apoi să scrie DM. Rata estimată de conversie din click la rezervare: sub 1%. Adică din 100 de oameni care dădeau click, sub 1 rezerva. Restul plecau în timpul drumului.",
            "Sezonalitatea era tratată ca dușman, nu ca realitate. Bugetul pe vară și iarnă rula la fel ca-n primăvară și toamnă. Rezultatul: primăvara CPA-ul sărea de patru ori, pentru că nu avea cine să cumpere un retreat montan când ploua în fiecare weekend. Agenția nu ajusta. Doar raporta că nu merge.",
            "Campaniile vechi optimizau pe engagement. Meta învăța fix să aducă oameni care dau like și pleacă. Era normal. Asta îi cerusei. Doar că de acolo la rezervare e drum lung, și nimeni nu construise drumul. Aveai 12.000 de like-uri și zero rezervări. Asta nu e eșecul Meta. E eșecul strategiei.",
            "Lista de clienți vechi avea peste 800 de nume. Niciodată atinsă sistematic. Oamenii care cumpăraseră un circuit anul trecut nu primeau nimic anul ăsta. Nu email, nu SMS, nu ofertă personalizată. 800 de oameni care demonstraseră deja că vor să călătorească cu tine, ignorați complet.",
          ],
        },
        {
          type: "strategy",
          heading: "Ce-am construit. Bucată cu bucată.",
          steps: [
            {
              title: "Două săptămâni doar pe cifre.",
              body: "Înainte de orice, am stat cu ei să facem exercițiul marjei nete pe fiecare dintre cele 45 de pachete. Cost cu ghizii (onorariu plus cazare pentru ei), transport propriu sau închiriat, cazare turiști, mese, asigurări, comisioane parteneriat. Rezultatul: lista de 22 de pachete care meritau bugete de reclame și restul care urmau să trăiască din organic și din clienți vechi. Niciun pachet n-a fost desființat, doar scos din ads. Asta e diferența. Nu omitem. Prioritizăm.",
            },
            {
              title: "Tracking curat, de la Pixel la offline.",
              body: "Meta Pixel plus Conversion API pe toți pașii funnel-ului: vizualizare pachet, click la detalii, inițiere checkout, rezervare confirmată, plată primită. Offline event tracking pentru plățile în numerar la sediu (pe care le primeau destul de des, clienți care voiau să vină să discute față în față înainte să plătească). Prima lună de date era deja aur: vedeam exact de unde se rup oamenii. 40% abandonau la pasul detalii. Am aflat că pagina era prea lungă și se încărca în 9 secunde pe mobil.",
            },
            {
              title: "Landing dedicat, nu site complet.",
              body: "N-am făcut site nou. Prea scump, prea lung. Am făcut trei landing-uri simple, pe trei categorii mari (montan, retreat, rural), fiecare cu social proof clar (review-urile Google 5 stele, la care nu se uitase nimeni), poze reale din ture (nu stock), pricing transparent, FAQ și booking în trei pași. WhatsApp Business conectat pentru răspuns rapid. Timp de răspuns țintă: sub 45 de minute. Pentru că am testat: sub 45 de minute, conversia de la lead la rezervare era 38%. Peste 4 ore, scădea la 12%. Asta e diferența dintre o afacere care merge și una care supraviețuiește.",
            },
            {
              title: "Full funnel pe Meta, pe bani controlați.",
              body: "TOFU cu Reels scurte de 15-30 de secunde, filmate de un ghid cu telefonul, cu destinații concrete și comentarii autentice. Nu video profesionist. Video real. MOFU cu carusele: pachet plus preț plus testimonial. BOFU cu oferte cu deadline și retargeting pe cei care abandonau la checkout. Buget inițial 800 de euro pe lună, urcat treptat pe măsură ce POAS-ul rezista. Nu am dat drumul la 3.000 de euro din prima zi. Am început mic, am validat, am crescut.",
            },
            {
              title: "Scaling sezonier, nu orb.",
              body: "Pachetele de iarnă (retreat-uri wellness, ture tematice pe zăpadă) au avut POAS mai mare decât cele de vară. Contraintuitiv, dar clar în date: clientul premium caută liniște când sunt sărbători, nu se uită la reduceri. Așa că bugetul de iarnă a mers cu x1,5. Vara cu x2, pe pachete montane clasice. În primăvară și toamnă, buget redus drastic, targeting fin pe clienți existenți și email pe lista lor de peste 800 de foști cumpărători. Fiecare leu cheltuit când oamenii nu vor să călătorească e un leu irosit.",
            },
            {
              title: "Google Ads și email, după luna a opta.",
              body: "După ce Meta scosese în primele șapte luni peste 1,1 milioane lei, am adăugat Google Ads pe keyword-uri locale și brand, plus un flow de email cu reminder-uri sezoniere și recomandări personalizate pe pachetele trecute. Rețenția clienților veniți prin ads a ajuns la 85% în 12 luni, confirmând ce speram: reclamele atrăgeau oamenii potriviți, nu turiști de oferte. Clienții care vin pentru preț pleacă pentru preț mai mic. Clienții care vin pentru experiență rămân.",
            },
          ],
        },
        {
          type: "screenshots",
          heading: "SmartBill-ul lor. Cifre fiscale. Nu rapoarte cosmetizate.",
          intro:
            "Nu sunt rapoarte din Meta, colorate frumos. Sunt facturile lor, în sistemul lor, pe care oricine vrea să le verifice o poate face la un call cu managera. An fiscal 2025 complet, plus primele trei luni din 2026.",
          shots: [
            {
              src: "/cases/turism-smartbill-2025.jpg",
              alt: "SmartBill agenție turism Argeș, an fiscal 2025 complet",
              caption: "SmartBill, anul 2025 (993 facturi, 1.700.657 lei)",
            },
            {
              src: "/cases/turism-smartbill-2026.jpg",
              alt: "SmartBill agenție turism Argeș, Q1 2026",
              caption: "SmartBill, Q1 2026 (390.349 lei, 4.436 lei/zi mediu)",
            },
          ],
        },
        {
          type: "numbers",
          heading: "Cifrele care contează.",
          intro:
            "Date din SmartBill și Meta Ads Manager. An fiscal 2025 complet (12 luni), comparație cu anul anterior.",
          rows: [
            { label: "Revenue anual din ads", before: "~0 RON", after: "1.700.657 Lei", note: "an 2025 complet" },
            { label: "Facturi din ads", before: "0", after: "993", note: "în 12 luni" },
            { label: "Revenue mediu pe zi (2026)", before: "~0 RON", after: "4.436 Lei", note: "Q1 2026" },
            { label: "Cost per rezervare", before: "N/A", after: "18,40 EUR" },
            { label: "POAS mediu", before: "Negativ", after: "3,2x" },
            { label: "Pachete active în ads", before: "N/A", after: "22 / 45", note: "restul pe organic" },
            { label: "Rețenție clienți din ads", before: "N/A", after: "85%", note: "revin în 12 luni" },
            { label: "Buget irosit anterior", before: "3.000 EUR", after: "0", note: "fără conversii trackabile" },
            { label: "Conversie lead sub 45 min", before: "N/A", after: "38%" },
            { label: "Conversie lead peste 4 ore", before: "N/A", after: "12%" },
          ],
        },
        {
          type: "mistakes",
          heading: "Trei momente în care am ratat. Și ce-am învățat.",
          intro:
            "N-a mers ceas elvețian. Trei momente la care ne întoarcem și ne spunem că le-am face altfel.",
          items: [
            "Am subestimat toamna. În septembrie 2025 am ținut bugetul la nivelul verii, pentru că mergea bine. În două săptămâni CPA-ul s-a dublat, pentru că rămăsese audiența rece aceeași, iar intenția de cumpărare scăzuse natural. Ne-am prins abia când am văzut două zile la rând cu zero rezervări. Am tăiat campaniile reci, am mutat bugetul pe retargeting și email. Dacă pregăteam planul sezonier cu două săptămâni înainte, nu pierdeam acele două weekend-uri. Lecție: sezonierul nu e opțional. E obligatoriu.",
            "În luna a treia ne-am entuziasmat și am construit landing-uri separate pentru șapte sub-categorii. Din șapte, doar trei au adunat trafic relevant. Celelalte patru au consumat timp de dezvoltare și au rămas goale. A fost o lecție de restricție. Data viitoare, trei landing-uri bine gândite, apoi A/B test, apoi încă unul, dacă justifică. Nu construiești tot din prima. Construiești minimul viabil, testezi, adaugi.",
            "În luna a patra, când scălam serios, nu am discutat suficient cu echipa operațională despre capacitatea lor. Rezultat: două săptămâni cu timp de răspuns pe WhatsApp între 12 și 18 ore. Am pierdut câteva rezervări care s-au dus la concurență. Data viitoare, conversația despre capacitate vine înainte de scaling, nu după. Nu poți aduce 100 de leaduri pe zi dacă echipa poate procesa 20. Matematica e simplă.",
          ],
        },
        {
          type: "learnings",
          heading: "Ce am luat de aici și aplicăm pe alte proiecte.",
          items: [
            "Pe servicii cu sezonalitate puternică, planul de buget se face cu un trimestru înainte, nu pe parcurs. La turism a fost evident. La orice client cu cerere ciclică (educație, fitness, beauty cu date specifice), facem acum un calendar de buget pe 12 luni înainte să dăm drumul la prima campanie. Nu ghicim. Planificăm.",
            "Audiența premium nu reacționează la reducere, reacționează la liniște și la timpul lor. Pachetele de iarnă au scos POAS mai mare cu cost mai ridicat pe rezervare. De-aia oprim acum % off pe segmentele premium și mergem pe oferte exclusive, liste scurte, mesaj personal. Diferență mare de POAS în 30 de zile. Reducerea atrage cumpărători de preț. Exclusivitatea atrage cumpărători de valoare.",
            "WhatsApp Business cu răspuns sub o oră bate orice landing perfect. Pe agenția asta, când scădea timpul de răspuns sub 45 de minute, rata de conversie de la lead la rezervare ajungea la 38%. Când urca peste 4 ore, scădea la 12%. Toate proiectele noi au acum response time SLA în contract, nu sugestie. E o clauză. Dacă nu respectă, discutăm.",
            "Email pe baza clienților vechi e cea mai ieftină rezervă de revenue. Lista lor de 800 de foști cumpărători, atinsă lunar cu reminder-uri sezoniere, a scos vreo 110.000 lei într-un an, cu cost zero pe ads. Pe orice business cu retenție mare, emailul e prima pârghie pe care o construim, înainte de scaling pe rece. E mai ieftin să păstrezi un client decât să aduci unul nou.",
          ],
        },
        {
          type: "quote",
          text: "Prima dată când am văzut cifrele din SmartBill după șase luni cu voi, am sunat să vă cer confirmare dacă e într-adevăr real. Nu credeam că se poate pe o agenție de turism mică într-o țară mică cu bugete mici. Acum când mă uit înapoi, diferența a fost simplă: voi ați vrut să vedeți la sfârșitul lunii că și noi am făcut bani, nu doar voi. Asta se vede în tot ce-ați construit.",
          attribution: "Managera agentiei de turism din Argeș, ianuarie 2026",
        },
      ],
    },
    en: {
      title: "1.7 million lei in 12 months. Starting from digital zero. 993 invoices.",
      subtitle:
        "They had a Facebook page with some engagement and a WordPress site untouched for years. Four months, three thousand euros spent on reach, zero trackable bookings. We started from a clean Pixel and an Excel with margins. We ended with 993 invoices.",
      industry: "Travel · Local packages",
      metaTitle: "Travel agency Arges, 1.7M lei in 12 months, POAS 3.2x",
      metaDescription:
        "Small travel agency in Arges. From digital zero to 1,700,657 lei revenue, 993 invoices in 2025. POAS 3.2x, 85% retention, full funnel on Meta.",
      hook: "Six people. 45 packages. Prices between 800 and 4,500 lei. 90% of sales from word of mouth. The rest from wherever. No system. No Pixel. No idea which packages were profitable.",
      heroStats: [
        { value: "1.7M Lei", label: "2025 revenue", highlight: true },
        { value: "993", label: "Invoices issued" },
        { value: "4,436 Lei", label: "Revenue / day 2026" },
        { value: "3.2x", label: "Average POAS" },
      ],
      sections: [
        {
          type: "narrative",
          heading: "How their manager ended up on our doorstep. And why \"we don't have a big budget\" is where seriousness begins.",
          paragraphs: [
            "She wrote us in December 2024. Short message: \"I've been reading your posts about POAS. I get the logic. I'd love to talk, but I don't have a big budget.\" That's how most serious conversations begin. People who want to verify if it's worth it start like this. People who want to be fooled start with I want to make 1 million euros in 3 months.",
            "On the first call she told us about her previous agency. Four months. Three thousand euros. Reach and engagement campaigns everywhere. At the end she had 12,000 new page likes, about 400 enthusiastic comments, lots of \"how beautiful!\", and one simple question nobody could answer: \"How many actual bookings came from those ads?\" None trackable. Not because the ads were badly made. Because nobody had asked them to bring bookings. They'd been asked to bring attention. They had. And attention doesn't pay salaries.",
            "When we got into the account we found a ghost town. No Pixel. No Conversion API. Not even a custom event on phone-number click. Their booking page was, in fact, their Facebook page: people sent DMs, the team answered when they could. Average response time: 6 hours. In an industry where the purchase decision happens in 45 minutes. If you don't reply in 45 minutes, the customer has already booked with someone else.",
            "But the worst thing was this: of their 45 packages, nobody on the team could say with certainty which were profitable after deducting guides, transport, accommodation, meals, and commissions. They had instinct. They had experience. They didn't have numbers. In travel, without numbers you're gambling. Sometimes you win, but you don't know why. And you can't do it again.",
          ],
        },
        {
          type: "discovery",
          heading: "What we found in two weeks. And why 800 past customers were being ignored.",
          intro:
            "Our audit wasn't just on ads. We sat with the ops team, two guides, and the admin. From those conversations plus an Excel with net margins per package, a picture emerged that nobody had seen before.",
          items: [
            "Of 45 packages, only 22 had net margin over 20%. Of the rest, 15 were borderline and 8 were straight-up losses once you added returns, cancellations, and complementary packages sold below cost as customer acquisition. Several of the packages they pushed most were exactly the ones losing them money. Meaning they paid to lose. And didn't know.",
            "Conversion infrastructure was basically nonexistent. Someone wanting to book a Rucăr tour had to click the ad, land on their Facebook page, see a 2019 album with 23 photos, then send a DM. Estimated click-to-booking rate: under 1%. Meaning out of 100 people who clicked, fewer than 1 booked. The rest left during the journey.",
            "Seasonality was treated as an enemy, not a reality. Summer and winter budgets ran the same as spring and fall. Result: in spring CPA quadrupled because nobody was in the market for a mountain retreat when it rained every weekend. The agency didn't adjust. Just reported that it wasn't working.",
            "Old campaigns optimized for engagement. Meta was learning precisely to bring people who liked and left. Which was normal. That's what you'd asked for. But from there to an actual booking is a long road, and nobody had built that road. You had 12,000 likes and zero bookings. That's not Meta's failure. It's the strategy's failure.",
            "The past customer list had over 800 names. Never touched systematically. People who'd bought a tour last year got nothing this year. No email, no SMS, no personalized offer. 800 people who'd already proven they want to travel with you, completely ignored.",
          ],
        },
        {
          type: "strategy",
          heading: "What we built. Piece by piece.",
          steps: [
            {
              title: "Two weeks just on the numbers.",
              body: "Before anything else, we sat with them and did the net margin exercise for each of the 45 packages. Guide cost (fee plus their accommodation), transport owned or rented, traveler accommodation, meals, insurance, partnership commissions. Result: a list of 22 packages worth advertising dollars and the rest living on organic and returning clients. Nothing was killed, just pulled from ads. That's the difference. We don't eliminate. We prioritize.",
            },
            {
              title: "Clean tracking, from Pixel to offline.",
              body: "Meta Pixel plus Conversion API on every funnel step: package view, details click, checkout initiation, confirmed booking, payment received. Offline event tracking for in-office cash payments (which they received often, clients who wanted to come meet face to face before paying). First month of data was already gold: we could see exactly where people were dropping off. 40% abandoned at the details step. We found the page was too long and loaded in 9 seconds on mobile.",
            },
            {
              title: "Dedicated landings, not a full website.",
              body: "We didn't build a new site. Too expensive, too long. We built three simple landings for three big categories (mountain, retreat, rural), each with clear social proof (the 5-star Google reviews nobody had been using), real trip photos (not stock), transparent pricing, FAQ, and three-step booking. WhatsApp Business connected for fast reply. Response time target: under 45 minutes. Because we tested: under 45 minutes, lead-to-booking conversion was 38%. Over 4 hours, it dropped to 12%. That's the difference between a business that works and one that survives.",
            },
            {
              title: "Full funnel on Meta, controlled spend.",
              body: "TOFU with short Reels of 15-30 seconds, filmed by a guide on his phone, with real destinations and authentic commentary. Not professional video. Real video. MOFU with carousels: package plus price plus testimonial. BOFU with deadline offers and retargeting on abandoners. Starting budget 800 euros a month, raised gradually as POAS held up. We didn't launch at 3,000 euros on day one. We started small, validated, grew.",
            },
            {
              title: "Seasonal scaling, not blind.",
              body: "Winter packages (wellness retreats, snow-themed tours) had higher POAS than summer. Counterintuitive, but clear in the data: premium clients seek calm during holidays, they don't chase discounts. So winter budget went x1.5. Summer x2 on classic mountain packages. In spring and fall, drastically reduced budget, fine targeting on existing clients, and email on their list of over 800 past buyers. Every euro spent when people don't want to travel is a euro wasted.",
            },
            {
              title: "Google Ads and email, after month eight.",
              body: "Once Meta had pulled over 1.1 million lei in the first seven months, we added Google Ads on local and brand keywords, plus an email flow with seasonal reminders and personalized recommendations based on past packages. Retention on ads-acquired clients hit 85% over 12 months, confirming what we'd hoped: the ads were attracting the right people, not bargain tourists. Customers who come for price leave for a lower price. Customers who come for experience stay.",
            },
          ],
        },
        {
          type: "screenshots",
          heading: "Their SmartBill. Tax numbers. Not prettified reports.",
          intro:
            "These aren't Meta reports, prettied up and color-coded. These are their invoices, in their system, which anyone who wants to verify them can do on a call with their manager. Full fiscal year 2025, plus the first three months of 2026.",
          shots: [
            {
              src: "/cases/turism-smartbill-2025.jpg",
              alt: "SmartBill Argeș travel agency, full fiscal year 2025",
              caption: "SmartBill, full 2025 (993 invoices, 1,700,657 lei)",
            },
            {
              src: "/cases/turism-smartbill-2026.jpg",
              alt: "SmartBill Argeș travel agency, Q1 2026",
              caption: "SmartBill, Q1 2026 (390,349 lei, 4,436 lei/day average)",
            },
          ],
        },
        {
          type: "numbers",
          heading: "The numbers that mattered most.",
          intro:
            "Data from SmartBill and Meta Ads Manager. Full fiscal year 2025 (12 months), compared to the prior year.",
          rows: [
            { label: "Annual revenue from ads", before: "~0 RON", after: "1,700,657 Lei", note: "full year 2025" },
            { label: "Invoices from ads", before: "0", after: "993", note: "in 12 months" },
            { label: "Average daily revenue (2026)", before: "~0 RON", after: "4,436 Lei", note: "Q1 2026" },
            { label: "Cost per booking", before: "N/A", after: "€18.40" },
            { label: "Average POAS", before: "Negative", after: "3.2x" },
            { label: "Active packages in ads", before: "N/A", after: "22 / 45", note: "rest on organic" },
            { label: "Client retention from ads", before: "N/A", after: "85%", note: "return within 12 months" },
            { label: "Wasted budget prior", before: "€3,000", after: "0", note: "no trackable conversions" },
            { label: "Lead conversion under 45 min", before: "N/A", after: "38%" },
            { label: "Lead conversion over 4 hours", before: "N/A", after: "12%" },
          ],
        },
        {
          type: "mistakes",
          heading: "Three moments we missed. And what we learned.",
          intro:
            "It wasn't Swiss-watch precise. Three moments we come back to and think we'd do differently.",
          items: [
            "We underestimated autumn. In September 2025 we kept the budget at summer level, because it was working. Within two weeks CPA doubled, because the cold audience had stayed the same but purchase intent had naturally dropped. We caught it when we saw two days in a row with zero bookings. Cut the cold campaigns, moved spend to retargeting and email. Had we prepared the seasonal plan two weeks earlier, we wouldn't have lost those two weekends. Lesson: seasonal isn't optional. It's mandatory.",
            "In month three we got excited and built separate landings for seven sub-categories. Of the seven, only three got meaningful traffic. The other four ate development time and sat empty. A lesson in restraint. Next time: three well-thought-out landings, then A/B test, then add another if it justifies itself. You don't build everything on day one. You build the minimum viable, test, add.",
            "In month four, when we were scaling hard, we didn't discuss operational capacity enough with the team. Result: two weeks with WhatsApp response times between 12 and 18 hours. We lost a few bookings to competitors. Next time, the capacity conversation comes before scaling, not after. You can't bring 100 leads a day if the team can process 20. The math is simple.",
          ],
        },
        {
          type: "learnings",
          heading: "What we took with us into the next projects.",
          items: [
            "On services with strong seasonality, the budget plan gets built one quarter ahead, not on the fly. Travel made it obvious. With any client running cyclical demand (education, fitness, beauty with specific dates), we now build a 12-month budget calendar before launching the first campaign. We don't guess. We plan.",
            "Premium audiences don't react to discounts, they react to calm and to their own time. Winter packages pulled higher POAS at higher cost per booking. That's why we now drop % off creative on premium segments and run exclusive offers, short lists, personal messaging instead. Big POAS gap inside 30 days. Discount attracts price buyers. Exclusivity attracts value buyers.",
            "WhatsApp Business with under-an-hour reply beats any perfect landing page. On this agency, every time response time dropped below 45 minutes, lead-to-booking rate hit 38%. When it climbed over 4 hours, it dropped to 12%. All new projects now carry a response-time SLA in the contract, not a suggestion. It's a clause. If it's not met, we talk.",
            "Email to your existing client base is the cheapest revenue reserve. Their list of 800 past buyers, touched monthly with seasonal reminders, pulled around 110,000 lei in a year, with zero ad cost. On any business with strong retention, email is the first lever we build, before scaling cold traffic. It's cheaper to keep a customer than to bring a new one.",
          ],
        },
        {
          type: "quote",
          text: "First time I saw the SmartBill numbers after six months with you, I called to ask whether this was real. I didn't think you could pull this off for a small travel agency in a small country with small budgets. Looking back, the difference was simple: you wanted to see, at the end of the month, that we made money too, not just you. That shows in everything you built.",
          attribution: "Travel agency manager in Argeș, January 2026",
        },
      ],
    },
  },
};
