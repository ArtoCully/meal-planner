import React from 'react';
import './DividerWithText.css';

interface IDividerWithText {
  text?: string;
  lineColour?: string;
  textColour?: string;
}

export default function DividerWithText({ text, lineColour, textColour }: IDividerWithText) {
  return (
    <div className="App-separator">
      <div className="App-separator__line" style={{backgroundColor: lineColour}}></div>
      <h2 className="App-separator__title" style={{color: textColour }}>{text}</h2>
      <div className="App-separator__line" style={{backgroundColor: lineColour}}></div>
    </div>
  )
}
