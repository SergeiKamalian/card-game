import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router"
import { TCard, TGame } from "../types";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../configs";
import { FIREBASE_PATHS } from "../constants";
import { useUserContext } from "../contexts";
import { checkAttackerCard, checkDefenderCard } from "../utils";
import { useFirebase } from "./useFirebase";

export const useGame = () => {

    const { id } = useParams();

    const { user } = useUserContext()

    const { changeData } = useFirebase()

    const [game, setGame] = useState<TGame | null>(null);

    const currentGamer = useMemo(() => game?.gamers.find(({ name }) => name === user?.name), [game?.gamers, user?.name]);

    const [defenderSelectedCard, setDefenderSelectedCard] = useState<TCard | null>(null)

    useEffect(() => console.log(game), [game])

    const followToGame = useCallback(() => {
        if (!id) return;
        const unSub = onSnapshot(doc(database, FIREBASE_PATHS.GAMES, id), (doc) => {
            const game = doc.data() as TGame;
            console.log(game)
            setGame({ ...game, inTableCards: JSON.parse(game?.inTableCards as string || '') as TCard[][] })
        })
        return () => {
            unSub()
        }
    }, [id])

    const handleSelectCard = useCallback((card: TCard) => {
        try {
            const userIsPassiveGamerOnTheMoment = game?.attacker !== user?.name && game?.defender !== user?.name;
            if (userIsPassiveGamerOnTheMoment) return;

            const userIsAttacker = game?.attacker === user?.name;

            if (userIsAttacker) {
                attackHandler(card)
            };

            const userIsDefender = game?.defender === user?.name;

            if (userIsDefender) {
                setDefenderSelectedCard(card)
            }


        } catch (error) {
            console.error(error)
        }
    }, [game?.attacker, game?.defender, user?.name])


    const updateGame = useCallback(async (data: Partial<TGame>) => {
        try {
            if (!game) return;
            const newGame = { ...game, ...data };
            await changeData(FIREBASE_PATHS.GAMES, String(game.code), newGame)
        } catch (error) {
            console.error(error)
        }
    }, [changeData, game])

    const filterGamerCards = useCallback((redundantCard: TCard) => {
        if (!game || !currentGamer) return;
        return game.gamers.map(gamer => {
            if (gamer.name === currentGamer.name) {
                return {
                    ...gamer,
                    cards: gamer.cards.filter(({ imageURL }) => imageURL !== redundantCard.imageURL)
                }
            }
            return gamer
        })
    }, [currentGamer, game])

    const attackHandler = useCallback(async (card: TCard) => {
        try {
            if (!game || !currentGamer) return;
            const isValidCard = checkAttackerCard(card, game?.inTableCards as TCard[][] || []);
            if (!isValidCard) {
                alert('card is not valid');
                return;
            }
            const newGamers = filterGamerCards(card)
            const newInTableCards = [...game.inTableCards as TCard[][], [card]];
            await updateGame({ inTableCards: JSON.stringify(newInTableCards), gamers: newGamers })
        } catch (error) {
            console.error(error)
        }
    }, [currentGamer, filterGamerCards, game, updateGame])

    const closeAttackCardHandler = useCallback(async (inTableCardGroup: TCard[], groupIndex: number) => {
        try {
            if (!defenderSelectedCard) {
                alert('select card')
                return;
            }
            if (inTableCardGroup.length !== 1) {
                alert('card is closed');
                return;
            }
            if (!game?.trump.trump) return;
            const isValidCard = checkDefenderCard(defenderSelectedCard, inTableCardGroup[0], game.trump.trump);
            if (!isValidCard) {
                alert('card is not valid');
                return;
            }
            const newGamers = filterGamerCards(defenderSelectedCard)
            if (!newGamers) return;
            const cloneInTableCards = [...game.inTableCards as TCard[][]];
            cloneInTableCards[groupIndex] = [...inTableCardGroup, defenderSelectedCard];

            const newGame = {
                gamers: newGamers,
                inTableCards: JSON.stringify(cloneInTableCards)
            }
            await updateGame(newGame)
        } catch (error) {
            console.error(error)
        }
    }, [defenderSelectedCard, filterGamerCards, game, updateGame])

    return {
        id,
        followToGame,
        game,
        handleSelectCard,
        defenderSelectedCard,
        closeAttackCardHandler
    }
}