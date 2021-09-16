import React from 'react'

export const ActionType = {
    GetExoPlanet: 'GET_EXOPLANET',
  }
  
  const DEFAULT_STATE = {
    getExoPlanet: [],
    };
  
    const Exoplanet = (state, action) => {
      if (!state) {
          state = DEFAULT_STATE;
        }
        switch (action.type) {
          case ActionType.GetExoPlanet:
            return {
              ...state,
              getExoPlanet: action.value,
            };
          default:
            return { ...state };
        }
    };
  
    export default Exoplanet