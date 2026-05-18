import type { Article } from "./types";

export const ceAiNevoieInainteDeAgentie: Article = {
  slug: "ce-ai-nevoie-inainte-de-agentie",
  publishedAt: "2026-04-20",
  readTime: { ro: "18 min", en: "18 min" },
  tag: "fundamente",
  translations: {
    ro: {
      title: "Ce trebuie sa ai pregatit inainte sa semnezi cu o agentie de ads",
      hook: "Multi semneaza cu agentia si apoi afla ca nu au contul de Google Ads, ca pixelul e rupt, sau ca n-au acces la nimic. Lista asta te scapa de surprize.",
      metaTitle: "Checklist tehnic inainte de agentie - Pixel, CAPI, GA4, Google Ads",
      metaDescription:
        "Ce trebuie sa ai functional inainte sa angajezi o agentie de marketing. Setup complet cu costuri si timpi.",
      blocks: [
        {
          type: "p",
          text: "Am preluat saptamana trecuta un cont in care fondatorul platise deja doua luni de retainer la o agentie mare din Bucuresti. Cand am deschis contul de Meta Ads, am descoperit ca pixelul nu trimitea evenimente de Purchase de trei saptamani. Trei saptamani. Agentia nu observase. Sau observase si nu spusese. Fondatorul platise 6.000 de euro pentru ca cineva sa roteasca anunturi pe un algoritm care invata pe date false. Asta nu e vina agentiei. E vina fondatorului care a semnat inainte sa verifice fundamentele.",
        },
        {
          type: "p",
          text: "Acest articol e o lista. O lista pe care o verificam la fiecare client inainte sa incepem. Daca nu ai minim 80% din ea gata, nu are sens sa platesti o agentie. O sa platesti pentru ca ei sa repare ce puteai repara tu intr-o sambata. Si o sa platesti extra pentru timpul pierdut pana cand algoritmul invata pe date corecte. Lista asta iti ia 3-4 ore sa o faci singur. Sau 500-1.500 de euro sa o faca un freelancer. Sau nimic, daca o faci tu.",
        },
        {
          type: "callout",
          tone: "ink",
          title: "Principiul de baza",
          text: "Agentia nu iti construieste fundatia. Agentia construieste casa. Daca fundatia e crapata, casa se surpa indiferent cat de buna e arhitectura. Pixel, CAPI, GA4, conturi de proprietate, acces curat. Astea sunt fundatia. Tu le faci. Sau le platesti pe cineva sa le faca inainte de agentie.",
        },
        { type: "h2", text: "1. Meta Pixel instalat corect" },
        {
          type: "p",
          text: "Pixelul de Facebook e un cod JavaScript care trebuie sa trimita evenimente catre Meta de fiecare data cand cineva face o actiune pe site. Nu e suficient sa fie instalat. Trebuie sa trimita evenimentele corecte: PageView, ViewContent, AddToCart, InitiateCheckout, Purchase. Fiecare cu parametrii corecti. Fiecare fara duplicate. Fiecare in timp real, nu cu intarziere de 24 de ore.",
        },
        {
          type: "ul",
          items: [
            "Verifica in Events Manager ca pixelul trimite evenimente. Nu doar ca exista.",
            "Verifica ca evenimentul Purchase are valoarea corecta, cu moneda si ID-ul produsului.",
            "Verifica ca nu exista duplicate. Un Purchase trimis de doua ori te face sa crezi ca vinzi dublu.",
            "Daca folosesti Shopify, foloseste integrarea nativa, nu un plugin de la un tert dubios.",
            "Daca site-ul e custom, cere developerului sa testeze cu Pixel Helper inainte de lansare.",
          ],
        },
        {
          type: "p",
          text: "Am vazut un caz in care pixelul era instalat de doua ori. O data prin GTM, o data direct in head. Fiecare Purchase se inregistra de doua ori. ROAS-ul arata 4.0. POAS-ul real era 2.0. Fondatorul credea ca e printre cei mai buni din nisa. Agentia il lauda. Realitatea era ca jumatate din vanzarile raportate erau fantome. Verifica dublurile. Ia un laptop, deschide site-ul, cumpara un produs, si verifica in Events Manager ca apare exact o singura data.",
        },
        { type: "h2", text: "2. Conversions API (CAPI) activat" },
        {
          type: "p",
          text: "CAPI e sursa de evenimente server-to-server. Nu depinde de browser. Nu e blocat de ad-blockere. Nu dispare cu cookie-urile. Daca nu ai CAPI, pierzi 20-40% din evenimente. Asta inseamna ca algoritmul invata pe jumatate din realitate. Si cand invata pe jumatate, ia decizii proaste.",
        },
        {
          type: "ul",
          items: [
            "CAPI trebuie configurat prin server, nu doar prin browser.",
            "Trebuie sa trimita aceleasi evenimente ca pixelul, ca sa poti face deduplicare.",
            "Verifica in Events Manager ca deduplicarea functioneaza. Ar trebui sa vezi sursa 'Browser' si 'Server' pentru acelasi eveniment.",
            "Daca nu stii ce e deduplicarea, inseamna ca nu ai CAPI configurat corect.",
          ],
        },
        {
          type: "p",
          text: "Un client din Cluj nu avea CAPI. Am instalat. In prima saptamana, numarul de evenimente Purchase raportate a crescut cu 35%. Nu pentru ca am vandut mai mult. Pentru ca acum vedeam vanzarile care inainte erau invizibile. Agentia anterioara nu ii spusese ca are o gaura de 35% in tracking. Poate pentru ca nu stiau. Poate pentru ca nu voiau sa recunoasca. Oricum, clientul a platit opt luni pentru optimizari facute pe jumatate din date.",
        },
        { type: "h2", text: "3. Google Analytics 4 functional" },
        {
          type: "p",
          text: "GA4 e obligatoriu. Nu optional. Nu 'poate mai tarziu'. E sursa de adevar pentru trafic, comportament, conversii, surse. Daca nu ai GA4, nu stii de unde vin clientii, ce fac pe site, unde abandoneaza. Si agentia nu stie nici ea. Orice discutie despre 'optimizare' e o ghicitoare fara GA4.",
        },
        {
          type: "ul",
          items: [
            "GA4 trebuie sa aiba evenimente custom pentru fiecare pas important din funnel.",
            "Trebuie sa masoare corect sursele de trafic. Daca totul apare 'direct', ceva e rupt.",
            "Ecommerce tracking trebuie activat ca sa vezi revenue per sursa.",
            "Conecteaza GA4 cu Google Ads ca sa poti vedea costul per conversie in ambele platforme.",
          ],
        },
        {
          type: "p",
          text: "Am deschis un cont in care GA4 arata 80% trafic 'direct'. Nu exista 80% trafic direct intr-un magazin online. Asta inseamna ca parametrii UTM erau rupti, sau ca redirecturile dintre site si procesatorul de plata pierdeau sursa. Agentia nu observase. Sau nu stia cum sa observe. Fondatorul credea ca 'multi clienti vin direct pentru ca ne cunosc'. Nu. Multi clienti vin de pe Facebook, dar GA4 nu stie asta pentru ca tracking-ul e rupt.",
        },
        { type: "h2", text: "4. Conturi de proprietate, nu conturi de agentie" },
        {
          type: "p",
          text: "Contul de Meta Business Manager trebuie sa fie pe numele tau. Contul de Google Ads trebuie sa fie pe numele tau. Contul de TikTok Ads trebuie sa fie pe numele tau. Nu pe numele agentiei. Nu pe numele unui angajat al agentiei. Pe numele tau. Daca agentia pleaca, tu ramai cu contul. Daca contul e al agentiei, tu ramai cu nimic.",
        },
        {
          type: "ul",
          items: [
            "Verifica cine e proprietarul in Business Manager. Trebuie sa fii tu.",
            "Verifica cine plateste facturile. Trebuie sa fie cardul tau, nu al agentiei.",
            "Daca agentia a creat contul, cere transferul de proprietate in prima saptamana.",
            "Fa screenshot cu lista de administratori. Daca nu stii cine e acolo, e o problema.",
          ],
        },
        {
          type: "p",
          text: "Am vazut un caz in care agentia crease contul de Google Ads pe adresa lor de email. Cand s-au certat, agentia a pastrat contul cu tot cu istoric, date, campanii. Fondatorul a trebuit sa porneasca de la zero. Un an de date, pierdut. Nu pentru ca agentia era rea. Pentru ca fondatorul nu intrebase la inceput. Intreaba. Cere proprietatea. Nu e negociabil.",
        },
        { type: "h2", text: "5. Landing pages curate si rapide" },
        {
          type: "p",
          text: "Nu are sens sa platesti trafic pe o pagina care se incarca in 8 secunde. Sau pe o pagina in care butonul de cumpara e ascuns sub trei popup-uri. Sau pe o pagina care nu arata bine pe mobil. 70% din traficul de ads vine de pe mobil. Daca pagina ta nu functioneaza pe un iPhone din 2020, nu functioneaza.",
        },
        {
          type: "ul",
          items: [
            "Testeaza viteza de incarcare pe mobil cu PageSpeed Insights. Daca e sub 50, e o problema.",
            "Cumpara un produs de pe telefon. Vezi cati pasi sunt. Daca sunt mai mult de 3, e prea mult.",
            "Verifica ca formularul de checkout functioneaza pe Safari. Multi pierd vanzari aici.",
            "Asigura-te ca mesajul din anunt se potriveste cu mesajul de pe landing. Daca anuntul zice 'reducere 50%' si landingul zice 'oferta speciala', e disconnect.",
          ],
        },
        {
          type: "p",
          text: "Un client din Constanta avea un landing frumos pe desktop. Pe mobil, butonul de cumpara era ascuns sub un banner de cookies care nu se inchidea. 60% din traficul de ads venea pe mobil. Jumatate din oameni nu vedeau butonul. Agentia rula ads de 3 luni fara sa observe. I-am zis fondatorului sa testeze pe telefon. A fost socat. A reparat in 20 de minute. Conversion rate a urcat cu 1.2%.",
        },
        {
          type: "callout",
          tone: "red",
          title: "Ce costa sa le faci tu vs sa le faca altcineva",
          text: "DIY: 0 lei, 4-6 ore. Freelancer: 500-1.500 lei, 3-5 zile. Agentia care le face inainte de campanii: 1.500-3.000 lei, 2 saptamani. Timpul tau costa, dar timpul in care agentia invata pe date proaste costa mai mult.",
        },
        {
          type: "p",
          text: "Daca ai toate cele de mai sus gata, poti semna cu o agentie cu incredere. Algoritmul va invata pe date curate, deciziile vor fi bazate pe numere reale, iar tu vei sti exact ce se intampla. Daca nu le ai gata, nu semna inca. Fa lista asta. Bifeaza-o. Abia apoi deschide discutia cu agentia. Pentru ca o agentie buna nu vrea sa lucreze pe o fundatie crapata. Iar una proasta nu o sa-ti spuna niciodata ca e crapata.",
        },
        {
          type: "p",
          text: "Un ultim lucru. Nu e nevoie sa fie perfect. 80% e suficient. Pixel functional, CAPI activ, GA4 deschis, conturi pe numele tau, landing mobil functional. Daca ai astea, poti incepe. Restul se optimizeaza pe parcurs. Dar fara astea, orice optimizare e o ghicitoare scumpa.",
        },
        {
          type: "callout",
          tone: "lime",
          title: "Actiune imediata",
          text: "Deschide Events Manager. Verifica daca Purchase apare. Deschide GA4. Verifica daca revenue-ul se inregistreaza. Deschide site-ul pe telefon. Cumpara ceva. Daca oricare din astea nu functioneaza, nu semna cu agentia pana nu le repari.",
        },
        {
          type: "h2",
          text: "Ce faci azi, concret",
        },
        {
          type: "ol",
          items: [
            "Verifica Pixelul in Events Manager. Cumpara un produs. Vezi daca Purchase apare o singura data.",
            "Verifica CAPI in Events Manager. Ar trebui sa vezi sursa 'Server' langa 'Browser'.",
            "Verifica GA4. Revenue-ul se inregistreaza corect per sursa?",
            "Verifica conturile. Sunt pe numele tau? Platesti tu facturile?",
            "Testeaza site-ul pe mobil. Cumpara ceva. E usor? E rapid?",
          ],
        },
        {
          type: "p",
          text: "Daca vrei sa verifici daca totul e pregatit inainte sa semnezi cu o agentie, aplica pentru un audit tehnic gratuit de 30 de minute. Verificam impreuna Pixel, CAPI, GA4, conturi, landing pages, si iti spunem ce trebuie reparat inainte sa incepi. Fara cost. Fara obligatie. Doar adevarul pe cifre.",
        },
      ],
    },
    en: {
      title: "What you need ready before signing with an ad agency",
      hook: "Many sign with an agency and then find out they don't have a Google Ads account, the pixel is broken, or they have access to nothing. This list saves you from surprises.",
      metaTitle: "Technical checklist before hiring a marketing agency - Pixel, CAPI, GA4, Google Ads",
      metaDescription:
        "What needs to be functional before you hire a marketing agency. Complete setup with costs and timelines.",
      blocks: [
        {
          type: "p",
          text: "I took over an account last week where the founder had already paid two months of retainer to a large Bucharest agency. When I opened the Meta Ads account, I discovered the pixel hadn't sent Purchase events for three weeks. Three weeks. The agency hadn't noticed. Or had noticed and hadn't said. The founder paid 6,000 euros for someone to rotate ads on an algorithm learning from false data. That's not the agency's fault. It's the founder's fault for signing before checking the fundamentals.",
        },
        {
          type: "p",
          text: "This article is a list. A list we verify with every client before we start. If you don't have at least 80% of it ready, there's no point paying an agency. You'll pay them to fix what you could have fixed yourself on a Saturday. And you'll pay extra for the lost time until the algorithm learns on clean data. This list takes you 3-4 hours to do yourself. Or 500-1,500 euros to have a freelancer do it. Or nothing, if you do it yourself.",
        },
        {
          type: "callout",
          tone: "ink",
          title: "The basic principle",
          text: "The agency doesn't build your foundation. The agency builds the house. If the foundation is cracked, the house collapses no matter how good the architecture is. Pixel, CAPI, GA4, ownership accounts, clean access. These are the foundation. You do them. Or you pay someone to do them before the agency.",
        },
        { type: "h2", text: "1. Meta Pixel installed correctly" },
        {
          type: "p",
          text: "The Facebook Pixel is a JavaScript code that needs to send events to Meta every time someone takes an action on the site. It's not enough to be installed. It needs to send the right events: PageView, ViewContent, AddToCart, InitiateCheckout, Purchase. Each with the correct parameters. Each without duplicates. Each in real time, not with a 24-hour delay.",
        },
        {
          type: "ul",
          items: [
            "Check in Events Manager that the pixel sends events. Not just that it exists.",
            "Check that the Purchase event has the correct value, with currency and product ID.",
            "Check that there are no duplicates. A Purchase sent twice makes you think you're selling double.",
            "If you use Shopify, use the native integration, not a sketchy third-party plugin.",
            "If the site is custom, ask the developer to test with Pixel Helper before launch.",
          ],
        },
        {
          type: "p",
          text: "I saw a case where the pixel was installed twice. Once through GTM, once directly in the head. Each Purchase was recorded twice. ROAS showed 4.0. Real POAS was 2.0. The founder thought he was among the best in his niche. The agency praised him. The reality was that half the reported sales were ghosts. Check for duplicates. Take a laptop, open the site, buy a product, and check in Events Manager that it appears exactly once.",
        },
        { type: "h2", text: "2. Conversions API (CAPI) activated" },
        {
          type: "p",
          text: "CAPI is a server-to-server event source. It doesn't depend on the browser. Isn't blocked by ad blockers. Doesn't disappear with cookies. If you don't have CAPI, you lose 20-40% of events. That means the algorithm learns on half of reality. And when it learns on half, it makes bad decisions.",
        },
        {
          type: "ul",
          items: [
            "CAPI must be configured through the server, not just through the browser.",
            "It needs to send the same events as the pixel, so you can deduplicate.",
            "Check in Events Manager that deduplication works. You should see 'Browser' and 'Server' sources for the same event.",
            "If you don't know what deduplication is, it means you don't have CAPI configured correctly.",
          ],
        },
        {
          type: "p",
          text: "A client from Cluj didn't have CAPI. We installed it. In the first week, the number of reported Purchase events increased by 35%. Not because we sold more. Because now we were seeing sales that were previously invisible. The previous agency hadn't told him he had a 35% hole in his tracking. Maybe because they didn't know. Maybe because they didn't want to admit it. Either way, the client paid eight months for optimizations made on half the data.",
        },
        { type: "h2", text: "3. Google Analytics 4 functional" },
        {
          type: "p",
          text: "GA4 is mandatory. Not optional. Not 'maybe later'. It's the source of truth for traffic, behavior, conversions, sources. If you don't have GA4, you don't know where customers come from, what they do on the site, where they abandon. And neither does the agency. Any discussion about 'optimization' is guesswork without GA4.",
        },
        {
          type: "ul",
          items: [
            "GA4 must have custom events for every important step in the funnel.",
            "It must correctly measure traffic sources. If everything shows 'direct', something is broken.",
            "Ecommerce tracking must be activated so you can see revenue per source.",
            "Connect GA4 with Google Ads so you can see cost per conversion on both platforms.",
          ],
        },
        {
          type: "p",
          text: "I opened an account where GA4 showed 80% direct traffic. There is no 80% direct traffic in an online store. That means UTM parameters were broken, or redirects between the site and the payment processor were losing the source. The agency hadn't noticed. Or didn't know how to notice. The founder thought 'many customers come directly because they know us.' No. Many come from Facebook, but GA4 doesn't know that because tracking is broken.",
        },
        { type: "h2", text: "4. Ownership accounts, not agency accounts" },
        {
          type: "p",
          text: "The Meta Business Manager account must be in your name. The Google Ads account must be in your name. The TikTok Ads account must be in your name. Not in the agency's name. Not in an agency employee's name. In your name. If the agency leaves, you keep the account. If the account belongs to the agency, you keep nothing.",
        },
        {
          type: "ul",
          items: [
            "Check who the owner is in Business Manager. It should be you.",
            "Check who pays the bills. It should be your card, not the agency's.",
            "If the agency created the account, demand ownership transfer in the first week.",
            "Take a screenshot of the administrators list. If you don't know who's there, that's a problem.",
          ],
        },
        {
          type: "p",
          text: "I saw a case where the agency had created the Google Ads account on their email address. When they had a falling out, the agency kept the account along with all history, data, campaigns. The founder had to start from zero. A year of data, lost. Not because the agency was evil. Because the founder hadn't asked at the beginning. Ask. Demand ownership. It's non-negotiable.",
        },
        { type: "h2", text: "5. Clean and fast landing pages" },
        {
          type: "p",
          text: "There's no point paying for traffic to a page that loads in 8 seconds. Or to a page where the buy button is hidden under three popups. Or to a page that doesn't look good on mobile. 70% of ad traffic comes from mobile. If your page doesn't work on a 2020 iPhone, it doesn't work.",
        },
        {
          type: "ul",
          items: [
            "Test loading speed on mobile with PageSpeed Insights. If it's under 50, that's a problem.",
            "Buy a product from your phone. See how many steps there are. If more than 3, it's too many.",
            "Check that the checkout form works on Safari. Many lose sales here.",
            "Make sure the message in the ad matches the message on the landing. If the ad says '50% off' and the landing says 'special offer', that's a disconnect.",
          ],
        },
        {
          type: "p",
          text: "A client from Constanta had a beautiful landing on desktop. On mobile, the buy button was hidden under a cookie banner that wouldn't close. 60% of ad traffic came on mobile. Half the people couldn't see the button. The agency had been running ads for 3 months without noticing. I told the founder to test on his phone. He was shocked. Fixed it in 20 minutes. Conversion rate went up 1.2%.",
        },
        {
          type: "callout",
          tone: "red",
          title: "What it costs to do yourself vs having someone else do it",
          text: "DIY: 0 lei, 4-6 hours. Freelancer: 500-1,500 lei, 3-5 days. Agency that does it before campaigns: 1,500-3,000 lei, 2 weeks. Your time costs, but time where the agency learns on bad data costs more.",
        },
        {
          type: "p",
          text: "If you have everything above ready, you can sign with an agency with confidence. The algorithm will learn on clean data, decisions will be based on real numbers, and you'll know exactly what's happening. If you don't have them ready, don't sign yet. Do this list. Check it off. Only then open the conversation with the agency. Because a good agency doesn't want to work on a cracked foundation. And a bad one will never tell you it's cracked.",
        },
        {
          type: "p",
          text: "One last thing. It doesn't need to be perfect. 80% is enough. Functional pixel, active CAPI, open GA4, accounts in your name, mobile landing that works. If you have these, you can start. The rest gets optimized along the way. But without these, any optimization is an expensive guessing game.",
        },
        {
          type: "callout",
          tone: "lime",
          title: "Immediate action",
          text: "Open Events Manager. Check if Purchase appears. Open GA4. Check if revenue registers. Open your site on your phone. Buy something. If any of these doesn't work, don't sign with an agency until you fix them.",
        },
        {
          type: "h2",
          text: "What you do today, concretely",
        },
        {
          type: "ol",
          items: [
            "Check Pixel in Events Manager. Buy a product. See if Purchase appears once.",
            "Check CAPI in Events Manager. You should see 'Server' next to 'Browser'.",
            "Check GA4. Does revenue register correctly per source?",
            "Check accounts. Are they in your name? Do you pay the bills?",
            "Test site on mobile. Buy something. Is it easy? Is it fast?",
          ],
        },
        {
          type: "p",
          text: "If you want to check if everything is ready before signing with an agency, apply for a free 30-minute technical audit. We'll check Pixel, CAPI, GA4, accounts, landing pages together, and tell you what needs fixing before you start. No cost. No obligation. Just truth on numbers.",
        },
      ],
    },
  },
};
