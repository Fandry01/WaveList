WaveList
=======


Table of Contents
=================

1.  [Installatie]
2.  [Gebruik]
3.  [Demo]






WaveList - Eenvoudige Muziekstreaming en Playlist-app

1.Installatie
-----------

Om WaveList te installeren, volg je deze stappen:
1. Zorg ervoor dat je React, Node.js en npm op je machine hebt geïnstalleerd.

2. Kloon deze repository met de volgende opdracht:
git clone https://github.com/Fandry01/WaveList

3. Navigeer naar de gekloonde map: cd WaveList

4. Installeer de benodigde afhankelijkheden met npm: npm install
5. Maak een nieuw bestand aan: Maak een nieuw bestand met de naam .env aan in de hoofdmap van je React-project.

6. Voeg omgevingsvariabelen toe: Voeg de omgevingsvariabelen toe die je wilt gebruiken in je applicatie.
REACT_APP_SPOTIFY_CLIENT_ID="23765694ea9d4e41a76fca78df125f67"
REACT_APP_SPOTIFY_CLIENT_SECRET="9e8pd35a5b3754daa93e373f9cf8b9ca3"
7. Herstart je ontwikkelingsserver: Als je de ontwikkelingsserver al hebt gestart, moet je deze opnieuw starten zodat de wijzigingen
in het .env-bestand van kracht worden.Stop de server en start deze opnieuw met het commando npm start.

2.Gebruik
-------
1. Om WaveList te starten, voer je het volgende uit: npm start 
Open vervolgens http://localhost:3000 in je browser.
2. Klik op "Registreren" om een account aan te maken.

3.  Zodra je bent ingelogd wordt je geredirect naar de Home Page vanuit daar kan je kiezen om gelijk naar de library te gaan om een playlist
aan te maken of naar bestaande playlists luisteren.

4. Je wordt doorgestuurd naar het Spotify-loginvenster. 
Je kunt je eigen Spotify-inloggegevens gebruiken of de volgende gebruiken: gebruikersnaam: fendi01 en wachtwoord: Silvoldestraat100 .

5. Eenmaal ingelogd, kom je op de Home-pagina terecht, waar je toegang hebt tot je bibliotheek en bestaande afspeellijsten.

6. Ga naar de "Search Page" bovenaan om nummers te zoeken en deze aan je afspeellijsten toe te voegen.
7. Onderaan de pagina vind je een audiospeler waar je nummers kunt afspelen.
8. Ga naar je "Library Page" om je afspeellijsten af te spelen.


Ps: het duurt FF voor dat het afspeelt 




3.Demo
----
Stap: 1 Hompage.
![HomePageDemo](src/Assets/img/HomePageDemo.jpg)
Stap: 2 registreren.
![RegisterPageDemo](src/Assets/img/RegisterPageDemo.jpg)
Stap: 3 Login.
![LoginPageDemo](src/Assets/img/LoginPageDemo.jpg)
Stap: 4 Login met je spotify-account Gebruikersnaam: fendi01 Wachtwoord Silvoldestraat100.
![SpotifyLoginPage](src/Assets/img/SpotifyLoginPage.jpg)
Stap: 5 playlist maken.
![LibraryPageDemo](src/Assets/img/LibraryPageDemo.jpg)
Stap: 6 zoek en voeg nummers toe aan je playlist.
![SearchPageDemo](src/Assets/img/SearchPageDemo.jpg)



