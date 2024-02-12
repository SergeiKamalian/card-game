import { memo } from 'react';
import { TCard } from '../../types';
import { useGameContext, useUserContext } from '../../contexts';

interface CardsProps {
    isUserCards?: boolean;
    cards: TCard[]
}

export const Cards = memo((props: CardsProps) => {

    const { isUserCards = false, cards } = props;

    const { game, handleSelectCard, defenderSelectedCard } = useGameContext()
    const { user } = useUserContext()

    if (isUserCards) {
        return (
            <div style={{ display: 'flex', gap: 20 }}>
                {
                    cards.map(card => (
                        <button onClick={() => handleSelectCard(card)} key={card.imageURL}>
                            {defenderSelectedCard?.imageURL === card.imageURL && 'selected:'} {card.trump} {card.value}
                        </button>
                    ))
                }
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', gap: 20 }}>
            {
                cards.map(i => (
                    <div key={i.imageURL} style={{ width: '10px', height: '10px',border: '1px solid' }} />
                ))
            }
        </div>
    );
});

Cards.displayName = 'Cards';