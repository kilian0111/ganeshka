import React from 'react'
import squirrel from '../../../assets/img/logo-ecureuil.svg';
import squirrelPng from '../../../assets/img/logo512.png';

export const Logo = ({width,png}) => {

  return (
    <img src={png != null && png ? squirrelPng : squirrel} alt="Logo Squirrel"
        style={{
            width: width
        }}
    />
  )
}
