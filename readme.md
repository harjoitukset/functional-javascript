# Funktionaalinen JavaScript

Tämän viikon tehtävässä harjoitellaan tunnilla esitettyjen ohjelmointitapojen hyödyntämistä. Tehtävänä on lukea kahdesta erillisestä JSON-tiedostosta käyttäjiä ja postauksia, ja yhdistellä käyttäjät niitä vastaaviin postauksiin.

**Tehtävä tehdään Node.js ympäristössä Node.js:n standardikirjastolla ilman erillisiä sovelluskehyksiä tai npm-paketteja.**


## Harjoitusten kloonaaminen

Kun olet hyväksynyt tämän tehtävän GitHub classroomissa ja saanut repositoriosta henkilökohtaisen kopion, kloonaa se itsellesi `git clone` -komennolla. Siirry sen jälkeen VS Codeen editoimaan tiedostoja.

Kloonatessasi repositoriota varmista, että Git-osoitteen lopussa on oma GitHub-käyttäjänimesi. Jos käyttäjänimesi puuttuu osoitteesta, kyseessä ei ole henkilökohtainen kopiosi tehtävästä. Luo tässä tapauksessa oma repositorio tämän linkin kautta: **TODO**.


## Tehtävän data

Tässä tehtävässä käytetään staattista JSON-muotoista dataa JSON Placeholder -palvelusta:

> *"{JSON} Placeholder*
>
> *Free to use fake Online REST API for testing and prototyping*
>
> *Powered by JSON Server + LowDB"*
>
> https://jsonplaceholder.typicode.com/

Tämän tehtävän kannalta riittää, että luet käyttäjät ja postaukset paikallisesta tiedostosta. Tietoja ei siis tarvitse hakea verkosta JavaScript-koodissa.

Voit tallentaa tehtävässä tarvittavat JSON-tiedostot itsellesi seuraavista kahdesta osoitteesta:

* **Käyttäjät**

    Selaimella: https://jsonplaceholder.typicode.com/users

    ```
    # Komentorivillä
    curl https://jsonplaceholder.typicode.com/users > users.json
    ```

* **Postaukset**

    Selaimella: https://jsonplaceholder.typicode.com/posts

    ```
    # Komentorivillä
    curl https://jsonplaceholder.typicode.com/posts > posts.json
    ```

Muista lisätä tallentamasi JSON-tiedostot myös versionhallintaan ennen tehtävän lähettämistä.

JSON-muotoinen data voidaan lukea Node.js-sovellukseen [require](https://nodejs.org/en/knowledge/getting-started/what-is-require/)-funktiolla esimerkiksi seuraavasti:

```js
let users = require('./users.json');
```


## Osa 1: tietojen yhdistäminen ja suodattaminen (3 pistettä)

Tehtävän 1. osassa sinun tulee kirjoittaa Node.js-skripti `users-and-posts.js`, joka lukee JSON-tiedostot ja tulostaa niissä olevien käyttäjien nimet (`name`) sekä postausten otsikot (`title`).

Tiedot tulee tulostaa siten, että kunkin käyttäjän nimen tulostamisen jälkeen tulostetaan kaikkien kyseisen käyttäjän postausten otsikot. Postaukset voidaan yhdistää käyttäjiin vertailemalla `post`-tietomallin `userId`-attribuutteja `user`-tietomallin `id`-attribuuttiin.

Lopputulos voi näyttää esimerkiksi seuraavalta:

```
Leanne Graham
- sunt aut facere repellat provident occaecati excepturi optio reprehenderit
- qui est esse
- ea molestias quasi exercitationem repellat qui ipsa sit aut
- eum et est occaecati
- nesciunt quas odio
- dolorem eum magni eos aperiam quia
- magnam facilis autem
- dolorem dolore est ipsam
- nesciunt iure omnis dolorem tempora et accusantium
- optio molestias id quia eum 


Ervin Howell
- et ea vero quia laudantium autem
- in quibusdam tempore odit est dolorem
- dolorum ut in voluptas mollitia et saepe quo animi
- voluptatem eligendi optio
- eveniet quod temporibus
- sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio
- fugit voluptas sed molestias voluptatem provident
- voluptate et itaque vero tempora molestiae
- adipisci placeat illum aut reiciendis qui
- doloribus ad provident suscipit at

...
```

Arvioinnin kannalta tulosteen tyylillä ei ole painoarvoa, kunhan et muuta nimiä, otsikoita tai niiden järjestystä.

Tehtävän ratkaiseminen perinteisesti sisäkkäisillä toistorakenteilla oikeuttaa tästä osasta 2 pisteeseen. 3 pistettä edellyttää, että ratkaisussa on hyödynnetty JavaScriptin `map`, `filter` tai `reduce` operaatioita.


## Osa 2: JSON-rakenteen muodostaminen ja tallentaminen tiedostoon (2 pistettä)

Arvosanatavoitteeseen 5 sinun tulee kirjoittaa edellisen lisäksi toinen skripti `users-and-posts-file.js`, joka esittää datan sisäkkäisinä JSON-tietorakenteina siten, että kunkin käyttäjän kirjoittamat postaukset ovat koottu käyttäjän yhteyteen omaksi taulukokseen. Muodostettun tietorakenne tulee tallentaa uuteen tiedostoon `output.json`.

Yksittäisen käyttäjän osalta lopputulos voi olla esimerkiksi seuraavan kaltainen:

```js
[
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        },

        // käyttäjälle lisätty uusi `posts`-taulukko sisältää kaikki kyseisen käyttäjän postaukset:
        "posts": [
            {
                "userId": 1,
                "id": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            },
            {
                "userId": 1,
                "id": 2,
                "title": "qui est esse",
                "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
            },
            
            // + loput saman käyttäjän postaukset täällä...
        ]
    },
    
    // + loput käyttäjät...

]
```

JavaScript-tietorakenteen muuttaminen merkkijonoksi onnistuu esimerkiksi [JSON.stringify-metodilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify):

```js
let jsonString = JSON.stringify(omaData, null, 4);
```

Muodostettu JSON-merkkijono tulee tallentaa `output.json`-tiedostoon esimerkiksi Node.js:n fs-moduulin [writeFileSync](https://stackoverflow.com/a/46356040)-metodilla:

```js
const fs = require('fs');

fs.writeFileSync('output.json', jsonString);
```



## Älä käytä ulkoisia kirjastoja

Näiden tehtävien ratkaisemiseksi **et tarvitse ulkoisia kirjastoja** tai `npm`-komentoa. Pelkkä Node.js riittää.

Ratkaisusi suoritetaan GitHub classroom -palvelussa komennoilla `node users-and-posts.js` ja `node users-and-posts-file.js`. Mahdollisia npm-riippuvuuksia ei asenneta, vaikka määrittelisit projektiin package.json-tiedoston.


## Vinkit datan käsittelyyn

Käyttäjien ja heidän postauksiensa yhdistämiseksi yksi lähestymistapa on käydä käyttäjät läpi `map`-metodilla ja muodostaa jokaisesta käyttäjästä uusi olio, jolla on alkuperäisten tietojen lisäksi taulukko postauksia. 

Käyttäjäkohtaiset postaustaulukot voidaan puolestaan rakentaa `filter`-metodin avulla, suodattamalla kaikista postauksista ne, joiden `userId` vastaa kyseisen käyttäjän `id`:tä.

Voit kysellä lisää vinkkejä kurssin keskustelukanavalla.

----

# Lisenssit ja tekijänoikeudet

## JSONPlaceholder

JSONPlaceholder-palvelun on kehittänyt [typicode](https://typicode.com) ja se on lisensoitu MIT-lisenssillä: [https://github.com/typicode/jsonplaceholder/blob/master/LICENSE](https://github.com/typicode/jsonplaceholder/blob/master/LICENSE)