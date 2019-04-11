import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'
import './App.css'
import HighScoreInput from "./HighScoreInput"
import Card from './Card'
import GuessCount from './GuessCount'
import HallOfFame from './HallOfFame'
import PairedCards from './PairedCards';

const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 750
// Le but de cette application est d'arriver à trouver 15 paires qui se ressemblent
// Les 15 paires doivent être trouvées par le joueur en cliquant sur les cartes , 
// Une fois qu'il a cliqué 2 fois, si les 2 cartes sont les mêmes, elles restent affichées
// Si elles sont différentes, elles disparaissent
// lorsque les 15 paires sont trouvées un composant HallOfFame apparaît
class App extends Component {
  state = {
    cards: this.generateCards(),
    currentPair: [],
    guesses: 0,
    myEntries: null,
    matchedCardIndices: [],
    matchedCardSymbols: [],
  }

  // Fait un tableau d'icones à partir de symbols
  // est appelé dès l'init      
  generateCards() {
    console.log("GENERATECARDS ::: DEBUT")
    console.log("GENERATECARDS ::: INIT de l'aplication")
    console.log("GENERATECARDS ::: on construit le tableau de cards")
    const result = []
    const size = SIDE * SIDE
    const candidates = shuffle(SYMBOLS)
    while (result.length < size) {
      const card = candidates.pop()
      result.push(card, card)
    }
    return shuffle(result)
  }

  // défini si ma carte est visible ou pas,
  // du coup est appelé à chaque fois qu'on clique
  // et à chaque fois qu'on clique il y a un render et elle est appelée pour chaque instance de <Card>
  // voilà comment est appelé ce code :
  // {this.getFeedbackForCard(index)}
  // la fonction est appelé avec les parenthèses et un paramètre
  // donc ici le this est connu
  getFeedbackForCard(index) {
    console.log("GETFEEDBACKFORCARDS ::: DEBUT")
    console.log("GETFEEDBACKFORCARDS ::: détermine comment il faut afficher la carte")
    console.log("GETFEEDBACKFORCARDS ::: voici index : ", index)
    const { currentPair, matchedCardIndices } = this.state;
    console.log("GETFEEDBACKFORCARDS::: voici la valeur de currentPair : ", currentPair)
    // indexMatched est un booleen, il regarde si il y a "index" dans le tableau matchedCardIndices,
    // le tableau matchedCardIndices contient les paires qui ont déjà été validées
    const indexMatched = matchedCardIndices.includes(index)
    console.log(`GETFEEDBACKFORCARDS ::: voici matchecardindices : ${matchedCardIndices}`)
    console.log(`GETFEEDBACKFORCARDS ::: voici indexMatched : ${indexMatched}`)

    // ce code est appelé lors du 1er click
    if (currentPair.length < 2) {
      // ici , c le premier click, on regarde si indexMatched est à true, si oui ça veut dire que l'index 
      // sur lequel on a clické
      // fait deja partie d'une paire donc ici on fait un return ce qui fait que l'instruction
      // après le || n'est pas effectuée et surtout qu'on return, ce qui arrete la méthode,

      //return indexMatched || currentPair[0] === index ? "visible" : "hidden"
      /* Cette ligne ^ peut s'écrire comme ça :  */
      if (indexMatched) {
        return;
      } else {

        // d'abord handleclick est appelé, il place dans currentPair l'index qui a été clické      
        // donc ici est retourné visible pour cet index et sinon hidden
        return index === currentPair[0] ? 'visible' : 'hidden'
      }
    }

    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched'
    }

    return indexMatched ? 'visible' : 'hidden'

    // comprendre cette ligne de code : 
    // soit on retourne indexMatched soit on retourne la réponse de la condition ternaire
    // Si indexMatched === true alors on retourne true 
    // Si indexMatched === false alors on execute la condition ternaire
    // la condition ternaire : la condition ternaire dit si index est égal au 1er élément du tableau 
    // currentPair alors on retourne visible sinon hidden     
    // Exemple : imaginons que currentPair[0] = 2 et que index = 2 alors on retourne visible
    // Cette vérification de condition ternaire est faite sur chaque élément du tableau Card
    // afin de déterminer quelle est la visibilité de la Card par exemple : si index === 2 
    // On est donc dans l'index 2 du tableau de Card et comme currentPair[0] est égal à 2 aussi alors
    // pour cet index la valeur sera visible et toutes les autres seront hidden 

    console.log("GETFEEDBACKFORCARDS ::: On va rendre cette carte VISIBLE car son index dans le tableau est égal à ", index, " et que la carte qui vient d'être cliquée a été plcée ds currentPair et avait pour index : ", currentPair[0])

    console.log("GETFEEDBACKFORCARDS ::: ****************** currentPair.length Voici comment sera afficher l'image : ", indexMatched || index === currentPair[0] ? 'visible' : 'hidden')
    // on vérifie si l'index est inclu dans la paire actuelle currentPair

    // Si c'est vérifié on lui ajoute la className justMismatched 
    // et donc cela veut dire qu'on vient de créer une paire 
    console.log("GETFEEDBACKFORCARDS ::: si le currentPair inclut l'index  ")
    console.log("GETFEEDBACKFORCARDS ::: On vient de créer une paire, Voici comment sera afficher l'image : ", indexMatched ? 'justMatched' : 'justMismatched')

    console.log("GETFEEDBACKFORCARDS ::: 2 click Voici comment sera afficher l'image : ", indexMatched ? 'visible' : 'hidden')
  }
  //------------------------------------------------------------

  // Est appelée dès qu'on clique, sert à gérer le tableau currentPair[]
  // le tableau currentPair sert à gérer les paires que l'utilisateur est en train d'essayer de créer
  // ici index est envoyé par le composant Card :
  // onClick={() => handleClick(index)}
  handleCardClick = (index) => {
    console.log("HANDLECARDCLICK ::: DEBUT")
    console.log("HANDLECARDCLICK ::: est appelée à chaque click")
    console.log("HANDLECARDCLICK ::: on vient de cliquer sur une carte qui se trouve à l'index ; ", index, " du tableau this.cards ", this.state.cards)

    const { currentPair } = this.state

    if (currentPair.length === 0) {
      return this.setState({ currentPair: [index] })
    }
    if (currentPair.length === 2) {
      return
    }
    return this.handleNewPairClosedBy(index)

    // pour l'instant ce code n'est pas appelle

    // ce code est appellé lors du premier click

    // si toute les cartes sont avec un ? c'est qu'aucune pair n'a commencé à êtrer créée
    // donc le tableau currentpair qui gère les paires de cartes, est vide
    // puisque le tableau est vide on met à jour le currentPair ds le state avec
    // l'index de la carte qui vient d'etre cliquée
    // et donc maintenant le currentPair du State n'est plus vide et n'est plus égal à 0, donc on ne repassera 
    // plus ici 
    console.log(" HANDLECARDCLICK ::: l'index sur lequel on a cliqué est placé dans currentPair")
    console.log(" HANDLECARDCLICK ::: on fait un set state pour currentPair")

    // ce code est appellé au deuxième clique
    console.log("HANDLECARDCLICK ::: 2EME CLICK : on appelle handleNewPairClosedBy")

    console.log("HANDLECARDCLICK ::: FIN")
  }

  // Détermine si on a trouvé une bonne paire en analysant currentPair et index
  // On passe ici qu'au deuxieme clique
  handleNewPairClosedBy(index) {
    console.log("handleNewPairClosedBy ::: DEBUT")
    const { cards, currentPair, guesses, matchedCardIndices, matchedCardSymbols } = this.state
    // on va créer un tableau qui contient la premiere carte qu'on a mit ds currentPair lors du premier
    // clique, et qui va contenir aussi la deuxieme carte qui vient juste d'être cliquée
    console.log("handleNewPairClosedBy ::: Détermine si on a trouvé une bonne paire")
    console.log(`handleNewPairClosedBy ::: On compare le 1er click : ${currentPair[0]} avec le 2eme click : ${index} `)

    const newPair = [currentPair[0], index];
    const matched = cards[currentPair[0]] === cards[index];

    const newGuesses = guesses + 1;
    this.setState({ currentPair: newPair })
    if (matched) {
      const pairSymbols = [cards[currentPair[0]], cards[index]];
      return this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair], currentPair: [], guesses: newGuesses, matchedCardSymbols: [...matchedCardSymbols, ...pairSymbols] })
    }
    return setTimeout(() => { this.setState({ currentPair: [] }) }, VISUAL_PAUSE_MSECS);
    // on incrémente guesses de 1 pour signaler que le joueur vient d'avoir une chance de jouer

    // matched est un booleen, il regarde si l'égalité entre l'icone choisie au 1er click et 
    // l'icone choisie au 2eme clique est vérifiée
    // Il prend le tab cards va à l'index qui se trouve à newPair[0]] et le compare à l'index [newPair[1]
    // Ici il ne compare pas des chiffres mais bien les SYMBOLES qui se toruvent à ces indexs ds le tab cards

    console.log("handleNewPairClosedBy ::: Est-ce qu'elles sont égales ? ", matched)
    // dans notre state local on selectionne la pté currentPair , on lui donne la nouvelle pair
    // qui vient d'être fabriquée pour que au 2eme clique, tout le composant soit rechargé
    // que <Card> soit instancié de nouveau et que du coup la méthode getFeedBackForCards
    // soit appelée qui donnera la value "visible" à notre seconde card  
    console.log("handleNewPairClosedBy ::: On appelle setState")

    // si matched est true alors on a une paire valide

    console.log("handleNewPairClosedBy ::: Les cartes étaient identiques donc on appelle setState")
    console.log("handleNewPairClosedBy ::: pour faire persister 2 cards on les place dans matchedCardIndices")
    // étant donné que les 2 cartes sont identiques il s'agit donc d'une paire 
    // puisque c'est une paire qui a été trouvée il faut la persister dans le state local afin que l'on
    // sache que cette paire doit tj être affichée, pr cela on utilise le spread operator
    // en lui disant tu prends l'ancien tableau matchedCardIndices et tu lui rajoute la nouvelle pair
    // qui se trouve dans le tableau newPair
    // on copie les valeurs et pas le tableau en lui-même

    // on passe ici ds tous les cas, apres un certain temps on vide le tableau currentPair
    // puisqu'on passe ici à chaque fois, le tableau currentPair est vidé à chaque fois
    // donc on peut en conclure qu'après 2 clics le tableau est toujours vidé 
    console.log("handleNewPairClosedBy ::: on va faire le timeOut, le currentPair est vidé")

    console.log("handleNewPairClosedBy ::: FIN")
  }


  // Affiche le tableau d'honneur une fois que toutes les paires sont trouvées
  // et que donc la partie est terminée
  // voilà comment est appelée cette method : 
  // {this.displayHallOfFame}
  // donc on dit que cette méthode est appelée par référence car on ne fait que donner le nom de la méthode
  // sans parenthèses, et donc on est obligés d'utiliser une fonction fléchée pr pouvoir acceder au this
  // à l'interieur 
  displayHallOfFame = (entries) => {
    this.setState({ myEntries: entries })
    // On peut aussi l'écrire comme ça : 
    // this.setState({ hallOfFame })
    // ené écrivant (hallOfFame) à la place de (entries) ds les params ^
  }
  

  // Est executé à l'init ET à chaque fois que setState est appelé
  render() {
    const { cards, guesses,  myEntries, matchedCardIndices, matchedCardSymbols } = this.state
    console.log("RENDER ::: DEBUT")
    console.log("RENDER ::: on va construire chaque card en faisant un map() sur le tableau de card ; ", cards)
    const won = matchedCardIndices.length === 2
    // à chaque    fois que map créer un Card on execute la méthode getFeedBackForCard,
    // et on sait d'ailleurs qu'à chaque fois que la méthode render est appelée les Cards seront toutes recréées
    // DONC a chaque fois la méthode getFeedbackforcard sera appelée
    return (
      <div className="memory">
        <GuessCount guesses={guesses} />

        {cards.map((card, index) => (
          <Card
            card={card}
            feedback={this.getFeedbackForCard(index)}
            index={index}
            key={index}
            handleClick={this.handleCardClick}
          />
        ))}

        <PairedCards pairSymbols={matchedCardSymbols} />

        {console.log("RENDER ::: les 36 instances de Cards on été faites. Maintenant, les composants <Card> existent.")}

        { // Ici on dit : "si won est true ALORS on fait une condition ternaire" 
          won &&
          ( myEntries ?
            (
              //Si hallOfFame
              <HallOfFame entries={myEntries} />
            )
            :
            (
              <HighScoreInput guesses={guesses} displayHallOfFame={this.displayHallOfFame} />
            )
          )
        }
        {console.log("RENDER ::: FIN")}
      </div>
    )
  }
}

export default App
