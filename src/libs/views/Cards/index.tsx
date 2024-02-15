import { memo, useEffect, useMemo, useState } from 'react';
import { TCard, TGamer } from '../../types';
import { useGameContext, useTimerContext, useUserContext } from '../../contexts';
import { getDifferenceSeconds } from '../../utils';

interface CardsProps {
    isUserCards?: boolean;
    gamer: TGamer
}

export const Cards = memo((props: CardsProps) => {

    const { isUserCards = false, gamer } = props;

    const { game, handleSelectCard, defenderSelectedCard, finishUserTurnHandler, takeInTableCards } = useGameContext();
    const { user } = useUserContext();
    const { gameTimes } = useTimerContext()

    const showCompletingTheLapButton = useMemo(() => {
        const isAttackerCards = game?.attacker === user?.name;
        if (!isAttackerCards) return false;

        const onTableAllCardsIsClosed = (game?.inTableCards as TCard[][]).every(cardGroup => cardGroup.length === 2);
        const tableIsNotEmpty = game?.inTableCards.length;

        if ((onTableAllCardsIsClosed && tableIsNotEmpty) || game?.defenderSurrendered) return true;

        return false;
    }, [game, user])

    const showTakeInTableCardsButton = useMemo(() => game?.defender === user?.name && !game?.defenderSurrendered && (game?.inTableCards as TCard[][]).some(cardGroup => cardGroup.length === 1), [game, user])

    const gamerIsSurrendered = useMemo(() => game?.defender === gamer?.name && game?.defenderSurrendered, [game?.defender, game?.defenderSurrendered, gamer?.name])

    const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

    useEffect(() => {
        console.log(game)
        if (game?.defender === user?.name && gameTimes?.defenderFinishTime) {
            const differenceSeconds = getDifferenceSeconds(gameTimes.defenderFinishTime)
            console.log(differenceSeconds)
            setRemainingSeconds(differenceSeconds)
            return;
        }
        if (game?.attacker === user?.name && gameTimes?.attackerFinishTime) {
            console.log('mtav')
            console.log(user)
            const differenceSeconds = getDifferenceSeconds(gameTimes.attackerFinishTime)
            console.log(differenceSeconds)

            setRemainingSeconds(differenceSeconds)
            return;
        }
    }, [game, user, gameTimes])

    console.log(remainingSeconds)

    // const changeRemainingSeconds = useCallback(() => {
    //     if (typeof remainingSeconds === 'number' && remainingSeconds > 0) {
    //         setTimeout(() => {
    //             setRemainingSeconds(prev => (prev !== null ? prev - 1 : null));
    //         }, 1000);
    //     }
    // }, [remainingSeconds])

    // useEffect(changeRemainingSeconds, [changeRemainingSeconds])

    if (isUserCards) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {remainingSeconds}
                {gamerIsSurrendered ? <h3 style={{ background: 'red' }}>я беру</h3> : null}
                <h2>{gamer.name}</h2>
                <div style={{ display: 'flex', gap: 20 }}>
                    {
                        gamer.cards.map(card => (
                            <button onClick={() => handleSelectCard(card)} key={card.imageURL}>
                                {defenderSelectedCard?.imageURL === card.imageURL && 'selected:'} {card.trump} {card.value}
                            </button>
                        ))
                    }
                </div>
                {showCompletingTheLapButton ? <button onClick={finishUserTurnHandler}>Complete</button> : null}
                {showTakeInTableCardsButton ? <button onClick={takeInTableCards}>Take</button> : null}
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, border: '1px solid' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
                {
                    gamer.cards.map(i => (
                        <div key={i.imageURL} style={{ width: '10px', height: '10px', border: '1px solid' }} />
                    ))
                }
            </div>
            <h2>{gamer.name}</h2>
            {gamerIsSurrendered ? <h3 style={{ background: 'red' }}>я беру</h3> : null}

        </div>
    );
});

Cards.displayName = 'Cards';