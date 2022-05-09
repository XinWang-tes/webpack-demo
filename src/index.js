import React from 'react';
import { createRoot } from 'react-dom/client';
import { Cruise } from './components/cruise'
import './styles/style.scss';

const root = createRoot(document.getElementById('root'))
root.render(<Cruise />);