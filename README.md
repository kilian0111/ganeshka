# Projet Réseau Social - Squirrel

Membres du projet :  Marmilliot Kilian, Picard Antoine, Nivon Fabien , Costamagna Ewan, Wolff-Dumontel Bruno

### Description du projet : 
Dans le cadre du cours Web Mobile en Mastère expert développement web à Ynov, nous devons réaliser une **Progressive Web App (PWA)** en React. Pour ce faire, nous étions un groupe de 5 personnes. Plusieurs contraintes devaient être respectées, notamment utiliser le **framework React** ainsi que **Redux** qui est une bibliothèque open-source JavaScript de gestion d'état pour applications web. 

Au niveau du design, nous devions utilisé **Matérial UI** qui est une bibliothèque de composants React open source. 

Du coté du Back-End, nous devions utilisé **Directus** qui est à la fois un CMS et une API sans interface qui gère les architectures de bases de données SQL personnalisées. 

### Notre Projet : 
Le but de notre projet est de réaliser un réseau social avec une partie où l'on peut visionner des posts qu'un utilisateur publie, une partie où l'on peut modifier notre profil avec une possibilité de le personnaliser. Nous avons également mis en place un système de message privé pour communiquer entre les différents utilisateurs du réseau social. Ces fonctionnalités sont accessibles en se connectant avec un compte créé au préalable. 

### Deploiement du projet :

Le projet est déployé sur un serveur OVH dont le front-end est dockerisé avec un dockerfile se basant sur une image ubuntu.
Ainsi on a pu faire du continuous deployment grace a github qui envoie des commandes ssh au serveur pour lancer les commandes docker lorsqu'il y a un push sur la branche dev.

le phpMyAdmin est lui aussi sur le serveur ovh et est accessible via le port 8080 a l'adresse suivante : http://squirel.kilian-marmilliot.com:8080/phpmyadmin

le back-end est lui aussi sur le serveur ovh et est accessible via le port 8055 a l'adresse suivante : http://squirel.kilian-marmilliot.com:8055


### Installation du projet :

- Cloner le projet : 

```
git clone https://github.com/kilian0111/ganeshka.git
```

- Accéder au projet : 
```
cd ganeska
```

- Intaller les dépendances :
```
npm install
```
- Lancer le projet :
```
npm start
```

## Les Liens utiles 
- Visionner le projet : 
http://squirel.kilian-marmilliot.com/

- Lien du Directus :
http://squirel.kilian-marmilliot.com:8055

- Lien du Figma :
https://www.figma.com/file/yAKOWisiIpbnEtYPlSpEPW/Squirrel?t=tFyK5sWPU07GkBl5-1

- Lien du phpMyAdmin :
http://squirel.kilian-marmilliot.com:8080/phpmyadmin

