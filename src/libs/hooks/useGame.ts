import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router"
import { TCard, TGame, TGamer } from "../types";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../configs";
import { FIREBASE_PATHS } from "../constants";
import { useUserContext } from "../contexts";
import { checkAttackerCard, checkDefenderCard, getRandomCards } from "../utils";
import { useFirebase } from "./useFirebase";
import { sortCards } from "../utils/sortCards";

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

            setGame({ ...game, inTableCards: JSON.parse(game?.inTableCards as string || '') as TCard[][] })
        })
        return () => {
            unSub()
        }
    }, [id])

    const updateGame = useCallback(async (data: Partial<TGame>) => {
        try {
            if (!game) return;
            const updatedGame: TGame = { ...game, ...data };
            const newGame: TGame = {
                ...updatedGame,
                inTableCards: typeof updatedGame.inTableCards === 'string'
                    ? updatedGame.inTableCards
                    : JSON.stringify(updatedGame.inTableCards)
            }
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
    }, [attackHandler, game, user])

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

    const finishTheLap = useCallback(async () => {
        try {
            if (!game) return;
            console.log('круг закончен')

            const prevDefenderIndex = game?.gamers.find(({ name }) => name === game.defender)?.index || 0; // 1
            console.log(prevDefenderIndex)
            const newAttackerIndex = game.defenderSurrendered ? (prevDefenderIndex + 1) === Number(game.gamersCount) ? 0 : prevDefenderIndex + 1 : prevDefenderIndex; // 1


            const newAttacker = game.gamers.find(({ index }) => index === newAttackerIndex)?.name;
            const newDefender = game.gamers.find(({ index }) => {
                const possibleNewDefenderIndex = newAttackerIndex + 1;
                const newDefenderIndex = possibleNewDefenderIndex === Number(game.gamersCount) ? 0 : possibleNewDefenderIndex;
                return index === newDefenderIndex;
            })?.name;

            const gameNewGamers: TGamer[] = [];
            let gameRemainingCards = game.remainingCards;

            game.gamers.forEach(gamer => {
                if (!gameRemainingCards.length) return;
                if (game.defenderSurrendered && game.defender === gamer.name) {
                    const inTableCards = (game.inTableCards as TCard[][]).reduce((acc, curr) => acc.concat(curr), []);
                    const defenderCards = sortCards([...gamer.cards, ...inTableCards], game.trump.trump);
                    gameNewGamers.push({ ...gamer, cards: defenderCards });
                    return;
                }

                const { gamerCards, remainingCards } = getRandomCards(gameRemainingCards, gamer.cards, game.trump);
                gameNewGamers.push({ ...gamer, cards: gamerCards });
                gameRemainingCards = remainingCards;
            })

            const updatedGame = {
                attacker: newAttacker,
                defender: newDefender,
                gamers: gameNewGamers,
                remainingCards: gameRemainingCards,
                alreadyPlayedAttackersCount: 0,
                inTableCards: '[]',
                defenderSurrendered: false
            }
            console.log(updatedGame)
            await updateGame(updatedGame)

        } catch (error) {
            console.error(error)
        }
    }, [game, updateGame])

    const transferAttackerPlace = useCallback(async () => {
        try {
            if (!game) return;
            console.log('следующий игрок')

            const prevAttackerIndex = game?.gamers.find(({ name }) => name === game.attacker)?.index || 0;

            const prevDefenderIndex = game?.gamers.find(({ name }) => name === game.defender)?.index || 0;

            const nextAttackerIndex = prevAttackerIndex + 1 === prevDefenderIndex ? prevAttackerIndex + 2 : prevAttackerIndex + 1;

            const readyNewAttacker = game?.gamers.find(({ index }) => index === (nextAttackerIndex === game.gamers.length ? 0 : nextAttackerIndex))?.name;
            const newAlreadyPlayedAttackersCount = game.alreadyPlayedAttackersCount + 1;

            await updateGame({ attacker: readyNewAttacker, alreadyPlayedAttackersCount: newAlreadyPlayedAttackersCount })
        } catch (error) {
            console.error(error)
        }
    }, [game, updateGame])

    //*  ======================== Бито ========================
    const finishUserTurnHandler = useCallback(async () => {
        try {
            if (!game) return;
            console.log(game)
            const newAlreadyPlayedAttackersCount = game.alreadyPlayedAttackersCount + 1;
            console.log(newAlreadyPlayedAttackersCount)
            console.log(game.gamers)
            if (newAlreadyPlayedAttackersCount === game.gamers.length - 1) {
                console.log('mtav')
                await finishTheLap()
                return;
            }
            await updateGame({ alreadyPlayedAttackersCount: newAlreadyPlayedAttackersCount })
            await transferAttackerPlace()
        } catch (error) {
            console.error(error)
        }
    }, [finishTheLap, transferAttackerPlace, game, updateGame]);

    const takeInTableCards = useCallback(async () => {
        try {
            await updateGame({ defenderSurrendered: true })
        } catch (error) {
            console.error(error)
        }
    }, [updateGame])

    return {
        id,
        game,
        defenderSelectedCard,
        followToGame,
        handleSelectCard,
        closeAttackCardHandler,
        finishUserTurnHandler,
        takeInTableCards
    }
}