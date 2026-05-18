import type { Article } from "./types";

export const adSpendMediaBudget: Article = {
  slug: "ad-spend-media-budget-break-even",
  publishedAt: "2026-02-06",
  readTime: { ro: "14 min", en: "14 min" },
  tag: "fundamente",
  translations: {
    ro: {
      title: "Ad spend vs media budget: de ce crezi ca faci profit cand de fapt pierzi",
      hook: "Sună similar. Se folosesc interschimbabil la sedinte. Diferenta intre ei e diferenta intre a face profit si a crede ca faci profit. Uite ce inseamna fiecare si la ce prag devin relevante.",
      metaTitle: "Ad spend, media budget, break-even. Definitii clare.",
      metaDescription:
        "Glosar scurt pentru antreprenori: ce inseamna ad spend, media budget si break-even, diferentele care iti schimba deciziile, plus praguri practice.",
      blocks: [
        {
          type: "p",
          text: "Am stat saptamana trecuta intr-o sedinta de 20 de minute in care fondatorul a zis 'buget' de zece ori si agentia de paisprezece, iar la final niciunul nu vorbea despre acelasi lucru. Cei doi termeni care se amesteca cel mai des si baga firmele in pierdere sunt ad spend si media budget. Al treilea, break-even-ul, aproape nimeni nu-l calculeaza. Le separam pe rand.",
        },
        {
          type: "p",
          text: "Stai putin, o sa zici ca asta e vocabular de contabil. Nu e. E diferenta dintre a sti daca afacerea ta e vie sau moarta. Si am vazut fondatori cu cifre de afaceri de sute de mii de lei care nu stiau break-even-ul propriei firme. Deci aveau zero idee daca luna asta au castigat sau au pierdut. Rapoartele spuneau 'ROAS bun'. Contul spunea altceva. Nu vrei sa fi pacalit din nou.",
        },
        {
          type: "h2",
          text: "Ad spend",
        },
        {
          type: "p",
          text: "Banii care pleaca efectiv din contul tau catre Meta, Google, TikTok. Atat. Nu include fee-ul agentiei. Nu include productia de creative. Nu include software-urile de tracking. Doar suma pe care o vede Mark Zuckerberg pe factura luna de luna.",
        },
        {
          type: "p",
          text: "Cand spui 'am 5.000 euro buget luna asta' si te referi la cat poti sa pui in platforme, asta e ad spend-ul. E cifra pe care o vezi in Ads Manager. E cifra pe care o raporteaza platformele. Si e doar o parte din ce cheltuiesti tu cu adevarat pe marketing.",
        },
        {
          type: "p",
          text: "Iti dau un exemplu concret. Un client mi-a zis: 'Am buget 3.000 de euro pe luna.' Am intrebat: 'Ad spend sau media budget?' A zis: 'Ad spend, ce alta diferenta e?' I-am aratat. Media budget-ul lui real era 4.600 de euro. Diferenta de 1.600 de euro pe luna, 19.200 pe an. Bani pe care ii cheltuia fara sa stie.",
        },
        {
          type: "h2",
          text: "Media budget",
        },
        {
          type: "p",
          text: "Ad spend plus tot ce-ti permite sa faci ad spend-ul sa functioneze. Fee-ul agentiei, productia de creative (sau salariul echipei interne de creative), abonamentele la tool-uri (Triple Whale, Hyros, ce folosesti), eventual comisioane pe plata cu cardul pentru facturile catre platforme.",
        },
        {
          type: "p",
          text: "Un exemplu concret. Ai 5.000 euro ad spend. Platesti agentiei 1.000 euro fee lunar. Alocati 500 euro pentru fotografii si editari video noi lunar. Mai platesti 200 de euro pe Hyros si 100 de euro pe Canva Pro. Media budget-ul tau real e 6.800 de euro, nu 5.000. Cand iti calculezi ROI-ul pe marketing, raportezi vanzarile la 6.800, nu la 5.000.",
        },
        {
          type: "p",
          text: "De ce conteaza? Pentru ca daca faci 20.000 de euro vanzari la un ad spend de 5.000, ROAS-ul e 4x. Frumos. Dar la un media budget de 6.800, ROAS-ul real e 2.94x. Inca bun, dar diferit. Si daca marja ta neta e 30%, POAS-ul la ad spend e 1.2x (profitabil), dar la media budget e 0.88x (pierdere). Acelasi business, aceleasi vanzari, doua concluzii diferite in functie de ce calculezi.",
        },
        {
          type: "callout",
          tone: "ink",
          title: "Capcana din contract",
          text: "Unele agentii scriu 'comision 15% din bugetul de media', altele scriu '15% peste ad spend'. Pare acelasi lucru. Nu e. Daca 15% e din media budget pe 6.800 euro, tu platesti 1.020 euro agentiei. Daca e peste ad spend 5.000, platesti 750. Diferenta de 270 de euro pe luna inseamna 3.240 pe an. Citeste contractul de trei ori, pune intrebarea direct inainte de semnatura.",
        },
        {
          type: "h2",
          text: "Break-even point",
        },
        {
          type: "p",
          text: "Punctul in care vanzarile acopera toate costurile, variabile plus fixe plus marketing. Sub break-even pierzi bani chiar daca ROAS-ul e frumos. Peste, orice leu in plus e profit real.",
        },
        {
          type: "p",
          text: "Formula pe care o bagi intr-o celula de Excel si nu o mai uiti: Break-even revenue = (Costuri fixe lunare + Media budget) impartit la Marja neta. Atat. O singura formula. Iti arata cat trebuie sa vinzi ca sa nu iesi pe minus.",
        },
        {
          type: "p",
          text: "De ce e important? Pentru ca multi antreprenori iau decizii de buget fara sa stie pragul asta. 'Hai sa bagam 10.000 de euro pe Meta luna asta.' OK. Dar daca break-even-ul tau e 30.000 de euro, si tu vinzi 25.000, ai pierdut bani. Chiar daca ROAS-ul e 3x. Chiar daca agentia te-a laudat. Chiar daca ai avut o luna 'buna' in termeni de vanzari. Sub break-even, pierzi.",
        },
        {
          type: "h2",
          text: "Exemplu cu cifre reale",
        },
        {
          type: "ul",
          items: [
            "Costuri fixe: 3.000 euro pe luna. Chirie, salarii, software, contabilitate, utilitati.",
            "Media budget: 5.000 euro pe luna. Ad spend plus fee agentie plus creative plus tool-uri.",
            "Marja neta ponderata: 30%.",
            "Break-even revenue = 8.000 impartit la 0.30 = 26.667 euro revenue pe luna.",
          ],
        },
        {
          type: "p",
          text: "Cu cifrele astea, orice luna in care faci sub 26.667 euro vanzari inseamna ca ai pierdut bani. Chiar daca agentia iti arata ROAS 3x. Multi antreprenori cu care stau de vorba nu stiu cifra asta pentru afacerea lor si iau decizii de scaling orbeste.",
        },
        {
          type: "p",
          text: "Si aici vine partea nasoala. Dublezi bugetul, dublezi si pragul de break-even. Daca treci media budget-ul de la 5.000 la 10.000, break-even-ul urca la 43.333 de euro. Daca vanzarile nu se dubleaza, intri in pierdere pe o curba care se agraveaza rapid. Si asta e exact ce fac agentiile care iti propun 'hai sa crestem bugetul' fara sa calculeze break-even-ul. Nu e scaling. E risc crescut.",
        },
        {
          type: "table",
          headers: ["Media budget", "Break-even revenue", "Ce se schimba"],
          rows: [
            ["5.000 EUR", "26.667 EUR", "Status quo"],
            ["7.500 EUR", "35.000 EUR", "+31% prag break-even"],
            ["10.000 EUR", "43.333 EUR", "+62% prag break-even"],
            ["15.000 EUR", "60.000 EUR", "+125% prag break-even"],
          ],
        },
        {
          type: "h2",
          text: "Povestea din teren: cum am oprit un client sa se arunce in pierdere",
        },
        {
          type: "p",
          text: "Client din Timisoara, produse pentru gradina, 6 luni cu o agentie pe retainer. Agentia venea in fiecare luna cu propunerea: 'Hai sa crestem bugetul cu 30%, vanzarile vor creste proportional.' Clientul zicea da. Si crestea. De la 3.000 la 5.000. De la 5.000 la 8.000. De la 8.000 la 12.000.",
        },
        {
          type: "p",
          text: "Cand a venit la noi, am facut calculul. Costuri fixe: 4.200 euro. Media budget: 12.000 euro (ca asta era realitatea, nu doar ad spend). Marja neta: 24%. Break-even: 67.500 euro. El vindea 58.000. Pierdea bani de 3 luni consecutive. Dar rapoartele aratau 'crestere de 40% fata de luna trecuta'. Agentia nu calculara niciodata break-even-ul. Sau stia si nu i-a zis.",
        },
        {
          type: "p",
          text: "Am taiat media budget-ul la 6.500. Am redus la 3 campanii din 7. Am crescut pretul pe 4 produse cu marja mica. In 2 luni, break-even-ul a coborat la 41.000. Vanzarile au scazut la 48.000. Dar a trecut pe profit. Pentru prima data in 4 luni.",
        },
        {
          type: "callout",
          tone: "red",
          title: "Avertisment direct",
          text: "Orice agentie care iti propune sa cresti bugetul fara sa-ti arate cum se modifica break-even-ul nu lucreaza pentru tine. Lucreaza pentru comisionul ei. Tu ramai cu riscul.",
        },
        {
          type: "h2",
          text: "Praguri practice pentru modelul pe comision",
        },
        {
          type: "p",
          text: "La High-Up Labs lucram pe comision 5-10% din revenue generat. Ca sa aiba sens si pentru tine, si pentru noi, sunt trei praguri sub care nu incepem. Nu pentru ca suntem aroganti. Pentru ca pe comision, daca tu pierzi, pierdem si noi.",
        },
        {
          type: "ul",
          items: [
            "Ad spend minim 2.000 euro pe luna. Sub, algoritmii Meta si Google n-au suficiente date pe care sa optimizeze coerent. Cheltui bani pe o perioada de invatare care nu se termina niciodata.",
            "Alternativ, vanzari existente de minim 5.000 euro pe luna. Inseamna ca ai o baza organica pe care putem scala. Zero vanzari curente + buget mic = doar zero amplificat.",
            "Marja neta peste 15%. Dupa ce scazi comisionul agentiei, sub 15% marja raman resturi care nu platesc nici macar ambalajul. Nu e scalare, e donatie.",
          ],
        },
        {
          type: "p",
          text: "Astea nu sunt reguli arbitrare. Sunt praguri pe care le-am stabilit dupa ce am vazut ce functioneaza si ce duce la esec. Sub oricare din cele trei, sansele sunt impotriva ta. Si noi nu lucram unde sansele sunt impotriva clientului. Nu pentru ca suntem buni. Pentru ca pe comision, daca tu pierzi, pierdem si noi. Asta e diferenta dintre un retainer si un model care depinde de rezultatele tale.",
        },
        {
          type: "h2",
          text: "Diferenta dintre ad spend si media budget in practica",
        },
        {
          type: "table",
          headers: ["Element", "Ad spend", "Media budget"],
          rows: [
            ["Ce include", "Doar platformele (Meta, Google, TikTok)", "Platforme + fee agentie + creative + tool-uri"],
            ["Cifra tipica", "60-70% din total", "100% (ad spend + restul)"],
            ["ROAS calculat pe", "Vanzari : ad spend", "Vanzari : media budget"],
            ["Unde il vezi", "In Ads Manager", "In Excel-ul tau"],
            ["Cine il raporteaza", "Toata lumea", "Aproape nimeni"],
          ],
        },
        {
          type: "p",
          text: "Observa ultimul rand. Aproape nimeni nu-ti raporteaza media budget-ul. Agentiile il evita pentru ca ROAS-ul calculat pe media budget e intotdeauna mai mic decat cel pe ad spend. Si mai mic e mai greu de vandut. Dar mai mic e adevarat. Si tu, ca antreprenor, ai nevoie de adevar, nu de numere care suna bine.",
        },
        {
          type: "callout",
          tone: "lime",
          title: "Daca nu stii unde te situezi",
          text: "Scoti ultimele trei extrase bancare ale firmei, calculezi cheltuielile fixe medii, marja neta ponderata (articolul celalalt iti arata cum) si media budget-ul total. In 20 de minute ai un numar clar de break-even. Fara el, fiecare decizie de buget e o aruncare de zar cu ochii inchisi. Si cu cat bugetul e mai mare, cu atat zarul e mai scump.",
        },
      ],
    },
    en: {
      title: "Ad spend vs media budget: why you think you're profitable when you're not",
      hook: "They sound similar. They get used interchangeably in meetings. The gap between them is the gap between making a profit and thinking you're making a profit. Here's what each one is and when it starts to matter.",
      metaTitle: "Ad spend, media budget, break-even. Clean definitions.",
      metaDescription:
        "A short glossary for founders: what ad spend, media budget and break-even actually mean, the differences that change your decisions, plus practical thresholds.",
      blocks: [
        {
          type: "p",
          text: "Sat in a 20-minute meeting last week where the founder said 'budget' ten times and the agency said it fourteen, and by the end neither was talking about the same thing. The two terms that blur most often and push companies into losses are ad spend and media budget. The third, break-even, nobody calculates. Separating them one by one.",
        },
        {
          type: "p",
          text: "Wait, you'll say this is accountant vocabulary. It isn't. It's the difference between knowing if your business is alive or dead. And I've seen founders with revenues of hundreds of thousands of lei who didn't know their own company's break-even. So they had zero idea whether this month they made money or lost money. Reports said 'good ROAS'. The account said something else. You don't want to be fooled again.",
        },
        {
          type: "h2",
          text: "Ad spend",
        },
        {
          type: "p",
          text: "The money that actually leaves your account toward Meta, Google, TikTok. That's it. Not the agency fee. Not creative production. Not the tracking software. Just the amount Mark Zuckerberg sees on your invoice month after month.",
        },
        {
          type: "p",
          text: "When you say 'I have 5,000 euros budget this month' and you mean how much you can push into the platforms, that's ad spend. It's the number you see in Ads Manager. It's the number the platforms report. And it's only part of what you actually spend on marketing.",
        },
        {
          type: "p",
          text: "Here's a concrete example. A client told me: 'My budget is EUR3,000 a month.' I asked: 'Ad spend or media budget?' He said: 'Ad spend, what other difference is there?' I showed him. His real media budget was EUR4,600. The EUR1,600 difference per month, EUR19,200 per year. Money he was spending without knowing.",
        },
        {
          type: "h2",
          text: "Media budget",
        },
        {
          type: "p",
          text: "Ad spend plus everything that allows ad spend to work. Agency fee, creative production (or the salary of the in-house creative team), tool subscriptions (Triple Whale, Hyros, whatever you run), sometimes card processing fees on platform invoices.",
        },
        {
          type: "p",
          text: "A concrete example. You have 5,000 euros in ad spend. You pay the agency 1,000 euros monthly fee. You allocate 500 for new photoshoots and video editing each month. You pay another 200 for Hyros and 100 for Canva Pro. Your real media budget is EUR6,800, not 5,000. When you calculate marketing ROI, you benchmark sales against 6,800, not 5,000.",
        },
        {
          type: "p",
          text: "Why does it matter? Because if you make EUR20,000 in sales on a EUR5,000 ad spend, ROAS is 4x. Beautiful. But on a EUR6,800 media budget, real ROAS is 2.94x. Still good, but different. And if your net margin is 30%, POAS on ad spend is 1.2x (profitable), but on media budget it's 0.88x (loss). Same business, same sales, two different conclusions depending on what you calculate.",
        },
        {
          type: "callout",
          tone: "ink",
          title: "The contract trap",
          text: "Some agencies write '15% commission on media budget', others write '15% on top of ad spend'. Sounds the same. It isn't. If 15% comes from a media budget of EUR6,800, you pay EUR1,020. If it sits on top of 5,000 ad spend, you pay 750. A EUR270 gap per month. EUR3,240 a year. Read the contract three times, ask the question directly before signing.",
        },
        {
          type: "h2",
          text: "Break-even point",
        },
        {
          type: "p",
          text: "The point where sales cover every cost, variable plus fixed plus marketing. Below break-even, you're bleeding money even when ROAS looks good. Above, every extra euro is real profit.",
        },
        {
          type: "p",
          text: "The formula you drop into one Excel cell and never forget: Break-even revenue = (Fixed monthly costs + Media budget) divided by Net margin. That's it. One formula. It shows you how much you need to sell to not lose money.",
        },
        {
          type: "p",
          text: "Why is it important? Because many entrepreneurs make budget decisions without knowing this threshold. 'Let's throw EUR10,000 at Meta this month.' OK. But if your break-even is EUR30,000, and you sell EUR25,000, you lost money. Even if ROAS is 3x. Even if the agency praised you. Even if you had a 'good' month in sales terms. Below break-even, you lose.",
        },
        {
          type: "h2",
          text: "Example with real numbers",
        },
        {
          type: "ul",
          items: [
            "Fixed costs: 3,000 euros per month. Rent, salaries, software, accounting, utilities.",
            "Media budget: 5,000 euros per month. Ad spend plus agency fee plus creative plus tools.",
            "Weighted net margin: 30%.",
            "Break-even revenue = 8,000 divided by 0.30 = 26,667 euros of revenue per month.",
          ],
        },
        {
          type: "p",
          text: "With those numbers, any month you come in under 26,667 euros of sales means you lost money. Even if the agency shows you ROAS 3x. Most founders I talk to don't know this number for their own business and make scaling decisions blind.",
        },
        {
          type: "p",
          text: "And here's the nasty part. Double the budget, you also double the break-even threshold. If you move media budget from 5,000 to 10,000, break-even rises to EUR43,333. If sales don't double, you enter losses on a curve that gets worse fast. And this is exactly what agencies do when they propose 'let's increase budget' without calculating break-even. It's not scaling. It's increased risk.",
        },
        {
          type: "table",
          headers: ["Media budget", "Break-even revenue", "What changes"],
          rows: [
            ["EUR5,000", "EUR26,667", "Status quo"],
            ["EUR7,500", "EUR35,000", "+31% break-even threshold"],
            ["EUR10,000", "EUR43,333", "+62% break-even threshold"],
            ["EUR15,000", "EUR60,000", "+125% break-even threshold"],
          ],
        },
        {
          type: "h2",
          text: "Field story: how I stopped a client from diving into loss",
        },
        {
          type: "p",
          text: "Client from Timisoara, garden products, 6 months with an agency on retainer. Every month the agency came with the proposal: 'Let's increase budget 30%, sales will grow proportionally.' The client said yes. And increased. From 3,000 to 5,000. From 5,000 to 8,000. From 8,000 to 12,000.",
        },
        {
          type: "p",
          text: "When he came to us, we did the math. Fixed costs: EUR4,200. Media budget: EUR12,000 (because that was the reality, not just ad spend). Net margin: 24%. Break-even: EUR67,500. He was selling EUR58,000. Losing money for 3 consecutive months. But reports showed '40% growth vs last month.' The agency never calculated break-even. Or knew and didn't tell him.",
        },
        {
          type: "p",
          text: "We cut media budget to EUR6,500. Reduced from 7 to 3 campaigns. Raised prices on 4 low-margin products. In 2 months, break-even dropped to EUR41,000. Sales fell to EUR48,000. But he became profitable. For the first time in 4 months.",
        },
        {
          type: "callout",
          tone: "red",
          title: "Direct warning",
          text: "Any agency that proposes you increase budget without showing you how break-even changes isn't working for you. They're working for their commission. You keep the risk.",
        },
        {
          type: "h2",
          text: "Practical thresholds for the commission model",
        },
        {
          type: "p",
          text: "At High-Up Labs we work on 5-10% commission of generated revenue. For it to make sense both for you and for us, three thresholds come into play. Below them, we don't start. Not because we're arrogant. Because on commission, if you lose, we lose too.",
        },
        {
          type: "ul",
          items: [
            "Minimum ad spend of 2,000 euros per month. Below that, Meta and Google algorithms don't have enough data to optimize coherently. You pay for a learning phase that never ends.",
            "Alternatively, existing sales of at least 5,000 euros per month. Means you have an organic base we can scale. Zero current sales plus small budget equals zero amplified.",
            "Net margin above 15%. After the agency commission, anything under 15% leaves crumbs that don't cover the packaging. It's not scaling, it's donation.",
          ],
        },
        {
          type: "p",
          text: "These aren't arbitrary rules. They're thresholds we established after seeing what works and what leads to failure. Below any of the three, the odds are against you. And we don't work where the odds are against the client. Not because we're nice. Because on commission, if you lose, we lose too. That's the difference between a retainer and a model that depends on your results.",
        },
        {
          type: "h2",
          text: "The difference between ad spend and media budget in practice",
        },
        {
          type: "table",
          headers: ["Element", "Ad spend", "Media budget"],
          rows: [
            ["What it includes", "Platforms only (Meta, Google, TikTok)", "Platforms + agency fee + creative + tools"],
            ["Typical share", "60-70% of total", "100% (ad spend + rest)"],
            ["ROAS calculated on", "Sales : ad spend", "Sales : media budget"],
            ["Where you see it", "In Ads Manager", "In your Excel"],
            ["Who reports it", "Everyone", "Almost no one"],
          ],
        },
        {
          type: "p",
          text: "Notice the last row. Almost nobody reports media budget to you. Agencies avoid it because ROAS calculated on media budget is always lower than on ad spend. And lower is harder to sell. But lower is true. And you, as a founder, need truth, not numbers that sound good.",
        },
        {
          type: "callout",
          tone: "lime",
          title: "If you don't know where you stand",
          text: "Pull the last three company bank statements, calculate average fixed expenses, weighted net margin (the other article shows how) and total media budget. Twenty minutes, you've got a clean break-even number. Without it, every budget decision is a dice roll with your eyes closed. And the bigger the budget, the more expensive the dice.",
        },
      ],
    },
  },
};
