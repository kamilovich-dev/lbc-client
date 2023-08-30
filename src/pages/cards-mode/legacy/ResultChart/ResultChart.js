import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

export default function ResultChart( {knownCount, cardsCount} ) {

return (
    <PieChart width={80} height={80}>
        <Pie
            innerRadius={30}
            outerRadius={40}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value">
            <Cell key={'cell-answered'} fill='#59E8B5' value={knownCount}></Cell>
            <Cell key={'cell-unanswered'} fill='#FF983A' value={cardsCount-knownCount}></Cell>
        </Pie>
    </PieChart>
);
}
