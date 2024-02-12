import { memo } from 'react';
import { useGameContext } from '../../contexts';
import { TCard } from '../../types';

interface TableProps {
    // Define your props here
}

export const Table = memo((props: TableProps) => {

    const { game, closeAttackCardHandler } = useGameContext()

    return (
        <div style={{ display: 'flex', gap: 50 }}>
            <div>trump: {game?.trump.trump}</div>
            <div>cards:
                <div>{(game?.inTableCards as TCard[][]).map((cardsGroup, index) => (
                    <div
                        key={JSON.stringify(cardsGroup)}
                        style={{ width: '100px', height: '100px', border: '1px solid black' }}
                        onClick={() => closeAttackCardHandler(cardsGroup, index)}
                    >
                        <div>first: {cardsGroup[0]?.trump} {cardsGroup[0]?.value}</div>
                        <div>Second: {cardsGroup[1]?.trump} {cardsGroup[1]?.value}</div>
                    </div>
                ))}</div>
            </div>
        </div>
    );
});

Table.displayName = 'Table';