# Bonaire Kerkkiezer

Een eenvoudige website om een christelijke kerk op Bonaire te vinden: welke kerken er zijn, tot welke denominatie ze behoren, wanneer de diensten zijn en in welke taal.

- **Filters:** dag, tijdstip (ochtend/middag/avond), taal van de dienst (incl. vertaling op verzoek), denominatie, plaats en een zoekveld
- **Weergaven:** lijst met kaarten, weekrooster en een kaart (OpenStreetMap/Leaflet)
- **Talen van de site:** Nederlands, Engels en Papiamentu
- Statische site zonder buildstap — werkt direct op GitHub Pages

## Website publiceren met GitHub Pages

1. Zorg dat de bestanden op de `main`-branch staan (merge deze branch).
2. Ga in de repository naar **Settings → Pages**.
3. Kies bij *Source*: **Deploy from a branch**, branch `main`, map `/ (root)` en klik op **Save**.
4. Na een minuut staat de site op `https://<gebruikersnaam>.github.io/BonaireKerkkiezer/`.

## Gegevens aanpassen

Alle kerken en diensten staan in [`data/churches.js`](data/churches.js). Bovenin dat bestand staat uitgelegd welke velden er zijn. Werk na een wijziging ook `window.LAST_CHECKED` bij.

Teksten van de website (in drie talen) staan in [`js/i18n.js`](js/i18n.js).

## Bronnen

De gegevens zijn in oktober 2026 verzameld uit openbare bronnen, o.a.:

- [InfoBonaire – Religion & Churches on Bonaire](https://infobonaire.com/moving-living-bonaire/religion-churches-bonaire/)
- [Bonaire Vakantieland – Kerkdiensten op Bonaire](https://bonairevakantieland.nl/thema-artikelen-over-bonaire/kerkdiensten-op-bonaire/)
- [Vrienden van de Protestantse Kerk van Bonaire](https://protestantsegemeentebonaire.com/)
- [Activate Church Bonaire](https://www.activatebonaire.com/agenda/298083/kerkdienst.html)
- [International Bible Church of Bonaire](https://bonaireibc.org/)
- [GCatholic – kerken op Bonaire](https://gcatholic.org/churches/BQ.htm)
- Facebookpagina's van Parokia San Luis Beltran, Bonaire Christian Fellowship en de Nieuw-Apostolische Kerk

Diensttijden kunnen veranderen. Controleer bij twijfel bij de kerk zelf. Kaartlocaties zijn indicatief.
