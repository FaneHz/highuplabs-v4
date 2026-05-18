import type { CaseStudy } from "./types";

export const trotineteElectrice: CaseStudy = {
  slug: `trotinete-electrice`,
  publishedAt: `2026-03-29`,
  readTime: { ro: `18 min`, en: `18 min` },
  translations: {
    ro: {
      title: `60 de zile. 2.161.742 RON. După opt luni în care a plătit să vândă în pierdere.`,
      subtitle:
        `Magazin de trotinete electrice din Sibiu, preț mediu 3.300 RON. Opt luni cu altă agenție — ROAS 3x în rapoarte, cont bancar pe minus. Două luni mai târziu: 2.161.742 RON venit din 37.062 RON cheltuiți. POAS net 26x.`,
      industry: `E-commerce · Mobilitate urbană`,
      metaTitle: `Trotinete electrice Sibiu, 2,16M RON în 60 zile, POAS 26x`,
      metaDescription:
        `Magazin trotinete electrice din Sibiu. Google ROAS 102x, POAS net 26x. 21.064 RON spend, 2.161.742 RON revenue, 1.043 conversii în 60 de zile.`,
      hook: `E-commerce de trotinete electrice din Sibiu. Preț mediu 3.300 RON. Opt luni cu o altă agenție. Rapoarte săptămânale: ROAS 3-4x. Banca: minus 9.000 de lei într-o lună. Cum se întâmplă asta? Nimeni nu făcuse audit de marjă. 84 de produse din 120 erau promovate în pierdere. Algoritmul făcea exact ce i se ceruse: conversii. Nu profit.`,
      heroStats: [
        { value: `102x`, label: `ROAS Google Ads`, highlight: true },
        { value: `2,16M RON`, label: `Revenue 60 zile` },
        { value: `26x`, label: `POAS net` },
        { value: `1.043`, label: `Conversii totale` },
      ],
      sections: [
        {
          type: `narrative`,
          heading: `Cum am ajuns să ne uităm peste cont. Și de ce n-am promis nimic la primul call.`,
          paragraphs: [
            `Ne-a scris în a doua săptămână din ianuarie. Nu era disperat. Era confuz. Primise seara PDF-ul săptămânal de la agenția veche. Prima pagină, bold: ROAS 3,2. 162 comenzi. Campania X "consolidează performanța". Sub rapoarte, extrasul de cont. Matematică de clasa a șaptea: minus 9.000 de lei luna aceea.`,
            `La primul call nu i-am promis nimic. I-am zis exact așa: "Dă-ne acces o lună. Nu atingem nimic. Ne uităm peste tot, facem audit pe profit real, și abia apoi îți spunem dacă putem face ceva împreună." A acceptat. Apoi a zis ceva ce nu uit: "Dacă-mi spuneți ceva ce mai știu, iar plătim degeaba." Asta e omul pe care îl caut. Cineva care a fost ars. Cineva care vrea adevărul, nu aplauze.`,
            `Prima săptămână am exportat date. Google Ads, Analytics, Shopify, SmartBill, curier. Tabele peste tabele. Problema s-a conturat pe a treia zi. Am încercat să lipim vânzările din Shopify cu costurile reale din SmartBill. Nu se potriveau. Nici pe aproape. Unde Google zicea "profit", SmartBill zicea "pierdere".`,
            `Când am terminat de potrivit cifrele pe toate cele 120 de produse, am înțeles: 84 erau promovate în pierdere. Optzecisipatru. 70% din catalog. Performance Max, campania lăudată în fiecare raport, împingea agresiv exact pe cele 84. Pentru că aveau volum de căutare. Algoritmul făcea exact ce-i cereai: conversii. N-aveai cum să-l acuzi. I-ai cerut ce nu trebuia.`,
            `Prima reacție a fondatorului când i-am arătat tabelul a fost tăcere. Două minute. Apoi: "Deci opt luni am plătit să-mi vând produsele în pierdere?" Da. "Și nimeni n-a văzut?" Nu. "De ce?" Pentru că nimeni nu făcuse auditul de marjă. Nu era în "scope". Agenția "optimiza" ROAS. Nu profit.`,
          ],
        },
        {
          type: `discovery`,
          heading: `Ce-am găsit sub capotă. Și de ce trei agenții înainte de noi nu văzuseră nimic.`,
          intro:
            `Nu era tot. Restul contează mai mult. Primele două săptămâni de săpături au scos la suprafață ce trei agenții ignoraseră cumulat.`,
          items: [
            `POAS-ul real pe cont era sub 0,7x. Adică pe fiecare comandă care venea din Google, ieșeai pe minus vreo 50 de lei după ce puneai produsul, shipping-ul, comisionul curierului, retururile și taxa Shopify. ROAS-ul 3x arăta frumos doar pentru că nimeni nu scădea costurile astea. Era ca și cum ai măsura greutatea unui sac fără să pui și conținutul în calcule.`,
            `Nu exista nicio legătură între SmartBill și Google. Două lumi paralele. Google optimiza pe ce-i spunea el că e "bun". Contabilul număra separat. Fondatorul, la mijloc, se întreba de ce nu se vede profitul nicăieri. Nimeni nu făcuse podul între cele două lumi. Fiecare trăia în tabloul lui.`,
            `Catalogul avea 120 de produse. Le-am făcut un exercițiu simplu: calculează marja netă pe fiecare. Mi-a luat două zile. Dintre cele 120, doar 36 aveau marjă peste 25% după toate costurile. Restul de 84 erau fie break-even, fie direct pe pierdere. Și mai nasol: Performance Max împingea agresiv exact pe cele 84, pentru că aveau volum mare de căutare. Algoritmul făcea exact ce-i cereai: conversii. N-aveai cum să-l acuzi. I-ai cerut ce nu trebuia.`,
            `Feed-ul Google Shopping era slab. Titluri truncate, lipseau specs de bază (autonomie, viteză maximă, greutate, baterie), imagini inconsistente între produse. Oamenii dădeau click, vedeau o pagină care părea făcută pe genunchi, plecau. CTR 1,8%. Conversie 0,19%. Amândouă sub benchmark-ul categoriei cu cel puțin 30-40%. Adică jumătate din trafic pleca înainte să citească prețul.`,
            `Enhanced Conversions off. Zero offline conversion tracking pentru retururi. Ce însemna asta: Google credea că a închis o vânzare și o păstra în stats chiar și după ce clientul returna trotineta două săptămâni mai târziu. Algoritmul învăța pe semnale false. Iar noi, oamenii, luam decizii pe date false. E un cerc vicios.`,
            `Costul mediu per conversie era 120 RON. Pentru că algoritmul licita pe toate produsele, inclusiv pe cele cu marjă negativă. O conversie care te costă 120 RON pe un produs cu marjă 80 RON înseamnă pierdere de 40 RON per comandă. Și asta era "normalul" în cont de opt luni.`,
          ],
        },
        {
          type: `strategy`,
          heading: `Ce-am făcut. Exact în ordinea în care s-a întâmplat.`,
          steps: [
            {
              title: `Luna 1, săptămâna 1. Audit de profit pe fiecare SKU.`,
              body: `Am legat Shopify, SmartBill și Google Ads în același tabel. Produs cu produs. Cost cu cost. Marjă netă după shipping, comision curier, retururi și taxe platformă. Rezultatul l-am pus într-un document de 40 de rânduri și l-am trimis fondatorului la 11 noaptea. Prima lui reacție, pe WhatsApp: "Mi-e rău." A doua, o oră mai târziu: "Ok. Ce facem?" Asta e reacția pe care o respect. Nu "nu e adevărat". Nu "agenta veche zicea altceva". Ci "ok, ce facem?"`,
            },
            {
              title: `Luna 1, săptămâna 2. 84 de produse afară.`,
              body: `Am împărțit catalogul pe trei niveluri. Sus: 18 produse cu marjă peste 35%, toate trotinete premium, cele care aduceau de fapt profit. La mijloc: încă 18, cu marjă între 25 și 35%, accesorii scumpe, căști, genți. Jos: 84 de produse care pur și simplu n-aveau de ce să mai existe în campanii. Le-am scos pe toate într-o seară. Fondatorul a tras aer adânc când i-am zis. I-am zis că o să vadă scăderi pe total volum vreo săptămână. A zis bine. A înțeles că volumul nu contează. Contează profitul per comandă.`,
            },
            {
              title: `Luna 1, săptămâna 3. Restructurat Performance Max.`,
              body: `Am desființat campania unică PMax și-am făcut două separate, pe Maximize Conversions. Una dedicată celor 18 trotinete premium, cu buget agresiv și asset groups specifice. Una conservatoare pe accesorii. Fiecare cu creative la ea, fără amestec. Am mai tăiat bidding-ul tROAS 300% și am lăsat algoritmul să-și facă treaba cu obiective de conversie curate. Obiectivul nu mai era "vânzări la orice preț". Era "vânzări profitabile".`,
            },
            {
              title: `Luna 1, săptămâna 4. Feed-ul de la zero.`,
              body: `Titluri rescrise după intent de căutare. Specs complete în description: autonomie, viteză, baterie, greutate, totul. Imagini refăcute după un template unic, fundal neutru, produs în context. Custom labels pentru segmentare automată (tier, marjă, sezon). Enhanced Conversions activate cu first-party data. Offline conversion tracking pentru retururi, ca Google să piardă comanda din stats când trimitem banii înapoi. Feed curat duminică la miezul nopții. Luni dimineața, campaniile rulaseră deja 8 ore pe noul feed.`,
            },
            {
              title: `Luna 2, Meta Ads în paralel.`,
              body: `După ce Google se stabilizase pe noul setup — conversiile veneau la 33,68 lei cost mediu, față de 120 înainte — am deschis și Meta. Buget mic: 15.998 lei pe toate cele 60 de zile, din economia făcută pe catalogul curățat. Full funnel pe cele opt produse hero. Pixel cu dedup pe eventId, CAPI în sus. Conversii Meta: 175. Purchase ROAS între 43 și 65, în funcție de audiență. Google capta intenția existentă. Meta genera cerere nouă, pentru categorii de cumpărători care nu știau că există trotineta aia specifică. Asta e diferența. Google prinde pe cine caută. Meta îi face să vrea.`,
            },
            {
              title: `Luna 2, raportare zilnică pe POAS.`,
              body: `Ultimul pas, cel care a schimbat total modul în care vorbeam cu fondatorul. Raport automat în Google Sheets cu POAS per produs, per campanie, per zi. Nu mai discutam de ROAS. Nu mai discutam de click-uri. Discutam de profit net per unitate vândută. În două săptămâni a început să intre și el săptămânal în raport și să-mi zică singur ce să urc, ce să tai. Asta e scopul. Clientul care înțelege cifrele nu mai depinde de agenție. Face decizii cu noi, nu pentru noi.`,
            },
          ],
        },
        {
          type: `screenshots`,
          heading: `Capturi direct din platforme.`,
          intro:
            `N-avem ce ascunde. Cifrele din poze sunt exact ce vezi dacă fondatorul te duce în contul lui. Verifici oricând, pe call.`,
          shots: [
            {
              src: `/cases/trotinete-google-ads.jpg`,
              alt: `Google Ads, 60 de zile, magazin trotinete electrice Sibiu`,
              caption: `Google Ads, 27 ianuarie – 29 martie 2026`,
            },
            {
              src: `/cases/trotinete-meta-ads.jpg`,
              alt: `Meta Ads Manager, 60 de zile, magazin trotinete electrice Sibiu`,
              caption: `Meta Ads Manager, aceeași fereastră`,
            },
          ],
        },
        {
          type: `numbers`,
          heading: `Cifrele, fără machiaj.`,
          intro:
            `60 de zile. 27 ianuarie – 29 martie 2026. Google Ads plus Meta Ads. 37.062 RON investiți în reclame.`,
          rows: [
            { label: `POAS net`, before: `0,7x`, after: `26x`, note: `după toate costurile reale` },
            { label: `ROAS Google Ads`, before: `3,2x`, after: `102x` },
            { label: `Revenue Google Ads`, before: `N/A`, after: `2.161.742 RON`, note: `din 21.064 RON investiți` },
            { label: `Purchase ROAS Meta`, before: `N/A`, after: `43-65x`, note: `175 achiziții, 15.998 RON investiți` },
            { label: `Conversii totale`, before: `~250`, after: `1.043`, note: `868 Google, 175 Meta` },
            { label: `Cost per conversie Google`, before: `~120 RON`, after: `33,68 RON` },
            { label: `Procent comenzi profitabile`, before: `~35%`, after: `100%` },
            { label: `Produse active în ads`, before: `120`, after: `36`, note: `84 scoase` },
            { label: `CTR Shopping`, before: `1,8%`, after: `3,4%` },
            { label: `Conversion rate site`, before: `0,19%`, after: `0,67%` },
          ],
        },
        {
          type: `mistakes`,
          heading: `Trei greșeli. Ce-am greșit și cât ne-a costat.`,
          intro:
            `N-a fost perfect. Uite trei chestii pe care, dacă le-am mai face, le-am face altfel.`,
          items: [
            `Am scos 84 de produse într-o singură zi. Organic-ul a scăzut cu vreo 15% timp de o săptămână până s-a reașezat Google pe noua structură. Data viitoare tăiem pe valuri de 20-30 de produse pe săptămână, nu tot deodată. Am vrut să fim eficienți, am ieșit cu semnal mixt din partea lui Google. O schimbare bruscă de catalog sperie algoritmul. O schimbare graduală îl învață.`,
            `În săptămâna a doua, după ce curătaserăm dedupurile, ROAS-ul afișat în dashboard a scăzut aparent de la 3,2 la 2,1. Fondatorul a sunat panicat. Ne-a luat două call-uri și un Loom de 12 minute să-i explicăm că scăderea aia era de fapt adevărul ieșind la suprafață. Data viitoare pregătim documentul ăla înainte, nu după. Comunicarea proastă e la fel de dăunătoare ca strategia proastă.`,
            `Am lansat Meta prea devreme. Săptămâna 5, când Google încă nu se stabilizase complet pe noul setup. Primele 10 zile pe Meta au fost modeste, ROAS între 8 și 12, cu niște creative care nu apucaseră să ia date suficiente. Dacă mai așteptam încă două săptămâni, probabil intram pe Meta direct cu POAS mai curat. Lecție învățată: nu deschizi al doilea canal până primul nu e stabil.`,
          ],
        },
        {
          type: `learnings`,
          heading: `Ce-am luat cu noi. Și aplicăm la fiecare client nou.`,
          items: [
            `Nu se atinge nimic în luna 1 fără un audit de marjă pe SKU. Pe magazinul ăsta, exercițiul ăla a salvat tot. L-am repetat de atunci pe fiecare client cu peste 50 de produse în catalog. Niciodată nu sare peste el. E primul pas, non-negociabil.`,
            `ROAS-ul aparent înșeală sistematic când nu există offline conversion tracking pentru retururi. La trotinete, rata de retur era pe la 8%, suficient cât să facă ROAS-ul să arate cu o treime mai bun decât era. De-aia primul lucru pe care-l setăm acum la onboarding e tracking-ul de retururi, nu campania. Dacă nu știi câți clienți returnează, nu știi dacă faci profit.`,
            `Catalogul mic și sănătos bate catalogul mare și sufocat. 36 de produse profitabile au scos 2,16 milioane în 60 de zile. 120 de produse amestecate scoseseră, în lunile dinainte, cam zero net. Mai puțin înseamnă mai mult atunci când fiecare leu de buget știe exact unde se duce. Nu e contraintuitiv dacă te uiți la numere. E doar contraintuitiv dacă te uiți la volum.`,
            `Meta deschis prematur consumă bani fără să-i recuperezi. Așteptat o lună după ce Google se stabilizează e diferența între POAS curat și două săptămâni de date stricate. La proiectul următor am așteptat fix 4 săptămâni înainte să dăm drumul la Meta. POAS pe primele 30 de zile a fost dublu față de aici. Răbdarea cu date curate bate graba cu date murdare.`,
            `Raportarea zilnică pe POAS schimbă relația cu clientul. Nu mai ești "agenția" care vine cu cifre o dată pe săptămână. Ești partenerul care lucrează cu aceleași numere. În două săptămâni, fondatorul știa să citească tabelul singur. În patru săptămâni, propunea el ajustări. Asta e scopul: să nu mai ai nevoie de noi. Să poți să verifici oricând.`,
          ],
        },
        {
          type: `quote`,
          text: `De opt luni îmi spunea agenta veche că "optimizăm săptămâna asta". Opt. În prima săptămână cu voi mi-ați zis să scot 84 de produse din ads și-am crezut că glumiți. M-am uitat apoi peste cifre. Aveați dreptate. În două luni, 2,16 milioane lei din 21 de mii. Eu încă mă gândesc de ce nu m-am uitat singur pe POAS mai devreme.`,
          attribution: `Fondator, magazin trotinete electrice din Sibiu, WhatsApp, 30 martie 2026`,
        },
      ],
    },
    en: {
      title: `60 days. 2,161,742 RON. After eight months of paying to sell at a loss.`,
      subtitle:
        `Electric scooter store in Sibiu, average price 3,300 RON. Eight months with another agency — 3x ROAS in reports, bank account in the red. Two months later: 2,161,742 RON revenue from 37,062 RON spent. Net POAS 26x.`,
      industry: `E-commerce · Urban mobility`,
      metaTitle: `Electric scooters Sibiu, 2.16M RON in 60 days, POAS 26x`,
      metaDescription:
        `Electric scooter store, Sibiu. Google ROAS 102x, net POAS 26x. 21,064 RON spend, 2,161,742 RON revenue, 1,043 conversions in 60 days.`,
      hook: `Electric scooter e-commerce in Sibiu. Average price 3,300 RON. Eight months with a previous agency. Weekly reports: 3-4x ROAS. Bank statement: minus 9,000 lei in one month. How does that happen? Nobody had done a margin audit. 84 out of 120 products were being advertised at a loss. The algorithm was doing exactly what it had been asked: conversions. Not profit.`,
      heroStats: [
        { value: `102x`, label: `Google Ads ROAS`, highlight: true },
        { value: `2.16M RON`, label: `60-day revenue` },
        { value: `26x`, label: `Net POAS` },
        { value: `1,043`, label: `Total conversions` },
      ],
      sections: [
        {
          type: `narrative`,
          heading: `How we ended up looking over the account. And why we promised nothing on the first call.`,
          paragraphs: [
            `He wrote us the second week of January. Not desperate. Confused. The weekly PDF from his current agency had just landed. First page in bold: ROAS 3.2, 162 orders, campaign X "consolidating performance". Underneath, his bank statement. Seventh-grade math: down 9,000 lei for the month.`,
            `We didn't promise anything on the first call. We said it straight: "Give us access for a month. We won't touch anything. We look over everything, run a real profit audit, and only then do we tell you if we can actually do something together." He agreed. Then he said something I remember to this day: "If you tell me things I already know, we're paying for nothing again." That's the person I look for. Someone who got burned. Someone who wants the truth, not applause.`,
            `First week we only pulled data. Google Ads, Analytics, Shopify, SmartBill, courier. Spreadsheets on spreadsheets. The problem took shape on day three, when we tried to match Shopify sales with real SmartBill costs. They didn't match. Not even close. Where Google said "profit", SmartBill said "loss".`,
            `By the time we finished matching numbers across all 120 products in the catalog, we understood: 84 of them were being advertised at a loss. Eighty-four. That's 70% of the catalog. Performance Max, the campaign the agency praised in every report, was pushing the 84 aggressively because they had higher search volume. The algorithm was doing exactly what you asked it to: conversions. You couldn't blame it. You'd asked for the wrong thing.`,
            `The founder's first reaction when I showed him the table was silence. Two minutes. Then: "So for eight months I paid to sell my products at a loss?" Yes. "And nobody saw?" No. "Why?" Because nobody did the margin audit. It wasn't in scope. The agency was "optimizing" ROAS. Not profit.`,
          ],
        },
        {
          type: `discovery`,
          heading: `What we found under the hood. And why three agencies before us saw nothing.`,
          intro:
            `That wasn't everything. The rest matters more. The first two weeks of digging surfaced things that three agencies before us had collectively ignored.`,
          items: [
            `Real POAS across the account was under 0.7x. Meaning every order from Google was losing about 50 lei once you subtracted product, shipping, courier fee, returns, and Shopify's cut. The 3x ROAS looked pretty only because nobody was deducting those costs. It was like weighing a bag without counting what's inside.`,
            `There was no link whatsoever between SmartBill and Google. Two parallel universes. Google optimized for what it thought was "good". The accountant counted separately. The founder, stuck in the middle, kept wondering where the profit went. Nobody had built the bridge between the two. Each stayed in their own bubble.`,
            `Catalog of 120 products. We ran a simple exercise: net margin per product. Took two days. Out of 120, only 36 had margin over 25% after all costs. The other 84 were either break-even or straight negative. Worse: Performance Max was pushing the 84 aggressively because they had higher search volume. The algorithm was doing exactly what you asked it to: conversions. You couldn't blame it. You'd asked for the wrong thing.`,
            `Google Shopping feed was weak. Truncated titles, missing base specs (range, top speed, weight, battery), inconsistent imagery across products. People clicked, saw a page that felt half-baked, left. CTR 1.8%. Conversion rate 0.19%. Both at least 30-40% below category benchmark. Meaning half the traffic left before reading the price.`,
            `Enhanced Conversions off. Zero offline conversion tracking for returns. Meaning Google thought it had closed a sale and kept it in stats even after the customer returned the scooter two weeks later. The algorithm was learning on lies. And we, the humans, were making decisions on false data. A vicious circle.`,
            `Average cost per conversion was 120 RON. Because the algorithm was bidding on all products, including those with negative margin. A conversion that costs 120 RON on a product with 80 RON margin means a 40 RON loss per order. And that had been "normal" in the account for eight months.`,
          ],
        },
        {
          type: `strategy`,
          heading: `What we did, in the exact order it happened.`,
          steps: [
            {
              title: `Month 1, week 1. A real profit audit on every SKU.`,
              body: `Linked Shopify, SmartBill, and Google Ads in one spreadsheet. Product by product. Cost by cost. Net margin after shipping, courier, returns, and platform taxes. The result went into a 40-row document sent to the founder at 11pm. His first reaction, on WhatsApp: "I feel sick." His second, an hour later: "Ok. What do we do?" That's the reaction I respect. Not "that's not true". Not "the old agency said different". But "ok, what do we do?"`,
            },
            {
              title: `Month 1, week 2. 84 products out.`,
              body: `Split the catalog into three tiers. Top: 18 products with margin over 35%, all premium scooters, the ones actually making profit. Middle: 18 more, margin 25-35%, premium accessories, helmets, bags. Bottom: 84 products that just had no reason to be in campaigns. Pulled all 84 in one evening. Founder drew a deep breath when we told him. We warned him he'd see total volume dip for about a week. He said ok. He understood volume doesn't matter. Profit per order matters.`,
            },
            {
              title: `Month 1, week 3. Performance Max restructure.`,
              body: `Killed the single PMax and built two separate Maximize Conversions campaigns. One dedicated to the 18 premium scooters, aggressive budget, specific asset groups. One conservative for accessories. Each with its own creative, no mixing. Cut the 300% tROAS bidding and let the algorithm do its thing on clean conversion objectives. The objective was no longer "sales at any price". It was "profitable sales".`,
            },
            {
              title: `Month 1, week 4. Feed rebuilt from scratch.`,
              body: `Titles rewritten based on search intent. Full specs in description: range, top speed, battery, weight, everything. Imagery redone on one template, neutral background, product in context. Custom labels for auto-segmentation (tier, margin, season). Enhanced Conversions on with first-party data. Offline conversion tracking for returns, so Google loses the order from stats when we send the money back. Feed clean by Sunday midnight. Monday morning, campaigns had already run 8 hours on the new feed.`,
            },
            {
              title: `Month 2. Meta Ads in parallel.`,
              body: `Once Google had stabilized on the new setup — conversions coming in at 33.68 lei average vs 120 before — we opened Meta too. Small budget: 15,998 lei across the whole 60 days, funded from the savings on the trimmed catalog. Full funnel on the eight hero products. Pixel with eventId dedup, CAPI up. Meta conversions: 175. Purchase ROAS between 43 and 65 depending on audience. Google captured existing intent. Meta generated new demand, for buyer segments that didn't know that specific scooter even existed. That's the difference. Google catches those who search. Meta makes them want.`,
            },
            {
              title: `Month 2. Daily POAS reporting.`,
              body: `Final step, the one that changed how we talked to the founder. Auto report in Google Sheets with POAS per product, per campaign, per day. No more ROAS talk. No more click talk. Net profit per unit sold. Two weeks in, he was going into the report himself and telling me what to scale, what to cut. That's the goal. A client who understands the numbers no longer depends on the agency. Makes decisions with us, not for us.`,
            },
          ],
        },
        {
          type: `screenshots`,
          heading: `Captures straight from the platforms.`,
          intro:
            `Nothing to hide. The numbers in these images are exactly what you'd see if the founder took you into his account. Verify them anytime, on a call.`,
          shots: [
            {
              src: `/cases/trotinete-google-ads.jpg`,
              alt: `Google Ads, 60 days, scooter store Sibiu`,
              caption: `Google Ads, January 27 to March 29, 2026`,
            },
            {
              src: `/cases/trotinete-meta-ads.jpg`,
              alt: `Meta Ads Manager, 60 days, scooter store Sibiu`,
              caption: `Meta Ads Manager, same window`,
            },
          ],
        },
        {
          type: `numbers`,
          heading: `The numbers, no makeup.`,
          intro:
            `60 days, January 27 to March 29, 2026. Google Ads plus Meta Ads. 37,062 RON spent on ads.`,
          rows: [
            { label: `Net POAS`, before: `0.7x`, after: `26x`, note: `after all real costs` },
            { label: `Google Ads ROAS`, before: `3.2x`, after: `102x` },
            { label: `Google Ads revenue`, before: `N/A`, after: `2,161,742 RON`, note: `from 21,064 RON invested` },
            { label: `Meta Purchase ROAS`, before: `N/A`, after: `43-65x`, note: `175 purchases, 15,998 RON invested` },
            { label: `Total conversions`, before: `~250`, after: `1,043`, note: `868 Google, 175 Meta` },
            { label: `Google cost per conversion`, before: `~120 RON`, after: `33.68 RON` },
            { label: `Profitable orders`, before: `~35%`, after: `100%` },
            { label: `Products active in ads`, before: `120`, after: `36`, note: `84 removed` },
            { label: `Shopping CTR`, before: `1.8%`, after: `3.4%` },
            { label: `Site conversion rate`, before: `0.19%`, after: `0.67%` },
          ],
        },
        {
          type: `mistakes`,
          heading: `Three mistakes. What we got wrong and what it cost us.`,
          intro: `Not perfect. Three things we'd do differently next time.`,
          items: [
            `We pulled 84 products in a single day. Organic traffic dipped 15% for about a week until Google settled on the new structure. Next time we cut in waves of 20-30 products per week, not everything at once. We went for efficiency, created some noise. A sudden catalog change scares the algorithm. A gradual change teaches it.`,
            `Week two, after cleaning up the dedup issue, the dashboard ROAS visually dropped from 3.2 to 2.1. The founder called panicked. Took us two calls and a 12-minute Loom to explain that the drop was the truth surfacing. Next time we prepare that document upfront, not after. Bad communication is just as damaging as bad strategy.`,
            `We launched Meta too early. Week 5, while Google hadn't fully settled on the new setup. First 10 days on Meta were modest, ROAS between 8 and 12, with creatives that hadn't gathered enough data. Had we waited two more weeks, we'd have walked into Meta with cleaner POAS from day one. Lesson learned: don't open a second channel until the first one is stable.`,
          ],
        },
        {
          type: `learnings`,
          heading: `What we took with us. And apply to every new client.`,
          items: [
            `Nothing gets touched in month 1 without an SKU-level margin audit. On this account, that single exercise saved everything. We now repeat it on every client with more than 50 products in catalog. It never gets skipped. It's the first step, non-negotiable.`,
            `ROAS systematically lies when there's no offline conversion tracking for returns. On the scooter store, return rate was around 8%, enough to make ROAS look a third better than reality. That's why returns tracking is now the very first thing we set up at onboarding, before any campaign. If you don't know how many customers return, you don't know if you're profitable.`,
            `A small healthy catalog beats a large bloated one. 36 profitable products pulled 2.16 million RON in 60 days. 120 mixed products had been pulling roughly zero net in the months before. Less means more when every euro of budget knows exactly where it's going. It's not counterintuitive if you look at the numbers. It's only counterintuitive if you look at volume.`,
            `Opening Meta too early eats budget you don't recover. Waiting one full month after Google stabilizes is the difference between clean POAS and two weeks of corrupted data. On the next project we waited exactly 4 weeks before launching Meta. First 30 days of POAS came in twice as clean. Patience with clean data beats rushing with dirty data.`,
            `Daily POAS reporting changes the client relationship. You're no longer "the agency" that comes with numbers once a week. You're the partner working with the same numbers. In two weeks, the founder could read the table himself. In four weeks, he was proposing adjustments himself. That's the goal: to not need us anymore. To be able to verify anytime.`,
          ],
        },
        {
          type: `quote`,
          text: `For eight months the old agency kept telling me "we're optimizing this week." Eight. First week with you lot you told me to pull 84 products from ads and I thought you were joking. Then I looked at the numbers. You were right. Two months, 2.16 million lei from 21 thousand. I'm still wondering why I didn't look at POAS myself sooner.`,
          attribution: `Founder, electric scooter store Sibiu, WhatsApp, March 30, 2026`,
        },
      ],
    },
  },
};
