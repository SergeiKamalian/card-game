import { TRUMPS } from "../../constants";
import { TGamer } from "../../types";

export const recognizeAttackerAndDefenderOnStart = (gamers: TGamer[], trump: TRUMPS) => {
    const filteredGamers = gamers.map(gamer => {

        const filteredCards = gamer.cards.filter(card => card.trump === trump);
        
        if (!filteredCards.length) return {
            ...gamer,
            smallerCard: null
        }

        const filteredCardsSmallerCard = filteredCards?.reduce((minCard, currentCard) => {
            if (currentCard.hasOwnProperty('value') && Number(currentCard['value']) < Number(minCard['value'])) {
                return currentCard
            }
            return minCard
        })
        
        return {
            ...gamer,
            smallerCard: filteredCardsSmallerCard
        }
    })
    const { name: attacker, index: attackerIndex } = filteredGamers.reduce((gamerWithSmallerCard, currentGamer) => {
        if (Number(currentGamer['smallerCard']?.value) < Number(gamerWithSmallerCard['smallerCard']?.value)) {
            return currentGamer
        }
        return gamerWithSmallerCard
    })

    const defenderIndex = attackerIndex + 1 === gamers.length ? 0 : attackerIndex + 1;
    const defender = gamers.find(({ index }) => index === defenderIndex)?.name || ''

    return {
        attacker,
        defender
    }
}