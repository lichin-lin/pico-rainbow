import React, { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { COLORS } from '../utils';

const CURSOR_SIZE = 40;
const FONT_SIZE = 20;
const FRUITS = [
  { fruit: '🍎', color: COLORS.red },
  { fruit: '🍓', color: COLORS.red },
  { fruit: '🍉', color: COLORS.pink },
  { fruit: '🍇', color: COLORS.purple },
  { fruit: '🍑', color: COLORS.orange },
  { fruit: '🍊', color: COLORS.orange },
  { fruit: '🍋', color: COLORS.yellow },
  { fruit: '🍌', color: COLORS.yellow },
  { fruit: '🍏', color: COLORS.green },
  { fruit: '🍍', color: COLORS.blue }
];

const getFruit = id => {
  const index = (id?.charCodeAt(0) || 0) % FRUITS.length;
  return FRUITS[index];
};

export const CustomCursor = ({ id, x, y } = { id: '0', x: 0, y: 0 }) => {
  const posX = useMotionValue(0);
  const posY = useMotionValue(0);

  useEffect(() => {
    posX.set(x - 0 * CURSOR_SIZE / 2 + 8);
  }, [x]);

  useEffect(() => {
    posY.set(y - CURSOR_SIZE / 2 * 2 - 8);
  }, [y]);

  return (
    <motion.div
      style={{
        y: posY,
        x: posX,
        top: 0,
        left: 0,
        zIndex: 1000,
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        position: 'absolute',
        fontSize: FONT_SIZE,
        userSelect: 'none',
        boxShadow: `inset 0px 0px 0px 2px ${
          getFruit(id).color.default
        }, 0px 2px 8px rgba(0,0,0,0.2)`,
        backgroundColor: getFruit(id).color.dim,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {getFruit(id).fruit}
      <svg
        style={{
          position: 'absolute',
          bottom: -4,
          left: -4
        }}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 12H9.17157C10.9534 12 11.8457 9.84572 10.5858 8.58579L3.41421 1.41421C2.15428 0.154281 0 1.04662 0 2.82843V10C0 11.1046 0.89543 12 2 12Z"
          fill={getFruit(id).color.default}
        />
      </svg>
    </motion.div>
  );
};

export default CustomCursor