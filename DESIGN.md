# HighUpLabs v4 — NEO-BRUTALIST LABORATORY

## Concept
Site-ul nu arată ca o agenție. Arată ca un laborator de precizie unde se construiesc mașini de profit. Estetica = tehnică + brutală + lux. Fiecare pixel are un scop. Nimic decorativ fără funcție.

---

## Paletă
- **Base:** #000000 (black pur)
- **Surface:** #0A0A0A (black ridicat)
- **Elevated:** #111111 (panouri, carduri)
- **Accent:** #CCFF00 (lime acid — singura culoare)
- **Text:** #FFFFFF (white pur)
- **Muted:** #666666 (gray tehnic)
- **Grid:** #1A1A1A (linii grid vizibile)
- **Warning:** #FF3333 (doar pentru alerte)

## Tipografie
- **Display:** "Inter" 900 black, tracking -0.05em, uppercase pentru headlines majore
- **Headings:** "Space Grotesk" 700, tracking -0.03em
- **Body:** "Inter" 400, 16px, line-height 1.5
- **Mono:** "Space Mono" 400, 12px, uppercase pentru label-uri, data readouts, tag-uri
- **Scale:** Display 120px → 80px → 56px → 40px → 24px → 16px → 12px

## Principii Layout
1. **Grid vizibil permanent** — linii de 1px #1A1A1A care structurează fiecare secțiune
2. **Colțuri drepte** — border-radius 0 peste tot, fără excepție
3. **Asimetrie controlată** — elementele sunt plasate intenționat off-center
4. **Whitespace agresiv** — secțiuni de 100-140vh, padding masiv
5. **Bordere lime** — separatori de secțiune = linii lime de 2px full-bleed
6. **Date decorative** — numere, coduri, tickere, counters în fundal ca textură

## Efecte & Motion
1. **Hero:** Particule Three.js — 2000 puncte lime care formează un volum 3D rotativ, reacționează la mouse. Subtitlu = text care se "decodează" caracter cu caracter (efect terminal).
2. **Scroll:** Lenis smooth + secțiuni cu pin (ScrollTrigger) — fiecare secțiune majoră se "blochează" în viewport în timp ce conținutul se animă.
3. **Text Reveal:** SplitText — cuvintele vin din spate (z:-100 → z:0, opacity 0→1, stagger 0.02s).
4. **Counters:** Numerele se numără rapid (0→valoare în 1.5s) când intră în viewport.
5. **Hover:** Butoane — fill de sus în jos cu lime, text invertează în black instant. Link-uri — underline care se desenează de la stânga cu lime 2px.
6. **Cursor:** Pătrat lime 8x8px care se rotește 45° pe hover. Fără blending, fără scale — mecanic.
7. **Page Load:** Linie lime care traversează ecranul orizontal (top→bottom ca un scan) în 0.8s, apoi conținutul apare.
8. **Ticker:** Banda continuă de text în footer și între secțiuni, scroll infinit.
9. **Glitch:** La hover pe headline-uri majore, 2-3 frame-uri de chromatic aberration subtil.

## Componente Cheie
- **Nav:** Fixed top, height 64px, border-bottom 1px grid. Logo stânga (mono, uppercase). Link-uri centru. CTA dreapta — dreptunghi lime, text black, fără radius.
- **Footer:** Grid 4 coloane, bordere vizibile între ele. Ticker infinit deasupra.
- **Cookie Banner:** Panou grid, checkbox-uri stil terminal, butoane dreptunghi lime.
- **Carduri:** Elevated #111111, border 1px #1A1A1A, hover = border lime + shadow glow subtil.
- **Form:** Input-uri cu border bottom 1px #333, focus = border-bottom lime 2px, label mono uppercase.

## Homepage Sections (10)
1. **HERO** — Particule 3D + headline 120px "SCALĂM BRANDURI. NU RETAINERE." + decode effect pe subtitle + CTA lime.
2. **DATA STRIP** — Banda orizontală cu numere live (clienți, revenue generat, POAS mediu, țări) — ticker rapid.
3. **MANIFESTO** — Text masiv pe 2 coloane, grid vizibil, explică modelul pe comision cu cifre șoc.
4. **COMPARISON** — Noi vs Ei — tabel asimetric cu bordere, animație pe scroll.
5. **VALUE STACK** — Ce include / Ce NU include — două coloane, carduri cu check/x icons, prețuri mari.
6. **POAS CALCULATOR** — Input-uri stil terminal, rezultat live cu numere animate.
7. **CASE STUDIES** — 3 carduri full-width, imagine stânga/text dreapta (alternat), stats overlay.
8. **ARTICLES PREVIEW** — Grid 3 coloane, fiecare cu număr mare (01, 02, 03) în fundal, titlu în față.
9. **QUALIFY** — Checklist interactiv 5 puncte, progress bar lime, rezultat dinamic.
10. **CTA FINAL** — Full black, headline masiv centrat, form scurt (doar email + buton), ticker deasupra.

## Content Pages
- Articole: Grid masonry, numere mari, tag-uri mono, hover = imagine scale + border lime.
- Articol single: Layout editorial, sticky sidebar cu TOC, progress bar lime în top, callouts cu border lime.
- Studii de caz: Carduri immersive, timeline vertical cu puncte lime, date agregate.
- Despre: Timeline vertical, valori în grid 2x2, foto founder.
- Aplică: Form multi-step, progress indicator lime, validare real-time.
- Legal: Text curat, nav ancorat, company data vizibil.

## Responsive
- Desktop = experița principală (totul funcționează)
- Tablet = grid se restructurează, particule reduse
- Mobile = particule off, grid simplificat, typography scalat, nav hamburger

## Performance
- Particule lazy-load (desktop only)
- Fonturi preconnect
- Images next/image cu priority pe hero
- GSAP SplitText doar când e necesar
- 60fps target
